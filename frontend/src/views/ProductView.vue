<template>
		<div class="wrapper">
			<error v-if="errors" :error="errors"></error>
			
			<div class="container">
				<h2 v-if="!isLoading&&!errors" class="title">{{ currentCategory }}</h2>
			</div>
			<loading v-if="isLoading"/>
			<product-list v-if="!isLoading&&!errors" />
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
      	//products: state=>state.product.products,
			//category:state=>state.product.category,
			isLoading:state=>state.product.isLoading,
			errors:state=>state.product.errors,
			//page:state=>state.product.page
			}),
			currentCategory(){
				if(this.$route.query.categories){
					return this.categories.filter(c=>c._id===this.$route.query.categories)[0].name
				}else{
					return 'All'
				}
			}
		},
		mounted(){
			this.$store.dispatch('product/getProductByCategory',{
				id:this.$route.query.categories,
				page:this.$route.query.page})
			this.$store.commit('product/changeCategory',null)
		},
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
		}
	}
</style>