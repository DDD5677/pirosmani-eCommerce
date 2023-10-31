import { createStore } from "vuex";
import { productModule } from "@/store/productModule";
import { singleProductModule } from "@/store/singleProductModule";
import { navbarModule } from "@/store/navbarModule";
import { authModule } from "./authModule";
import { orderModule } from "./orderModule";
import { bannerModule } from "./bannerModule";

export default createStore({
   modules: {
      product: productModule,
      navbar: navbarModule,
      singleProduct: singleProductModule,
      auth: authModule,
      order: orderModule,
      banner: bannerModule,
   },
});
