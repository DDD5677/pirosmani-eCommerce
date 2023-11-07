import { setItem } from "@/helpers/localStorage";
import AuthService from "@/server/auth";

export const authModule = {
   state: () => ({
      isLoading: true,
      user: null,
      errors: null,
      isLogged: null,
   }),
   mutations: {
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
      updateStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      updateSuccess(state, payload) {
         state.isLoading = false;
         state.user = payload;
      },
      updateFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      register(context, user) {
         return new Promise((resolve) => {
            context.commit("registerStart");
            AuthService.register(user)
               .then((response) => {
                  context.commit("registerSuccess", response.data);
                  resolve();
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
                  resolve();
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
                  resolve(response.data.user);
               })
               .catch((error) => {
                  console.log("error refresh", error);
                  context.commit("loginFailure", error.response.data);
                  reject();
               });
         });
      },
      updateUserInfo(context, updateUser) {
         return new Promise((resolve, reject) => {
            context.commit("updateStart");
            AuthService.updateUserInfo(updateUser)
               .then((response) => {
                  console.log("update", response.data);
                  context.commit("updateSuccess", response.data);
               })
               .catch((error) => {
                  console.log("error update", error);
                  context.commit("updateFailure", error.response.data);
               });
         });
      },
      updateUserAvatar(context, data) {
         return new Promise((resolve, reject) => {
            context.commit("updateStart");
            AuthService.updateUserAvatar(data)
               .then((response) => {
                  console.log("update avatar", response.data);
                  context.commit("updateSuccess", response.data);
               })
               .catch((error) => {
                  console.log("error update", error);
                  context.commit("updateFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
