import axios from "axios";

const api = axios.create({
  baseURL: `${process.ENV.REACT_APP_API}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {

    return Promise.reject(err);
  }
);

export default api;
