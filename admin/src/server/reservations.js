import axios from "./axios";

const ReservationService = {
   getReservations(payload) {
      return axios.get("/reservations", {
         params: {
            page: payload.page,
            limit: payload.limit,
            sort: payload.sort,
            search: payload.search,
            date: payload.date,
            createdAt: payload.createdAt,
            status: payload.status,
            user: payload.user,
         },
      });
   },

   getReserById(payload) {
      return axios.get(`/reservations/${payload}`);
   },
   updateReservation(payload) {
      return axios.put(`/reservations`, payload);
   },
   deleteReservation(payload) {
      return axios.delete(`/reservations`, { data: payload });
   },
};

export default ReservationService;
