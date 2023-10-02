import CategoryService from "@/server/categories";

export const categoryModule = {
   state: () => ({
      categories: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      getCategoryStart(state) {
         state.isLoading = true;
         state.categories = null;
         state.errors = null;
      },
      getCategorySuccess(state, payload) {
         state.isLoading = false;
         state.categories = payload;
      },
      getCategoryFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getCategory(context) {
         return new Promise(() => {
            context.commit("getCategoryStart");
            CategoryService.getCategory()
               .then((res) => {
                  console.log(res);
                  context.commit("getCategorySuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getCategoryFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
