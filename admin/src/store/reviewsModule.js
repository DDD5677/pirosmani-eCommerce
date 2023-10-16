import ReviewService from "@/server/reviews";

export const reviewsModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      reviews: null,
      review: null,
      isLoading: true,
      errors: null,
      reviewLoading: true,
   }),
   mutations: {
      changeLimit(state, limit) {
         state.limit = limit;
      },
      changePage(state, page) {
         state.page = page;
      },
      getReviewStart(state) {
         state.isLoading = true;
         state.reviews = null;
         state.errors = null;
      },
      getReviewSuccess(state, payload) {
         state.isLoading = false;
         state.reviews = payload.reviewsList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit.toString();
      },
      getReviewFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getReviewByIdStart(state) {
         state.reviewLoading = true;
         state.review = null;
         state.errors = null;
      },
      getReviewByIdSuccess(state, payload) {
         state.reviewLoading = false;
         state.review = payload;
      },
      getReviewByIdFailure(state, payload) {
         state.reviewLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getReviews(context, payload) {
         return new Promise(() => {
            context.commit("getReviewStart");
            ReviewService.getReviews(payload)
               .then((res) => {
                  context.commit("getReviewSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getReviewFailure", error.response.data);
               });
         });
      },
      getReviewById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getReviewByIdStart");
            ReviewService.getReviewById(payload)
               .then((res) => {
                  context.commit("getReviewByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getReviewByIdFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
