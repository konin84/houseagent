import axios from 'axios'
import { API_URL } from '../utils/config'
import { AuthHeader } from '../utils/authHeader'


export const realtorHouses = () =>{
  return axios.get(API_URL+'/house/realtor-houses',
  {
    headers:
      AuthHeader()
  }
  )
}

export const landlordHouses = () =>{
  return axios.get(API_URL+'/account/myhouses',
  {
    headers:
      AuthHeader()
  }
  )
}
export const tenantHouse = () =>{
  return axios.get(API_URL+'/house/house',
  {
    headers:
      AuthHeader()
  }
  )
}

export const adminHouses = () =>{
  return axios.get(API_URL+'/house/all-houses',
  {
    headers:
      AuthHeader()
  }
  )
}

export const totalAmountPaid = () =>{
  return axios.get(API_URL+'/house/total-bills',
  {
    headers:
      AuthHeader()
  }
  )
}
export const realtorTotalAmountReceived = () =>{
  return axios.get(API_URL+'/house/realtor-total-bills',
  {
    headers:
      AuthHeader()
  }
  )
}

export const payBill = (data) =>{
  return axios.post(API_URL+'/house/rentBill', data,
  {
    headers:
      AuthHeader()
  }
  )
}

export const updateBill = (id, data) =>{
  return axios.put(API_URL+'/house/rent/'+id, data,
  {
    headers:
      AuthHeader()
  }
  )
}

export const viewBill = (id) =>{
  return axios.get(API_URL+'/house/bill/'+ id,
  {
    headers:
      AuthHeader()
  }
  )
}


export const deleteBill = (id) =>{
  return axios.delete(API_URL+'/house/rent/'+id,
  {
    headers:
      AuthHeader()
  }
  )
}

//  the is the list of a tenant's bill
export const myBill = () =>{
  return axios.get(API_URL+'/house/myBill',
  {
    headers:
      AuthHeader()
  }
  )
}

//  the is the list of all bill of tenants managed by a realtor
export const bills = () =>{
  return axios.get(API_URL+'/house/bills',
  {
    headers:
      AuthHeader()
  }
  )
}

export const houseImages = () =>{
  return axios.get(API_URL+'/house/house-image',
  {
    headers:
      AuthHeader()
  }
  )
}

// export const oneHouse = (id) =>{
//   return axios.get(API_URL+'/house/house/'+id),
//   {
//     headers:
//       AuthHeader()
//   }
  
// }


// export const realtorHouseDeletion = (id) =>{
//   return axios.delete(API_URL+'/house/delete/${id}',
//   {
//     headers:
//       AuthHeader()
//   }
//   )
// }


export const realtorLandLords = () =>{
  return axios.get(API_URL+'/account/myLandLords',
  {
    headers:
      AuthHeader()
  }
  )
}




export function uploadedImage(data) {
  return axios.get(API_URL+'/house/images', data,
  {
    headers:
      AuthHeader()
  }
  );
}

export function uploadImage(data) {
  return axios.post(API_URL+'/house/images', data,
  {
    headers:
      AuthHeader()
  }
  );
}




export function addHouse(data) {
  return axios.post(API_URL+'/house/houses', data,
  {
    headers:
      AuthHeader()
  }
  );
}

// `/house/house/$(id)`
export function updateHouse(id, data) {
  return axios.put(API_URL+'/house/house/'+id, data,
  {
    headers:
      AuthHeader()
  }
  );
}

export const deleteHouse = (id) =>{
  return axios.delete(API_URL+'/house/house/'+id,
  {
    headers:
      AuthHeader()
  }
  )
}




