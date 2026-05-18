/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        accent: '#7C3AED',
        accentGlow: 'rgba(124, 58, 237, 0.15)',
        themeBg: 'var(--bg-color)',
        cardBg: 'var(--card-bg)',
        cardBorder: 'var(--card-border)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
      }
    }
  },
  plugins: [],
}
