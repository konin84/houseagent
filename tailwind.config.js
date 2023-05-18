module.exports = {


  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  //  darkMode: false, // or 'media' or 'class'
   theme: {

    screen: {
      'sm':'480px',
      'md':'547px',
      'lg':'768px',
      'xl':'1024px',
      '2xl':'1680px',
      
    },
     extend: {
      fontFamily:{
        Montserrat:['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        'poppins':['Poppins', 'sans-serif']
      },
      width:{
        '40-r':'40rem',
        '35-r': '30rem'
      },
      height:{
        '40-r': '40rem',
        '35-r': '30rem'
      },
      boxShadow:{
        '5xl':'20px 20px 50px rgba(0, 0, 0, 0.5)',
      }
     },
   },
   variants: {
     extend: {},
   },
   plugins: [
             require('@tailwindcss/forms'), 
            //  require('tailwind-scrollbar')
            
            ],
 }