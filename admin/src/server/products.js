import axios from "./axios";

const ProductService = {
   getProducts(payload) {
      return axios.get("/products", {
         params: {
            page: payload.page,
            limit: payload.limit,
            sort: payload.sort,
            price: {
               lte: payload.max_price,
               gte: payload.min_price,
            },
            isFeatured: payload.isFeatured,
            countInStock: { gte: payload.min_count },
         },
      });
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
};

export default ProductService;
