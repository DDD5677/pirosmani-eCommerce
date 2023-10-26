<template>
	<ul class="dropdown-menu" @click.stop>
       <li v-for="(item, index) in categories" :key="item.name">
          <a class="dropdown-item"
				@click="categoryHandler(item)"
          >
			<!-- <img :src="require(`@/assets/images/dropdown-${index+1}.svg`)"> -->
			<img :src="item.icon">
          <span> {{ item.name }}</span></a
   		>
   	</li>
	</ul>
</template>

<script>
 import {mapState,mapMutations} from 'vuex';
	export default {
		name:'dropdown-menu',
		computed:{
			...mapState({
      	categories: state=>state.product.categories,
			page:state=>state.product.page
			}),
		},
		methods:{
			...mapMutations({
				changeCategory:'product/changeCategory',
				changePage:'product/changePage',
				toggleDropdown:'navbar/toggleDropdown',
				showNavbarHandler:'navbar/showNavbarHandler',
			}),
			categoryHandler(item){
				this.$store.dispatch('product/getProductByCategory',{
					page:1,
					id:item._id
				})
				this.changePage(1)
				this.$router.push({ path: "/products", query: { categories: item._id, page:1} });
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				this.toggleDropdown(false);
				this.showNavbarHandler(false);
			}
		}
	}
</script>

<style lang="scss" scoped>
.dropdown-menu{
	background-color: #fff;
	list-style: none;
	.dropdown-item {
		cursor: pointer;
		display: flex;
		align-items: center;
		height: 29px;
		padding-right: 27px;
		padding-left: 27px;
		white-space: nowrap;
		&:hover{
			background-color: #f3f3fc;
		}
		img {
			max-width: 17px;
			max-height: 18px;
			}
			
			span {
				font-family: $font;
				font-weight: 400;
				font-size: 11px;
				line-height: 13px;
				color: #333333;
				margin-left: 8px;
			}
			
	}
}
</style>