import React, { useState } from "react";
import TopNav from "../TopNav";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
// import { GiPayMoney } from "react-icons/gi";
import * as authService from "../../services/authServices";
import jwt_decode from "jwt-decode";
import RealtorAnalytics from "./RealtorAnalytics";
import AdminAnalytics from "./AdminAnalytics";
import LandLordAnalytics from "./LandLordAnalytics";
import { AnalyticsOutlined } from "@mui/icons-material";

export default function Analytics() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  return (
    <section>
      <div className="grid grid-cols-12">
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

        <div className="col-span-10  bg-gray-200 h-screen pl-2 mt-8">
          <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-10">
            <PageHeader
              title="ANALYTICS"
              icon={
                <AnalyticsOutlined
                  fontSize="small"
                  size={10}
                  className="text-black"
                />
              }
            />
            {currentUser ? (
              user.role === "ADMIN" ? (
                <>
                  <AdminAnalytics />
                </>
              ) : user.role === "REALTOR" ? (
                <>
                  <RealtorAnalytics />
                </>
              ) : (
                <>
                  <LandLordAnalytics />
                </>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
