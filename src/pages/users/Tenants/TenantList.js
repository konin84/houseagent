import React, { useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import * as authService from "../../../services/authServices";
import jwt_decode from "jwt-decode";
import AddIcon from "@material-ui/icons/Add";
import { MdDelete, MdEdit } from "react-icons/md";
import TenantForm from "../../Forms/TenantForm";
import Popup from "../../../components/Modals/Popup";
import { realtorHouses, adminHouses, updateHouse } from "../../../services/houseService";
import Pagination from "../../../components/pagination/Pagination";
import SearchInput from "../../SearchInput";
import Notification from "../../../components/Modals/Notification";
import ConfirmDialog from "../../../components/Modals/ConfirmDialog";


export default function TenantList() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [user, setUser] = useState(jwt_decode(currentUser.access));
  const [house, setHouse] = useState();

 const myHouses = () => {
  if (user.role === "ADMIN") {

    adminHouses().then((res) => {
      console.log("House", res.data);
      setHouse(res.data);
    });
  }  else if (user.role === 'REALTOR'){
    realtorHouses().then((res) => {
      console.log("House", res.data);
      setHouse(res.data);
    });
  }
  };

  const allTenants = () => {
    if (user.role === "ADMIN") {
      userService.allTenants().then((res) => {
        setRecord(res.data);
      });
    } else if (user.role === "REALTOR") {
      userService.myTenants().then((res) => {
        setRecord(res.data);
      });
    }
  };

  useEffect(() => {
    allTenants();
    myHouses()
   
  }, []);



  const [record, setRecord] = useState([]);
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


  const addOrEdit = (tenant, resetForm) => {
    if (tenant.id) {
      userService.updateTenant(tenant.id, tenant).then((res) => {
        console.log(res.data);
        resetForm();
        setNotify({
          isOpen: true, 
          message: "New Tenant Added Successfully",
          type: "success",
        });
        setRecordForEdit(null);
        setOpenPopup(false);
        allTenants();
      });
      // console.log("Tenant user", tenant.id);
    } else {
      userService.addTenant(tenant).then((res) => {
        console.log("TENANT INFO", res.data);
        if (res.data.length !== 0) {
          const tenantHouse = house.filter((ref) => {
            return ref.id === tenant.houserented;
            // return ref.id === tenant.houserented;
          });
          console.log("Tenant House :", tenantHouse);
          tenantHouse[0]["tenant"] = res.data.Tenants.id;
          // tenantHouse[0]["tenantemail"] = tenant.email;
          console.log("New tanant house", tenantHouse[0]["id"], tenantHouse[0]);
          updateHouse(tenantHouse[0]["id"], tenantHouse[0]);
        }

        resetForm();
        setNotify({
          isOpen: true, 
          message: "Tenant Data Updated Successfully",
          type: "success",
        });
        setRecordForEdit(null);
        setOpenPopup(false);
        allTenants();
      });
    }
  };

  console.log('Tenant', record)

  const handleDelete = (tenant) => {
    console.log("Info Delete", tenant);
    userService
      .deleteTenant(tenant.id)
      .then((res) => {
        console.log("Delete", res.data);
        const tenantHouse = house.filter((ref) => {
          return ref.id === parseInt(tenant.houserented);
        });
        console.log("Delete Tenant House :", tenantHouse);
        tenantHouse[0]["tenant"] = null;
        // tenantHouse[0]["tenantemail"] = null;
        console.log(
          "Delete New tanant house",
          tenantHouse[0]["id"],
          tenantHouse[0]
        );
        updateHouse(tenantHouse[0]["id"], tenantHouse[0]);
        // resetForm();
        setNotify({
          isOpen: true, 
          message: "Tenant Deleted Successfully",
          type: "error",
        });
        setRecordForEdit(null);
        setOpenPopup(false);
        allTenants();
      })
      .catch((e) => console.log("error delete", e));
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  // Pagination variable
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastItem = currentPage * recordsPerPage;
  const firstItem = lastItem - recordsPerPage;
  const currentItem = record.slice(firstItem, lastItem);

  // Search variables
  const [query, setQuery] = useState("");
  const search = (tenant) =>
    (tenant.first_name + " " + tenant.last_name)
      .toLowerCase()
      .includes(query) ||
    tenant.email.toLowerCase().includes(query) ||
    tenant.phone_number.toLowerCase().includes(query) ||
    tenant.houserented.toLowerCase().includes(query);


  return (
    <div>
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
      <SearchInput setQuery={setQuery} />

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              #
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Full Name
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email Address
            </th>

            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              House No
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Telephone
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Is Active?
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
          {currentItem?.filter(search).map((tenant) => (
            <tr
              className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
              key={tenant?.id}
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  #
                </span>
                {tenant?.id}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Full Name
                </span>
                {tenant?.first_name + " " + tenant?.last_name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Email Address
                </span>
                {tenant?.email}
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  House No
                </span>
                {tenant?.houserented}
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Telephone{" "}
                </span>
                {tenant?.phone_number}
              </td>

              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell text-black rounded-md">
                <span className="inline-block w-1/3 md:hidden font-bold ">
                  Is Active?
                </span>

                {currentUser ? (
                  tenant?.is_active === true ? (
                    <>
                      <span className="bg-green-700 text-gray-50 rounded-full px-2">
                        {String(tenant?.is_active)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="bg-red-500 text-gray-50 rounded-md px-2 ">
                        {String(tenant?.is_active)}
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
                          openInPopup(tenant);
                        }}
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        className=" text-red-500 font-bold py-0 px-0 rounded-full"
                        onClick={() => {
                          // handleDelete(tenant);
                          setConfirmDialog({
                            isOpen:true,
                            title: 'Do you really want to delete ' +  (tenant.first_name +' ' + tenant.last_name) + '.', 
                            subTitle:"You can't undo this operation",
                            onConfirm:()=>{handleDelete(tenant)
      
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
      {/* Pagination here */}
      <Pagination
        totalHouses={record.length}
        housesPerPage={recordsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <Popup
        title=<h1 className="text-2xl">Tenant Registration</h1>
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TenantForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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
