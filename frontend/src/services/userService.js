import axios from "axios";
import authHeader from './authHeader';
export const APP_URL = process.env.REACT_APP_URL;
console.log(APP_URL)

export const getalluser = () => {
  return axios.get(`${APP_URL}users`,{headers: authHeader()})
};

export const getuser = (id) => {
  return axios.get(`${APP_URL}users/${id}`,{headers: authHeader()})
};
export const createuser = (data) => {
  return axios.post(`${APP_URL}users`,data,{headers: authHeader()})
};
export const updateuser = (id,data) => {
  console.log(data)
  return axios.put(`${APP_URL}users/${id}`,data,{headers: authHeader()})
};
export const deleteuser = (id) => {
  return axios.delete(`${APP_URL}users/${id}`,{headers: authHeader()})
};



