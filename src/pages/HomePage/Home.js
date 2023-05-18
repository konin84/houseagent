import React from 'react'
import Header from './Header'
import Feature from './Feature'
import About from './About'
import aboutimage from '../../images/house1.jpg'
import Presentation from './Presentation'
import Contact from './Contact'


export default function Home() {
  
  return (
    <>
    <Header />
    <Feature />
    <About image={ aboutimage }  title='Come with all you need to manage your house/rent.' />

    <Presentation />
    <Contact />
    </>
  )
}
