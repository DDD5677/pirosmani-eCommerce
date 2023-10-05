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
   getOrdersByUserId(userid) {
      return axios.get(`/orders/get/userorders/${userid}`);
   },
   postReservation(data) {
      return axios.post("/reservations", data);
   },
};

export default OrderService;
