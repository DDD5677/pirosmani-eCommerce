<template>
	<div class="product">
		<a href="" class="product__cansel" @click.prevent="deleteProductHandler(product.product.id)"><span></span></a>
		<img
		:src="product.product.img"
			alt=""
			class="product__img"
		/>
		<span class="product__name">{{product.product.name}}</span>
		<product-counter @counter="changeQuantityHandler" :quantity="product.quantity"/>
		<span class="product__price">{{ totalSumm}} ₽</span>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

	export default {
		name:'basket-product',
		props:{
			product:{
				type:Object,
				required:true
			}
		},
		computed:{
			totalSumm(){
				return (this.product.product.price*this.product.quantity).toFixed(2)
			},
		},
		methods:{
			...mapMutations({
				changeQuantity:'order/changeQuantity',
				totalPrice:'order/totalSumm',
				deleteProduct:'order/deleteProduct',
			}),
			deleteProductHandler(id){
				this.deleteProduct(id);
				this.totalPrice()
			},
			changeQuantityHandler(counter){
				const id =this.product.product.id;
				const quantity =counter
				this.changeQuantity({id,quantity})
				this.totalPrice()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product {
		padding: 20px 30px 20px 5px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-top: 1px solid #EBEBEB;
		border-bottom: 1px solid #EBEBEB;
		.product__cansel {
			span {
				position: relative;
				display: inline-block;
				width: 20px;
				height: 20px;

				&:hover::before,
				&:hover::after {
					background-color: $main-color;
				}

				&::before,
				&::after {

					top: 50%;
					transform: translate(-50%);
					position: absolute;
					content: '';
					height: 2.5px;
					width: 20px;
					background-color: #C6C6C6;
				}

				&::after {
					transform: rotate(-45deg);
				}

				&::before {
					transform: rotate(45deg);
				}
			}
		}

		img {
			margin-left: 20px;
			width: 60px;
			object-fit: contain;
			border-radius: 5px;
		}

		.product__name {
			text-align: center;
			width: 220px;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
			margin-right: 20px;
		}

		.product__counter {
			cursor: pointer;
			display: flex;
			background: #FCFCFC;
			border: 0.903636px solid #EBEBEB;
			border-radius: 9.03636px;
			color: #000000;
			position: relative;

			.items__control {
				padding: 10px 16px;
			}

			.items__current {
				padding: 10px 10px;

			}
		}

		.product__price {
			margin-left: 20px;
			font-weight: 500;
			font-size: 18px;
			line-height: 21px;
		}
	}
</style>