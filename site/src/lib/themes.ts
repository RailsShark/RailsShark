/**
 * Design lab definitions. Production ships only the default (Abyss + Work Sans)
 * through tokens.css; everything here is loaded only when the lab is open.
 */
export type Mode = 'dark' | 'light';
export type Tokens = Record<
  'bg' | 'surface' | 'surface2' | 'ink' | 'muted' | 'line' | 'contour' | 'accent' | 'onAccent',
  string
>;

export interface Palette {
  id: string;
  name: string;
  note: string;
  dark: Tokens;
  light: Tokens;
}

export const palettes: Palette[] = [
  {
    id: 'abyss',
    name: 'Abyss',
    note: 'Deep-sea teal with chart-buoy yellow',
    dark: { bg: '#062530', surface: '#0a3240', surface2: '#0f3e4e', ink: '#e6f0ec', muted: '#93aeb1', line: '#1d4b59', contour: '#14485a', accent: '#f2c14e', onAccent: '#1d1600' },
    light: { bg: '#edf3f0', surface: '#ffffff', surface2: '#dfeae6', ink: '#072a36', muted: '#4a676d', line: '#c3d6d2', contour: '#b9d3d1', accent: '#0d6e7c', onAccent: '#ffffff' },
  },
  {
    id: 'graphite',
    name: 'Graphite',
    note: 'Charcoal with electric blue',
    dark: { bg: '#15181c', surface: '#1d2126', surface2: '#252a31', ink: '#eceef1', muted: '#9aa3ae', line: '#2f353d', contour: '#272d34', accent: '#5b95ff', onAccent: '#06142e' },
    light: { bg: '#f3f4f6', surface: '#ffffff', surface2: '#e7e9ee', ink: '#15181c', muted: '#59626e', line: '#d3d7de', contour: '#d9dce2', accent: '#2457d6', onAccent: '#ffffff' },
  },
  {
    id: 'reef',
    name: 'Reef',
    note: 'Plum night with coral',
    dark: { bg: '#1b1420', surface: '#241b2b', surface2: '#2e2336', ink: '#f6ecea', muted: '#b9a3a8', line: '#3b2e43', contour: '#33263b', accent: '#ff8466', onAccent: '#2a0d05' },
    light: { bg: '#fbf2ef', surface: '#ffffff', surface2: '#f3e1dc', ink: '#2a1a22', muted: '#775c62', line: '#ead0c9', contour: '#f0d8d1', accent: '#c23f2c', onAccent: '#ffffff' },
  },
  {
    id: 'kelp',
    name: 'Kelp',
    note: 'Forest green with soft mint',
    dark: { bg: '#0f1a13', surface: '#15241a', surface2: '#1c2e21', ink: '#e9f2e6', muted: '#9db39f', line: '#25412d', contour: '#1f3926', accent: '#86d993', onAccent: '#082010' },
    light: { bg: '#f1f5ee', surface: '#ffffff', surface2: '#e2eadc', ink: '#13261a', muted: '#526b58', line: '#cbdac8', contour: '#d2e0cf', accent: '#2f7a3d', onAccent: '#ffffff' },
  },
  {
    id: 'arctic',
    name: 'Arctic',
    note: 'Ice white with ocean blue',
    dark: { bg: '#0b1826', surface: '#102235', surface2: '#162c43', ink: '#e8f0f8', muted: '#8fa5bb', line: '#1f3a55', contour: '#18324c', accent: '#5ab0ff', onAccent: '#04182c' },
    light: { bg: '#f5f8fb', surface: '#ffffff', surface2: '#e8eef5', ink: '#0d2133', muted: '#53667a', line: '#d2dde8', contour: '#d8e3ee', accent: '#0a66c2', onAccent: '#ffffff' },
  },
  {
    id: 'steel',
    name: 'Steel',
    note: 'Warm grey with signal amber',
    dark: { bg: '#1e1f21', surface: '#26282b', surface2: '#2f3236', ink: '#edebe6', muted: '#a6a39b', line: '#3a3d41', contour: '#313438', accent: '#f0a202', onAccent: '#231700' },
    light: { bg: '#f2f1ee', surface: '#ffffff', surface2: '#e5e3de', ink: '#1e1f21', muted: '#5f5c55', line: '#d6d3cc', contour: '#dcd9d2', accent: '#a86400', onAccent: '#ffffff' },
  },
];

export interface FontPair {
  id: string;
  name: string;
  display: string;
  body: string;
  /** font-stretch for display text; only variable-width families use it. */
  stretch: string;
  weight: number;
  /** Face, stretch and weight for big numbers. */
  figures: string;
  figuresStretch: string;
  figuresWeight: number;
  /** Google Fonts css2 query. Empty for the self-hosted default. */
  google: string;
}

const NUNITO = "'Nunito Variable', sans-serif";

export const fontPairs: FontPair[] = [
  { id: 'work', name: 'Work Sans + Nunito numbers', display: "'Work Sans Variable', sans-serif", body: "'Instrument Sans Variable', sans-serif", stretch: '100%', weight: 700, figures: NUNITO, figuresStretch: '100%', figuresWeight: 800, google: '' },
  { id: 'chart', name: 'Archivo Expanded + Instrument Sans', display: "'Archivo', sans-serif", body: "'Instrument Sans Variable', sans-serif", stretch: '118%', weight: 800, figures: "'Archivo', sans-serif", figuresStretch: '118%', figuresWeight: 700, google: 'family=Archivo:wdth,wght@62..125,100..900' },
  { id: 'dmsans', name: 'DM Sans + Nunito numbers', display: "'DM Sans', sans-serif", body: "'Instrument Sans Variable', sans-serif", stretch: '100%', weight: 700, figures: NUNITO, figuresStretch: '100%', figuresWeight: 800, google: 'family=DM+Sans:opsz,wght@9..40,400..800' },
  { id: 'bricolage', name: 'Bricolage Grotesque + Instrument Sans', display: "'Bricolage Grotesque', sans-serif", body: "'Instrument Sans Variable', sans-serif", stretch: '100%', weight: 750, figures: "'Bricolage Grotesque', sans-serif", figuresStretch: '100%', figuresWeight: 700, google: 'family=Bricolage+Grotesque:opsz,wght@12..96,400..800' },
  { id: 'fraunces', name: 'Fraunces + Source Sans 3', display: "'Fraunces', serif", body: "'Source Sans 3', sans-serif", stretch: '100%', weight: 650, figures: "'Fraunces', serif", figuresStretch: '100%', figuresWeight: 650, google: 'family=Fraunces:opsz,wght@9..144,400..800&family=Source+Sans+3:wght@400..700' },
  { id: 'sora', name: 'Sora', display: "'Sora', sans-serif", body: "'Sora', sans-serif", stretch: '100%', weight: 700, figures: "'Sora', sans-serif", figuresStretch: '100%', figuresWeight: 700, google: 'family=Sora:wght@300..800' },
  { id: 'plex', name: 'IBM Plex Sans', display: "'IBM Plex Sans', sans-serif", body: "'IBM Plex Sans', sans-serif", stretch: '100%', weight: 650, figures: "'IBM Plex Sans', sans-serif", figuresStretch: '100%', figuresWeight: 650, google: 'family=IBM+Plex+Sans:wght@400..700' },
  { id: 'syne', name: 'Syne + Manrope', display: "'Syne', sans-serif", body: "'Manrope', sans-serif", stretch: '100%', weight: 800, figures: "'Syne', sans-serif", figuresStretch: '100%', figuresWeight: 700, google: 'family=Syne:wght@500..800&family=Manrope:wght@400..700' },
  { id: 'newsreader', name: 'Newsreader + Public Sans', display: "'Newsreader', serif", body: "'Public Sans', sans-serif", stretch: '100%', weight: 600, figures: "'Newsreader', serif", figuresStretch: '100%', figuresWeight: 600, google: 'family=Newsreader:opsz,wght@6..72,400..700&family=Public+Sans:wght@400..700' },
];

export const radii = [
  { id: 'sharp', name: 'Sharp', value: '0px' },
  { id: 'soft', name: 'Soft', value: '6px' },
  { id: 'round', name: 'Round', value: '14px' },
  { id: 'pill', name: 'Pill', value: '26px' },
];

export const densities = [
  { id: 'compact', name: 'Compact', value: '0.8' },
  { id: 'regular', name: 'Regular', value: '1' },
  { id: 'airy', name: 'Airy', value: '1.25' },
];

export const scales = [
  { id: 'minor-third', name: 'Calm (1.2)', value: '1.2' },
  { id: 'major-third', name: 'Balanced (1.25)', value: '1.25' },
  { id: 'perfect-fourth', name: 'Bold (1.333)', value: '1.333' },
];

export const defaults = {
  palette: 'abyss',
  mode: 'dark' as Mode,
  accent: '',
  font: 'work',
  radius: 'soft',
  density: 'regular',
  scale: 'major-third',
  motion: 'on',
  contours: 'on',
};
export type LabState = typeof defaults;
