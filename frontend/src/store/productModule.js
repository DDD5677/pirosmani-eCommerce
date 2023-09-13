import dataProduct from "@/data/menus/customData.json";
import icon_1 from "@/assets/images/dropdown-1.svg";
import icon_2 from "@/assets/images/dropdown-2.svg";
import icon_3 from "@/assets/images/dropdown-3.svg";
import icon_4 from "@/assets/images/dropdown-4.svg";
import icon_5 from "@/assets/images/dropdown-5.svg";
import icon_6 from "@/assets/images/dropdown-6.svg";
import icon_7 from "@/assets/images/dropdown-7.svg";
import icon_8 from "@/assets/images/dropdown-8.svg";
import icon_9 from "@/assets/images/dropdown-9.svg";
import icon_10 from "@/assets/images/dropdown-10.svg";
import icon_11 from "@/assets/images/dropdown-11.svg";
import icon_12 from "@/assets/images/dropdown-12.svg";
import icon_13 from "@/assets/images/dropdown-13.svg";

import ProductSevice from "@/server/productAPI.js";
import CategoryService from "@/server/categoryAPI.js";

export const productModule = {
   state: () => ({
      page: 1,
      limit: null,
      pageSize: null,
      category: null,
      products: [],
      categories: [],
      isLoading: true,
      errors: null,
   }),
   mutations: {
      changePage(state, page) {
         state.page = page;
      },
      changeCategory(state, category) {
         state.category = category;
      },
      assignCategory(state, categories) {
         state.categories = categories;
         state.category = categories[0]._id;
      },
      productStart(state) {
         state.isLoading = true;
         state.products = null;
         state.errors = null;
      },
      productSuccess(state, payload) {
         state.isLoading = false;
         state.products = payload.productList;
         state.pageSize = payload.pagination.pageSize;
         state.page = +payload.pagination.page;
         state.limit = payload.pagination.limit;
      },
      productFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getProductByCategory(context, payload) {
         return new Promise(() => {
            context.commit("productStart");
            ProductSevice.getProductByCategory(payload)
               .then((responce) => {
                  context.commit("productSuccess", responce.data);
               })
               .catch((err) => {
                  context.commit("productFailure", err);
                  console.log(err);
               });
         });
      },
      getCategoryAndProduct(context) {
         return new Promise(() => {
            CategoryService.getCategory()
               .then((responce) => {
                  context.commit("assignCategory", responce.data);
                  context.dispatch("getProductByCategory", {
                     id: responce.data[0]._id,
                     page: 1,
                  });
               })
               .catch((err) => console.log(err));
         });
      },
      getCategory(context) {
         return new Promise(() => {
            CategoryService.getCategory()
               .then((responce) => {
                  context.commit("assignCategory", responce.data);
               })
               .catch((err) => console.log(err));
         });
      },
   },
   namespaced: true,
};
