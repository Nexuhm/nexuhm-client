import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['2rem', '2.5rem'], // '2rem' is the font size, '2.5rem' is the line height.
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        yellow: '#F7E34F',
        black: '#221A15',
        blue: '#006EDF',
        green: '#39AE73',
        indigo: '#8752D7',
        gold: '#DEA63A',
        error: '#DE3A3A',
        'light-blue': '#E7E7FD',
        'light-gray': {
          DEFAULT: '#DBD9D3',
          600: '#DEE2E6',
        },
        'subtle-gray': '#F1F4F7',
        content: {
          primary: '#221A15',
          secondary: '#3F3B3B',
          tertiary: '#6C757D',
          placehdoler: '#9ca3af',
        },
        surface: {
          primary: '#F9F9F9',
          secondary: '#F1F1F1',
        },
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.card-container': {
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 8px -2px rgba(0, 0, 0, 0.05)',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
export default config;
