import React from 'react'

const Footer = () => {
  return (
    <div className='container mx-auto'>
      <footer className="text-center bg-gray-900 text-white fixed inset-x-0 bottom-0">
  
            <div 
              className="text-center "
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} >
              © <span id="currentYear">{new Date().getUTCFullYear()}, </span>
              <a className="text-white" href="https://digitale-it.com/">
                Digital IT Sarl 
              </a>
              <a></a>
            </div>
            <div>
             </div>
             
            
      </footer>

    </div>
  )
}


export default Footer
