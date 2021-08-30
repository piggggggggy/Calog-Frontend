import axios from "axios";

export const get_csrf_token = () => {
  axios({
      method: "get",
      url: "http://52.79.110.219/api/user/csrf-token",
      // url: "https://2k1.shop/api/user/csrf-token",
  })
  .then((res) => {
      document.cookie = `CSRF_TOKEN=${res.data.csrfToken};`;
  })
  .catch((err) => {
  })
};