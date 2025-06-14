import { getItem } from "@/helpers/localStorage";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.baseURL = "https://pirosmani.danisher.uz/api/v1";
//axios.defaults.baseURL = "https://pirosmani-backend.onrender.com/api/v1";
axios.defaults.headers.common["Authorization"] = "Bearer " + getItem("token");

export default axios;
