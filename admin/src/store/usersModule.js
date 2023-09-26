import UserService from "@/server/users";

export const usersModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: null,
      users: null,
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
         state.limit = payload.pagination.limit;
      },
      getUserFailure(state, payload) {
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
   },
   actions: {
      getUsers(context, payload) {
         return new Promise(() => {
            context.commit("getUserStart");
            UserService.getUsers(payload)
               .then((res) => {
                  //console.log(res);
                  context.commit("getUserSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getUserFailure", error.response.data);
               });
         });
      },
      postUsers(context, payload) {
         return new Promise(() => {
            context.commit("postUserStart");
            UserService.postUsers(payload)
               .then((res) => {
                  console.log(res);
                  context.commit("postUserSuccess");
               })
               .catch((error) => {
                  context.commit("postUserFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
