import React, { useState } from 'react'
import * as authService from '../services/authServices'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export default function TopNav() {

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser())
  const [user, setUser] = useState(jwt_decode(currentUser.access))

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      
<div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-black dark:bg-gray-800 border-none">
  <span className="hidden md:block">  </span>
</div>
<div className="flex justify-between items-center h-14 bg-black dark:bg-gray-800 header-right">
      <div className=" ml-16"> {user.email}</div>
  <ul className="flex items-center text-end">
    <li>
      <button onClick={logout}  className="flex items-center mr-4 hover:text-blue-100">
        <span className="inline-flex mr-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </span>
        Logout
      </button>
    </li>
  </ul>
</div>

</>
  )
}

