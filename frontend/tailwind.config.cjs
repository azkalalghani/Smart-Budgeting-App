/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#42a5f5',
            main: '#1976d2',
            dark: '#1565c0',
          },
          secondary: {
            light: '#ff4081',
            main: '#f50057',
            dark: '#c51162',
          },
          background: '#f5f7fa',
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
        },
      },
    },
    plugins: [],
  }