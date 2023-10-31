import InfoService from "@/server/info";

export const infoModule = {
   state: () => ({
      info: null,
      isLoading: true,
      errors: null,
   }),
   mutations: {
      infoStart(state) {
         state.isLoading = true;
         state.info = null;
         state.errors = null;
      },
      infoSuccess(state, payload) {
         state.isLoading = false;
         state.info = payload[0];
      },
      infoFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getInfo(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("infoStart");
            InfoService.getInfo(payload)
               .then((res) => {
                  context.commit("infoSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("infoFailure", error.responce.data);
               });
         });
      },
   },
   namespaced: true,
};
