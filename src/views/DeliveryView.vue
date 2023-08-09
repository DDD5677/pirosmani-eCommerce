<template>
	<section class="page__delivery">
         <div class="container">
            <h1 class="title">Доставка</h1>
            <p class="text">
               Нашим гостям мы предлагаем жаркую парилку, разогретую до
               оптимального температурного режима и душистые веники. Благодаря
               правильному проектированию помещений русской бани в Домодедово,
               наш легкий пар не жжет кожу и не оставляет после себя головную
               боль. В банный комплекс входят: русская баня на дровах,
               оздоровительные SPA-процедуры, хаммам, бассейн и караоке. Для
               Вашего удобства в составе нашего комплекса имеется уютный зал,
               где Вы можете расслабиться и сделать заказ из нашего меню. Банный
               комплексе De’Lore рассчитан на одновременное посещение 25
               человек.
            </p>
            <p class="text">
               Нашим гостям мы предлагаем жаркую парилку, разогретую до
               оптимального температурного режима и душистые веники. Благодаря
               правильному проектированию помещений русской бани в Домодедово,
               наш легкий пар не жжет кожу и не оставляет после себя головную
               боль. В банный комплекс входят: русская баня на дровах,
               оздоровительные SPA-процедуры, хаммам, бассейн и караоке. Для
               Вашего удобства в составе нашего комплекса имеется уютный зал,
               где Вы можете расслабиться и сделать заказ из нашего меню. Банный
               комплексе De’Lore рассчитан на одновременное посещение 25
               человек.
            </p>
            <div class="links">
               <green-btn>В каталог</green-btn>
               <a href="#" class="transparent__btn"
                  ><span>Об оплате</span
                  ><img src="@/assets/images/transparent_btn-arrow.svg" alt=""
               /></a>
            </div>
         </div>
      </section>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.page__delivery {
   padding: 145px 0 60px;

   .title {
      margin-bottom: 25px;
      font-family: $font;
      font-weight: 500;
      font-size: 28px;
      line-height: 33px;
   }

   .text {
      font-weight: 400;
      font-size: 22px;
      line-height: 26px;
      color: #828282;
   }

   .job__box {
      margin-top: 30px;

      .job__name {
         margin-bottom: 25px;
         font-weight: 400;
         font-size: 24px;
         line-height: 29px;
      }

      p {
         font-weight: 400;
         font-size: 18px;
         line-height: 22px;
         color: #333333;

         b {
            font-weight: 500;
         }
      }
   }

   .links {
      margin-top: 45px;

      .green__btn {
         font-weight: 500;
         font-size: 20px;
         line-height: 21px;
         margin-right: 45px;
      }

      .transparent__btn {
         text-decoration: none;
         padding: 8px 15px;
         font-weight: 400;
         font-size: 22.2162px;
         line-height: 29px;
         text-align: center;
         color: $main-color;

         img {
            margin-left: 10px;
         }
      }
   }
}
</style>