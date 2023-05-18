import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom';

import HouseListing from './HouseListing';

import * as authService from '../../services/authServices'
import jwt_decode from 'jwt-decode'

// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {MdHomeFilled} from  "react-icons/md";
import PageHeader from '../../components/PageHeader';
import TopNav from '../../pages/TopNav';


export default function House() {

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser())
  const [user, setUser] = useState(jwt_decode(currentUser.access))

  
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };


  return (
    <section >
      <div className='grid grid-cols-12'>

            {/* Header */}

      <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 ">
    
         <TopNav />
      </div>
                   
                  
            {/* ./Header */}

            {/* Side bar navigation */}
              <div className='col-span-2 bg-black h-screen pl-2 mt-10'>
                <Navbar />
              </div>
            {/* Main content */}

            <div className='col-span-10  bg-gray-200 h-screen pr-2 mt-8'>
              <div className='grid grid-cols-12'>
                    <div className='col-span-10'></div>
                    <div className='col-span-2 mt-10 '></div>
              </div>
                <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-0">
                  <PageHeader className='text-black'
                    title='HOUSE MANAGEMENT'
                    icon={<MdHomeFilled  fontSize="small" size={10} className='text-black' />}  />
                    {/* The following component contains our houses  */}
                  <HouseListing/>
                </div>
            </div>

      </div>
   
    </section>
  )
}
