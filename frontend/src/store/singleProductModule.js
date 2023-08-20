import ProductSevice from "@/server/productAPI.js";

export const singleProductModule = {
   state: () => ({
      product: null,
      totalSumm: 0,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      changeTotalSumm(state, summ) {
         state.totalSumm = summ;
      },
      productStart(state) {
         state.isLoading = true;
         state.product = null;
         state.errors = null;
      },
      productSuccess(state, payload) {
         state.isLoading = false;
         state.product = payload;
         state.totalSumm = payload.price;
      },
      productFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getProductById(context, payload) {
         return new Promise(() => {
            context.commit("productStart");
            ProductSevice.getProductById(payload)
               .then((responce) => {
                  context.commit("productSuccess", responce.data);
               })
               .catch((err) => {
                  context.commit("productFailure", err);
                  console.log(err);
               });
         });
      },
   },
   namespaced: true,
};
