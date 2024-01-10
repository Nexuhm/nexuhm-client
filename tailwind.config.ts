import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        yellow: '#F7E34F',
        black: '#221A15',
        blue: '#006EDF',
        'light-blue': '#E7E7FD',
        'light-gray': '#DBD9D3',
        'subtle-gray': '#F1F4F7',
        content: {
          primary: '#221A15',
          secondary: '#3F3B3B',
        },
        surface: {
          primary: '#F9F9F9',
        },
      },
    },
  },
  plugins: [],
};
export default config;
