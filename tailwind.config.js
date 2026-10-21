/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          dark: '#0a0a0a',
          primary: '#222222',
          mid: '#282b3b',
          muted: '#444444',
          secondary: '#4b5563',
          tertiary: '#71767b',
          faint: '#909090',
        },
        canvas: '#ffffff',
        surface: {
          1: '#e8e8e8',
          muted: '#808080',
          dark: '#333333',
        },
        hairline: '#cfd9de',
        cobalt: {
          DEFAULT: '#006be6',
          light: '#3e7ff0',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          on: '#93000a',
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
    },
  },
  plugins: [],
};
