import { setItem } from "@/helpers/localStorage";
import AuthService from "@/server/auth";

export const authModule = {
   state: () => ({
      isLoading: true,
      user: null,
      errors: null,
      updateErrors: null,
      isLogged: null,
   }),
   mutations: {
      cleanErrors(state) {
         state.errors = null;
      },
      addOrder(state, product) {
         state.user.user.orders.push(product);
      },
      registerStart(state) {
         state.isLoading = true;
         //state.user = null;
         state.errors = null;
      },
      registerSuccess(state, payload) {
         state.isLoading = false;
         //state.user = payload;
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
      updateStart(state) {
         state.isLoading = true;
         state.updateErrors = null;
      },
      updateSuccess(state, payload) {
         state.isLoading = false;
         state.user = payload;
      },
      updateFailure(state, payload) {
         state.isLoading = false;
         state.updateErrors = payload;
      },
   },
   actions: {
      register(context, user) {
         return new Promise((resolve, reject) => {
            context.commit("registerStart");
            AuthService.register(user)
               .then((response) => {
                  context.commit("registerSuccess", response.data);
                  resolve();
               })
               .catch((error) => {
                  context.commit("registerFailure", error.response.data);
                  reject();
               });
         });
      },
      login(context, user) {
         return new Promise((resolve, reject) => {
            context.commit("loginStart");
            AuthService.login(user)
               .then((response) => {
                  setItem("token", response.data.token);
                  context.commit("loginSuccess", response.data);
                  resolve();
               })
               .catch((error) => {
                  context.commit("loginFailure", error.response.data);
                  reject();
               });
         });
      },
      refresh(context) {
         return new Promise((resolve, reject) => {
            context.commit("loginStart");
            AuthService.refresh()
               .then((response) => {
                  context.commit("loginSuccess", response.data);
               })
               .catch((error) => {
                  context.commit("loginFailure", error.response.data);
               });
         });
      },
      updateUserInfo(context, updateUser) {
         return new Promise((resolve, reject) => {
            context.commit("updateStart");
            AuthService.updateUserInfo(updateUser)
               .then((response) => {
                  context.commit("updateSuccess", response.data);
                  resolve(response.data.user);
               })
               .catch((error) => {
                  context.commit("updateFailure", error.response.data);
                  reject();
               });
         });
      },
   },
   namespaced: true,
};
