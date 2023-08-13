<template>
  <home-banner/>
  <home-nav />
  <product-list/>
  <home-video/>
  <home-delivery/>
  
</template>

<script>
	export default {
		name:"home-view",
		methods:{
			statusProductList(){
				this.$store.state.product.page=1
				this.$store.state.product.category='best-foods'
				this.$store.state.product.pageLimit=5
			}
		},
		mounted(){
			this.statusProductList()
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
