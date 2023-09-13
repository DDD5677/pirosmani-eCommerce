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
   postReviews(data) {
      return axios.put("reviews", data);
   },
   getReviewsByUserId(id) {
      return axios.get(`reviews/${id}`);
   },
};

export default ProductService;
