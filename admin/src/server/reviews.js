import axios from "./axios";

const ReviewService = {
   getReviews(payload) {
      return axios.get("/reviews", {
         params: {
            page: payload.page,
            limit: payload.limit,
            sort: payload.sort,
            search: payload.search,
            user: payload.user,
            product: payload.product,
            status: payload.status,
            rating: payload.rating,
            date: {
               gte: payload.posted_since,
               lte: payload.posted_before,
            },
         },
      });
   },
   getReviewById(payload) {
      return axios.get(`/reviews/${payload}`);
   },
   updateReview(payload) {
      return axios.put(`/reviews`, payload);
   },
   deleteReviews(payload) {
      return axios.delete("/reviews", { data: payload });
   },
};

export default ReviewService;
