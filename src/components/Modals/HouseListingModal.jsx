import React, {useState, useEffect, useMemo} from 'react';
import * as houseService from '../../services/houseService';
import * as authService from '../../services/authServices';
import jwt_decode from 'jwt-decode';

import { Country, State, City } from "country-state-city"
import Select from "react-select";

// 

// 
export default function HouseListingModal() {
  const [showModal, setShowModal] = React.useState(false);

  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser())
  const [user, setUser] = useState(jwt_decode(currentUser.access))

  const [houseOwnerRecord, setHouseOwnerRecord] = useState([])


  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];
  
 const options = [
  houseOwnerRecord.map((r) =>{
    return {value: r.email, label: r.first_name+" "+r.last_name}
  })
 ];

const handleChange = (selectedOption) => {
  console.log('handleChange', selectedOption)
};


  const myLandLords = () => {
      houseService.realtorLandLords().then((res) => {
        console.log('LandLords', res.data)
        setHouseOwnerRecord(res.data);
      });
  };


  useEffect(() => {
    myLandLords();
  }, []);


const [selectedCountry, setSelectedCountry] = useState(null);
const [selectedState, setSelectedState] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);
const [realtor, setRealtor] = useState('');
const [reference, setReference] = useState('');
const [price, setPrice] = useState('');
const [bedrooms, setBedromms] = useState('');
const [bathrooms, setBathroms] = useState('');
const [address, setAdress] = useState('');
const [houseType, setHouseType] = useState('');
const [photo, setPhoto] = useState('');

// 


const houses = [
{  value:'Studio', label: 'Studio'},
  {value:'Villa', label:'Villa'},
  {value:'Duplex', label: 'Duplex'},
 { value:'FurnishedHouse', label: 'Furnished House'}

]
  return (
  <>
      <button
        className="bg-black text-white active:bg-green-400 font-bold uppercase text-sm px-4 py-2  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-md"
        type="button" onClick={() => setShowModal(true)}>
        + House
      </button>
      {showModal ? (
        <>
          <div  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                      House Listing
                  </h3>
                 
                </div>
                {/*body*/}
              <div className="relative p-0 flex-auto">
                  <p className="p-2 mt-1 mx-1 text-white">React  Modal React large plugin for your Tailwind CSS project that opens, notifications to the user or any other new content.
                  </p>
                  <div className="mt-0 mx-1">
                    <div className="  rounded-lg shadow-xs">
                      <div className="w-full overflow-x-auto">
                        <div className="mt-8 mx-4">
                          <div className="grid grid-cols-1  ">
                          {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
                            <form className="p-6 flex flex-col justify-center">
                            
                              <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                  <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{user.email}</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                  <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reference</label>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                <Select options={houses} placeholder='Select the house type'/>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
            
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-6 group">
                                  <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Bedrooms</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Bathrooms</label>
          
                                </div>
                              
                              </div>
                              <div className="grid md:grid-cols-2 md:gap-6">
                              <div className="relative z-0 w-full mb-6 group">
                                  <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                  <input type="file" name="floating_last_name" id="housePhoto" 
                                  className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                                </div>
                             </div> 

                              <div className="grid md:grid-cols-2 md:gap-6">
                                  
                                  <div className="relative z-0 w-full mb-6 group">
                                      <Select placeholder='Select the land lord' options={options[0]} onChange={handleChange}  />
                                  </div>

                                  <div className="relative z-0 w-full mb-6 group">
                                    <Select placeholder='Select the country' name='country'
                                          options={Country.getAllCountries()}
                                          
                                          getOptionLabel={(options) => {
                                            return options["name"];
                                          }}
                                          getOptionValue={(options) => {
                                            return options["name"];
                                          }}
                                          value={selectedCountry}
                                          
                                          onChange={(item) => {
                                            setSelectedCountry(item);
                                            console.log('Nation', item);
                                          }} />
                                  </div>
                                  
                                  <div className="relative z-0 w-full mb-6 group">
                                        <Select placeholder='Select the State' name='state'
                                          options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                                          getOptionLabel={(options) => {
                                            return options["name"];
                                          }}
                                          getOptionValue={(options) => {
                                            return options["name"];
                                          }}
                                          value={selectedState}
                                          onChange={(item) => {
                                            setSelectedState(item);
                                          }} /> 
                                  </div>
                                  
                                  <div className="relative z-0 w-full mb-6 group">
                                    <Select placeholder='Select the City' name='city'
                                    options={City.getCitiesOfState(
                                          selectedState?.countryCode,
                                          selectedState?.isoCode
                                        )}
                                        getOptionLabel={(options) => {
                                          return options["name"];
                                        }}
                                        getOptionValue={(options) => {
                                          return options["name"];
                                        }}
                                        value={selectedCity}
                                        onChange={(item) => {
                                          setSelectedCity(item);  }} />
                                  </div>
                              </div>
                          
                      </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear rounded-md transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</>

  )

}
