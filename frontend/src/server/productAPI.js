import axios from "./axios";

const ProductService = {
   getProduct() {
      return axios.get("products");
   },
   getProductByCategory(payload) {
      return axios.get("products", {
         params: {
            category: payload.id,
            page: payload.page,
         },
      });
   },
   getProductById(id) {
      return axios.get(`products/${id}`);
   },
   postReviews(data) {
      return axios.put("reviews", data);
   },
   getReviews(id) {
      return axios.get(`reviews`, {
         params: {
            product: id,
         },
      });
   },
};

export default ProductService;
