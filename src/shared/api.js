import axios from "axios";

export const get_csrf_token = () => {
    console.log("click get scrf token");
    axios({
        method: "get",
        url: "http://52.79.110.219/api/user/csrf-token",
    })
    .then((res) => {
        document.cookie = `CSRF_TOKEN=${res.data.csrfToken};`;
    })
    .catch((err) => {
        console.log(err);
    })
};