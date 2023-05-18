import axios from "axios";
import { API_URL } from "../utils/config";
import { AuthHeader } from "../utils/authHeader";

export const userList = () => {
  return axios.get(API_URL + "/account/view-users", {
    headers: AuthHeader(),
  });
};


export const userRealtor = () => {
  return axios.get(API_URL + "/account/agentUsers", {
    headers: AuthHeader(),
  });
};


export const tenantRealtor = () => {
  return axios.get(API_URL + "/account/tenantAgent", {
    headers: AuthHeader(),
  });
};

export const landLordRealtor = () => {
  return axios.get(API_URL + "/account/myAgent", {
    headers: AuthHeader(),
  });
};

export const myHouseOWners = () => {
  return axios.get(API_URL + "/account/myLandLords", {
    headers: AuthHeader(),
  });
};

export const allHouseOWners = () => {
  return axios.get(API_URL + "/account/landLords", {
    headers: AuthHeader(),
  });
};

export const signup = (data) => {
  return axios.post(
    API_URL + "/account/realtorSignup", data
    // {
    //   headers:
    //     AuthHeader()
    // we don't need headers because the user has no data store in the database
    // }
  );
};


export const updateRealtor = (id, data) => {
  return axios.put(API_URL + "/account/realtor/" + id, data, {
    headers: AuthHeader(),
  });
};
export const deleteRealtor = (id) => {
  return axios.delete(API_URL + "/account/realtor/" + id, {
    headers: AuthHeader(),
  });
};


export const addTenant = (data) => {
  return axios.post(API_URL + "/account/tenant", data, {
    headers: AuthHeader(),
  });
};


export const myTenants = () => {
  return axios.get(API_URL + "/account/myTenants", {
    headers: AuthHeader(),
  });
};

export const updateTenant = (id, data) => {
  return axios.put(API_URL + "/account/tenant/" + id, data, {
    headers: AuthHeader(),
  });
};

export const deleteTenant = (id) => {
  return axios.delete(API_URL + "/account/tenant/" + id, {
    headers: AuthHeader(),
  });
};

export const addHouseOwner = (data) => {
  return axios.post(API_URL + "/account/houseOwner", data, {
    headers: AuthHeader(),
  });
};


export const updateHouseOwner = (id, data) => {
  return axios.put(API_URL + "/account/houseOwner/" + id, data, {
    headers: AuthHeader(),
  });
};

export const deleteHouseOwner = (id) =>{
  return axios.delete(API_URL+'/account/houseOwner/'+id,
  {
    headers:
      AuthHeader()
  }
  )
}


export const myRent = () => {
  return axios.get(API_URL + "/account/myRents", {
    headers: AuthHeader(),
  });
};

export const allTenants = () => {
  return axios.get(API_URL + "/account/tenants", {
    headers: AuthHeader(),
  });
};

export const allRealtors = () => {
  return axios.get(API_URL + "/account/view-realtors", {
    headers: AuthHeader(),
  });
};
export const allAdministrators = () => {
  return axios.get(API_URL + "/account/view-administrators", {
    headers: AuthHeader(),
  });
};


export const addProfile = (data) => {
  return axios.post(API_URL + "/profile/profile", data, {
    headers: AuthHeader(),
  });
};




export const myProfile = () => {
  return axios.get(API_URL + "/profile/myProfile", {
    headers: AuthHeader(),
  });
};

export const seeProfile = (id) => {
  return axios.get(API_URL + "/profile/update/"+id, {
    headers: AuthHeader(),
  });
};

export const updateProfile = (id,data) => {
  return axios.put(API_URL + "/profile/update/"+ id, data, {
    headers: AuthHeader(),
  });
};


