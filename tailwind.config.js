// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            // Add more prose overrides if needed
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.900'),
            },
            // Dark mode prose
            '.dark .prose': {
              color: theme('colors.gray.300'),
              a: {
                color: theme('colors.blue.400'),
                '&:hover': {
                  color: theme('colors.blue.600'),
                },
              },
              'h1, h2, h3, h4, h5, h6': {
                color: theme('colors.white'),
              },
            }
          },
        },
        dark: { // This is for the @tailwindcss/typography plugin with dark mode
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            strong: { color: theme('colors.gray.200') },
            blockquote: { color: theme('colors.gray.400') },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.white'),
            },
            code: { color: theme('colors.gray.300') },
            // ... other dark mode typography styles
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
