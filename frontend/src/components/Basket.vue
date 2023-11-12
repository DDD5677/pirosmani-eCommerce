<template>
	<div class="basket__products">
		<h3 class="title">Корзина</h3>
		<div v-if="orderProducts.length === 0" class="empty-basket">Корзина пуста</div>
		<basket-product v-for="product in orderProducts" :product="product" :id="product.product.id"/>
	</div>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		name:'basket',
		computed:{
			...mapState({
				orderProducts:state=>state.order.userOrder.orderProducts,
			})
		}
	}
</script>

<style lang="scss" scoped>
 .basket__products {
	margin-bottom: 45px;

	.title {
		font-weight: 500;
		font-size: 28px;
		line-height: 50px;
		color: #333333;
	}
	.empty-basket{
		margin-top: 30px;
		font-size: 20px;
		color: $main-color;
	}

}
</style>