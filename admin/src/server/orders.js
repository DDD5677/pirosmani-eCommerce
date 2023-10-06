import axios from "./axios";

const OrderService = {
   order(order) {
      return axios.post("/orders", order);
   },
   getOrders(payload) {
      return axios.get("/orders", {
         params: {
            user: payload.user,
         },
      });
   },
   getSaledCount(payload) {
      return axios.get(`/orders/saled/${payload}`);
   },
};

export default OrderService;
