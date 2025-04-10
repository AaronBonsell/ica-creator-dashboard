  content: [
    './pages/**/*.{ts,tsx}', // include files in the pages directory
    './components/**/*.{ts,tsx}', // include files in the components directory
    './layouts/**/*.{ts,tsx}', // include files in the layouts directory (if you have one)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C51BF', // Primary color used across the site (you can change it)
        secondary: '#2B4D9D', // Secondary color for buttons or highlights
        background: '#f9fafb', // Background color for the body
        error: '#f44336', // Error color for messages or alerts
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Custom font for general text
        heading: ['Roboto', 'sans-serif'], // Custom font for headings
      },
      boxShadow: {
        DEFAULT: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Default shadow for elements
        md: '0px 10px 15px rgba(0, 0, 0, 0.1)', // Medium shadow for larger elements
      },
      spacing: {
        '72': '18rem', // Custom spacing value (you can use this for margins, padding, etc.)
      },
    },
  },
  plugins: [],
};
