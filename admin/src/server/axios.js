import { getItem } from "@/helpers/localStorage";
import axios from "axios";

//axios.defaults.baseURL = "https://pirosmani-backend.onrender.com/api/v1";
//axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.baseURL = "https://decco.space/api/v1";
//axios.defaults.headers.common["Authorization"] = "Bearer " + getItem("token");
axios.interceptors.request.use((config) => {
   config.headers.Authorization = "Bearer " + getItem("token");
   return config;
});

export default axios;
