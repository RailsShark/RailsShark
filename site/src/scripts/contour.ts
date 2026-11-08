/**
 * Animated depth-contour field for the hero, drawn like a nautical chart.
 * Pointer movement nudges the seabed; clicks send a sonar ping.
 * Renders a single static frame when motion is reduced or switched off,
 * and pauses whenever the hero is off screen or the tab is hidden.
 */

type Ping = { x: number; y: number; born: number };

const CELL = 18;
const LEVELS = 13;

function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

function fbm(x: number, y: number) {
  return noise(x, y) * 0.6 + noise(x * 2.03, y * 2.03) * 0.28 + noise(x * 4.1, y * 4.1) * 0.12;
}

export function mountContours(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const host = canvas.parentElement as HTMLElement;
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let w = 0;
  let h = 0;
  let dpr = 1;
  let cols = 0;
  let rows = 0;
  let field = new Float32Array(0);
  let t = Math.random() * 100;
  let last = 0;
  let raf = 0;
  let visible = true;
  let colors = { line: '#14485a', index: '#1d4b59', accent: '#f2c14e' };
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  const pings: Ping[] = [];

  const animated = () =>
    !reduce.matches && root.dataset.motion !== 'off' && root.dataset.contours !== 'off';

  function readColors() {
    const cs = getComputedStyle(root);
    const line = cs.getPropertyValue('--contour').trim() || colors.line;
    const ink = cs.getPropertyValue('--muted').trim() || colors.index;
    colors = { line, index: mix(line, ink, 0.35), accent: cs.getPropertyValue('--accent').trim() || colors.accent };
  }

  function mix(a: string, b: string, k: number) {
    const pa = parseHex(a);
    const pb = parseHex(b);
    if (!pa || !pb) return a;
    const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  function parseHex(v: string) {
    const m = v.match(/^#?([0-9a-f]{6})$/i);
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function resize() {
    const r = host.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    cols = Math.ceil(w / CELL) + 2;
    rows = Math.ceil(h / CELL) + 2;
    field = new Float32Array(cols * rows);
  }

  function sample(now: number) {
    const s = 0.0042;
    const drift = t * 0.018;
    const ringSpeed = 0.32; // px per ms
    for (let j = 0; j < rows; j++) {
      const y = j * CELL;
      for (let i = 0; i < cols; i++) {
        const x = i * CELL;
        // A shelf that deepens toward the right, like water leaving a coast.
        let v = fbm(x * s + drift, y * s * 1.15 - drift * 0.6) + (x / w) * 0.55 + (y / h) * 0.12;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        v += 0.22 * Math.exp(-(dx * dx + dy * dy) / 22000);
        for (const p of pings) {
          const age = now - p.born;
          const rr = age * ringSpeed;
          const d = Math.hypot(x - p.x, y - p.y);
          const fade = Math.max(0, 1 - age / 2600);
          v += 0.09 * fade * Math.exp(-((d - rr) * (d - rr)) / 900);
        }
        field[j * cols + i] = v;
      }
    }
  }

  function draw(now: number) {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, w, h);
    if (root.dataset.contours === 'off') return;
    sample(now);

    const min = 0.15;
    const max = 1.45;
    for (let L = 0; L < LEVELS; L++) {
      const iso = min + ((max - min) * (L + 0.5)) / LEVELS;
      const isIndex = L % 4 === 0;
      ctx!.beginPath();
      ctx!.strokeStyle = isIndex ? colors.index : colors.line;
      ctx!.lineWidth = isIndex ? 1.5 : 1;
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i];
          const b = field[j * cols + i + 1];
          const c = field[(j + 1) * cols + i + 1];
          const d = field[(j + 1) * cols + i];
          const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * CELL;
          const y = j * CELL;
          const top = () => [x + CELL * ((iso - a) / (b - a)), y];
          const right = () => [x + CELL, y + CELL * ((iso - b) / (c - b))];
          const bottom = () => [x + CELL * ((iso - d) / (c - d)), y + CELL];
          const left = () => [x, y + CELL * ((iso - a) / (d - a))];
          const seg = (p: number[], q: number[]) => {
            ctx!.moveTo(p[0], p[1]);
            ctx!.lineTo(q[0], q[1]);
          };
          switch (idx) {
            case 1: case 14: seg(left(), bottom()); break;
            case 2: case 13: seg(bottom(), right()); break;
            case 3: case 12: seg(left(), right()); break;
            case 4: case 11: seg(top(), right()); break;
            case 5: seg(left(), top()); seg(bottom(), right()); break;
            case 6: case 9: seg(top(), bottom()); break;
            case 7: case 8: seg(left(), top()); break;
            case 10: seg(left(), bottom()); seg(top(), right()); break;
          }
        }
      }
      ctx!.stroke();
    }

    // Sonar rings on top of the chart.
    for (let k = pings.length - 1; k >= 0; k--) {
      const p = pings[k];
      const age = now - p.born;
      if (age > 2600) {
        pings.splice(k, 1);
        continue;
      }
      const fade = 1 - age / 2600;
      ctx!.beginPath();
      ctx!.strokeStyle = colors.accent;
      ctx!.globalAlpha = fade * 0.8;
      ctx!.lineWidth = 1.5;
      ctx!.arc(p.x, p.y, age * 0.32, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }
  }

  function frame(now: number) {
    raf = 0;
    if (!visible || document.hidden) return;
    if (now - last > 33) {
      const dt = Math.min(now - last, 100);
      last = now;
      t += dt * 0.006;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      draw(now);
    }
    if (animated()) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (!raf && animated()) raf = requestAnimationFrame(frame);
    if (!animated()) draw(performance.now());
  }

  function ping(x: number, y: number) {
    if (!animated()) return;
    pings.push({ x, y, born: performance.now() });
    if (pings.length > 5) pings.shift();
    start();
  }

  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    pointer.tx = e.clientX - r.left;
    pointer.ty = e.clientY - r.top;
    if (pointer.x < -1000) {
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
    }
  });
  host.addEventListener('pointerleave', () => {
    pointer.tx = -9999;
    pointer.ty = -9999;
  });
  host.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    const r = host.getBoundingClientRect();
    ping(e.clientX - r.left, e.clientY - r.top);
  });

  new ResizeObserver(() => {
    resize();
    draw(performance.now());
  }).observe(host);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }).observe(host);

  document.addEventListener('visibilitychange', start);
  reduce.addEventListener('change', start);
  new MutationObserver(() => {
    readColors();
    start();
    if (!animated()) draw(performance.now());
  }).observe(root, { attributes: true, attributeFilter: ['style', 'data-mode', 'data-motion', 'data-contours'] });

  readColors();
  resize();
  draw(performance.now());
  start();
  // One orchestrated moment on load: a single ping from offshore.
  window.setTimeout(() => ping(w * 0.72, h * 0.46), 500);
}
