import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";
import jwt_decode from "jwt-decode";
import Navbar from "../../../components/Navbar";
import {AiFillPhone, AiOutlineClockCircle} from 'react-icons/ai';
import PageHeader from "../../../components/PageHeader";
import { FaUserTie } from "react-icons/fa";
import TopNav from "../../TopNav";
import { Link } from "react-router-dom";

// const IMG_URL = "http://localhost:8000/";
export default function Profile() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));
  const [record, setRecord] = useState([]);

  const [accountOwner, setAccountOwner] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");

  const Profile = () => {
    userService.myProfile().then((res) => {
      // console.log("LOGIN USER DETAIL", res.data);
      setRecord(res.data);
    });
  };

  useEffect(() => {
    Profile();
  }, []);

  console.log(' USER DETAILS', record)

 
  console.log("USERS", record);
  return (
    <section>
      <div className="grid grid-cols-12">
        {/* Table start below */}
        {/* Header */}
        <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 ">
          <div className="fixed w-full flex items-center justify-between h-14 text-white z-10 ">
            <TopNav />
          </div>
        </div>
        {/* ./Header */}

        {/* Side bar navigation */}
        <div className="col-span-2 bg-black h-screen pl-2 mt-10">
          <Navbar />
        </div>
        {/* Main content */}

        <div className="col-span-10  bg-gray-200 h-screen pl-10 mt-10 overflow-y-scroll ">
          <div
            className=" mx-auto bg-white rounded-xl shadow-md
            md:max-w-7xl mt-10 "
          >
            <PageHeader
              title="MY PROFILE "
              icon={
                <FaUserTie fontSize="small" size={10} className="text-black" />
              }
            />
            <div>
              <div className="containter mx-auto">
              {record &&
             record.map((user) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto p-2" key={user.id}>
                  
                  <>

                      <div className="w-full max-w-md bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                        <div className="flex flex-col items-center pb-10">
                          <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src={ user.photo}
                                  alt={ user.photo}
                          />
                          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {user.accountOwner.first_name + ' ' + user.accountOwner.last_name}
                          </h5> 
                          <Link 
                           to = {`/profile/update/${user.id}`} 

                          // onClick={onUpdate(profileID)}
                          className="inline-flex justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Update
                        </Link>
  
                        </div>
                      </div>

                  </>
                  <div className=" p-2 bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> 

                      <label className="block text-2xl font-medium text-gray-700 ">
                        Biography
                      </label>
                      <p className="mb-2">{user.bio}</p>
                      <label className="block text-2xl font-medium text-gray-700">
                        Address
                      </label>
                      <p className="mb-2">{user.address}</p>
                      <p className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <AiFillPhone />
                            {user.accountOwner.phone_number} 
                            </p>
                      
                  </div>
                  
                  </div>
                  
                  ))} 
                </div>
              </div>
            </div>

            <br />

            <hr />
          </div>
    </div>
   
    </section>
  );
}
