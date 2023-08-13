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
import { ref } from "vue";

export default () => {
   const products = ref([]);
   products.value = JSON.parse(JSON.stringify(dataProduct));
   const categories = [
      {
         title: "Лучшая еда",
         icon: icon_1,
         category: "best-foods",
      },
      {
         title: "Гамбургер",
         icon: icon_2,
         category: "burgers",
      },
      {
         title: "Пицца",
         icon: icon_3,
         category: "pizzas",
      },
      {
         title: "Бутерброд",
         icon: icon_4,
         category: "sandwiches",
      },
      {
         title: "Барбекю",
         icon: icon_5,
         category: "bbqs",
      },
      {
         title: "Стейк",
         icon: icon_6,
         category: "steaks",
      },
      {
         title: "Сосиска",
         icon: icon_7,
         category: "sausages",
      },
      {
         title: "Жареный цыпленок",
         icon: icon_8,
         category: "fried-chicken",
      },
      {
         title: "Хлеб",
         icon: icon_9,
         category: "breads",
      },
      {
         title: "Десерт",
         icon: icon_10,
         category: "desserts",
      },
      {
         title: "Мороженое",
         icon: icon_11,
         category: "ice-cream",
      },
      {
         title: "Шоколад",
         icon: icon_12,
         category: "chocolates",
      },
      {
         title: "Напитки",
         icon: icon_13,
         category: "drinks",
      },
   ];

   return {
      products,
      categories,
   };
};
