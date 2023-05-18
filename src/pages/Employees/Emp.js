import React from "react";

// import PaymentList from "./PaymentList";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


import PageHeader from "../../components/PageHeader";
import Employees from "./Employees";



export default function Emp() {

  const navigate = useNavigate();
 

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  
  return (
    <section>
    <div className="grid grid-cols-12">
      {/* Header */}
      <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 ">
        <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-black dark:bg-gray-800 border-none">
          <span className="hidden md:block"> </span>
        </div>
        <div className="flex justify-between items-center h-14 bg-black dark:bg-gray-800 header-right">
          <div className=""></div>
          <ul className="flex items-center text-end">
            <li>
              <button
                onClick={logout}
                className="flex items-center mr-4 hover:text-blue-100"
              >
                <span className="inline-flex mr-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* ./Header */}

      {/* Side bar navigation */}
      <div className="col-span-2 bg-black h-screen pl-2 mt-10">
        <Navbar />
      </div>
      
      {/* Main content */}

      <div className="col-span-10  bg-gray-200 h-screen pl-2 mt-8">
    
        <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-10"> 
          <Employees />
        </div>
       
      </div>
    </div>
  </section>
  )
}
