import axios from "./axios";

const ReviewService = {
   getReviews(payload) {
      return axios.get("/reviews", {
         params: {
            user: payload.user,
         },
      });
   },
};

export default ReviewService;
