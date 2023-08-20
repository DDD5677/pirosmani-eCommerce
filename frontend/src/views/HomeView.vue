<template>
  <home-banner/>
  <home-nav /> 
  <loading v-if="isLoading"/>
  <product-list v-if="!isLoading"/>
  <home-video/>
  <home-delivery/>
  
</template>

<script>
import { mapState } from 'vuex'
	export default {
		name:"home-view",
		data(){
			return{
				
			}
		},
		computed:{
			...mapState({
      	categories: state=>state.product.categories,
			page:state=>state.product.page,
			isLoading:state=>state.product.isLoading,

			}),
			queryProduct(){
				return{
					page:this.page,
					id:this.categories[0]._id
				}
			}
		},
		mounted(){
			this.$store.dispatch('product/getCategoryAndProduct');
		}
	}
</script>

<style lang="scss">

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
.home__products{
	padding: 30px 0 60px;
}
</style>
