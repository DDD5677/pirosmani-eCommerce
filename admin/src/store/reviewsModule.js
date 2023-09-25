import ReviewService from "@/server/reviews";

export const reviewsModule = {
   state: () => ({
      reviews: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      getReviewStart(state) {
         state.isLoading = true;
         state.reviews = null;
         state.errors = null;
      },
      getReviewSuccess(state, payload) {
         state.isLoading = false;
         state.reviews = payload;
      },
      getReviewFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getReviews(context) {
         return new Promise(() => {
            context.commit("getReviewStart");
            ReviewService.getReviews()
               .then((res) => {
                  console.log(res);
                  context.commit("getReviewSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getReviewFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
