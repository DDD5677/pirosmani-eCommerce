<template>
	<section class="home__products">
         <div class="container">
				
            <div  class="home__products-wrapper">
						<product  v-for="product in products" :product="product" :key="product.id"/>
						
            </div>
			
				<product-pagination />

         </div>
      </section>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
	export default {
		name:'product-list',
		computed:{
			...mapState({
      	categories: state=>state.product.categories,
			products:state=>state.product.products,
			isLoading:state=>state.product.isLoading,

			}),
			...mapGetters({
				//renderProducts:'product/renderProducts'
			}),
		},
	}
	
</script>

<style lang="scss" scoped>
.home__products {

   .title {
      font-weight: 500;
      font-size: 27.1585px;
      line-height: 19px;
      margin-bottom: 40px;
   }

   .home__products-wrapper {
      display: grid;
		grid-template-columns: repeat(5,1fr);
      grid-column-gap:15px;
		@media (max-width: 1030px){
			grid-template-columns: repeat(4, 1fr);

		}
		@media (max-width: 819px){
			grid-template-columns: repeat(3, 1fr);

		}
		@media (max-width: 540px){
			grid-template-columns: repeat(2, 1fr);

		}
		@media(max-width: 380px){
			grid-template-columns: repeat(1, 0.9fr);
			justify-content: center;
		}
      

   }

   
}
</style>