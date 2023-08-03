<template>
	<ul class="dropdown-menu">
                              <li v-for="item in dropdownItems" :key="item.title">
                                 <a class="dropdown-item"
											@click="$router.push(`/products/${item.category}`)"
                                    >
												<img :src="item.icon">
                                    <span> {{ item.title }}</span></a
                                 >
                              </li>
                           </ul>
</template>

<script>
 
	export default {
		name:'dropdown-menu',
		props:{
			categories:{
				type: Array,
				required:true
			}
		},
		data(){
			return{
				dropdownItems:this.categories
				// dropdownItems:[
				// {
				// 	title:'Лучшая еда',
				// 	icon:icon_1,
				// 	category:'best-foods'
				// },
				// {
				// 	title:'Гамбургер',
				// 	icon:icon_2,
				// 	category:'burgers'
				// },
				// {
				// 	title:'Пицца',
				// 	icon:icon_3,
				// 	category:'pizzas'
				// }
				// ,
				// {
				// 	title:'Бутерброд',
				// 	icon:icon_4
				// },
				// {
				// 	title:'Барбекю',
				// 	icon:icon_5,
				// 	category:'bbqs'
				// },
				// {
				// 	title:'Стейк',
				// 	icon:icon_6,
				// 	category:'drinks'
				// },
				// {
				// 	title:'Сосиска',
				// 	icon:icon_7
				// },
				// {
				// 	title:'Жареный цыпленок',
				// 	icon:icon_8,
				// 	category:'fried-chicken'
				// },
				// {
				// 	title:'Хлеб',
				// 	icon:icon_9,
				// 	category:'breads'
				// },
				// {
				// 	title:'Десерт',
				// 	icon:icon_10,
				// 	category:'ice-cream'
				// },
				// {
				// 	title:'Мороженое',
				// 	icon:icon_11,
				// 	category:'ice-cream'
				// },
				// {
				// 	title:'Шоколад',
				// 	icon:icon_12,
				// 	category:'ice-cream'
				// },
				// {
				// 	title:'Напитки',
				// 	icon:icon_13,
				// 	category:'drinks'
				// }
				// ]
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