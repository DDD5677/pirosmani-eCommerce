import axios from "./axios";

const OrderService = {
   order(order) {
      return axios.post("/orders", order);
   },
   getOrdersByUserId(userid) {
      return axios.get(`/orders/get/userorders/${userid}`);
   },
};

export default OrderService;
