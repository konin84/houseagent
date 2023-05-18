import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";
import jwt_decode from "jwt-decode";
import Navbar from "../../../components/Navbar";

import PageHeader from "../../../components/PageHeader";
import { FaUserTie } from "react-icons/fa";
import TopNav from "../../TopNav";
import {  useNavigate } from "react-router-dom";

// const IMG_URL = "http://localhost:8000/";
export default function Profile() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));
  const [record, setRecord] = useState([]);
  // const [selectUser, setSelectUser] = useState([]);

  const [accountOwner, setAccountOwner] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  // const [profileID, setProfileID] = useState('');
  const [errorMsg, SetErrorMsg] = useState("");

  const navigate = useNavigate();

  const Profile = () => {
    try {
      userService.myProfile().then(
        (res) => {
          console.log("LOGIN USER DETAIL", res.data);
          setRecord(res.data);
        },
        (error) => {
          console.log(error);
          // alert('There was an error')
          SetErrorMsg("profile of this account is already set.");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    Profile();
  }, []);

  const data = {
    accountOwner: user.id,
    bio,
    address,
    photo,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      userService
        .addProfile(data)
        .then(
          (res) => {
            console.log("CHECKING DATA", res.data);
            navigate("/myprofile");
          },
          (error) => {
            console.log(error);
            // alert('There was an error')
            SetErrorMsg("Please, your profile is already set. you can update or delete it..");
          }
        )
        .catch((error) => {
          console.log("ERROR", error.res);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
                    <div className="container mx-auto">
                      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    </div>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="accountOwner"
                        hidden
                        value={user.email}
                        onChange={(e) => setAccountOwner(e.target.value)}
                      />

                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        rows={2}
                        name="bio"
                        value={bio}
                        className="w-full p-4"
                        onChange={(e) => setBio(e.target.value)}
                        required
                      ></textarea>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        rows={2}
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                        onChange={(e) => setPhoto(e.target.files[0])}
                        name="photo"
                        accept="image/*"
                      />

                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          onClick={handleSubmit}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-5"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="m-5">
                    <table className="min-w-full border-collapse block md:table">
                      <thead className="block md:table-header-group">
                        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                            Full name
                          </th>
                        </tr>
                      </thead>

                      <tbody className="block md:table-row-group">
                        {record.map((user, index) => (
                          // const {first_name, last_name} = realtor;
                          <tr
                            className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
                            key={index}
                          >
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                              <span className="inline-block w-1/3 md:hidden font-bold">
                                Full Name
                              </span>{" "}
                              {user.accountOwner.first_name +
                                " " +
                                user.accountOwner.last_name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-2xl text-red-600 mt-10">
                      Please, you set up your profile only if your name does not
                      appear in the table.
                    </p>
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
