import axios from "axios";

const getToken = () => {
  const token = `${document.cookie}`;
  return token.split("=")[1];
};

const instance = axios.create({
  baseURL : "http://52.79.110.219/",
<<<<<<< HEAD
  // baseURL : "http://54.180.133.171/",
=======
>>>>>>> daebeee70defd0773a3aaf91052c567c080a096a
  // baseURL: "https://2k1.shop/",
});

instance.interceptors.request.use(config => {
  config.headers = { authorization: `Bearer ${getToken()}` };
  return config;
});


export default instance;