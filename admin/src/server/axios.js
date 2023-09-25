import { getItem } from "@/helpers/localStorage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers.common["Authorization"] = "Bearer " + getItem("token");

export default axios;
