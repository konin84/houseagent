import React from 'react'

export default function Contact() {
  return (
    <div id='contact'>
      <h3>
        
      © <span id="currentYear">{new Date().getUTCFullYear()}, </span>
              <a className="text-white" href="https://digitale-it.com/" 
              target='blank'
              >
                Digital IT Sarl 
              </a>
      </h3>
    
    </div>
  )
}
