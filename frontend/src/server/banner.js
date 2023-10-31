import axios from "./axios";

const BannerService = {
   getBanners() {
      return axios.get("banners");
   },
};

export default BannerService;
