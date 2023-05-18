import React from 'react'

export default function Index() {
  return (

    <section>

          <nav className='relative container mx-auto'>
            {/* Flex container */}
            <div className='flex items-center justify-between'>
              {/* Logo */}
              <div className='pt-2'>
                <img src='' alt=''/>
              </div>
              {/*  Menu Items */}
              <div className='hidden spce-x-6 md:flex'>
                <a href=''>About</a>
                <a href=''>How it works</a>
                <a href=''>Products</a>
                <a href=''>Pricing</a>
              </div>
              <div>
                {/* Button */}
                  <a className='p-3 px-6 pt-2 text-white bg-red-400 rounded-full 
                  baseline hover:bg-black hidden md:block' >Sign In</a>
                  <a className='p-3 px-6 pt-2 text-white bg-red-400 rounded-full 
                  baseline  hover:bg-black hidden md:block'>Sign Up</a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section id='hero'>
            <div className='container flex flex-col-reverse 
            items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row'>

              {/*  Left Item */}
              <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
                <h1 className='max-w-md  text-4xl font-bold text-center md:text-5xl md:text-left'>
                  Bring everyone together to build a better product..
                </h1>
                <p className='max-w-sm text-center text-gray-600 md:text-left'>
                  The Three in one platform to get the best of your housing management. 
                  Online rent payment, view of payment....
                </p>
                <div className='flex justify-center md:justify-start'>
                <a className='p-3 px-6 pt-2 text-white bg-red-400 rounded-full 
                  baseline  hover:bg-black '>Get Started</a>

                </div>

              </div>
              {/* Image */}
              <div className='md:w-1/2'>
                <img src='' alt='' />

              </div>
            </div>
          </section>

          {/* Features */}
          <section id='features'>
            {/* Flex container */}
            <div className='container flex flex-col px-4
            mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row'>
              {/* What is diffent */}
              <div className='flex flex-col space-y-12 md:h-1/2'>
                <h2 className='max-w-md text-4xl font-bold text-center md:text-left'>
                  What's is diffent about RMS?
                </h2>
                <p className='max-w-sm text-center text-gray-600'> With RMS, you don't have to....</p>

              </div>
              {/* Number List */}
              <div className='flex flex-col space-y-8 md:w-1/2'>
                {/* List item 1 */}
                <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row'>
                      {/* Heading */}
                      <div className='rounded-l-full bg-red-50 md:bg-white'>
                          <div className='flex items-center space-x-2'>
                            <div className='px-4 py-2 text-white rounded-full md:py-1 bg-red-400'>
                              01
                            </div>
                            <h3 className='text-base font-bold md:mb-4 md:hidden'>
                              Track your rent progress
                            </h3>
                          </div>
                      </div>
                 
                      <div> 
                            <h3 className='hidden mb-4 text-lg font-bold md:block'>
                                  Track your rent progress
                            </h3>
                            <p className='text-blue-300'>Either include it or remove the dependency array  </p>
                      </div>
                </div>
                
                {/* List item 2 */}
                <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row'>
                      {/* Heading */}
                      <div className='rounded-l-full bg-red-50 md:bg-white'>
                          <div className='flex items-center space-x-2'>
                            <div className='px-4 py-2 text-white rounded-full md:py-1 bg-red-400'>
                              02
                            </div>
                            <h3 className='text-base font-bold md:mb-4 md:hidden'>
                              Advanced built in repports 
                            </h3>
                          </div>
                      </div>
                 
                      <div> 
                            <h3 className='hidden mb-4 text-lg font-bold md:block'>
                            Advanced built in repports
                            </h3>
                            <p className='text-blue-300'>Either include it or remove the dependency array  </p>
                      </div>
                </div>
                  
                {/* List item 3 */}
                <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row'>
                      {/* Heading */}
                      <div className='rounded-l-full bg-red-50 md:bg-white'>
                          <div className='flex items-center space-x-2'>
                            <div className='px-4 py-2 text-white rounded-full md:py-1 bg-red-400'>
                              03
                            </div>
                            <h3 className='text-base font-bold md:mb-4 md:hidden'>
                              Everything you need in one place
                            </h3>
                          </div>
                      </div>
                 
                      <div> 
                            <h3 className='hidden mb-4 text-lg font-bold md:block'>
                                  Everything you need in one place
                            </h3>
                            <p className='text-blue-300'>Either include it or remove the dependency array  </p>
                      </div>
                </div>

              </div>
            </div>

          </section>

          {/* Testimonials */}

          <section id='testimonials'>
            <div className='max-w-6xl px-5 mx-auto mt-32 text-center'>
                <h2 className='text-4xl font-bold text-center'>
                  What do our clients say?
                </h2>
                {/* Testimonials container */}
                <div className='flex flex-col mt-24 md:flex-row md:space-x-6'>
                {/* Testimonial 1 */}
                <div className='flex flex-col items-center p-6 space-y-6 rounded-lg
                bg-gray-300 md:w-1/3'>
                    <img src='' alt='' className='w-16 -mt-14' />
                    <h5 className='text-lg font-bold'> Name of the person</h5>
                    <p className='text-sm text-black'></p>
                </div>
                </div>
            </div>
          </section>


    </section>
   
    
  )
}
