import React, { useEffect, useState } from "react";
import * as houseService from "../../services/houseService";
import * as authService from "../../services/authServices";

import jwt_decode from "jwt-decode";
import AddIcon from "@material-ui/icons/Add";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from "../../components/Modals/Popup";
import HouseForm from "../Forms/HouseForm";

import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../SearchInput";
import Notification from "../../components/Modals/Notification";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
// import ConfirmBox from "../../components/Modals/ConfirmBox";



export default function HouseListing() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));

  const [record, setRecord] = useState([]);
  // const [deleteData, setDeleteData] = useState([]);
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



  const myHouses = () => {
    if(user.role === 'ADMIN'){
      houseService.adminHouses().then((res) => {
        // console.log('USER', res.data)
        setRecord(res.data);
      });
    } else if(user.role === 'REALTOR') {
      houseService.realtorHouses().then((res) => {
        // console.log('USER', res.data)
        setRecord(res.data);
      });
    }
  };

  

  useEffect(() => {
    myHouses();
  }, []);

  const openInPopup = (house) => {
    setRecordForEdit(house);
    setOpenPopup(true);
  }

  const addOrEdit = (house) => {
    
      if (house?.id) {
        houseService.updateHouse(house.id, house).then((res) => {
          // console.log(res.data);
          setNotify({
            isOpen: true, 
            message: "Update Successfully",
            type: "success",
          });
          setRecordForEdit(null);
          setOpenPopup(false);
          myHouses();
        
        });
      } 
    
    if(!house?.id) {
      // console.log("ID", house.id)
      houseService.addHouse(house).then((res) => {
        console.log(res.data);
        setNotify({
          isOpen: true, 
          message: "New House Added Successfully",
          type: "success",
        });
        setRecordForEdit(null);
        setOpenPopup(false);
        myHouses();
      }).catch((e) => console.log("ERROR ADDHOUSE", e));
    }
  };


  // Delete house
  const handleDelete = (house) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
      
      houseService
        .deleteHouse(house?.id)
        .then((res) => {
          console.log("Delete", res.data);
          setNotify({
            isOpen: true, 
            message: "Deleted Successfully",
            type: "error",
          });
          setRecordForEdit(null);
          myHouses();
          // setOpen(false)
        })
        .catch((e) => console.log("error delete", e));
  
  };

  // console.log(openDelete(house))

    // Pagination variable  
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastItem = currentPage * recordsPerPage;
    const firstItem = lastItem - recordsPerPage;
    const currentItem = record.slice(firstItem, lastItem);

  // Search variables
    const [query, setQuery] = useState('')
    // console.log('DATA SEARCHED', query)
    // console.log('DATA SEARCHED', record.filter(h=>h.city.toLowerCase().includes('bo')))
     const search = (house)=>(house.city?.toLowerCase().includes(query))||(house.address?.toLowerCase().includes(query))||(house.reference?.toLowerCase().includes(query))||(house.houseType?.toLowerCase().includes(query))

  return (
    <>
      {currentUser ? (
        user.role === "REALTOR" ? (
          <>
            <button
              className="bg-black text-white active:bg-green-400 font-bold uppercase text-sm px-2 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-full float-right"
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
        <SearchInput setQuery={setQuery}/>
      {/* Table start below */}

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              # 
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Address
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              State
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              City
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Reference
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Rented by
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Type
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Price
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {currentItem.filter(search).map((house, index) => (
            <tr
              className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
              key={index}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  #
                </span>
                {house.id}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Address
                </span>
                {house.address}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  State Address
                </span>
                {house.state}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  City
                </span>
                {house.city}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Reference{" "}
                </span>
                {house.reference}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Tenant{" "}
                </span>
                Tenant No. {house.tenant}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Type{" "}
                </span>
                {house.houseType}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Type{" "}
                </span>
                {house.price}
              </td>

              <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center justify-center">
                <span className="inline-block w-1/3 md:hidden font-bold ">
                  Actions
                </span>

                <button
                  className=" text-green-500 font-bold py-0 px-0 rounded-full mr-4"
                  onClick={() => {
                    openInPopup(house);
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
                      title: 'Do you really want to delete ' + (house.reference) + '?',
                  
                      subTitle:"You can't undo this operation",
                      onConfirm:()=>{handleDelete(house)
                        // {house.id}

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
      {/*  pagination here*/}
        <Pagination 
        totalHouses={record.length}
        housesPerPage={recordsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />
      {/*  */}
      <Popup
        title="House Listing Management"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <HouseForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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

