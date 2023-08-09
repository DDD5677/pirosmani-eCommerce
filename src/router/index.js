import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import DeliveryView from "../views/DeliveryView.vue";
import PaymentView from "../views/PaymentView.vue";

const routes = [
   {
      path: "/",
      name: "home",
      component: HomeView,
   },
   {
      path: "/products/:category",
      name: "products",
      component: ProductView,
   },
   {
      path: "/delivery",
      name: "delivery",
      component: DeliveryView,
   },
   {
      path: "/payment",
      name: "payment",
      component: PaymentView,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
