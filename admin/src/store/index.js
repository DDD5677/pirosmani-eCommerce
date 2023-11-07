import { createStore } from "vuex";
import { ordersModule } from "./ordersModule";
import { authModule } from "./authModule";
import { reviewsModule } from "./reviewsModule";
import { usersModule } from "./usersModule";
import { productsModule } from "./productsModule";
import { categoryModule } from "./categoryModule";
import { reservationModule } from "./reservationModule";
import { bannerModule } from "./bannerModule";
import { infoModule } from "./infoModule";

export default createStore({
   modules: {
      order: ordersModule,
      auth: authModule,
      review: reviewsModule,
      user: usersModule,
      product: productsModule,
      category: categoryModule,
      reservation: reservationModule,
      banner: bannerModule,
      info: infoModule,
   },
});
