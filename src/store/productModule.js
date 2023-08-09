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

export const productModule = {
   state: () => ({
      //data
      page: 1,
      pageLimit: 5,
      category: "best-foods",
      products: JSON.parse(JSON.stringify(dataProduct)),
      categories: [
         {
            id: 1,
            title: "Лучшая еда",
            icon: icon_1,
            category: "best-foods",
         },
         {
            id: 2,
            title: "Гамбургер",
            icon: icon_2,
            category: "burgers",
         },
         {
            id: 3,
            title: "Пицца",
            icon: icon_3,
            category: "pizzas",
         },
         {
            id: 4,
            title: "Бутерброд",
            icon: icon_4,
            category: "sandwiches",
         },
         {
            id: 5,
            title: "Барбекю",
            icon: icon_5,
            category: "bbqs",
         },
         {
            id: 6,
            title: "Стейк",
            icon: icon_6,
            category: "steaks",
         },
         {
            id: 7,
            title: "Сосиска",
            icon: icon_7,
            category: "sausages",
         },
         {
            id: 8,
            title: "Жареный цыпленок",
            icon: icon_8,
            category: "fried-chicken",
         },
         {
            id: 9,
            title: "Хлеб",
            icon: icon_9,
            category: "breads",
         },
         {
            id: 10,
            title: "Десерт",
            icon: icon_10,
            category: "desserts",
         },
         {
            id: 11,
            title: "Мороженое",
            icon: icon_11,
            category: "ice-cream",
         },
         {
            id: 12,
            title: "Шоколад",
            icon: icon_12,
            category: "chocolates",
         },
         {
            id: 13,
            title: "Напитки",
            icon: icon_13,
            category: "drinks",
         },
      ],
   }),
   getters: {
      //computed
      SortProducts(state) {
         if (state.category === "" || state.category === "all") {
            return state.products;
         }
         return state.products.filter((p) => p.category === state.category);
      },
      calcPageSize(state, getters) {
         return Math.ceil(getters.SortProducts.length / state.pageLimit);
      },
      renderProducts(state, getters) {
         return getters.SortProducts.slice(
            (state.page - 1) * state.pageLimit,
            state.page * state.pageLimit
         );
      },
   },
   mutations: {
      //method
      SortP(state, category) {
         state.category = category;
         state.page = 1;
      },
      activePage(state, activeP) {
         state.page = activeP;
      },
   },
   actions: {
      //mutation
   },
   namespaced: true,
};
