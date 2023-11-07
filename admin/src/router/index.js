import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import CreateUserView from "../views/CreateUserView.vue";
import UserDetailView from "../views/UserDetailView.vue";
import ProductsView from "../views/ProductsView.vue";
import CreateProductView from "../views/CreateProductView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderDetailView from "../views/OrderDetailView.vue";
import ReviewsView from "../views/ReviewsView.vue";
import CategoryView from "../views/CategoryView.vue";
import BannerView from "../views/BannerView.vue";
import ReservationView from "../views/ReservationView.vue";
import SettingsView from "../views/SettingsView.vue";

const routes = [
   {
      path: "/",
      name: "home",
      meta: { layout: "main" },
      component: HomeView,
   },
   {
      path: "/login",
      name: "login",
      meta: { layout: "modal" },
      component: LoginView,
   },
   {
      path: "/users",
      name: "users",
      meta: { layout: "main" },
      component: UsersView,
   },
   {
      path: "/users/create",
      name: "create-user",
      meta: { layout: "main" },
      component: CreateUserView,
   },
   {
      path: "/users/:id",
      name: "user-detail",
      meta: { layout: "main" },
      component: UserDetailView,
   },
   {
      path: "/products",
      name: "products",
      meta: { layout: "main" },
      component: ProductsView,
   },
   {
      path: "/products/create",
      name: "create-product",
      meta: { layout: "main" },
      component: CreateProductView,
   },
   {
      path: "/products/:id",
      name: "product-detail",
      meta: { layout: "main" },
      component: ProductDetailView,
   },
   {
      path: "/orders",
      name: "orders",
      meta: { layout: "main" },
      component: OrdersView,
   },
   {
      path: "/orders/:id",
      name: "order-detail",
      meta: { layout: "main" },
      component: OrderDetailView,
   },
   {
      path: "/reviews",
      name: "reviews",
      meta: { layout: "main" },
      component: ReviewsView,
   },
   {
      path: "/categories",
      name: "categories",
      meta: { layout: "main" },
      component: CategoryView,
   },
   {
      path: "/banners",
      name: "banners",
      meta: { layout: "main" },
      component: BannerView,
   },
   {
      path: "/reservations",
      name: "reservations",
      meta: { layout: "main" },
      component: ReservationView,
   },
   {
      path: "/settings",
      name: "settings",
      meta: { layout: "main" },
      component: SettingsView,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
