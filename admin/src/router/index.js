import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import CreateUserView from "../views/CreateUserView.vue";

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
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
