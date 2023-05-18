import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";
import jwt_decode from "jwt-decode";

import { MdDelete, MdEdit } from "react-icons/md";
import AddIcon from "@material-ui/icons/Add";
import HouseOwnerForm from "../../Forms/HouseOwnerForm";
import Popup from "../../../components/Modals/Popup";
import Pagination from "../../../components/pagination/Pagination";
import SearchInput from "../../SearchInput";
import Notification from "../../../components/Modals/Notification";
import ConfirmDialog from "../../../components/Modals/ConfirmDialog";

export default function HouseOwnerList() {
  const [record, setRecord] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  const allHouseOWners = () => {
    if (user.role === "ADMIN") {
      userService.allHouseOWners().then((res) => {
        console.log("USER", res.data);
        setRecord(res.data);
      });
    } else if (user.role === "REALTOR") {
      userService.myHouseOWners().then((res) => {
        console.log("USER", res.data);
        setRecord(res.data);
      });
    }
  };

  useEffect(() => {
    allHouseOWners();
  }, []);

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const addOrEdit = (houseOwner, resetForm) => {
    if (houseOwner.id) {
      userService.updateHouseOwner(houseOwner.id, houseOwner).then((res) => {
        console.log(res.data);
        // resetForm();
        setNotify({
          isOpen: true,
          message: "House Owner Details Updated Successfully",
          type: "success",
        });
        setRecordForEdit(null);
        setOpenPopup(false);
        allHouseOWners();
      });

      console.log("HouseOwner user", houseOwner.id);
    } else {
      userService.addHouseOwner(houseOwner).then((res) => {
        setNotify({
          isOpen: true,
          message: "New House Owner Added Successfully",
          type: "success",
        });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        allHouseOWners();
      });
    }
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleDelete = (user) => {
    console.log("Info Delete", user);

    userService
      .deleteHouseOwner(user.id)
      .then((res) => {
        console.log("Delete", res.data);
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
        setRecordForEdit(null);
        // // setOpenPopup(false);
        allHouseOWners();
      })
      .catch((e) => console.log("error delete", e));
  };

  // Pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastItem = currentPage * recordsPerPage;
  const firstItem = lastItem - recordsPerPage;
  const currentItem = record.slice(firstItem, lastItem);

  // Search variables
  const [query, setQuery] = useState("");
  const search = (user) =>
    (user.first_name + " " + user.last_name)
      ?.toLocaleLowerCase()
      .includes(query) ||
    (user.first_name + " " + user.last_name)?.toUpperCase().includes(query) ||
    (user.first_name + " " + user.last_name).includes(query) ||
    user.email?.toLowerCase().includes(query) ||
    user.email?.toUpperCase().includes(query) ||
    user.phone_number?.toLowerCase().includes(query);

  return (
    <div>
      {currentUser ? (
        user.role === "REALTOR" ? (
          <>
            <button
              className="bg-black text-white active:bg-green-400 font-bold uppercase text-sm px-2 py-2   shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-full float-right"
              type="button"
              variant="outlined"
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            >
              <AddIcon />
            </button>
          </>
        ) : (
          ""
        )
      ) : (
        ""
      )}

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
              Telephone
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Active?
            </th>
            {currentUser ? (
              user.role === "REALTOR" ? (
                <>
                  <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                    Actions
                  </th>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {currentItem.filter(search).map((owner, index) => (
            <tr
              className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
              key={index}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Full Name
                </span>
                {owner.first_name + " " + owner.last_name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Email Address
                </span>
                {owner.email}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Email Address
                </span>
                {owner.phone_number}
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell text-black rounded-md">
                <span className="inline-block w-1/3 md:hidden font-bold ">
                  Is Active?
                </span>
                {currentUser ? (
                  owner.is_active === true ? (
                    <>
                      <span className="bg-green-700 text-gray-50 rounded-full px-2">
                        {owner.is_active.toString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="bg-red-500 text-gray-50 rounded-md px-2 ">
                        {owner.is_active.toString()}
                      </span>
                    </>
                  )
                ) : (
                  ""
                )}
              </td>
              {currentUser ? (
                user.role === "REALTOR" ? (
                  <>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center justify-between">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Actions
                      </span>
                      <button
                        className=" text-green-500 font-bold py-0 px-0 rounded-full mr-4"
                        onClick={() => {
                          openInPopup(owner);
                        }}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        className=" text-red-500 font-bold py-0 px-0 rounded-full"
                        onClick={() => {
                          // handleDelete(house);
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              "Do you really want to delete " +
                              (owner.first_name + " " + owner.last_name) +
                              "?",

                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              handleDelete(owner);
                              // {house.id}
                            },
                          });
                        }}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination here */}
      <Pagination
        totalHouses={record.length}
        housesPerPage={recordsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/*  */}

      <Popup
        title=" House Owner Management"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <HouseOwnerForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}
