import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";

import { MdDelete, MdEdit } from "react-icons/md";
import Popup from "../../../components/Modals/Popup";
import RealtorForm from "../../Forms/RealtorForm";
import SearchInput from "../../SearchInput";
import Notification from "../../../components/Modals/Notification";
import ConfirmDialog from "../../../components/Modals/ConfirmDialog";

export default function RealtorList() {
  const [record, setRecord] = useState([]);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  const allRealtors = () => {
    userService.allRealtors().then((res) => {
      console.log("USER", res.data);
      setRecord(res.data);
    });
  };

  useEffect(() => {
    allRealtors();
  }, []);

  const [recordForEdit, setRecordForEdit] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState(
    {
      isOpen:false,
      message:'',
      type:''
    
    });
   
  const [confirmDialog, setConfirmDialog] = useState(
    {
      isOpen:false,
      title:'',
      subTitle:''
    })


  const addOrEdit = (realtor, resetForm) => {
    if (realtor.id) {
      userService.updateRealtor(realtor.id, realtor).then((res) => {
        console.log(res.data);
        setNotify({
          isOpen: true, 
          message: "Realtor's Details Updated Successfully",
          type: "success",
        });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        allRealtors();
      });

      // console.log("Tenant realtor", realtor.id);
    } else {
      userService.signup(realtor).then((res) => {
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
      });
    }
  };

  const openInPopup = (realtor) => {
    setRecordForEdit(realtor);
    setOpenPopup(true);
  };

  const handleDelete = (user) => {
    console.log("Info Delete", user);

    userService
      .deleteRealtor(user.id)
      .then((res) => {
        console.log("Delete", res.data);
        setNotify({
          isOpen: true, 
          message: "Deleted Successfully",
          type: "error",
        });
        setRecordForEdit(null);
        // // setOpenPopup(false);
        allRealtors();
      })
      .catch((e) => console.log("error delete", e));
  };



   // Search variables

     // Pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const lastItem = currentPage * recordsPerPage;
  const firstItem = lastItem - recordsPerPage;
  const currentItem = record.slice(firstItem, lastItem);

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
 
   //
  return (
    <div>
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
              Company Email{" "}
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Telephone
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Is Active?
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
        {currentItem.filter(search).map((user) =>(
            // const {first_name, last_name} = realtor;
            <tr
              className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
              key={user.id}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Full Name
                </span>
                {user.first_name} {user.last_name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Email Address
                </span>
                {user.email}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Company Address
                </span>
                {user.company_email}
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Telephone{" "}
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

              <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center justify-between">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  className=" text-green-500 font-bold py-0 px-0 rounded-full mr-4"
                  onClick={() => {
                    openInPopup(user);
                    // console.log('Realtor to be updated: ', realtor.id)
                  }}
                >
                  <MdEdit size={20} />
                </button>
                <button
                  className=" text-red-500 font-bold py-0 px-0 rounded-full"
                  onClick={() => {
                    // handleDelete(house);
                    setConfirmDialog({
                      isOpen:true,
                      title: 'Do you really want to delete ' +  (user.first_name +' ' + user.last_name) + '.',
                  
                      subTitle:"You can't undo this operation",
                      onConfirm:()=>{handleDelete(user)

                      }
                    })
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Popup
        title="Realtors Management"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RealtorForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification
          notify={notify}
          setNotify={setNotify} 
      />

 
      <ConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog = {setConfirmDialog}
      />
    </div>
  );
}
