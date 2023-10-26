import ProductSevice from "@/server/productAPI.js";
import CategoryService from "@/server/categoryAPI.js";

export const productModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: null,
      category: null,
      products: [],
      categories: [],
      isLoading: true,
      errors: null,
   }),
   mutations: {
      changePage(state, page) {
         state.page = page;
      },
      changeCategory(state, category) {
         state.category = category;
      },
      assignCategory(state, categories) {
         state.categories = categories;
         state.category = categories[0]._id;
      },
      productStart(state) {
         state.isLoading = true;
         state.products = null;
         state.errors = null;
      },
      productSuccess(state, payload) {
         state.isLoading = false;
         state.products = payload.productList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit;
      },
      productFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getProductByCategory(context, payload) {
         return new Promise(() => {
            context.commit("productStart");
            ProductSevice.getProductByCategory(payload)
               .then((responce) => {
                  context.commit("productSuccess", responce.data);
               })
               .catch((err) => {
                  context.commit("productFailure", err);
                  console.log(err);
               });
         });
      },
      getCategoryAndProduct(context) {
         return new Promise(() => {
            CategoryService.getCategory()
               .then((responce) => {
                  context.commit("assignCategory", responce.data);
                  context.dispatch("getProductByCategory", {
                     id: responce.data[0]._id,
                     page: 1,
                  });
               })
               .catch((err) => console.log(err));
         });
      },
      getCategory(context) {
         return new Promise(() => {
            CategoryService.getCategory()
               .then((responce) => {
                  context.commit("assignCategory", responce.data);
               })
               .catch((err) => console.log(err));
         });
      },
   },
   namespaced: true,
};
