import axios from "axios";

const accessToken = document.cookie.split("=")[1];

const instance = axios.create({
  baseURL: "http://3.36.97.199/",
  headers: { authorization: `Bearer ${accessToken}`,
},
});

export default instance;