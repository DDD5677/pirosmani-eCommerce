import BannerService from "@/server/banners";

export const bannerModule = {
   state: () => ({
      banners: null,
      banner: null,
      bannerLoading: true,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      getBannerStart(state) {
         state.isLoading = true;
         state.banners = null;
         state.errors = null;
      },
      getBannerSuccess(state, payload) {
         state.isLoading = false;
         state.banners = payload;
      },
      getBannerFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getBannerByIdStart(state) {
         state.bannerLoading = true;
         state.banner = null;
         state.errors = null;
      },
      getBannerByIdSuccess(state, payload) {
         state.bannerLoading = false;
         state.banner = payload;
      },
      getBannerByIdFailure(state, payload) {
         state.bannerLoading = false;
         state.errors = payload;
      },
      postBannerStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      postBannerSuccess(state) {
         state.isLoading = false;
      },
      postBannerFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteBannerStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteBannerSuccess(state) {
         state.isLoading = false;
      },
      deleteBannerFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getBanner(context) {
         return new Promise(() => {
            context.commit("getBannerStart");
            BannerService.getBanner()
               .then((res) => {
                  context.commit("getBannerSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getBannerFailure", error.response.data);
               });
         });
      },
      getBannerById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getBannerByIdStart");
            BannerService.getBannerById(payload)
               .then((res) => {
                  context.commit("getBannerByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getBannerByIdFailure", error.response.data);
               });
         });
      },
      postBanner(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postBannerStart");
            BannerService.postBanner(payload)
               .then((response) => {
                  context.commit("postBannerSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("postBannerFailure", error.response.data);
               });
         });
      },
      updateBanner(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("postBannerStart");
            BannerService.updateBanner(payload)
               .then((response) => {
                  context.commit("postBannerSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("postBannerFailure", error.response.data);
               });
         });
      },
      deleteBanner(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteBannerStart");
            BannerService.deleteBanner(payload)
               .then((res) => {
                  context.commit("deleteBannerSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteBannerFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
