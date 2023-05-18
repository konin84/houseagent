import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";
import jwt_decode from "jwt-decode";
import Navbar from "../../../components/Navbar";

import PageHeader from "../../../components/PageHeader";
import { FaUserTie } from "react-icons/fa";
import TopNav from "../../TopNav";
import {  useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// const IMG_URL = "http://localhost:8000/";
export default function Profile() {
  // const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  // // const [user, setUser] = useState(jwt_decode(currentUser.access));
  // // const [record, setRecord] = useState([]);
  // const [selectUser, setSelectUser] = useState([]);

  const [accountOwner, setAccountOwner] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate()
  const {id} = useParams()

  const  [data, setData] = useState({
      accountOwner,
      bio,
      address,
      photo
    }  );

 const loadUser = () =>{
  userService.seeProfile(id).then((res) => {
    setData(res.data.User)
  
  })
 }


 useEffect(() => {
  loadUser();
  console.log('PROFILE ID', id)
  console.log('DETAILS', data)
}, []);



  const onUpdate = (e) => {
    console.log('ID', id)
    e.preventDefault()
    userService.updateProfile(id, data).then((res) => {
      console.log('DATA TO BE UPDATED', res.data)
      navigate('/myprofile')
    }
    );
  };


  // console.log("USERS", user.id);
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

        <div className="col-span-10  bg-gray-200 h-screen pl-2 mt-10 overflow-y-scroll ">
          <div
            className=" mx-auto bg-white rounded-xl shadow-md
            md:max-w-7xl mt-10 "
          >
            <PageHeader
              title="PROFILE SETTINGS "
              icon={
                <FaUserTie fontSize="small" size={10} className="text-black" />
              }
            />
            <div>
              <div className="containter mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto p-5 gap-2">
                  <div className="bg-white">
                    <form 
                    onSubmit={onUpdate} 
                    >
          
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        rows={2}
                        name="bio"
                        value={data.bio}
                        className="w-full p-4"
                        onChange={(e) => setData({...data, bio: e.target.value})}
                        required
                      ></textarea>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        rows={2}
                        name="address"
                        value={data.address}
                        onChange={(e) => setData({...data, address: e.target.value})}
                        className="w-[100%] p-4 "
                        required
                      ></textarea>
                      <label
                        className="post-create-label"
                        htmlFor="id_postimage"
                      >
                        Upload your avatar{" "}
                      </label>
                      <input
                        className="mt-5"
                        type="file"
                        // value={data.photo}
                        onChange={(e) => setData({...data, photo: e.target.files[0]})}
                        name="photo"
                        accept="image/*"
                      />

                        <button
                          type="submit"
                          // onClick={onUpdate}
                          className="inline-flex justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Update
                        </button>
                    </form>
                  </div>

                  <div className="bg-red-400">
                 
                  </div>
                </div>
              </div>
            </div>

            <br />

            <hr />
          </div>
        </div>
      </div>
    </section>
  );
}
