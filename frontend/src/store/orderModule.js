import OrderService from "@/server/orders";

export const orderModule = {
   state: () => ({
      userOrder: {
         orderNum: Math.floor(Math.random() * 10000000),
         orderProducts: [],
         totalSumm: 0,
      },
      isLoading: true,
      errors: null,
   }),
   getters: {},
   mutations: {
      deleteProduct(state, id) {
         state.userOrder.orderProducts = state.userOrder.orderProducts.filter(
            (order) => order.product.id !== id
         );
      },
      totalSumm(state) {
         const totalSumms = state.userOrder.orderProducts.map((order) => {
            return order.product.price * order.quantity;
         });
         const totalPrice = totalSumms.reduce((a, b) => a + b, 0);
         state.userOrder.totalSumm = +totalPrice.toFixed(2);
      },
      changeQuantity(state, { id, quantity }) {
         console.log(id, quantity);
         state.userOrder.orderProducts.forEach((order) => {
            if (order.product.id === id) {
               order.quantity = quantity;
            }
         });
      },
      addProduct(state, product) {
         state.userOrder.orderProducts.push(product);
      },
      orderStart(state) {
         state.isLoading = true;
         state.product = null;
         state.errors = null;
      },
      orderSuccess(state) {
         state.isLoading = false;
         state.userOrder.orderProducts = [];
      },
      orderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getOrderStart(state) {
         state.isLoading = true;
         //state.product = null;
         state.errors = null;
      },
      getOrderSuccess(state) {
         state.isLoading = false;
      },
      getOrderFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      async addProduct(context, product) {
         const existProduct = context.state.userOrder.orderProducts.filter(
            (p) => p.product.id === product.product.id
         );
         if (existProduct.length === 0) {
            await context.commit("addProduct", product);
         } else {
            const id = product.product.id;
            const quantity = product.quantity;
            await context.commit("changeQuantity", { id, quantity });
         }
         context.commit("totalSumm");
      },
      addOrder(context, order) {
         return new Promise((resolve) => {
            context.commit("orderStart");
            OrderService.order(order)
               .then((response) => {
                  context.commit("orderSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("orderFailure", error.response.data);
               });
         });
      },
      getOrdersByUserId(context, userid) {
         return new Promise((resolve) => {
            context.commit("getOrderStart");
            OrderService.getOrdersByUserId(userid)
               .then((response) => {
                  context.commit("getOrderSuccess");
                  resolve(response.data);
               })
               .catch((error) => {
                  context.commit("getOrderFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
