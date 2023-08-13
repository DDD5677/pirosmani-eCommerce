import { createStore } from "vuex";
import { productModule } from "@/store/productModule";
import { navbarModule } from "@/store/navbarModule";
import { modalModule } from "./modalModule";

export default createStore({
   modules: {
      product: productModule,
      navbar: navbarModule,
      modal: modalModule,
   },
});
