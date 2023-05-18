import React from "react";



export default function RealtorSignUp() {

  return (
    <div className=" min-h-screen bg-gradient-to-r from-sky-200 hover:bg-gray-400 py-40 " >

      <div className="container mx-auto">
      <div className="w-12/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden  flex flex-col lg:flex-row 12/12">
        <div className="w-full lg:w-1/2 items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{backgroundImage: 'url(../images/househ.jpg)'}}>
        
         <div className="pt-0">
         <h1 className="text-4xl text-red-600 text-center pt-10 font-bold">Welcome to the Realtor's partner</h1>
          
          <div className="pt-10">
            <p className="text-3xl text-green-400 text-center pt-5 font-bold">This is the best App to manage your houses, landlords and tenants</p>
          </div>
         </div>
        </div>
        <div className="w-1/2 py-10 px-12 container mx-auto">
          <h1 className="text-3xl mb-4 text-center uppercase font-Montserrat"> Register</h1>
          <p className="mb-4 text-2xl text-center w-full font-Montserrat italic"> Create your account and enjoy our amazing services.</p>
        </div>
      </div>
      </div>


          
     
    </div>
  );
}
