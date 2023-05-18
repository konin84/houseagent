import React from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar'
const Dashboard = () => {

  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <section>
  
        <div className='grid grid-cols-12'>
            {/* Header */}
            <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 ">
                  <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-black dark:bg-gray-800 border-none">
                  
                    <span className="hidden md:block"> </span>
                  </div>
                  <div className="flex justify-between items-center h-14 bg-black dark:bg-gray-800 header-right">
                        <div className=""></div>
                    <ul className="flex items-center text-end">
                      <li>
                        <button onClick={logout} className="flex items-center mr-4 hover:text-blue-100">
                          <span className="inline-flex mr-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          </span>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
            </div>          
            {/* ./Header */}
          {/* Side bar navigation */}
          <div className='col-span-2 bg-black h-screen pl-2 mt-10'>
                  <Navbar />
          </div>
            {/* Main content */}

          <div className='col-span-10  bg-green-600 h-screen pl-2 mt-10'>
            <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-10">
              <a href="#!">
                <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt=""/>
              </a>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                <p className="text-gray-700 text-base mb-4">
                  Some quick example text to build on the card title and make up the bulk of the card's
                  content.
                </p>
                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
              </div>
            </div>
          </div>
          
        </div>
      
    </section>
  )
}

export default Dashboard
