import axios from "./axios";

const InfoService = {
   getInfo() {
      return axios.get("informations");
   },
};

export default InfoService;
