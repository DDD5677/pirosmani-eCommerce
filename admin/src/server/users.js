import axios from "./axios";

const UserService = {
   getUsers(payload) {
      return axios.get("/users", {
         params: {
            page: payload.page,
            limit: payload.limit,
            sort: payload.sort,
         },
      });
   },
   getUserById(payload) {
      return axios.get(`/users/${payload}`);
   },
   postUsers(data) {
      let formData = new FormData();
      formData.append("avatar", data.avatar);
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("isAdmin", data.isAdmin);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("extraPhone", data.extraPhone);
      formData.append("password", data.password);
      return axios.post("/users", formData);
   },
   updateUser(user) {
      let formData = new FormData();
      formData.append("avatar", user.avatar);
      formData.append("name", user.name);
      formData.append("surname", user.surname);
      formData.append("isAdmin", user.isAdmin);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("extraPhone", user.extraPhone);
      formData.append("password", user.password);
      return axios.put(`/users/${user.id}`, formData);
   },
};

export default UserService;
