<template>
	<section class="page__delivery">
         <div class="container">
            <h1 class="title">Вакансии</h1>
            <div class="job__box">
               <div class="job__name">Повар</div>
               <p class="job__requirement">
                  <b>Требования:</b> опыт от 3-х лет, умение готовить яишницу,
                  пельмени, пиццу и наливать чай. Работа в коллективе в 25
                  человек.
               </p>
               <p class="job__terms">
                  <b>Условия:</b> Сдельная плата за каждый бутерброд 5% от суммы
                  и фиксированный оклад 4000 грн.
               </p>
            </div>
            <div class="job__box">
               <div class="job__name">Повар</div>
               <p class="job__requirement">
                  <b>Требования:</b> опыт от 3-х лет, умение готовить яишницу,
                  пельмени, пиццу и наливать чай. Работа в коллективе в 25
                  человек.
               </p>
               <p class="job__terms">
                  <b>Условия:</b> Сдельная плата за каждый бутерброд 5% от суммы
                  и фиксированный оклад 4000 грн.
               </p>
            </div>
            <div class="job__box">
               <div class="job__name">Повар</div>
               <p class="job__requirement">
                  <b>Требования:</b> опыт от 3-х лет, умение готовить яишницу,
                  пельмени, пиццу и наливать чай. Работа в коллективе в 25
                  человек.
               </p>
               <p class="job__terms">
                  <b>Условия:</b> Сдельная плата за каждый бутерброд 5% от суммы
                  и фиксированный оклад 4000 грн.
               </p>
            </div>
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

   // .text {
   //    font-weight: 400;
   //    font-size: 22px;
   //    line-height: 26px;
   //    color: #828282;
	// 	@media (max-width: 819px){
   //   	 	font-size: 18px;
   //       line-height: 24px;
   // 	}
	// 	@media (max-width: 450px){
	// 		font-size: 16px;
   //       line-height: 20px;
   // 	}
   // }
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
			margin-bottom: 1rem;
         b {
            font-weight: 500;
         }
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