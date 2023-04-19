/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/fundo-nlw-esport.png')",
        'nlw-gradient': 'linear-gradient(90deg, rgba(0,120,192,1) 35%, rgba(64,166,226,1) 100%)',
        'certificiation-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      keyframes: {
        slide :{
          '0%'  : { marginLeft: '-800px'},
          '20%' : { marginLeft: '-800px'},
          '35%' : { marginLeft: '0px'},
        },
        appear : {
          '0%' :{
            opacity: '0'
          },
          '20%' :{
            opacity: '1'
          },
          '80%' :{
            opacity: '1'
          }
        },
        reveal : {
          '0%' :{
            opacity: '0',
            width: '0px',
          },
          '20%' :{
            opacity: '1',
            width: '0px'
          },
          '30%' :{
            width: '800px'
          },
          '80%' :{
            opacity: '1'
          },
        }
      },
      animation : {
        slide: 'slide 6s',
        reveal: 'reveal 6s',
        appear: 'appear 6s'
      },
    },
    plugins: [],
  }
}