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
   updateUserInfo(user) {
      let formData = new FormData();
      formData.append("avatar", user.avatar);
      formData.append("name", user.name);
      formData.append("surname", user.surname);
      formData.append("newPassword", user.newPassword);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("extraPhone", user.extraPhone);
      formData.append("password", user.password);
      return axios.put(`/users/${user.id}`, formData);
   },
};

export default AuthService;
