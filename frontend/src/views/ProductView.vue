<template>
		<div class=" wrapper">
			<h2 class="title">{{CategoryName}}</h2>
			<product-list />
		</div>
		
</template>

<script>
import {mapState} from 'vuex'
	export default {
		data(){
			return{
				
			}
		},
		computed:{
			...mapState({
      	categories: state=>state.product.categories,
			category:state=>state.product.category
			}),
			CategoryName(){
				return this.categories.filter(item=>item.category===this.category)[0].title
			}
		},
		methods:{
			statusProductList(){
				this.$store.state.product.page=1
				this.$store.state.product.category=this.$route.params.category
				this.$store.state.product.pageLimit=10
			}
		},
		mounted(){
			this.statusProductList()
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		padding-top: 130px;
		@media (max-width: 819px){
		padding-top: 80px;
		
		}
		.title{
			font-weight: 500;
    		font-size: 27.1585px;
    		line-height: 19px;
			margin-left: 25px;
		}
	}
</style>