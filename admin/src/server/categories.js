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
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("icon", data.icon);
      formData.append("name", data.name);
      return axios.put(`/categories/${data.id}`, formData);
   },
   postCategory(data) {
      console.log("server", data);
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("icon", data.icon);
      formData.append("name", data.name);
      return axios.post(`/categories`, formData);
   },
};

export default CategoryService;
