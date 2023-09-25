import axios from "./axios";

const AuthService = {
   register(user) {
      return axios.post("/users/register", user);
   },
   login(user) {
      return axios.post("/users/admin/login", user);
   },
   refresh() {
      return axios.get("/users/get/user");
   },
   updateUserInfo(user) {
      return axios.put(`/users/${user.id}`, user);
   },
   updateUserAvatar(data) {
      let formData = new FormData();
      formData.append("avatar", data.avatar);
      return axios.put(`/users/avatar/${data.id}`, formData);
   },
   getUsers() {
      return axios.get("/users");
   },
};

export default AuthService;
