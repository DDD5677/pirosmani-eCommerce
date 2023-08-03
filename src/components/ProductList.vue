<template>
	<section class="home__products">
         <div class="container">
            <h2 class="title">Все товары</h2>
            <div class="home__products-wrapper">
               <product v-for="product in renderProducts" :product="product" :key="product.id"/>
               
            </div>
            
         </div>
			<product-pagination :page="page" :pageSize="calcPageSize" @activePage="pageNumber" />
      </section>
</template>

<script>
	export default {
		name:'product-list',
		props:{
			responce:{
				type:Array,
				required:true,
			},
			page:{
				type:Number,
				required:true,
			},
			pageLimit:{
				type: Number,
				required:true
			}

		},
		data(){
			return{
			}
		},
		methods:{
			pageNumber(activeP){
				this.$emit('activePage',activeP)
			}
		},
		computed:{
			calcPageSize(){
				return Math.ceil(this.responce.length/this.pageLimit)
			},
			renderProducts(){
				return this.responce.slice((this.page-1)*this.pageLimit,this.page*this.pageLimit )
			}
		},
		// setup(){
		// 	let pageSize1=ref(0);
		// 	const calcPageSize1 = computed(()=>{
		// 		pageSize1.value =Math.ceil(this.responce.length/this.pageLimit)
		// 	})
		// }
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
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
		@media (max-width: 350px){
			justify-content: center;
		}
      

   }

   
}
</style>