import { setItem } from "@/helpers/localStorage";
import AuthService from "@/server/auth";

export const authModule = {
   state: () => ({
      isLoading: true,
      user: null,
      errors: null,
      showModal: false,
      signUp: false,
      signIn: true,
      forgotPassword: false,
      isLogged: null,
   }),
   mutations: {
      toggleModal(state, showModal) {
         state.showModal = showModal;
         state.signIn = true;
         state.signUp = false;
         state.forgotPassword = false;
      },
      toggleSignUp(state) {
         state.signIn = false;
         state.signUp = true;
         state.forgotPassword = false;
      },
      toggleSignIn(state) {
         console.log("ok google");
         state.signIn = true;
         state.signUp = false;
         state.forgotPassword = false;
      },
      toggleForgotPassword(state) {
         state.signIn = false;
         state.signUp = false;
         state.forgotPassword = true;
      },
      addOrder(state, product) {
         state.user.user.orders.push(product);
      },
      registerStart(state) {
         state.isLoading = true;
         state.user = null;
         state.errors = null;
      },
      registerSuccess(state, payload) {
         state.isLoading = false;
         state.user = payload;
      },
      registerFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      loginStart(state) {
         state.isLoading = true;
         state.user = null;
         state.errors = null;
         state.isLogged = null;
      },
      loginSuccess(state, payload) {
         state.isLoading = false;
         state.user = payload;
         state.isLogged = true;
      },
      loginFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
         state.isLogged = false;
      },
   },
   actions: {
      register(context, user) {
         return new Promise(() => {
            context.commit("registerStart");
            AuthService.register(user)
               .then((response) => {
                  context.commit("registerSuccess", response.data);
                  context.commit("toggleSignIn");
               })
               .catch((error) => {
                  context.commit("registerFailure", error.response.data);
               });
         });
      },
      login(context, user) {
         return new Promise((resolve, reject) => {
            context.commit("loginStart");
            AuthService.login(user)
               .then((response) => {
                  console.log("login response", response);
                  setItem("token", response.data.token);
                  context.commit("loginSuccess", response.data);
                  context.commit("toggleModal");
                  window.location.reload();
               })
               .catch((error) => {
                  console.log("error login", error);
                  context.commit("loginFailure", error.response.data);
               });
         });
      },
      refresh(context) {
         return new Promise((resolve, reject) => {
            context.commit("loginStart");
            AuthService.refresh()
               .then((response) => {
                  console.log("refresh");
                  setItem("token", response.data.token);
                  context.commit("loginSuccess", response.data);
               })
               .catch((error) => {
                  console.log("error refresh", error);
                  context.commit("loginFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
