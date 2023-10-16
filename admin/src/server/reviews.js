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
         },
      });
   },
   getReviewById(payload) {
      return axios.get(`/reviews/${payload}`);
   },
};

export default ReviewService;
