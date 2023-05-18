
import React, {useState} from 'react'
import Footer from './Footer';
import { admin, landlord, realtor, tenant } from './Data/NavbarData';
import * as authService from '../services/authServices'
import jwt_decode from 'jwt-decode'
import { NavLink } from 'react-router-dom';



const Navbar = () => {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => {
    setOpen(!open);
  }
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser())
  const [user, setUser] = useState(jwt_decode(currentUser.access))

  const activeLink = 'text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md'
  const normalLink = 'text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md'

  
  return (
    <div className=''>
    
    
    <div>
    {/* <TopBar /> */}
    </div>
    <div className="flex ">
     
          <div className={`${open ? "w-72" : "w-20"} p-5 pt-8 duration-300 h-screen bg-black relative`}>
            <img src="assets/control.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
              border-2 rounded-full  ${!open && "rotate-180"}`}
           
              onClick={toggleSidebar} alt=''
              // onClick={() => setOpen(!open)} alt=''
              
              />
                {/* <div className='justify-center mt-3'>
                  {/* flex gap-x-4 items-center */}
                    {/* <img className={`text-white font-medium text-2xl text-center duration-200 ${!open && 'invisible'}`} src={user.avatar}  alt=''/>
                    {/* w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden */}
                 
                
                {/* Menu based on user role */}

        {currentUser ? user.role === 'ADMIN' ? 
          <>
                  <ul className='pt-6'>
                    {admin.map((menu, index)=>
                    (
                      <li key={index} > 
                      <NavLink to={menu.path} className={({ isActive }) =>
                        isActive ? activeLink: normalLink}>
                      < img src={`../../assets/${menu.src}.png`} alt=''/>
                      <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                
                      </NavLink>
                      

                      </li>
                     
                    ))}
                  </ul>
          </> 
          : 
          user.role === 'REALTOR' ? 
          <>
                  <ul className='pt-6'>
                    {realtor.map((menu, index)=>
                    (
                      <li key={index}> 

                          <NavLink to={menu.path} className={({ isActive }) =>
                        isActive ? activeLink: normalLink}>
                          < img src={`../../assets/${menu.src}.png`} alt=''/>
                          <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                          </NavLink>
                          
                      </li>
                    ))}
                    </ul>
          </> 
          : 
          user.role === 'TENANT' ? 
          <>
            <ul className='pt-6'>
                  {tenant.map((menu, index)=>
                  (
                    <li key={index}> 

                          <NavLink to={menu.path} className={({ isActive }) =>
                        isActive ? activeLink: normalLink}>
                          < img src={`../../assets/${menu.src}.png`} alt=''/>
                          <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                          </NavLink>

                
                      </li>
                  ))}
            </ul>
          </>
          :
          user.role === 'HOUSEOWNER' ? 
          <>
            <ul className='pt-6'>
                {landlord.map((menu, index)=>
                (
                  <li key={index}> 

                  <NavLink to={menu.path} className={({ isActive }) =>
                        isActive ? activeLink: normalLink}>
                  < img src={`../../assets/${menu.src}.png`} alt=''/>
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                  </NavLink>

        
              </li>
                ))}
            </ul>
          </>
          : '' : ''
          }

   

      </div>
    </div>

    
   
    <Footer />
    </div>
    
   
  )
}



export default Navbar;
