import axios from "axios";

const getToken = () => {
  const token = `${document.cookie}`;
  return token.split("=")[1];
};

const instance = axios.create({
  baseURL : "http://52.79.110.219/",
  // baseURL : "http://54.180.133.171/",
  // baseURL: "https://2k1.shop/",
});

instance.interceptors.request.use(config => {
  config.headers = { authorization: `Bearer ${getToken()}` };
  return config;
});


export default instance;