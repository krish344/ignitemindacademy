import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd7',
          200: '#f9d7ae',
          300: '#f5ba7a',
          400: '#f09244',
          500: '#ec751e',
          600: '#dd5b14',
          700: '#b74413',
          800: '#923717',
          900: '#762f15',
          950: '#401509',
        },
      },
    },
  },
  plugins: [],
};

export default config;
