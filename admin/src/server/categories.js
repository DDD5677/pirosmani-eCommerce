import axios from "./axios";

const CategoryService = {
   getCategory() {
      return axios.get("/categories");
   },
   getCategoryById(payload) {
      return axios.get(`/categories/${payload}`);
   },
   deleteCategory(payload) {
      return axios.delete(`/categories/${payload}`);
   },
   updateCategory(data) {
      console.log("server", data);
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      return axios.put(`/categories/${data.id}`, formData);
   },
   // postUsers(data) {
   //    let formData = new FormData();
   //    formData.append("avatar", data.avatar);
   //    formData.append("name", data.name);
   //    formData.append("surname", data.surname);
   //    formData.append("isAdmin", data.isAdmin);
   //    formData.append("email", data.email);
   //    formData.append("phone", data.phone);
   //    formData.append("extraPhone", data.extraPhone);
   //    formData.append("password", data.password);
   //    return axios.post("/users", formData);
   // },
};

export default CategoryService;
