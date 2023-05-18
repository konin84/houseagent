import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import * as houseService from "../services/houseService";
import ImageForm from './Forms/ImageForm';
import Popup from '../components/Modals/Popup';
import AddIcon from "@material-ui/icons/Add";



export default function ImagesUpload() {

  
  const [record, setRecord] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const uplodedImages = () => {
    houseService.uploadedImage().then((res) => {
      console.log('Image Data', res.data)
      setRecord(res.data);
    });
  }

  useEffect(() => {
    uplodedImages();
  }, []);



  const addOrEdit = (bill, resetForm) => {

    {
      if (bill.id) {
        houseService.uploadImage(bill.id, bill).then((res) => {
          console.log('DATA TO BE UPDATED :  ', res.data);
          // setNotify({
          //   isOpen: true, On va tester pour voir
          //   message: "Update Successfully",
          //   type: "success",
          // });
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
          uplodedImages();
        }).catch((e) => console.log("UPDATE IMAGE", e));
      } 
    
   else {
      houseService.uploadImage(bill).then((res) =>
       {
        console.log('DATA TO BE SAVED: ', res.data);
        // setNotify({
        //   isOpen: true, 
        //   message: "Saved Successfully",
        //   type: "success",
        // });
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        uplodedImages();
      }).catch((e) => console.log("IMAGE UPLOAD", e));
    }
    }
};

  const openInPopup = (bill) => {
    setRecordForEdit(bill);
    setOpenPopup(true);
  }


  return (
    // <div className='container mx-auto py-16 '>
      

    //     <div className='grid grid-cols-2  md:grid-flow-row'>
    //       <div className='grid 1/2 lg:w-1'>
    //           <h2 className='text-3xl text-sky-500'>images upload</h2>
            
    //       </div>
    //       <div className='grid 1/2 lg:w-1'>

    //     <table>
    //       <tr>

    //       <th>Title</th>
    //       <th>Path</th>
    //       </tr>
    //       <tr>
    //         <td>Image 1</td>
    //         <td>path</td>
    //       </tr>
    //     </table>
    //       </div>

    //     </div>

    //   </div>

<div className='container mx-auto py-16'>
<div className="grid grid-cols-1">

   

    <div className=" bg-red-600 ">
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
    <table className="min-w-full border-collapse block md:table">
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Title
          </th>
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
            Url
          </th>
        
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {/* {record.map((bill) => (
          <tr
            className="bg-slate-50 border border-grey-500 md:border-none block md:table-row"
            key={bill.id}
          >
            
           
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            
              {bill.title}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
             
              {bill.photo}
            </td>
           
            <td className="p-2 md:border md:border-grey-500 block md:table-cell text-center justify-center">
              <span className="inline-block w-1/3 md:hidden font-bold ">
                Actions
              </span>

              <button
                className=" text-green-500 font-bold py-0 px-0 rounded-full mr-4"
                onClick={() => {
                  openInPopup(bill); 
                  // console.log('PAYMENT to be updated: ', bill.id)
                }} >  
       
                <MdEdit size={20} />
              </button>
              <button
                className=" text-red-500 font-bold py-0 px-0 rounded-full"
                onClick={() => {
                  // handleDelete(bill)
                  // console.log("Bill to be deleted: ", bill.id);
                }}
              >
                <MdDelete size={20} />
              </button>

            
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>

    <Popup
      title="Working with files "
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <ImageForm 
      recordForEdit={recordForEdit} 
      addOrEdit={addOrEdit} 
      
      />
    </Popup>
      </div>
</div>
</div>
      
  )
}
