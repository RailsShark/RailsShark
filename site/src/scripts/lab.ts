/**
 * Design lab: a floating panel for trying palettes, type, shape and motion live.
 * Loaded only when the site is opened with ?lab=1, so it costs visitors nothing.
 * Choices persist in localStorage and are re-applied before paint by Base.astro.
 */
import { palettes, fontPairs, radii, densities, scales, defaults, type LabState, type Mode, type Tokens } from '../lib/themes';

const KEY = 'rs-lab-saved';
const root = document.documentElement;

function load(): LabState {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved?.state) return { ...defaults, ...saved.state, mode: (root.dataset.mode as Mode) || defaults.mode };
  } catch {}
  return { ...defaults, mode: (root.dataset.mode as Mode) || defaults.mode };
}

function luminance(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function tokensFor(state: LabState, mode: Mode): Tokens {
  const p = palettes.find((x) => x.id === state.palette) || palettes[0];
  const t = { ...p[mode] };
  if (state.accent) {
    t.accent = state.accent;
    t.onAccent = contrast(state.accent, '#ffffff') >= contrast(state.accent, '#111111') ? '#ffffff' : '#111111';
  }
  return t;
}

function toVars(t: Tokens) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(t)) out[`--${k}`] = v;
  return out;
}

function commonVars(state: LabState) {
  const f = fontPairs.find((x) => x.id === state.font) || fontPairs[0];
  return {
    '--font-display': f.display,
    '--font-body': f.body,
    '--display-stretch': f.stretch,
    '--display-weight': String(f.weight),
    '--radius': (radii.find((x) => x.id === state.radius) || radii[1]).value,
    '--density': (densities.find((x) => x.id === state.density) || densities[1]).value,
    '--ratio': (scales.find((x) => x.id === state.scale) || scales[1]).value,
  };
}

function fontHref(state: LabState) {
  const f = fontPairs.find((x) => x.id === state.font);
  return f?.google ? `https://fonts.googleapis.com/css2?${f.google}&display=swap` : '';
}

function apply(state: LabState) {
  const common = commonVars(state);
  const mode = (root.dataset.mode as Mode) || 'dark';
  const vars = { ...common, ...toVars(tokensFor(state, mode)) };
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
  root.dataset.motion = state.motion;
  root.dataset.contours = state.contours;

  const href = fontHref(state);
  let link = document.getElementById('rs-lab-font') as HTMLLinkElement | null;
  if (href) {
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = 'rs-lab-font';
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  } else link?.remove();

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', vars['--bg']);

  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        state,
        common,
        dark: toVars(tokensFor(state, 'dark')),
        light: toVars(tokensFor(state, 'light')),
        attrs: { motion: state.motion, contours: state.contours },
        fontHref: href,
      }),
    );
  } catch {}
}

function reset() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  root.removeAttribute('style');
  delete root.dataset.motion;
  delete root.dataset.contours;
  document.getElementById('rs-lab-font')?.remove();
}

function exportText(state: LabState) {
  const p = palettes.find((x) => x.id === state.palette)!;
  const f = fontPairs.find((x) => x.id === state.font)!;
  const lines = [
    'RailsShark design lab selection',
    `Palette: ${p.name}${state.accent ? ` with custom accent ${state.accent}` : ''}`,
    `Default mode: ${root.dataset.mode}`,
    `Type: ${f.name}`,
    `Corners: ${state.radius}, density: ${state.density}, type scale: ${state.scale}`,
    `Motion: ${state.motion}, hero contours: ${state.contours}`,
    '',
    ':root {',
    ...Object.entries({ ...commonVars(state), ...toVars(tokensFor(state, 'dark')) }).map(([k, v]) => `  ${k}: ${v};`),
    '}',
    ":root[data-mode='light'] {",
    ...Object.entries(toVars(tokensFor(state, 'light'))).map(([k, v]) => `  ${k}: ${v};`),
    '}',
  ];
  if (f.google) lines.push('', `Font CSS: ${fontHref(state)}`);
  return lines.join('\n');
}

const css = `
.rs-lab-fab{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:8px;padding:10px 16px;border:0;border-radius:999px;background:#111827;color:#f9fafb;font:600 14px/1 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.35);cursor:pointer}
.rs-lab-fab span{width:14px;height:14px;border-radius:50%;background:conic-gradient(#f2c14e,#5b95ff,#ff8466,#86d993,#f2c14e)}
.rs-lab{position:fixed;top:12px;right:12px;bottom:12px;z-index:9999;width:min(360px,calc(100vw - 24px));display:flex;flex-direction:column;background:#111827;color:#e5e7eb;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.45);font:14px/1.45 system-ui,sans-serif;translate:calc(100% + 24px) 0;transition:translate .25s cubic-bezier(.2,.7,.2,1)}
.rs-lab[data-open=true]{translate:0 0}
.rs-lab header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1f2937}
.rs-lab header strong{font-size:15px}
.rs-lab__x{width:32px;height:32px;border:0;border-radius:8px;background:#1f2937;color:#e5e7eb;font-size:18px;cursor:pointer}
.rs-lab__body{overflow:auto;padding:6px 16px 16px;display:grid;gap:18px}
.rs-lab h3{margin:12px 0 8px;font:600 12px/1.2 system-ui,sans-serif;color:#9ca3af;letter-spacing:.02em}
.rs-lab__pals{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.rs-lab__pal{display:grid;gap:6px;padding:8px;border:1.5px solid #1f2937;border-radius:10px;background:#0b1220;color:inherit;text-align:left;cursor:pointer}
.rs-lab__pal[aria-pressed=true]{border-color:#f9fafb}
.rs-lab__chips{display:flex;height:22px;border-radius:6px;overflow:hidden}
.rs-lab__chips i{flex:1}
.rs-lab__pal b{font-size:13px}
.rs-lab__pal small{color:#9ca3af;font-size:11.5px;line-height:1.3}
.rs-lab__seg{display:flex;flex-wrap:wrap;gap:6px}
.rs-lab__seg button{flex:1 1 auto;padding:7px 10px;border:1.5px solid #1f2937;border-radius:8px;background:#0b1220;color:#e5e7eb;font:500 13px/1.2 system-ui,sans-serif;cursor:pointer}
.rs-lab__seg button[aria-pressed=true]{background:#f9fafb;color:#111827;border-color:#f9fafb}
.rs-lab select{width:100%;padding:8px 10px;border:1.5px solid #1f2937;border-radius:8px;background:#0b1220;color:#e5e7eb;font:inherit}
.rs-lab__accent{display:flex;gap:8px;align-items:center}
.rs-lab__accent input{width:44px;height:34px;padding:0;border:1.5px solid #1f2937;border-radius:8px;background:none;cursor:pointer}
.rs-lab__accent code{flex:1;color:#9ca3af;font-size:12.5px}
.rs-lab__accent button,.rs-lab footer button{padding:8px 12px;border:1.5px solid #374151;border-radius:8px;background:#1f2937;color:#e5e7eb;font:600 13px/1 system-ui,sans-serif;cursor:pointer}
.rs-lab footer{display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;border-top:1px solid #1f2937}
.rs-lab footer .rs-lab__primary{background:#f9fafb;color:#111827;border-color:#f9fafb}
.rs-lab__toast{min-height:18px;color:#86d993;font-size:12.5px;width:100%}
.rs-lab :focus-visible{outline:2px solid #5b95ff;outline-offset:2px}
@media print{.rs-lab,.rs-lab-fab{display:none}}
`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text = '') {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text) node.textContent = text;
  return node;
}

export function mountLab() {
  if (document.querySelector('.rs-lab')) return;
  let state = load();
  apply(state);

  const style = el('style');
  style.textContent = css;
  document.head.appendChild(style);

  const fab = el('button', { class: 'rs-lab-fab', type: 'button', 'aria-controls': 'rs-lab', 'aria-expanded': 'false' });
  fab.append(el('span'), document.createTextNode('Design lab'));

  const panel = el('aside', { class: 'rs-lab', id: 'rs-lab', 'aria-label': 'Design lab', 'data-open': 'false' });
  const head = el('header');
  head.append(el('strong', {}, 'Design lab'));
  const close = el('button', { class: 'rs-lab__x', type: 'button', 'aria-label': 'Close design lab' }, '×');
  head.append(close);
  const body = el('div', { class: 'rs-lab__body' });
  const foot = el('footer');
  panel.append(head, body, foot);
  document.body.append(fab, panel);

  const toggle = (open: boolean) => {
    panel.dataset.open = String(open);
    fab.setAttribute('aria-expanded', String(open));
    fab.style.display = open ? 'none' : '';
    if (open) close.focus();
  };
  fab.addEventListener('click', () => toggle(true));
  close.addEventListener('click', () => {
    toggle(false);
    fab.focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.dataset.open === 'true') toggle(false);
  });

  const update = (patch: Partial<LabState>) => {
    state = { ...state, ...patch };
    apply(state);
    render();
  };

  function group(title: string, content: HTMLElement) {
    const wrap = el('section');
    wrap.append(el('h3', {}, title), content);
    return wrap;
  }

  function segmented<T extends { id: string; name: string }>(items: T[], current: string, onPick: (id: string) => void) {
    const box = el('div', { class: 'rs-lab__seg', role: 'group' });
    for (const it of items) {
      const b = el('button', { type: 'button', 'aria-pressed': String(it.id === current) }, it.name);
      b.addEventListener('click', () => onPick(it.id));
      box.append(b);
    }
    return box;
  }

  function render() {
    body.replaceChildren();
    const mode = (root.dataset.mode as Mode) || 'dark';

    const pals = el('div', { class: 'rs-lab__pals' });
    for (const p of palettes) {
      const t = p[mode];
      const b = el('button', { type: 'button', class: 'rs-lab__pal', 'aria-pressed': String(p.id === state.palette) });
      const chips = el('span', { class: 'rs-lab__chips' });
      for (const c of [t.bg, t.surface2, t.contour, t.ink, t.accent]) {
        const i = el('i');
        i.style.background = c;
        chips.append(i);
      }
      b.append(chips, el('b', {}, p.name), el('small', {}, p.note));
      b.addEventListener('click', () => update({ palette: p.id, accent: '' }));
      pals.append(b);
    }
    body.append(group('Palette', pals));

    body.append(
      group(
        'Mode',
        segmented([{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }], mode, (id) => {
          root.dataset.mode = id;
          try {
            localStorage.setItem('rs-mode', id);
          } catch {}
          update({ mode: id as Mode });
        }),
      ),
    );

    const acc = el('div', { class: 'rs-lab__accent' });
    const current = tokensFor(state, mode).accent;
    const picker = el('input', { type: 'color', value: current, 'aria-label': 'Accent colour' }) as HTMLInputElement;
    picker.addEventListener('input', () => {
      state = { ...state, accent: picker.value };
      apply(state);
      code.textContent = picker.value;
    });
    picker.addEventListener('change', () => render());
    const code = el('code', {}, state.accent ? state.accent : `${current} (palette)`);
    const resetAcc = el('button', { type: 'button' }, 'Use palette');
    resetAcc.addEventListener('click', () => update({ accent: '' }));
    acc.append(picker, code, resetAcc);
    body.append(group('Accent', acc));

    const sel = el('select', { 'aria-label': 'Typeface pairing' }) as HTMLSelectElement;
    for (const f of fontPairs) {
      const o = el('option', { value: f.id }, f.name) as HTMLOptionElement;
      o.selected = f.id === state.font;
      sel.append(o);
    }
    sel.addEventListener('change', () => update({ font: sel.value }));
    body.append(group('Typefaces', sel));

    body.append(group('Type scale', segmented(scales, state.scale, (id) => update({ scale: id }))));
    body.append(group('Corners', segmented(radii, state.radius, (id) => update({ radius: id }))));
    body.append(group('Spacing', segmented(densities, state.density, (id) => update({ density: id }))));
    body.append(
      group('Motion', segmented([{ id: 'on', name: 'On' }, { id: 'off', name: 'Off' }], state.motion, (id) => update({ motion: id }))),
    );
    body.append(
      group(
        'Hero contours',
        segmented([{ id: 'on', name: 'Show' }, { id: 'off', name: 'Hide' }], state.contours, (id) => update({ contours: id })),
      ),
    );

    foot.replaceChildren();
    const toast = el('p', { class: 'rs-lab__toast', role: 'status' });
    const copy = el('button', { type: 'button', class: 'rs-lab__primary' }, 'Copy settings');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(exportText(state));
        toast.textContent = 'Settings copied. Paste them into the chat to lock this look in.';
      } catch {
        toast.textContent = 'Copy blocked by the browser. Select the text from the console instead.';
        console.log(exportText(state));
      }
    });
    const resetAll = el('button', { type: 'button' }, 'Reset');
    resetAll.addEventListener('click', () => {
      reset();
      state = { ...defaults, mode: (root.dataset.mode as Mode) || 'dark' };
      render();
      toast.textContent = 'Back to the default look.';
    });
    const exit = el('button', { type: 'button' }, 'Exit lab');
    exit.addEventListener('click', () => {
      reset();
      try {
        localStorage.removeItem('rs-lab');
      } catch {}
      panel.remove();
      fab.remove();
      style.remove();
      delete root.dataset.lab;
    });
    foot.append(copy, resetAll, exit, toast);
  }

  // The public dark/light toggle in the nav swaps token sets too.
  window.addEventListener('rs:mode', () => {
    state = { ...state, mode: (root.dataset.mode as Mode) || 'dark' };
    apply(state);
    render();
  });

  render();
}
