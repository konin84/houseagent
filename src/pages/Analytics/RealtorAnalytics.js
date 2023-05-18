import React, { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import * as houseService from "../../services/houseService";

import * as authService from "../../services/authServices";
import jwt_decode from "jwt-decode";

export default function RealtorAnalytics() {

  // 
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  // 
  const [usersList, SetusersList] = useState([]);
  const [tenantList, SetTenantList] = useState([]);
  const [houses, setHouse] = useState([])
  const [landLords, SetLandLords] = useState([]);
  const [totalAmount, setTotalAmount] = useState([])



  const allUsers = () => {
    userService.userRealtor().then((res) => {
      SetusersList(res.data.length);
    });
  };
  const tenants = () => {
    userService.myTenants().then((res) => {
      SetTenantList(res.data.length);
    });
  };

  const allHouses = () => {
    houseService.realtorHouses().then((res) => {
      console.log("TOTAL HOUSE:", res.data);
      setHouse(res.data.length);
      // usersList(res.data.length);
    });
  };

  const houseOwners = () => {
    userService.myHouseOWners().then((res) => {
      // console.log("USER", res.data.length); myTenants
      SetLandLords(res.data.length);
    });
  };


  // const myHouses = () => {
  //   houseService.realtorHouses().then((res) => {
  //     const newData = res.data.filter((r) => r.tenant === null);
  //     console.log("New House Data", newData);
  //     setData(newData);
  //   });
  // };

  const totalAmountPaid = () => {
    houseService.realtorTotalAmountReceived().then((res) => {
      const newData = res.data.objects.filter((r) => r.realtor === user.email)
      // .filter((r) => r.data.realtor === user);
      // console.log("NEW REALTOR DATA:", newData);
      const result = newData.reduce((total, currentValue) => total = total + currentValue.amount,0);
      // console.log("UPDATED REALTOR DATA:", result);
      // console.log("TOTAL HOUSE:", res.data.data.length);
      setTotalAmount(result);
      // usersList(res.data.length);
    });
  };



  useEffect(()=>{
    allUsers();
    tenants();
    allHouses();
    houseOwners();
    totalAmountPaid();
    // myHouses()
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 ld:grid-cols-3 gap-4 m-4 ">
        <div className="bg-red-300 p-3  rounded text-2xl font-Montserrat text-center">
          {usersList} Users{" "}
        </div>
      
        <div className="bg-green-500 p-3 rounded text-2xl font-Montserrat text-center">
          {tenantList} Tenants
        </div>
     
        <div className="bg-yellow-500 p-3 rounded text-2xl font-Montserrat text-center">
          {houses} Registered Houses
        </div>
        <div className="bg-green-300 p-3 rounded text-2xl font-Montserrat text-center">
          {landLords} House Owners
        </div>
        <div className="bg-red-700 p-3 text-white rounded text-2xl font-Montserrat text-center">
          {totalAmount} XOF Received
        </div>

        
      </div>

    </div>
  )
}
