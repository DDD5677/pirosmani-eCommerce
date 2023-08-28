export const orderModule = {
   state: () => ({
      userOrder: {
         orderNum: Math.floor(Math.random() * 10000000),
         orderProducts: [],
         totalSumm: 0,
         customerData: null,
         hasDelivered: null,
         payment: null,
      },
      isLoading: true,
      errors: null,
   }),
   mutations: {
      addProduct(state, product) {
         state.userOrder.orderProducts.push(product);
      },
      productStart(state) {
         state.isLoading = true;
         state.product = null;
         state.errors = null;
      },
      productSuccess(state, payload) {
         state.isLoading = false;
         state.product = payload;
         state.totalSumm = payload.price;
      },
      productFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {},
   namespaced: true,
};
