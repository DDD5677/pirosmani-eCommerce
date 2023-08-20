import axios from "./axios";

const ProductService = {
   getProduct() {
      return axios.get("products");
   },
   getProductByCategory(payload) {
      return axios.get("products", {
         params: {
            categories: payload.id,
            page: payload.page,
         },
      });
   },
   getProductById(id) {
      return axios.get(`products/${id}`);
   },
};

export default ProductService;
