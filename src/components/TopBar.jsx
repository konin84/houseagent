import React, { useEffect, useState } from 'react';
import {AiFillPhone, AiOutlineClockCircle} from 'react-icons/ai';

import { Link } from 'react-router-dom';
import Popup from './Modals/Popup';
import RealtorSignUpForm from '../pages/Forms/RealtorSignUpForm';
import * as userService from "../services/userService";
import Notification from './Modals/Notification';
import DarkMode from '../DarkMode/DarkMode';

const TopBar = () => {

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState(
    {
      isOpen:false,
      message:'',
      type:''
    
    });

  const signUp = (data) => {
    
      userService.signup(data).then((res) => {
          setOpenPopup(false);
          setNotify({
            isOpen: true, 
            message: "Account Created Successfully, we will contact you for more details in the shortest time...",
            type: "info",
          });
          // alert('Thank you for signing up, we will contact you the sooner to start business...')
        });
    
  };

  const[sticky, setSticky]=useState();

  useEffect(()=>{
    const handleScroll=()=>setSticky(window.scrollY>200)
    console.log(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return()=> window.removeEventListener('scroll', handleScroll)
  })

  return (
    
    <nav className={`${sticky ? "sticky" : ""}`}  >
      <div className='flex justify-between items-center px-4 py-2 '>
            <div className='flex items-center'>
            </div>
           <div className='flex items-center'>
            
            </div>
      
      <div className="flex">
        
        <div className="hidden md:flex items-center px-6">
          <AiOutlineClockCircle />
          <p>8:30AM - 4:30PM</p>
        </div>
        <div className="hidden md:flex items-center px-6">
          <AiFillPhone />
          <p>+225 01 50 68 53 13</p>
        </div>
        <div className='mt-3'>

        <DarkMode/>
        </div>
        <Link className='bg-blue-500 hover:bg-black text-white font-bold py-2 px-6 border border-blue-700 rounded-full m-2'  to='login' >Log in</Link>
    
        <button
        utton className='bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 border border-blue-700 rounded-full m-2' 
        onClick={() => {
          setOpenPopup(true);  
        }}>
          Sign up
          </button>
      </div>      
      </div>

    <Notification
          notify={notify}
          setNotify={setNotify} 
      />

    <Popup
        title=<h1 className="text-2xl">Realtor Registration</h1>
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RealtorSignUpForm signUp={signUp}  />
      </Popup>
    </nav>
  )
}

export default TopBar;
