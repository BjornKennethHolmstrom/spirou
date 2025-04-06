module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  safelist: [
    'bg-beige-200', 'bg-purple-200', 'bg-red-200', 'bg-blue-200', 'bg-orange-200',
    'bg-green-200', 'bg-yellow-200', 'bg-turquoise-200', 'bg-coral-200', 'bg-ultraviolet-200',
    'text-beige-800', 'text-purple-800', 'text-red-800', 'text-blue-800', 'text-orange-800',
    'text-green-800', 'text-yellow-800', 'text-turquoise-800', 'text-coral-800', 'text-ultraviolet-800'
  ],
  theme: {
    extend: {
      colors: {
        beige: '#E5D0BA',
        coral: '#FF6F61',
        turquoise: '#40E0D0',
        ultraviolet: '#B388EB'
      }
    }
  },
  plugins: []
}

