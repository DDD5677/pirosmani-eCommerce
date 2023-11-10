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
				v-if="!isLoading"
				:modules="modules"
				:spaceBetween='10'
				:pagination="{ clickable: true }"
				class="swiper home__bannerSwiper">
               
					<swiper-slide v-for="(banner,index) in banners" :key="index" class="home__banner-wrapper swiper-slide">
						<div class="left">
							<div>
								<h1 class="title">{{ banner.title }}</h1>
								<div class="subtitle">
									{{ banner.subtitle }}
								</div>
							</div>
							<div>
								<green-btn @click.prevent="this.$router.push(banner.link)">{{ banner.button }}</green-btn>
							</div>
						</div>
						<div class="right">
							<img :src="banner.image" alt="" />
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
	export default {
		name:'home-banner',
		components: {
			Swiper,
      	SwiperSlide,
		},
	 	data(){
			return{
				
			}
	 	},
		computed:{
			...mapState({
				isLogged:state=>state.auth.isLogged,
				isLoading:state=>state.banner.isLoading,
				banners:state=>state.banner.banners
			})
		},
		methods:{
			...mapMutations({
				toggleModal:'navbar/toggleModal',
				toggleBookTable:'navbar/toggleBookTable'
			}),
			toggleBookTableHandler(){
				if(this.isLogged){
					this.toggleModal(true)
					this.toggleBookTable()
				}else{
					alert('Please log in!')
				}
			},
			
		},
		created(){
			this.$store.dispatch('banner/getBanners')
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
		height: 400px;
      .left {
         padding: 40px 0 50px 40px;
         flex: 0 0 50%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
      }

      .right {
         flex: 1 0 45%;
         img {
            width: 100%;
            height: 100%;
				object-fit: cover;
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
			position: relative;
			z-index: 99;
         font-weight: 500;
         font-size: 25px;
      }
   }

	@media (max-width: 1019px){
		.home__banner-wrapper{
			height: 350px;
			.left{
				.subtitle{
					margin-bottom: 20px;
				}
			}
		}
	}
	@media (max-width: 819px){
		.home__banner {
			padding-top: 75px;
			padding-bottom: 8px;
			
		}
		.home__banner-wrapper{
			
			height: 280px;
		}
	}
	@media (max-width: 619px){
		.home__banner{
			.home__banner-wrapper {
				.left{
					padding: 20px;
					.title{
						line-height: 25px;
						font-size: 18px;
					}
					.subtitle{
						line-height: 15px;
						margin-bottom: 10px;
					}
				}
				height: 230px;
			}
		}
	}
	@media (max-width: 439px){
		.home__banner{
			.home__banner-wrapper {
				height: 180px;
				.left{
					padding: 10px 5px 15px 15px ;
					.title{
						line-height: 18px;
						font-size: 18px;
						margin-bottom: 5px;
					}
					.subtitle{
						font-size: 14px;
						line-height: 14px;
					}
					.green__btn{
						font-size: 16px;
					}
				}
			}
		}
	}

</style>