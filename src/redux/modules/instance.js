import axios from "axios";

const accessToken = document.cookie.split("=")[1];

const instance = axios.create({
  baseURL: "https://2k1.shop/",
  headers: { authorization: `Bearer ${accessToken}`,
},
});

export default instance;