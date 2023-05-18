import React from "react";
import PaymentList from "./PaymentList";
import Navbar from "../../components/Navbar";
import {GiPayMoney} from 'react-icons/gi'
import PageHeader from "../../components/PageHeader";
import TopNav from "../TopNav";

export default function MakePayment() {
 

  return (
    <section>
      <div className="grid grid-cols-12">
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

        <div className="col-span-10  bg-gray-200 h-screen pl-2 mt-8">
         
          <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-10">
          <PageHeader
            title="Making Payment"
            icon={<GiPayMoney fontSize="small" size={10} className="text-black"  />}
          />
            <PaymentList />
          </div>
        </div>
      </div>
    </section>
  );
}
