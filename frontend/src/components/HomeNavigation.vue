<template>
	<section class="home__navigation">
         <div class="container">
            <swiper
				:free-mode="true"
				:slidesPerView='5'
				:breakpoints="{
					'320': {
         			slidesPerView: 3,
         			spaceBetween: 10,
      			},
      			'460': {
         			slidesPerView: 3,
         			spaceBetween: 30,
      			},
      			'560': {
         			slidesPerView: 4,
         			spaceBetween: 20,
      			},
      			'630': {
         			slidesPerView: 4,
         			spaceBetween: 30,
      			},
      			'920': {
         			slidesPerView: 5,
         			spaceBetween: 30,
      			},
					'1000': {
         			slidesPerView: 5,
         			spaceBetween: 50,
      			},
    }"
				:navigation="true"
				:modules="modules"
				class="swiper home__navigationSwiper ">
                  <swiper-slide class="swiper-slide" v-for="(item, index) in categories" :key="item.title">
							<span 
							@click.stop="toggleActive(index)"
							@click="SortP(item.category)"
							:class="{'active':activeIndex===index,}" 
							
                     >{{ item.title }}</span
                  ></swiper-slide>
            </swiper>
         </div>
      </section>
</template>

<script>
//import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation,FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {mapState, mapMutations} from 'vuex';

	export default {
		name:'home-nav',
		components: {
      	Swiper,
      	SwiperSlide,
    	},
		data(){
			return{
				activeIndex:0
			}
			
		},
		computed:{
			...mapState({
      	categories: state=>state.product.categories,
			}),
		},
		methods: {
			...mapMutations({
				SortP:'product/SortP',
			}),
			toggleActive(index) {
			this.activeIndex=index;
			}
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
				modules:[
		  			FreeMode,
		  			Navigation]
         
      	};
    	},
	}
</script>

<style lang="scss" scoped>
.home__navigation {

.swiper {
	
	.swiper-slide{
		width: auto !important;
	}
	.swiper-wrapper {
		align-items: center;
		width: calc(100% - 30px);
		margin-left: 0;

		span {
			font-family: $font;
			flex-grow: 1;
			cursor: pointer;
			// margin-right: 50px !important;
			text-transform: uppercase;
			display: inline-block;
			//text-decoration: none;
			font-weight: 400;
			font-size: 23.3333px;
			line-height: 27px;
			color: #4F4F4F;
			padding: 8px 16px;
			border-radius: 5px;
			@media(max-width:819px){
				font-size: 18px;
               line-height: 20px;
			}
			@media(max-width:630px){
				font-size: 16px;
			}
			@media(max-width:460px){
				//  font-size: 14px;
				padding: 6px 12px;
			}
			@media(max-width:400px){
				font-size: 14px;
				padding: 5px 10px;
			}
			@media(max-width:335px){
				font-size: 12px;
			}
			&.active {
				background-color: $main-color;
				color: #fff;
				
			}
		}

		
	}
	
	
}
}
// @media(max-width:819px){
// 	.home__navigation {
//       .swiper {
//          .swiper-wrapper {
//             a {
//                font-size: 18px;
//                line-height: 20px;
//             }
//          }

//          .swiper-button-next {
//             display: none;
//          }
//       }
//    }
// }
</style>