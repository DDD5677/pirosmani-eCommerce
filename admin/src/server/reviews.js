import axios from "./axios";

const ReviewService = {
   getReviews() {
      return axios.get("/reviews");
   },
};

export default ReviewService;
