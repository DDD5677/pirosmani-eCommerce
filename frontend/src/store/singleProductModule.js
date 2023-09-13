import ProductSevice from "@/server/productAPI.js";

export const singleProductModule = {
   state: () => ({
      product: null,
      totalSumm: 0,
      reviewsList: null,
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
      reviewsStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      reviewsSuccess(state) {
         state.isLoading = false;
      },
      reviewsFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getReviewsStart(state) {
         //state.isLoading = true;
         state.errors = null;
      },
      getReviewsSuccess(state, payload) {
         //state.isLoading = false;
         state.reviewsList = payload;
      },
      getReviewsFailure(state, payload) {
         //state.isLoading = false;
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

      postReviews(context, data) {
         return new Promise((resolve) => {
            context.commit("reviewsStart");
            ProductSevice.postReviews(data)
               .then((responce) => {
                  context.commit("reviewsSuccess");
                  resolve();
               })
               .catch((err) => {
                  context.commit("reviewsFailure", err);
               });
         });
      },
      getReviewsByUserId(context, data) {
         return new Promise(() => {
            context.commit("getReviewsStart");
            ProductSevice.getReviewsByUserId(data)
               .then((responce) => {
                  context.commit("getReviewsSuccess", responce.data);
               })
               .catch((err) => {
                  context.commit("getReviewsFailure", err);
               });
         });
      },
   },
   namespaced: true,
};
