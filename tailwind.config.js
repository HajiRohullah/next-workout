/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,

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
        borderGrey: "#E4E4E4",
        primary: "#2BADE3",
        secondary: "#9e9e9e",
        grayCustom: "#5C5C5C",
        brandGrey: "#F8F8F8",
        textGrey: "#A4A4A4",
        greyOpacity: "#D9D9D9",
        greyDark: "#777777",
        lightPrimary: "#2BADE3",
        darkPrimary: "#008CC6",
        primaryOpacity: "rgba(43, 173, 227, 0.1)",
      },
    },
  },
  plugins: [],
}
