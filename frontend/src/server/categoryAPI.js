import axios from "./axios";

const CategoryService = {
   getCategory() {
      return axios.get("categories");
   },
};

export default CategoryService;
