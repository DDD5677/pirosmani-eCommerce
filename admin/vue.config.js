const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
   transpileDependencies: true,
   devServer: {
      port: 8000,
   },
   css: {
      loaderOptions: {
         sass: {
            additionalData: `@import "@/assets/styles/variables.scss";`,
         },
      },
   },
});
