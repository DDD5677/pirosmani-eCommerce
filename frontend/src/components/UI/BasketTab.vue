<template>
	<div class="basket__tab">
		<ul class="nav">
			<li class="nav-item" role="presentation">
				<button @click.prevent="Delivery" class="nav-link" :class="{'active':tabs.tab1}">
					Доставка
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button @click.prevent="selfDelivery" class="nav-link" :class="{'active':tabs.tab2}">
					Самовывоз (- 20%)
				</button>
			</li>
		</ul>
		<div  class="tab-content">
			<div class="tab-pane">
				<div class="tab-pane__inner">
					<div class="product__cost">
						<div>
							<span>Итого</span>
							<span>{{ totalSumm }} ₽ </span>
						</div>
						<div>
							<span>Доставка</span>
							<span class="green__price">{{ tabs.tab1? delivery:calcDelivery }} ₽</span>
						</div>
					</div>
					<div class="total__cost">
						<span>Итого к оплате</span>
						<span class="total__price">{{ tabs.tab1? totalSumm-delivery: totalSumm - calcDelivery }} ₽</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		name:'basket-tab',
		data(){
			return{
				delivery:0,
				tabs:{
					tab1:true,
					tab2:false
				}
			}
		},
		computed:{
			...mapState({
				totalSumm: state=>state.order.userOrder.totalSumm,
			}),
			calcDelivery(){
				return (this.totalSumm*0.2).toFixed(2)
			}
		},
		methods:{
			Delivery(){
				this.tabs.tab1=true,
				this.tabs.tab2=false
				this.$emit('tabs',this.tabs)

			},
			selfDelivery(){
				this.tabs.tab2=true,
				this.tabs.tab1=false,
				this.$emit('tabs',this.tabs)
			},
		}
	}
</script>

<style lang="scss" scoped>
.basket__tab {
	.nav {
		display: flex;
		.nav-item {
			padding: 10px;

			.nav-link {
				padding: 10px 24px;
				font-weight: 500;
				font-size: 14.6903px;
				line-height: 11px;
				color: #828282;
				border-radius: 5px;
				cursor: pointer;
				&.active {
					background-color: $main-color;
					color: #fff;
				}
			}
		}
	}

	.tab-content {
		padding: 35px 30px;
		background: #FFFFFF;
		box-shadow: 0px 0px 28.763px rgba(0, 0, 0, 0.06);
		border-radius: 9.58767px;


		.tab-pane__inner {

			display: flex;
			justify-content: space-between;
			align-items: center;




			.product__cost {
				flex: 0 0 45%;

				div {
					font-weight: 500;
					font-size: 15px;
					line-height: 20px;
					display: flex;
					justify-content: space-between;
					margin-bottom: 16px;
				}

				.green__price {
					color: $main-color;
				}
			}

			.total__cost {
				flex: 0 0 30%;
				font-weight: 500;
				font-size: 18px;
				line-height: 23px;

				.total-price {
					font-size: 22px;
					line-height: 24px;
				}

				span {
					display: block;
					margin-bottom: 15px;
				}
			}
		}
	}
}
</style>