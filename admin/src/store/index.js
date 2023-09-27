import { createStore } from "vuex";
import { ordersModule } from "./ordersModule";
import { authModule } from "./authModule";
import { reviewsModule } from "./reviewsModule";
import { usersModule } from "./usersModule";
import { productsModule } from "./productsModule";

export default createStore({
   modules: {
      order: ordersModule,
      auth: authModule,
      review: reviewsModule,
      user: usersModule,
      product: productsModule,
   },
});
