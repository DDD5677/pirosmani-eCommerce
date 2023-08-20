import { createStore } from "vuex";
import { productModule } from "@/store/productModule";
import { singleProductModule } from "@/store/singleProductModule";
import { navbarModule } from "@/store/navbarModule";
import { modalModule } from "./modalModule";

export default createStore({
   modules: {
      product: productModule,
      navbar: navbarModule,
      modal: modalModule,
      singleProduct: singleProductModule,
   },
});
