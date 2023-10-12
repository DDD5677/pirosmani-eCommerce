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
      getOrderByIdStart(state) {
         state.isLoading = true;
         state.order = null;
         state.errors = null;
      },
      getOrderByIdSuccess(state, payload) {
         state.isLoading = false;
         state.order = payload;
      },
      getOrderByIdFailure(state, payload) {
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
      updateOrderStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      updateOrderSuccess(state, payload) {
         state.isLoading = false;
         state.order = payload;
      },
      updateOrderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteOrderStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteOrderSuccess(state) {
         state.isLoading = false;
      },
      deleteOrderFailure(state, payload) {
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
      getOrderById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getOrderByIdStart");
            OrderService.getOrderById(payload)
               .then((res) => {
                  context.commit("getOrderByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getOrderByIdFailure", error.response.data);
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
      updateOrder(context, payload) {
         return new Promise(() => {
            context.commit("updateOrderStart");
            OrderService.updateOrder(payload)
               .then((res) => {
                  context.commit("updateOrderSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("updateOrderFailure", error.response.data);
               });
         });
      },
      deleteOrders(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteOrderStart");
            OrderService.deleteOrders(payload)
               .then((res) => {
                  context.commit("deleteOrderSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteOrderFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
