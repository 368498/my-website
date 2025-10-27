import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#433F40',
        'secondary': '#F2E9D7',
        'accent': '#5C8BA4',
        'red-accent': '#cc0000',
      },
      fontFamily: {
        sans: [
          'Nimbus Sans L',
          'Akzidenz Grotesk',
          'Futura',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        widest: '.2em',
        wider: '.1em',
      },
      borderRadius: {
        lg: '0.5rem',
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '16': '4rem',
        '24': '6rem',
        '64': '16rem',
        '256': '64rem',
      },
    },
  },
  plugins: [],
};

export default config; 