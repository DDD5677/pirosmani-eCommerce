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
               <green-btn @click.prevent="alertMessage" class="green__btn">В каталог</green-btn>
               <transparent-btn @click.prevent="alertMessage">Об оплате</transparent-btn>
            </div>
         </div>
      </section>
</template>

<script>
	export default {
		methods:{
			alertMessage(){
				alert('Данная услуга находится в разработке')
			},
		}
	}
</script>

<style lang="scss" scoped>
.page__delivery {
   padding: 145px 0 60px;
		@media (max-width: 819px){
     	 padding: 85px 0 60px;
      
   	}
		@media (max-width: 630px){
			padding: 75px 0 50px;
		}
		@media (max-width: 450px){
			padding: 65px 0 25px;
		}
	
   .title {
      margin-bottom: 25px;
      font-family: $font;
      font-weight: 500;
      font-size: 28px;
      line-height: 33px;
		@media (max-width: 630px){
			margin-bottom: 20px;
		}
		@media (max-width: 450px){
			font-size: 24px;
         margin-bottom: 10px;
		}
   }

   .text {
      font-weight: 400;
      font-size: 22px;
      line-height: 26px;
      color: #828282;
		@media (max-width: 819px){
     	 	font-size: 18px;
         line-height: 24px;
   	}
		@media (max-width: 450px){
			font-size: 16px;
         line-height: 20px;
   	}
   }

   .links {
      margin-top: 45px;
		@media(max-width:450px){
         margin-top: 30px;
		}
		.green__btn {
         font-weight: 500;
         font-size: 20px;
         line-height: 21px;
         margin-right: 45px;
			@media(max-width:450px){
			font-size: 16px;
         margin-right: 10px;
			}
      }
		.transparent__btn{
			@media(max-width:450px){
				font-size: 17px;
            margin-right: 0;

            img {
               transform: scale(0.8);
            }
			}
		}

      
   }
}
</style>