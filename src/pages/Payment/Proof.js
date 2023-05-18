import React, { useEffect, useState, useRef } from "react";
import {QRCodeSVG} from 'qrcode.react';
import * as houseService from "../../services/houseService";
import {  useParams } from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import { API_URL } from "../../utils/config";

export default function Proof() {
  const [bill, setBill] = useState();
  const { id } = useParams();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Bill Payment Proof',
  });


  const myBill = () => {
    houseService.viewBill(id).then((res) => {
      console.log('BILL', res.data)
      setBill(res.data);
    });
 
  };

  useEffect(() => {
   
    myBill()
    
  }, []);


  useEffect(() => {
    handlePrint();
  });


  return (

        <div ref={componentRef} style={{width: '100%', height:window.innerHeight}}>

            <div class="container my-24 px-16 mx-auto">
          
              <div className="container mx-auto">
                 <div className="w-12/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden  flex flex-col lg:flex-row 12/12">

                <div className="w-full lg:w-1/2 items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{backgroundImage: 'url(../images/Money.jpg)'}}>
                
                    <div className="pt-0 rounded-full">
                    <h1 className="text-4xl text-red-600 text-center pt-10 font-bold ">
                    Thanks <br />
                        <span class="text-white">for paying this bill.</span>
                      
                      </h1>
                      
                      <div className="py-10">
                        <br/><br/><br/>
                        <h2 class="text-3xl mt-20 font-bold text-white py-16"> 
                        We are very pleased doing business with you. 
                        </h2>
                      </div>
                    </div>
                    </div>
                <div className=" w-1/2 py-10 px-4 container mx-auto border border-gray-400 text-left rounded-lg md:w-full ">
                      <div className="px-20 py-4 ">
                      <QRCodeSVG 
                            value={API_URL+'/payment'}
                            size={256}
                            style={{alignItems:"left"}} 
                            />
                        
                      </div>
                
                  <div className=" text-xl mb-3 p-20 text-left">
                      {bill && (
                          < > 
                      
                          <p >Date &nbsp;  &nbsp;&nbsp;:  {bill.Bill.createdDate.substring(0, 22)}</p>
                         
                          <p >Method &nbsp;: {bill.Bill.paymentMethod}</p>
                          <p >Amount of &nbsp;&nbsp;&nbsp;&nbsp;:    {bill.Bill.amount}</p>
                          <p >Payment of &nbsp;: {bill.Bill.tenant}</p>
                         
                          </>
                        )}

                        

                      </div>


                </div>
              </div>
              </div>
                    
            </div>

        </div>


  );
}
