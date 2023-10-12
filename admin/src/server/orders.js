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

   getOrderById(payload) {
      return axios.get(`/orders/${payload}`);
   },
   updateOrder(payload) {
      return axios.put(`/orders/${payload.id}`, { status: payload.status });
   },
   getSaledCount(payload) {
      return axios.get(`/orders/saled/${payload}`);
   },
   deleteOrders(payload) {
      return axios.delete(`/orders`, { data: payload });
   },
};

export default OrderService;
