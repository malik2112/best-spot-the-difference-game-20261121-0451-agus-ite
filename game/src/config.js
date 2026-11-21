// Morning Pier — every tuning number and colour in one place.
// The playfield is a fixed 1280x720 logical area; the renderer scales it
// to the window, so no rule below depends on the screen size.

export const FIELD = { width: 1280, height: 720 };

/** The simulation's fixed step, in seconds: 60 updates a second. */
export const STEP = 1 / 60;

/** Two picture panels, side by side, in logical coordinates. */
export const PANEL = {
  width: 600,
  height: 452,
  y: 150,
  leftX: 24,
  rightX: 656,
};

/** HUD strip at the top and the help strip at the bottom. */
export const HUD = { height: 132, footerY: 618 };

export const RULES = {
  wrongPenaltySeconds: 3,
  hintCooldownSeconds: 20,
  hintCost: 50,
  findPoints: 100,
  streakBonus: 25,
  timeBonusPerSecond: 2,
  markRadius: 30,
  hitSlack: 10,
  reticleSpeed: 520,
};

export const LEVELS = [
  { id: 'pier', name: 'Level 1 · The Pier', seconds: 150, diffs: 7 },
  { id: 'boats', name: 'Level 2 · Fishing Boats', seconds: 180, diffs: 8 },
  { id: 'beacon', name: 'Level 3 · The Beacon', seconds: 210, diffs: 10 },
];

export const PALETTE = {
  backdrop: '#0b1e2d',
  panelEdge: '#2a4a63',
  panelEdgeActive: '#ffd166',
  hudBg: '#123146',
  hudLine: '#2a4a63',
  text: '#f2f9ff',
  muted: '#9fc3d8',
  found: '#3ddc84',
  foundGlow: '#d2ffe6',
  hint: '#ffd166',
  miss: '#ff6b6b',
  timerOk: '#3ddc84',
  timerLow: '#ff6b6b',
  button: '#1d4e6e',
  buttonEdge: '#3f86ad',
};

export const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';

/** Where the best score is kept between visits (this browser only). */
export const BEST_KEY = 'morning-pier.best';
