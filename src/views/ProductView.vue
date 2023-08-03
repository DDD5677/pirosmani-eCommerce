<template>
	  <product-list :responce="SortProducts" :page="page" :pageLimit="pageLimit" @activePage="activePage"/>
</template>

<script>
import useProducts from '@/hooks/useProduct'
	export default {
		data(){
			return{
				page:1,
				pageLimit:10
			}
		},
		methods:{
			activePage(activeP){
				this.page=activeP;
			}
			
		},
		computed:{
			SortProducts(){
				if(this.$route.params.category===''||this.$route.params.category==='all'){
					return products
				}
				return this.products.filter(p=>p.category===this.$route.params.category)
				
			}
		},
		setup(props){
			const {products,categories}=useProducts()

			return{
				products,
				categories
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home__products{
		padding-top: 130px;
		@media (max-width: 819px){
		padding-top: 80px;
	}
	}
</style>