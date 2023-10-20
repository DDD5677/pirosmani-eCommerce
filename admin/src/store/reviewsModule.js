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
      updateReviewStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      updateReviewSuccess(state) {
         state.isLoading = false;
      },
      updateReviewFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteReviewStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteReviewSuccess(state) {
         state.isLoading = false;
      },
      deleteReviewFailure(state, payload) {
         state.isLoading = false;
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
      updateReview(context, payload) {
         return new Promise((resolve) => {
            context.commit("updateReviewStart");
            ReviewService.updateReview(payload)
               .then((res) => {
                  context.commit("updateReviewSuccess");
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("updateReviewFailure", error.response.data);
               });
         });
      },
      deleteReviews(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteReviewStart");
            ReviewService.deleteReviews(payload)
               .then((res) => {
                  context.commit("deleteReviewSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteReviewFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
