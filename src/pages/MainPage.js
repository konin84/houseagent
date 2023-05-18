import React from "react";
import Navbar from "../components/Navbar";
import TopNav from "./TopNav";

export default function MainPage() {


  return (
    <section>
      {/* style={{ backgroundImage: 'url(../images/house3.jpg)' }} */}
      {/* Main section*/}
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
        <div className="col-span-10 bg-gradient-to-r
         h-screen pl-2 mt-10 overflow-y-scroll  animate-bounce" 
        
        >
          {/* style={{backgroundImage: 'url(../images/house3.jpg)' }} */}
          <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl mt-10" >
          </div>
        </div>
      </div>
    </section>
  );
}
