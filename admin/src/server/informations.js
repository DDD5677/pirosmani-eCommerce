import axios from "./axios";

const InfoService = {
   getInfo() {
      return axios.get("/informations");
   },
   updateInfo(data) {
      return axios.put(`/informations/${data.id}`, data);
   },
};
export default InfoService;
