import axios from "axios";

const accessToken = document.cookie.split("=")[1];

const instance = axios.create({
  baseURL: "https://2k1.shop/",
  // baseURL: "http://52.78.155.48",
//   baseURL: "http://54.180.133.171",
  headers: { authorization: `Bearer ${accessToken}`,
},
});

export default instance;