import axios from "./axios";

const AuthService = {
   register(user) {
      return axios.post("/users/register", user);
   },
   login(user) {
      return axios.post("/users/login", user);
   },
   refresh() {
      return axios.get("/users/get/user");
   },
};

export default AuthService;
