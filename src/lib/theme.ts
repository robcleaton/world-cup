import type { Team } from '@/data/teams'

function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let s = 0, h = 0
  if (max !== min) {
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
    switch (max) {
      case r: h = ((g - b) / (max - min) + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / (max - min) + 2) / 6; break
      case b: h = ((r - g) / (max - min) + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslLuminance(h: number, s: number, l: number): number {
  const sn = s / 100, ln = l / 100
  const C = (1 - Math.abs(2 * ln - 1)) * sn
  const hh = h / 60
  const X = C * (1 - Math.abs((hh % 2) - 1))
  let r = 0, g = 0, b = 0
  if      (hh < 1) { r = C; g = X }
  else if (hh < 2) { r = X; g = C }
  else if (hh < 3) { g = C; b = X }
  else if (hh < 4) { g = X; b = C }
  else if (hh < 5) { r = X; b = C }
  else             { r = C; b = X }
  const m = ln - C / 2
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r + m) + 0.7152 * lin(g + m) + 0.0722 * lin(b + m)
}

// Binary search: finds the HSL lightness that achieves targetRatio against bgLum.
// 'light' direction → searches high lightness (for text on dark bg).
// 'dark'  direction → searches low lightness (for text on light bg).
function binaryLightness(
  h: number, s: number, bgLum: number,
  targetRatio: number,
  direction: 'light' | 'dark',
): number {
  let lo = direction === 'light' ? 30 : 0
  let hi = direction === 'light' ? 100 : 70

  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2
    const tLum = hslLuminance(h, s, mid)
    const ratio = direction === 'light'
      ? (tLum + 0.05) / (bgLum + 0.05)
      : (bgLum + 0.05) / (tLum + 0.05)

    if (direction === 'light') {
      // find minimum lightness that clears target; push hi down when met
      if (ratio >= targetRatio) hi = mid
      else                       lo = mid
    } else {
      // find maximum lightness that clears target; push lo up when met
      if (ratio >= targetRatio) lo = mid
      else                       hi = mid
    }
  }
  return (lo + hi) / 2
}

function hexToRgb(hex: string): string {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ].join(', ')
}

// WCAG 4.5:1 breakpoint: white passes below bgLum ≈ 0.179, black above ≈ 0.179
const TEXT_THRESHOLD = 0.179


const THEMED_PROPS = [
  '--bg', '--surface', '--surface2', '--border',
  '--gold', '--accent-rgb', '--hero-tint',
  '--text', '--text-on-bg', '--text-muted',
] as const

const ROOT = document.documentElement

export function applyTeamTheme(team: Team | null) {
  if (!team) {
    THEMED_PROPS.forEach(p => ROOT.style.removeProperty(p))
    return
  }

  const [primary, secondary] = team.colors
  const bgLum = luminance(primary)

  // ── Background ──────────────────────────────────────────────────────────────
  ROOT.style.setProperty('--bg', primary)

  const [h, s] = hexToHsl(primary)
  const sat = Math.min(s, 75)
  ROOT.style.setProperty('--surface',  `hsl(${h}, ${(sat * 0.35).toFixed(0)}%, 16%)`)
  ROOT.style.setProperty('--surface2', `hsl(${h}, ${(sat * 0.28).toFixed(0)}%, 21%)`)
  ROOT.style.setProperty('--border',   `hsl(${h}, ${(sat * 0.22).toFixed(0)}%, 26%)`)
  ROOT.style.setProperty('--hero-tint', 'transparent')

  // ── Main text (--text / --text-on-bg): 4.5:1 minimum against bg ─────────────
  // Threshold 0.179 is where white/black cross the WCAG 4.5:1 line.
  const textColor = bgLum < TEXT_THRESHOLD ? '#ffffff' : '#0a0a0a'
  ROOT.style.setProperty('--text', textColor)
  ROOT.style.setProperty('--text-on-bg', textColor)

  // ── Muted text (--text-muted): 3.5:1, team-hued at reduced saturation ───────
  const mutedDir = bgLum < TEXT_THRESHOLD ? 'light' : 'dark'
  const mutedSat = Math.min(s * 0.55, 48)
  const mutedL = binaryLightness(h, mutedSat, bgLum, 3.5, mutedDir)
  ROOT.style.setProperty('--text-muted', `hsl(${h}, ${mutedSat.toFixed(0)}%, ${mutedL.toFixed(1)}%)`)

  // ── Accent (--gold): raw secondary colour for each team ─────────────────────
  ROOT.style.setProperty('--gold', secondary)

  // Keep --accent-rgb pointing at the raw vivid secondary for rgba decorative tints
  ROOT.style.setProperty('--accent-rgb', hexToRgb(
    luminance(secondary) >= luminance(primary) ? secondary : primary
  ))
}
