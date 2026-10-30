module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        navy: '#0b1636',
        navySoft: '#13214f',
        charcoal: '#14141a',
        warmCream: '#f4efe7',
        gold: '#d7b46c',
        goldSoft: '#f0d8a5',
        panel: '#f4f1eb',
      },
      boxShadow: {
        app: '0 25px 80px rgba(2, 8, 20, 0.55)',
      },
      borderRadius: {
        app: '2rem',
      },
    },
  },
  plugins: [],
};
