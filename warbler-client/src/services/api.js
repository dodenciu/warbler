import axios from "axios";

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, path, data) {
    return new Promise((resove, reject) => {
        return axios[method](path, data)
        .then(res => {
            return resove(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error);
        });
    })
}

export default apiCall;