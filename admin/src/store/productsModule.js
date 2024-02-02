import ProductService from "@/server/products";

export const productsModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      products: null,
      product: null,
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
         state.limit = payload.pagination.limit.toString();
      },
      getProductFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getProductByIdStart(state) {
         state.isLoading = true;
         state.product = null;
         state.errors = null;
      },
      getProductByIdSuccess(state, payload) {
         state.isLoading = false;
         state.product = payload;
      },
      getProductByIdFailure(state, payload) {
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
      deleteProductStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteProductSuccess(state) {
         state.isLoading = false;
      },
      deleteProductFailure(state, payload) {
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
      getProductById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getProductByIdStart");
            ProductService.getProductById(payload)
               .then((res) => {
                  context.commit("getProductByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getProductByIdFailure", error.response.data);
               });
         });
      },
      postProducts(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postProductStart");
            ProductService.postProducts(payload)
               .then((res) => {
                  context.commit("postProductSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("postProductFailure", error.response.data);
                  reject();
               });
         });
      },
      updateProducts(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postProductStart");
            ProductService.updateProducts(payload)
               .then((res) => {
                  context.commit("postProductSuccess");
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("postProductFailure", error.response.data);
                  reject();
               });
         });
      },
      deleteProducts(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteProductStart");
            ProductService.deleteProducts(payload)
               .then((res) => {
                  context.commit("deleteProductSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteProductFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
