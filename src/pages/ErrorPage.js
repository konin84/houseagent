import React from 'react'

export default function ErrorPage() {
  return (
    <div>
      <h1 className='text-3xl'> Page not found </h1>
      <div className="bg-blue-200 min-h-screen flex items-center">
   <div className="w-full">
     <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Fill out our form</h2>
     <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
       <form action="">
         <div className="mb-5">
           <label for="name" className="block mb-2 font-bold text-gray-600">Name</label>
           <input type="text" id="name" name="name" placeholder="Put in your fullname." className="border border-gray-300 shadow p-3 w-full rounded mb-"/>
         </div>

         <div className="mb-5">
           <label for="twitter" className="block mb-2 font-bold text-gray-600">Twitter</label>
           <input type="text" id="twitter" name="twitter" placeholder="Put in your fullname." className="border border-red-300 shadow p-3 w-full rounded mb-"/>
           <p className="text-sm text-red-400 mt-2">Twitter username is required</p>
         </div>

         <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Submit</button>
       </form>
     </div>
   </div>
 </div>

 {/* <div className="bg-green-200 min-h-screen flex items-center">
   <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
     <form action="">

       <div className="flex items-center mb-5">
         <label for="name" className="w-20 inline-block text-right mr-4 text-gray-500 ">Name</label>
         <input name="name" id="name" type="text" placeholder="Your name" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"/>
       </div>

       <div className="flex items-center mb-10">
         <label for="twitter" className="w-20 inline-block text-right mr-4 text-gray-500 ">Twitter</label>
         <input type="text" name="twitter" id="twitter" placeholder="Your Twitter pseudonym" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"/>
       </div>
       <div className="text-right">
         <button className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">Submit</button>
       </div>
     </form>
   </div>
 </div> */}


    </div>
  )
}
