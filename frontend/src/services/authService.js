import axios from "axios";
import authHeader from './authHeader';
export const APP_URL = process.env.REACT_APP_URL;
console.log(APP_URL)

export const userregister = (data) => {
    console.log(data)
    return axios.post(`${APP_URL}auth/register`,data)
};

export const userlogin = (data) => {
    console.log(data)
    return axios.post(`${APP_URL}auth/signin`,data)
};

export const getToken=()=>{
    const user = JSON.parse(localStorage.getItem('restuser'));
  
    if (user && user.token) {
      return  user.token;
    } else {
      return  false;
    }
}
export const getLoggeduserinfo=()=>{
    return axios.get(`${APP_URL}auth/verifytoken`,{headers: authHeader()})
}

