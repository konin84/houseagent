import React, { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import * as houseService from "../../services/houseService";

export default function AdminAnalytics() {
  const [usersList, SetusersList] = useState([]);
  const [tenantList, SetTenantList] = useState([]);
  const [landLords, SetLandLords] = useState([]);
  const [agents, SetAgents] = useState([]);
  const [administrators, SetAdministrators] = useState([]);
  const [houses, setHouse] = useState([])
  const [totalAmount, setTotalAmount] = useState([])

  const allUsers = () => {
    userService.userList().then((res) => {
      // console.log("USER", res.data.length);
      SetusersList(res.data.length);
    });
  };
  
  const tenants = () => {
    userService.allTenants().then((res) => {
      // console.log("USER", res.data.length);
      SetTenantList(res.data.length);
    });
  };

  const houseOwners = () => {
    userService.allHouseOWners().then((res) => {
      // console.log("USER", res.data.length);
      SetLandLords(res.data.length);
    });
  };

  const allRealtors = () => {
    userService.allRealtors().then((res) => {
      // console.log("USER", res.data.length);
      SetAgents(res.data.length);
    });
  };

  const allAdministrators = () => {
    userService.allAdministrators().then((res) => {
      // console.log("USER ADMINISTRATORS:", res.data.length);
      SetAdministrators(res.data.length);
    });
  };

  const allHouses = () => {
    houseService.adminHouses().then((res) => {
      console.log("TOTAL HOUSE:", res.data.data.length);
      setHouse(res.data.data.length);
      // usersList(res.data.length);
    });
  };
  const totalAmountPaid = () => {
    houseService.totalAmountPaid().then((res) => {
      // console.log("TOTAL HOUSE:", res.data.data.length);
      setTotalAmount(res.data.Total);
      // usersList(res.data.length);
    });
  };

  useEffect(() => {
    allUsers();
    tenants();
    houseOwners();
    allRealtors();
    allAdministrators();
    allHouses();
    totalAmountPaid()
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 ld:grid-cols-3 gap-4 m-4 ">
        <div className="bg-red-300 p-3  rounded text-2xl font-Montserrat text-center">
          {usersList} Users{" "}
        </div>
        <div className="bg-blue-300 p-3 rounded text-2xl font-Montserrat text-center">
          {administrators} Administrators{" "}
        </div>
        <div className="bg-green-500 p-3 rounded text-2xl font-Montserrat text-center">
          {tenantList} Tenants
        </div>
        <div className="bg-green-300 p-3 rounded text-2xl font-Montserrat text-center">
          {landLords} House Owners
        </div>
        <div className="bg-yellow-300 p-3 rounded text-2xl font-Montserrat text-center">
          {agents} Realtors
        </div>
        <div className="bg-yellow-500 p-3 rounded text-2xl font-Montserrat text-center">
          {houses} Registered Houses
        </div>
        <div className="bg-red-700 p-3 text-white rounded text-2xl font-Montserrat text-center">
          {totalAmount} XOF 
        </div>
      </div>
    </div>
  );
}
