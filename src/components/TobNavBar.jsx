import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Popup from "./Modals/Popup";
import RealtorSignUpForm from "../pages/Forms/RealtorSignUpForm";
import * as userService from "../services/userService";
import Notification from "./Modals/Notification";

export default function TobNavBar() {

  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  //
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const signUp = (data) => {
    userService.signup(data).then((res) => {
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message:
          "Account Created Successfully, we will contact you for more details in the shortest time...",
        type: "info",
      });
      
    });
  };

  //

  return (
    
    <nav className={nav ? "nav active" : "nav"}>
      <a href="#!" className="logo">
        <img src={logo} alt="" />
      </a>

      <input type="checkbox" className="menu-btn" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="nav-icon"></span>
      </label>
      <ul className="menu">
        <li>
          <a href="#home" className="active">
            Home
          </a>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            Sign up
          </Link>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>

      <Notification notify={notify} setNotify={setNotify} />

      <Popup
        title=<h1 className="text-2xl">Realtor Registration</h1>
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RealtorSignUpForm signUp={signUp} />
      </Popup>
    </nav>
  );
}
