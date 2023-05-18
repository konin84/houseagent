import React, { useEffect, useState } from "react";
import * as houseService from "../../services/houseService";

export default function LandLordAnalytics() {
  //
  const [house, setHouses] = useState([]);
  const [totalhouse, setTotalhouse] = useState([]);

  const allHouses = () => {
    houseService.landlordHouses().then((res) => {
      console.log("TOTAL HOUSE:", res.data);
      setHouses(res.data);
      setTotalhouse(res.data.length);
      // usersList(res.data.length);
    });
  };

  console.log("LANDLORD HOUSES", house);
  useEffect(() => {
    allHouses();
  }, []);

  return (
    <div>
      <p className="mx-auto text-3xl p-2 text-center font-semibold">
        {totalhouse} houses registered
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {house &&
          house.map((house) => (
            <div className="max-w-lg rounded overflow-hidden shadow-md mb-5 mx-auto">
              {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
              <div className="px-6 py-4">
                <div className="text-xl mb-2">
                  Rented at
                  <span className="text-xl mb-2 font-Montserrat font-bold  text-green-600">
                    {" "}
                    {house.price}{" "}
                  </span>
                </div>
                <p class="text-gray-700 text-base">{house.address}</p>
              </div>
              <div className="px-6 py-4">
                <div className="text-xl mb-2">
                  Managed by{" "}
                  <span className="text-xl mb-2 font-Montserrat font-bold">
                    {" "}
                    {house.realtor}{" "}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="text-xl mb-2">
                  <span className="text-xl mb-2 font-Montserrat">
                    
                    {
                      house.tenant ?(
                        <div className="bg-green-100 text-black">
                        <span className="mr-2">Rented by</span>  
                        {house.tenant?.first_name + ' ' + house.tenant?.last_name} <br/>
                        <span className="">Email: {house.tenant?.email}</span><br/>
                        <span className="">Telephone: {house.tenant?.phone_number}</span><br/>
                        
                        </div>
                      ):(
                        <p className="text-xl font-light text-green-600"> house not rented</p>
                      )
                    }

                   
                  </span>
                </div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {house.reference}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {house.country}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {house.state}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {house.city}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
