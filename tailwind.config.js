/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          dark: 'var(--color-ink-dark)',
          primary: 'var(--color-ink-primary)',
          mid: 'var(--color-ink-mid)',
          muted: 'var(--color-ink-muted)',
          secondary: 'var(--color-ink-secondary)',
          tertiary: 'var(--color-ink-tertiary)',
          faint: 'var(--color-ink-faint)',
        },
        canvas: 'var(--color-canvas)',
        surface: {
          1: 'var(--color-surface-1)',
          muted: 'var(--color-surface-muted)',
          dark: 'var(--color-surface-dark)',
        },
        hairline: 'var(--color-hairline)',
        cobalt: {
          DEFAULT: 'var(--color-cobalt)',
          light: 'var(--color-cobalt-light)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          container: 'var(--color-error-container)',
          on: 'var(--color-error-on)',
        },
        severity: {
          low: '#16a34a',
          moderate: '#ca8a04',
          high: '#ea580c',
          critical: '#ba1a1a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Noto Sans',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Menlo',
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      borderRadius: {
        xxs: '2px',
        xs: '3px',
        sm: '4px',
        md: '5px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        flat: 'none',
        halo: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        modal: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
      },
      zIndex: {
        sticky: '50',
        modal: '100',
        popover: '60',
      },
    },
  },
  plugins: [],
};
