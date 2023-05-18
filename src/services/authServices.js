
import axios from 'axios'
import { API_URL } from '../utils/config';

export const login = (email, password) => {

  return axios
  .post(API_URL +'/login/token/',{
    email,
    password,
  })
  .then((response) => {
    if(response.data.access){
     localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};


// export const logout = () => {
//   localStorage.removeItem('user');
//   return axios.post(API_URL+'signout').then((response) => {
//     return response.data;
//   })
 
// };

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};




