import axios from "axios";
import { getItem } from "../helpers/persistanceStore"; // getItem funksiyasini import qilish

axios.defaults.baseURL = "http://95.130.227.52:3112"; // Baza URL ni kiritish

axios.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    const authorization = token ? `Bearer ${token}` : "";
    config.headers.Authorization = authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
