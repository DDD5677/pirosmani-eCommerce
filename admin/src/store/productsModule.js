import ProductService from "@/server/products";

export const productsModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      products: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      changeLimit(state, limit) {
         state.limit = limit;
      },
      changePage(state, page) {
         state.page = page;
      },
      getProductStart(state) {
         state.isLoading = true;
         state.products = null;
         state.errors = null;
      },
      getProductSuccess(state, payload) {
         state.isLoading = false;
         state.products = payload.productList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit;
      },
      getProductFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      postProductStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postProductSuccess(state) {
         state.isLoading = false;
      },
      postProductFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getProducts(context, payload) {
         return new Promise(() => {
            context.commit("getProductStart");
            ProductService.getProducts(payload)
               .then((res) => {
                  context.commit("getProductSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getProductFailure", error.response.data);
               });
         });
      },
      postProducts(context, payload) {
         return new Promise(() => {
            context.commit("postProductStart");
            ProductService.postProducts(payload)
               .then((res) => {
                  context.commit("postProductSuccess");
               })
               .catch((error) => {
                  context.commit("postProductFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
