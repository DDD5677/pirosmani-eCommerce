import axios from "./axios";

const UserService = {
   getUsers(payload) {
      return axios.get("/users", {
         params: {
            page: payload.page,
         },
      });
   },
};

export default UserService;
