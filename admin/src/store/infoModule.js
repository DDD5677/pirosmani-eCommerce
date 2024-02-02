import InfoService from "@/server/informations";

export const infoModule = {
   state: () => ({
      info: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      getInfoStart(state) {
         state.isLoading = true;
         state.info = null;
         state.errors = null;
      },
      getInfoSuccess(state, payload) {
         state.isLoading = false;
         state.info = payload;
      },
      getInfoFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      updateInfoStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      updateInfoSuccess(state) {
         state.isLoading = false;
      },
      updateInfoFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getInfo(context) {
         return new Promise((resolve, reject) => {
            context.commit("getInfoStart");
            InfoService.getInfo()
               .then((res) => {
                  context.commit("getInfoSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getInfoFailure", error.response.data);
                  reject();
               });
         });
      },
      updateInfo(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("updateInfoStart");
            InfoService.updateInfo(payload)
               .then((response) => {
                  context.commit("updateInfoSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("updateInfoFailure", error.response.data);
                  reject();
               });
         });
      },
   },
   namespaced: true,
};
