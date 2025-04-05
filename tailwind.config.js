/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme -----------------------
        lightMainBg: '#e6e6e6',
        lightKeypadBg: '#d1cccc',
        lightScreenBg: '#ededed',

        // Keys
        lightKey1Bg: '#377f86',
        lightKey1Shadow: '#1b5f65',

        lightKey2Bg: '#ca5502',
        lightKey2Shadow: '#893901',

        lightKey3Bg: '#e5e4e1',
        lightKey3Shadow: '#a69d91',

        // Text
        lightTextColor1: '#35352c',
        lightTextColor2: '#ffffff',

        // Dark theme -----------------------
        darkMainBg: '#160628',
        darkKeypadBg: '#1d0934',
        darkScreenBg: '#1d0934',

        // Keys
        darkKey1Bg: '#58077d',
        darkKey1Shadow: '#bc15f4',

        darkKey2Bg: '#00e0d1',
        darkKey2Shadow: '#6cf9f2',

        darkKey3Bg: '#341c4f',
        darkKey3Shadow: '#871c9c',

        // Text
        darkTextColor1: '#ffe53d',
        darkTextColor2: '#1b2428',
        darkTextColor3: '#ffffff',
      }
    },
  },
  plugins: [],
}