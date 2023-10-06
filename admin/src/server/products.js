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

   getProductById(payload) {
      return axios.get(`/products/${payload}`);
   },

   postProducts(data) {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("country", data.country);
      formData.append("isFeatured", data.isFeatured);
      formData.append("category", data.category);
      formData.append("dsc", data.dsc);
      formData.append("richDsc", data.richDsc);
      formData.append("price", data.price);
      formData.append("countInStock", data.countInStock);
      return axios.post("/products", formData);
   },

   updateProducts(data) {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("country", data.country);
      formData.append("isFeatured", data.isFeatured);
      formData.append("category", data.category);
      formData.append("dsc", data.dsc);
      formData.append("richDsc", data.richDsc);
      formData.append("price", data.price);
      formData.append("countInStock", data.countInStock);
      return axios.put(`/products/${data.id}`, formData);
   },
};

export default ProductService;
