import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authServices";
import Tilt from "react-parallax-tilt";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
// import {FontAwesomeIcon} from 'react-fontawesome'

const Login = () => {
  const [openToggle, setOpenToggle] = useState(false)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, SetErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(
        () => {
          navigate("/welcome");
        },
        (error) => {
          console.log(error);
          // alert('There was an error')
          SetErrorMsg("Invalid Username and or Password. No active account found with the given credentials");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = () => {
    setOpenToggle(!openToggle)
  }

  return (
    <section className="bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center py-60 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-400 bg-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl animate-pulse"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <div className="mx-40  text-center">
                <FaUserTie size={40} />
              </div>
              <h1 className="text-3xl font-semibold block text-center ">
                {" "}
                Sign In
              </h1>
            </div>

            <div className="divide-y divide-gray-200">
              {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              <Tilt>
                <form
                  onSubmit={handleLogin}
                  className="h-full flex flex-col justify-evenly items-center"
                >
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    {/* email field */}
                    <div className="relative">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="input-text"
                        placeholder="Email address"
                      />
                    </div>
                    {/* password field */}
                    <div className="relative">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        id="password"
                        name="password"
                        type={(openToggle ===false)? "password" : "text"}
                        className="input-text"
                        placeholder="Password"
                      />
                      <div className="text-2xl absolute top-2 right-0">
                        {
                           (!openToggle ===false) ? <AiOutlineEye onClick={toggle}/> :  <AiOutlineEyeInvisible onClick={toggle}/>
                        }
                      
                    </div>
                      
                    </div>
                    

                    <div className="relative">
                      <button
                        type="submit"
                        onClick={handleLogin}
                        className="bg-black hover:bg-green-500 text-white rounded-md w-full py-2"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </form>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
