<template>
	<section class="home__banner">
         <div class="container">
            <button
               class="tableReservation__btn"
					@click.prevent="toggleBookTableHandler"
            >
               Забронировать стол
               <img src="@/assets/images/tableReservation__btn-arrow.svg" alt="" />
            </button>
            <swiper
				:modules="modules"
				:spaceBetween='10'
				:pagination="{ clickable: true }"
				class="swiper home__bannerSwiper">
               
                  <swiper-slide v-for="(banner,index) in home_banner" :key="index" class="home__banner-wrapper swiper-slide">
                     <div class="left">
                        <h1 class="title">{{ banner.title }}</h1>
                        <div class="subtitle">
                           {{ banner.subtitle }}
                        </div>
                        <green-btn>Подписаться</green-btn>
                     </div>
                     <div class="right">
                        <img :src="banner.img" alt="" />
                     </div>
                  </swiper-slide>
            </swiper>
         </div>
      </section>
</template>

<script>
import { Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { mapState,mapMutations } from 'vuex';
import img1 from '@/assets/images/home__banner-bg.png';
	export default {
		name:'home-banner',
		components: {
			Swiper,
      	SwiperSlide,
		},
	 	data(){
			return{
				home_banner:[
					{
						title:'Подарок на первый заказ.',
						subtitle:'Получите 500 рублей за подписку на рассылку',
						img:img1
					},
					{
						title:'Подарок на первый заказ.',
						subtitle:'Получите 500 рублей за подписку на рассылку',
						img:img1
					},
					{
						title:'Подарок на первый заказ.',
						subtitle:'Получите 500 рублей за подписку на рассылку',
						img:img1
					},
				]
			}
	 	},
		methods:{
			...mapMutations({
				toggleModal:'navbar/toggleModal',
				toggleBookTable:'navbar/toggleBookTable'
			}),
			toggleBookTableHandler(){
				this.toggleModal(true)
				this.toggleBookTable()
			},
			
		},
    	setup() {
      	const onSwiper = (swiper) => {
        console.log(swiper);
      	};
      	const onSlideChange = () => {
        console.log('slide change');
      	};
      	return {
        onSwiper,
        onSlideChange,
		  modules: [Pagination],
      	};
    	},
	}
</script>

<style lang="scss" scoped>

.tableReservation__btn {
      display: none;
   }
.home__banner {
   padding-top: 140px;
   padding-bottom: 17px;
}
.home__banner-wrapper {
      background: linear-gradient(180deg, #F1F1FB 0%, #EBEBF5 100%);
      box-shadow: 0px 0px 18.0727px rgba(0, 0, 0, 0.03);
      border-radius: 18px;
		overflow: hidden;
      display: flex;

      .left {
         padding: 40px 0 50px 40px;

         flex: 0 0 60%;
      }

      .right {
         flex: 0 0 40%;

         img {
            width: 100%;
            height: 100%;
         }
      }



      .title {
         font-weight: 400;
         font-size: 31.6273px;
         line-height: 38px;
         color: #333333;
      }

      .subtitle {
         margin-bottom: 33px;
         font-weight: 400;
         font-size: 19.88px;
         line-height: 24px;
         color: #828282;

      }

      .green__btn {
         font-weight: 500;
         font-size: 25px;
         line-height: 30px;
      }
   }
	@media (max-width: 819px){
	.home__banner {
    padding-top: 75px;
    padding-bottom: 8px;
	}
	}
</style>