import axios from "axios";

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