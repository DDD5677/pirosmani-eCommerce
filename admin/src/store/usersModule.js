import UserService from "@/server/users";

export const usersModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      users: null,
      user: null,
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
      getUserStart(state) {
         state.isLoading = true;
         state.users = null;
         state.errors = null;
      },
      getUserSuccess(state, payload) {
         state.isLoading = false;
         state.users = payload.usersList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit.toString();
      },
      getUserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getUserByIdStart(state) {
         state.isLoading = true;
         state.user = null;
         state.errors = null;
      },
      getUserByIdSuccess(state, payload) {
         state.isLoading = false;
         state.user = payload;
      },
      getUserByIdFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      postUserStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postUserSuccess(state) {
         state.isLoading = false;
      },
      postUserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteUserStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteUserSuccess(state) {
         state.isLoading = false;
      },
      deleteUserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getUsers(context, payload) {
         return new Promise(() => {
            context.commit("getUserStart");
            UserService.getUsers(payload)
               .then((res) => {
                  context.commit("getUserSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getUserFailure", error.response.data);
               });
         });
      },
      getUserById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getUserByIdStart");
            UserService.getUserById(payload)
               .then((res) => {
                  context.commit("getUserByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getUserByIdFailure", error.response.data);
               });
         });
      },
      postUsers(context, payload) {
         return new Promise(() => {
            context.commit("postUserStart");
            UserService.postUsers(payload)
               .then((res) => {
                  context.commit("postUserSuccess");
               })
               .catch((error) => {
                  context.commit("postUserFailure", error.response.data);
               });
         });
      },
      updateUser(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postUserStart");
            UserService.updateUser(payload)
               .then((response) => {
                  context.commit("postUserSuccess", response.data);
                  resolve();
               })
               .catch((error) => {
                  context.commit("postUserFailure", error.response.data);
               });
         });
      },
      deleteUsers(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteUserStart");
            UserService.deleteUsers(payload)
               .then((res) => {
                  context.commit("deleteUserSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteUserFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
