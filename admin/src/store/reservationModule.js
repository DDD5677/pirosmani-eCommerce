import ReservationService from "@/server/reservations";

export const reservationModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: 1,
      reservations: null,
      reserv: null,
      order: null,
      saledCount: 0,
      isLoading: true,
      reserLoading: true,
      errors: null,
   }),
   mutations: {
      changeLimit(state, limit) {
         state.limit = limit;
      },
      changePage(state, page) {
         state.page = page;
      },
      getReserStart(state) {
         state.isLoading = true;
         state.reservations = null;
         state.errors = null;
      },
      getReserSuccess(state, payload) {
         state.isLoading = false;
         state.reservations = payload.reservationList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit.toString();
      },
      getReserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      getReserByIdStart(state) {
         state.reserLoading = true;
         state.reserv = null;
         state.errors = null;
      },
      getReserByIdSuccess(state, payload) {
         state.reserLoading = false;
         state.reserv = payload;
      },
      getReserByIdFailure(state, payload) {
         state.reserLoading = false;
         state.errors = payload;
      },
      updateReserStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      updateReserSuccess(state, payload) {
         state.isLoading = false;
         state.order = payload;
      },
      updateReserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      deleteReserStart(state) {
         state.isLoading = true;
         state.errors = null;
      },
      deleteReserSuccess(state) {
         state.isLoading = false;
      },
      deleteReserFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getReservations(context, payload) {
         return new Promise(() => {
            context.commit("getReserStart");
            ReservationService.getReservations(payload)
               .then((res) => {
                  context.commit("getReserSuccess", res.data);
               })
               .catch((error) => {
                  context.commit("getReserFailure", error.response.data);
               });
         });
      },
      getReserById(context, payload) {
         return new Promise((resolve) => {
            context.commit("getReserByIdStart");
            ReservationService.getReserById(payload)
               .then((res) => {
                  context.commit("getReserByIdSuccess", res.data);
                  resolve(res.data);
               })
               .catch((error) => {
                  context.commit("getReserByIdFailure", error.response.data);
               });
         });
      },
      updateReservation(context, payload) {
         return new Promise((resolve) => {
            context.commit("updateReserStart");
            ReservationService.updateReservation(payload)
               .then((res) => {
                  context.commit("updateReserSuccess", res.data);
                  resolve();
               })
               .catch((error) => {
                  context.commit("updateReserFailure", error.response.data);
               });
         });
      },
      deleteReservation(context, payload) {
         return new Promise((resolve) => {
            context.commit("deleteReserStart");
            ReservationService.deleteReservation(payload)
               .then((res) => {
                  context.commit("deleteReserSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("deleteReserFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
