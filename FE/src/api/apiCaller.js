import axios from "axios";

export default function callApi(endpoint, method, body) {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    return axios({
        method: method,
        url: DOMAIN + endpoint,
        data: body,
    }).catch((err) => console.log(err));
}
