import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Roboto', ...fontFamily.sans],
      mono: [...fontFamily.mono],
      'other-font': ['my-other-font'],
    },
    extend: {
      colors: {
        customBlue: '#075985',
      },
    },
  },
  plugins: [],
};
