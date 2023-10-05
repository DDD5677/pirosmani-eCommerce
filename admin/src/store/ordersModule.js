import OrderService from "@/server/orders";

export const ordersModule = {
   state: () => ({
      orders: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      orderStart(state) {
         state.isLoading = true;
         state.orders = null;
         state.errors = null;
      },
      orderSuccess(state, payload) {
         state.isLoading = false;
         state.orders = payload;
      },
      orderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getOrderStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      getOrderSuccess(state) {
         state.isLoading = false;
      },
      getOrderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      postReservationStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postReservationSuccess(state) {
         state.isLoading = false;
      },
      postReservationFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getOrders(context, payload) {
         return new Promise(() => {
            context.commit("orderStart");
            OrderService.getOrders(payload)
               .then((res) => {
                  console.log(res);
                  context.commit("orderSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("orderFailure", error.response.data);
               });
         });
      },
      postReservation(context, data) {
         return new Promise((resolve) => {
            context.commit("postReservationStart");
            OrderService.postReservation(data)
               .then((response) => {
                  context.commit("postReservationSuccess");
                  resolve(response.data);
               })
               .catch((error) => {
                  context.commit("postReservationFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
