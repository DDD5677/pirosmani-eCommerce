<template>
	<ul class="dropdown-menu" @click.stop>
       <li v-for="item in categories" :key="item.title">
          <a class="dropdown-item"
				@click="categoryHandler(item.category)"
          >
			<img :src="item.icon">
          <span> {{ item.title }}</span></a
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
			}),
		},
		methods:{
			...mapMutations({
				SortP:'product/SortP',
			}),
			categoryHandler(category){
				this.SortP(category)
				this.$router.push(`/products/${category}`)
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			}
		}
	}
</script>

<style lang="scss" scoped>
.dropdown-menu{
	.dropdown-item {
		cursor: pointer;
		display: flex;
		align-items: center;
		height: 29px;
		padding-right: 15px;
		padding-left: 27px;

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