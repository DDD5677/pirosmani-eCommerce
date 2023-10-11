import axios from "./axios";

const OrderService = {
   getOrders(payload) {
      return axios.get("/orders", {
         params: {
            page: payload.page,
            limit: payload.limit,
            sort: payload.sort,
            search: payload.search,
            totalPrice: {
               lte: payload.max_price,
               gte: payload.min_price,
            },
            user: payload.user,
         },
      });
   },
   getSaledCount(payload) {
      return axios.get(`/orders/saled/${payload}`);
   },
};

export default OrderService;
