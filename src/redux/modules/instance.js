import axios from "axios";

const getToken = () => {
  const token = `${document.cookie}`;
  const jwt_token = token.split("; ").find(row => row.startsWith('TOKEN'))?.split("=")[1];
    return jwt_token;
};

const getToken_csrf = () => {
  const token = `${document.cookie}`;
  const csrf_token = token?.split("; ").find(row => row.startsWith('CSRF_TOKEN'))?.split("=")[1];
    return csrf_token;
};

const instance = axios.create({

  // test
  // baseURL : "http://52.79.110.219/",

  // deploy
  baseURL: "https://2k1.shop/",
});

instance.interceptors.request.use(config => {
  config.headers = { 
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    authorization: `Bearer ${getToken()}`,
    'x-csrf-token': `${getToken_csrf()}`,
  };
  config.headers.Accept = 'application/json';
  return config;
});


export default instance;