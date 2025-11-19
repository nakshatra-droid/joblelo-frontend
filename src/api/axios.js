import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", 
  withCredentials: true,                
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    
    return Promise.reject(err);
  }
);

export default api;
