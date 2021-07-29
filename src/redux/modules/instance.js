import axios from "axios";

const accessToken = document.cookie.split("=")[1];

const instance = axios.create({
  baseURL: "http://52.78.116.106/",
  headers: { authorization: `Bearer ${accessToken}`,
},
});

export default instance;