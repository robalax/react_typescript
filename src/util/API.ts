import axios from "axios";

const { REACT_APP_DEV_API_BASE_URL, REACT_APP_PROD_API_BASE_URL } = process.env;

const baseURL =
  window.location.hostname === "localhost"
    ? REACT_APP_DEV_API_BASE_URL
    : REACT_APP_PROD_API_BASE_URL;

const API = axios.create({ baseURL: baseURL });

//Api Functions not in use yet
export const getReq = async (url:string, data = null) => {
  if (data) {
    return await API.get(url, data);
  }else{
    return await API.get(url);
  }
};

export const postReq = async (url:string, data:object, jwt = null) => {
  return await API.post(url, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
  });
};
