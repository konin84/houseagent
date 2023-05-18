import React, { useEffect, useState } from 'react'
import * as authService from "../../../services/authServices";
import * as userService from "../../../services/userService";
import jwt_decode from "jwt-decode";
import {AiFillPhone, AiOutlineMail} from 'react-icons/ai';


export default function AgentInfo() {

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));
  const [data, setData] = useState([]);

  //


  const myAgent = () => {
    if(user.role === 'TENANT'){
      userService.tenantRealtor().then((res) => {
        // console.log('USER', res.data)
        setData(res.data);
      });
    } else if(user.role === 'HOUSEOWNER') {
      userService.landLordRealtor().then((res) => {
        // console.log('USER', res.data)
        setData(res.data);
      });
    }
  };



  useEffect(() => {
    myAgent();
   
  }, []);
  //

  return (
    <>
        <div className="max-w-md h-auto mx-auto my-20 rounded-md overflow-hidden shadow-lg">
          
        {data.map((agent) => ( 
          <div className="px-10 py-4" key={agent.id}>
        
            <div className="flex flex-col">
            <p className="text-gray-600 text-sm text-center">{agent.role}</p>
              <div className="font-bold text-xl text-center text-gray-800 hover:text-green-500 hover:cursor-pointer">{agent.first_name + ' ' + agent.last_name}</div>
              
            </div>
            <div className="flex flex-row justify-center font-semibold mx-auto my-4">
              <div className="my-auto text-gray-800 py-1 px-4 border-2 border-black hover:bg-green-500 hover:cursor-pointer hover:text-white rounded-3xl mx-2">
                <AiFillPhone />  
              </div>
              <p> {agent.phone_number}</p>
              <div className="my-auto text-gray-800 py-1 px-4 border-2 border-black hover:bg-green-500 hover:cursor-pointer hover:text-white rounded-3xl mx-2">
                <AiOutlineMail/> 
              </div>
              {agent.email}
            </div>
        

          </div>
      ))}
      
          <div>
            {/* <h4 class="text-sm text-center my-2 font-semibold text-gray-700">About me</h4>
            <p class="text-xs mx-6 text-justify">I specialize in designing and developing user interfaces and digital products. I don’t restrict myself to design.</p> */}
          </div>
          <div class="bg-black text-white mt-5 px-6 pt-4 pb-2 flex flex-row justify-center">
          
        
            
            
          </div>
        </div>
  </>
  )
}
