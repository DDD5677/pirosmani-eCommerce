import CategoryService from "@/server/categories";

export const categoryModule = {
   state: () => ({
      categories: null,
      category: null,
      categoryLoading: true,
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
      getCategoryByIdStart(state) {
         state.categoryLoading = true;
         state.category = null;
         state.errors = null;
      },
      getCategoryByIdSuccess(state, payload) {
         state.categoryLoading = false;
         state.category = payload;
      },
      getCategoryByIdFailure(state, payload) {
         state.categoryLoading = false;
         state.errors = payload;
      },
      postCategoryStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postCategorySuccess(state) {
         state.isLoading = false;
      },
      postCategoryFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteCategoryStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteCategorySuccess(state) {
         state.isLoading = false;
      },
      deleteCategoryFailure(state, payload) {
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
                  context.commit("getCategorySuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getCategoryFailure", error.response.data);
               });
         });
      },
      getCategoryById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getCategoryByIdStart");
            CategoryService.getCategoryById(payload)
               .then((res) => {
                  context.commit("getCategoryByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getCategoryByIdFailure", error.response.data);
               });
         });
      },
      postCategory(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postCategoryStart");
            CategoryService.postCategory(payload)
               .then((response) => {
                  context.commit("postCategorySuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("postCategoryFailure", error.response.data);
               });
         });
      },
      updateCategory(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postCategoryStart");
            CategoryService.updateCategory(payload)
               .then((response) => {
                  context.commit("postCategorySuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("postCategoryFailure", error.response.data);
               });
         });
      },
      deleteCategory(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteCategoryStart");
            CategoryService.deleteCategory(payload)
               .then((res) => {
                  context.commit("deleteCategorySuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteCategoryFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
