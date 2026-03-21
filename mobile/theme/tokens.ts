/**
 * Design tokens — Director of Intelligent Training (app-design.md §6)
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const typography = {
  display: 28,
  title: 22,
  subtitle: 17,
  body: 16,
  caption: 13,
  small: 12,
} as const;

/** Module accent colors (light-on-dark UI) */
export const moduleAccents: Record<string, string> = {
  core: '#E8C547',
  intent: '#E8A838',
  structured: '#7B8CDE',
  questioning: '#E85D4C',
  mindset: '#5FB89A',
  convergence: '#9B7FD8',
  prompting: '#5B8DEF',
  evolution: '#F5F0E6',
};

export const semantic = {
  background: '#0D0F14',
  surface: '#151922',
  surfaceElevated: '#1C2230',
  border: '#2A3142',
  textPrimary: '#F2F4F8',
  textSecondary: '#9AA3B8',
  textMuted: '#6B7280',
  success: '#5FB89A',
  danger: '#E85D4C',
} as const;

export const hitSlop = { top: 12, bottom: 12, left: 12, right: 12 } as const;
