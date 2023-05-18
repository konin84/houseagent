import React from 'react'

export default function FeatureBox(props) {
  return (
    <div className='a-box'>
      <div className='a-b-img'>
          <img src={props.image} alt='' />
      </div>
      <div className='s-b-text'>
        <h2 className='text-2xl '>{props.title}</h2>
        <p className='text-justify p-0 mb-2'>Relax, focus on clients acquisition and with a few clicks we do all your tedious works.</p>
      </div>
      
    </div>
  )
}
