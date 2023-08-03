<template>
	<section class="home__delivery">
         <div class="container">
            <div class="delivery__body">
               <h3 class="title">
                  Бесплатная доставка по Москве<br />
                  и Области от 2999 RUB!
               </h3>
					<green-btn>Оформить</green-btn>
            </div>
         </div>
      </section>
</template>

<script>
	export default {
		name:'home-delivery'
	}
</script>

<style lang="scss" scoped>
	.home__delivery {
   padding: 60px 0;
	@media (max-width: 920px){
		padding: 40px 0;
	}
	@media (max-width: 450px){
		padding: 20px 0;
	}
   .delivery__body {
      padding: 30px 0 59px 44px;
      background: #F2F2F2;
      box-shadow: 0px 0px 18.0727px rgba(0, 0, 0, 0.03);
      border-radius: 18.0727px;
      background-image: url(@/assets/images/delivery-bg.png);
      background-repeat: no-repeat;
      background-position: right center;
		@media (max-width: 630px){
			background-size: 70%;
		}
		@media (max-width: 540px){
			padding: 30px 20px 40px 20px;
		}
		@media (max-width: 450px){
			padding: 20px;
         background-size: 60%;
		}
      .title {
         font-weight: 400;
         font-size: 31.6273px;
         line-height: 38px;
         color: #333333;
         margin-bottom: 34px;
			@media (max-width: 920px) {
				font-size: 27px;
            line-height: 35px;
			}
			@media (max-width: 630px){
				font-size: 23px;
            line-height: 33px;
            margin-bottom: 25px;
			}
			@media (max-width: 540px){
				font-size: 20px;
            line-height: 30px;
			}
			@media (max-width: 450px){
				font-size: 18px;
            line-height: 25px;
			}
			@media (max-width: 380px){
				font-size: 15px;
            margin-bottom: 15px;
			}	
      }

      .green__btn {
         font-weight: 500;
         font-size: 25.3018px;
         line-height: 30px;
			@media (max-width: 920px) {
				font-size: 23px;
            line-height: 25px;
			}
			@media (max-width: 540px){
				font-size: 20px;
            line-height: 20px;
			}
			@media (max-width: 450px){
				font-size: 16px;
            line-height: 20px;
			}		
      }
   }
}

</style>