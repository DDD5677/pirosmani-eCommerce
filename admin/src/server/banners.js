import axios from "./axios";

const BannerService = {
   getBanner() {
      return axios.get("/banners");
   },
   getBannerById(payload) {
      return axios.get(`/banners/${payload}`);
   },
   deleteBanner(payload) {
      return axios.delete(`/banners/${payload}`);
   },
   updateBanner(data) {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("link", data.link);
      formData.append("button", data.button);
      formData.append("image", data.image);
      return axios.put(`/banners/${data.id}`, formData);
   },
   postBanner(data) {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("link", data.link);
      formData.append("button", data.button);
      formData.append("image", data.image);
      return axios.post(`/banners`, formData);
   },
};

export default BannerService;
