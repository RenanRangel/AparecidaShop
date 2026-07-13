import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F1F4EF',
        ink: '#16241D',
        'ink-soft': '#4B5A50',
        pine: {
          DEFAULT: '#1F5C4A',
          deep: '#123D30',
          50: '#E9F2EE',
          100: '#D3E5DD',
        },
        marigold: {
          DEFAULT: '#E8A33D',
          light: '#F6D9A6',
          dark: '#B87A21',
        },
        sand: {
          DEFAULT: '#E7E1D2',
          light: '#F2EFE6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 10px 30px -8px rgba(18, 61, 48, 0.18)',
        soft: '0 4px 14px -4px rgba(22, 36, 29, 0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
