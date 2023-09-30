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
      postUserStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postUserSuccess(state) {
         state.isLoading = false;
      },
      postUserFailure(state, payload) {
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
      postUsers(context, payload) {
         return new Promise(() => {
            context.commit("postUserStart");
            UserService.postUsers(payload)
               .then((res) => {
                  context.commit("postUserSuccess");
               })
               .catch((error) => {
                  context.commit("postUserFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
