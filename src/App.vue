<template>
	<navbar-header/>
	<RouterView/>
	<home-footer/>
</template>
<script>
import HomeView from './views/HomeView.vue';
export default{
	components:{
		HomeView
	},
}
</script>
<style lang="scss">
@import "bootstrap/dist/css/bootstrap.min.css";
@import "swiper/css";
@import "swiper/css/pagination";
@import "@/assets/styles/global.scss";

.swiper {
   z-index: 0 !important;
		
	.swiper-pagination-bullet-active {
   	background-color: #fff;
   	width: 40px;
   	height: 8px;
   	border-radius: 3px;		
	}
}

.home__navigation{
	.swiper{
		.swiper-button-prev{
			display: none;
		}

		.swiper-button-next {
		background-color: #fff;
		padding: 0 10px;
		right: -1px;

		&:after {
			font-size: 35px;
			font-weight: 700;
			color: $main-color;
			@media(max-width:1050px){
				font-size: 25px;
			}
			@media(max-width:820px){
				font-size: 20px;
			}
			@media(max-width:400px){
				font-size: 16px;
			}
		}
	}
	}
}

</style>
