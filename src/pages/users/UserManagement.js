import React, { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import * as authService from "../../services/authServices";
import jwt_decode from "jwt-decode";
import Navbar from "../../components/Navbar";

import SearchInput from "../SearchInput";
import Pagination from "../../components/pagination/Pagination";
import PageHeader from "../../components/PageHeader";
import { FaUserTie } from "react-icons/fa";
import TopNav from "../TopNav";

//
function UserManagement() {
  const [record, setRecord] = useState([]);
  const [records, setRecords] = useState([]);
  const [realtorUsers, setrealtorUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  console.log("TOTAL USERS", record.length);

  const allUsers = () => {
    if (user.role === "ADMIN") {
      userService.userList().then((res) => {
        console.log("USER", res.data.length);
        setRecord(res.data);
        setRecords(res.data.length);
      });
    } else if (user.role === "REALTOR") {
      userService.userRealtor().then((res) => {
        // console.log('USER', res.data)
        setRecord(res.data);
        setrealtorUsers(res.data.length);
      });
    }
  };

  useEffect(() => {
    // totalUser();
    allUsers();
  }, []);

  // Pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const lastItem = currentPage * recordsPerPage;
  const firstItem = lastItem - recordsPerPage;
  const currentItem = record.slice(firstItem, lastItem);

  // Search variables
  const [query, setQuery] = useState("");
  const search = (user) =>
    (user.first_name + " " + user.last_name)?.toLowerCase().includes(query) ||
    user.email?.toLowerCase().includes(query) ||
    user.phone_number?.toLowerCase().includes(query);

  //
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
              title="USER MANAGEMENT "
              icon={
                <FaUserTie fontSize="small" size={10} className="text-black" />
              }
            />
            <div>
          
            </div>

            {/* Search input bellow */}
            <SearchInput setQuery={setQuery} />

            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Full Name
                  </th>
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Email Address
                  </th>
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Role
                  </th>
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Phone Number
                  </th>
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                    Is Active?
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {currentItem.filter(search).map((user) => (
                  <tr className="bg-slate-50 border border-grey-500 md:border-none block md:table-row">
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Full Name
                      </span>
                      {user.first_name + " " + user.last_name}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Email Address
                      </span>
                      {user.email}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Role{" "}
                      </span>
                      {user.role}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Role{" "}
                      </span>
                      {user.phone_number}
                    </td>
                    <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell text-black rounded-md">
                      <span className="inline-block w-1/3 md:hidden font-bold ">
                        Is Active?
                      </span>
                      {currentUser ? (
                        user.is_active === true ? (
                          <>
                            <span className="bg-green-700 text-gray-50 rounded-full px-2">
                              {user.is_active.toString()}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="bg-red-500 text-gray-50 rounded-md px-2 ">
                              {user.is_active.toString()}
                            </span>
                          </>
                        )
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*  pagination here*/}
            <Pagination
              totalHouses={record.length}
              housesPerPage={recordsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            {/*  */}
            <br />
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserManagement;
