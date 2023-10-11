import OrderService from "@/server/orders";

export const ordersModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      orders: null,
      order: null,
      saledCount: 0,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      changeLimit(state, limit) {
         state.limit = limit;
      },
      changePage(state, page) {
         state.page = page;
      },
      getOrderStart(state) {
         state.isLoading = true;
         state.orders = null;
         state.errors = null;
      },
      getOrderSuccess(state, payload) {
         state.isLoading = false;
         state.orders = payload.orderList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit.toString();
      },
      getOrderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getSaledCountStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      getSaledCountSuccess(state, payload) {
         state.saledCount = payload.saledCount;
         state.isLoading = false;
      },
      getSaledCountFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getOrders(context, payload) {
         return new Promise(() => {
            context.commit("getOrderStart");
            OrderService.getOrders(payload)
               .then((res) => {
                  context.commit("getOrderSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getOrderFailure", error.response.data);
               });
         });
      },
      getSaledCount(context, payload) {
         return new Promise(() => {
            context.commit("getSaledCountStart");
            OrderService.getSaledCount(payload)
               .then((res) => {
                  context.commit("getSaledCountSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getSaledCountFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
