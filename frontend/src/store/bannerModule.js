import BannerService from "@/server/banner";

export const bannerModule = {
   state: () => ({
      banners: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      bannerStart(state) {
         state.isLoading = true;
         state.banners = null;
         state.errors = null;
      },
      bannerSuccess(state, payload) {
         state.isLoading = false;
         state.banners = payload;
      },
      bannerFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getBanners(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("bannerStart");
            BannerService.getBanners(payload)
               .then((response) => {
                  context.commit("bannerSuccess", response.data);
                  resolve(response.data);
               })
               .catch((error) => {
                  context.commit("bannerFailure", error.response.data);
                  reject(error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
