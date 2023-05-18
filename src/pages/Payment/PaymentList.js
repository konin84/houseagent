import React, { useEffect, useState } from "react";
import * as houseService from "../../services/houseService";
import * as authService from "../../services/authServices";
import AddIcon from "@material-ui/icons/Add";

import Popup from "../../components/Modals/Popup";
import Notification from "../../components/Modals/Notification";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";

import jwt_decode from "jwt-decode";
import PaymentForm from "../Forms/PaymentForm";
import { MdDelete, MdEdit } from "react-icons/md";
import PrintIcon from "@mui/icons-material/Print";
import { Link } from "react-router-dom";

export default function PaymentList() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  const [record, setRecord] = useState(null);
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

  const [recordForEdit, setRecordForEdit] = useState(null);

  const myBills = () => {
    if (user.role === "TENANT") {
      houseService.myBill().then((res) => {
        console.log("Bill Data", res.data);
        setRecord(res.data);
      });
    } else if (user.role === "REALTOR") {
      houseService.bills().then((res) => {
        console.log("Bill Data", res.data);
        setRecord(res.data);
      });
    }
  };

  useEffect(() => {
    myBills();
  }, []);

  const openInPopup = (bill) => {
    setRecordForEdit(bill);
    setOpenPopup(true);
  };

  const addOrEdit = (bill, resetForm) => {
    if (bill.id) {
      houseService
        .updateBill(bill.id, bill)
        .then((res) => {
          console.log("DATA TO BE UPDATED :  ", res.data);
          setNotify({
            isOpen: true, 
            message: "Update Successfully",
            type: "success",
          });
          // resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
          myBills();
        })
        .catch((e) => console.log("UPDATE BILL", e));
    } else {
      houseService
        .payBill(bill)
        .then((res) => {
          console.log("DATA TO BE SAVED: ", res.data);
          setNotify({
            isOpen: true,
            message: "Saved Successfully",
            type: "success",
          });
          setRecordForEdit(null);
          setOpenPopup(false);
          myBills();
        })
        .catch((e) => console.log("PAY BILL", e));
    }
  };

  const handleDelete = (bill) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
      
    houseService
      .deleteBill(bill.id)
      .then((res) => {
        console.log("Delete", res.data);
        setRecordForEdit(null);
        myBills();
      })
      .catch((e) => console.log("error delete", e));
  };

  return (
    <>
      {currentUser ? (
        user.role === "TENANT" ? (
          <>
            <button
              className="bg-black text-white active:bg-green-400 font-bold uppercase text-sm px-2 py-1  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-md float-right"
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

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Print
            </th>

            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              #
            </th>
            {/* <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              House Reference
            </th> */}
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              tenant
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Amount
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Payment Method
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Date paid
            </th>
            {currentUser ? (
              user.role === "TENANT" ? (
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
          {record &&
            record.map((bill) => (
              <tr
                className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
                key={bill.id}
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <button className=" text-red-500 font-bold py-0 px-2 ml-3 rounded-full">
                    <Link to={"/proof/" + bill.id} target="_blank">
                      {" "}
                      <PrintIcon size={20} />{" "}
                    </Link>
                  </button>
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {bill.id}
                </td>
         
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {bill.tenant}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {bill.amount}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {bill.paymentMethod}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {bill.createdDate.substring(0, 22)}
                </td>
                {currentUser ? (
                  user.role === "TENANT" ? (
                    <>
                      <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center justify-center">
                        <span className="inline-block w-1/3 md:hidden font-bold ">
                          Actions
                        </span>

                        <button
                          className=" text-green-500 font-bold py-0 px-0 rounded-full mr-4"
                          onClick={() => {
                            openInPopup(bill);
                            console.log("PAYMENT to be updated: ", bill.id);
                          }}
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          className=" text-red-500 font-bold py-0 px-0 rounded-full"
                          onClick={() => {

                            setConfirmDialog({
                              isOpen:true,
                              title: "Do you really want to delete "+ bill.amount + " paid on: " + (bill.createdDate.substring(0, 22)) + '?', 
                              subTitle:"You can't undo this operation",
                              onConfirm:()=>{handleDelete(bill)
        
                              }
                            })
                            
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

      <Popup
        title="Bill Setlement "
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PaymentForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>

      <Notification
          notify={notify}
          setNotify={setNotify} 
      />

 
      <ConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog = {setConfirmDialog}
      />
    </>
  );
}
