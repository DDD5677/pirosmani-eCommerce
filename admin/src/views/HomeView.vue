<template>
	<section class="dashboard">
		<div class="container">
			<div class="dashboard_inner">
				<div class="left">
					<div class="info">
						<div class="benefit">
							<info class="info-item" title="Total Benefits" amount="5000$" :src="require('@/assets/images/dollar-sign-svgrepo-com.svg')"/>
						</div>
						<div v-if="!ordersLoading" class="new-orders">
							<info  class="info-item" title="New Orders" :amount="orders.length +''" :src="require('@/assets/images/shopping-basket.svg')"/>
						</div>
					</div>
					<div class="orders">
						<h3 class="title">Pending Orders</h3>
						<ul v-if="!ordersLoading">
							<li v-for="order in orders" class="order__item">
								<avatar :user="order.user"/>
								<div class="order__info">
									<div>
										<span class="order__date">{{ formatDate(order.dateOrdered) }}</span>
										<span class="order__name">{{ order.user.name }} {{ order.user.surname }}</span>
									</div>
									<span class="order__price">{{ order.totalPrice }}$</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="right">
					<div class="reviews">
						<div v-if="!reviewsLoading">
							<info class="info-item" title="Pending reviews" :amount="reviews.length+''" :src="require('@/assets/images/reviews-icon.svg')"/>
							<ul>
								<li v-for="review in reviews.slice(0,10)" class="item">
									<avatar :user="review.user"/>
									<div class="review__info">
										<p>
											{{ review.bodyText }}
										</p>
									</div>
								</li>
							</ul>
						</div>
						<a class="see__all" href="">See all reviews</a>


					</div>
					<div class="customers">
						<div v-if="!usersLoading">
							<info class="info-item" title="New customers" :amount="users.length+''" :src="require('@/assets/images/user-icon.svg')"/>
							<ul>
								<li v-for="user in users.slice(-10)" class="item">
									<avatar :user="user"/>
									<div class="user__info">
										<p>
											{{ user.name }} {{ user.surname }}
										</p>
									</div>
								</li>
							</ul>
						</div>
						<a class="see__all" href="">See all reviews</a>

					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
	export default {
		computed:{
			...mapState({
				orders:state=>state.order.orders,
				ordersLoading:state=>state.order.isLoading,
				reviews:state=>state.review.reviews,
				reviewsLoading:state=>state.review.isLoading,
				users:state=>state.user.users,
				usersLoading:state=>state.user.isLoading
			})
		},
		methods:{
			formatDate (dateString){
  				const options = { year: "numeric", month: "long", day: "numeric" }
  				return new Date(dateString).toLocaleDateString(undefined, options) +" " + new Date(dateString).toLocaleTimeString('it-IT')
			},
		},
		mounted(){
			console.log("mounted homeview")
			this.$store.dispatch('order/getOrders')
			this.$store.dispatch('review/getReviews')
			this.$store.dispatch('user/getUsers',{page:1})
		}
	}
</script>

<style lang="scss" scoped>
.dashboard{
	padding: 100px 0 50px;
	.dashboard_inner{
		display: flex;
		align-items: flex-start;
		gap: 20px;
		
		.info-item{
			width: 100%;
		}
		.left{
			width: 60%;
			.info{
				display: flex;
				justify-content: space-between;
				.benefit,
				.new-orders{
					flex: 0 0 48%;
				}
			}
			.orders{
				margin-top: 20px;
				border:1px solid #d3d3d3;
				border-radius: 15px;
				padding: 15px 0;
				.title{
					font-size: 24px;
					padding: 5px 15px;
				}
				.order__item{
					display: flex;
					width: 100%;
					padding: 5px 15px;
					cursor: pointer;
					transition: all 0.3s ease-in-out;
					&:hover{
						background-color: $light-color;
					}
					
					.order__info{
						display: flex;
						width: 100%;
						align-items: center;
						justify-content: space-between;
						.order__date,
						.order__name{
							display: block;
							font-size: 14px;
						}
						.order__name{
							color: rgba(0, 0, 0, 0.6);
						}
						.order__price{
							display: inline-block;
							font-size: 18px;
							font-weight: 500;
						}
					}
				}
			}
		}
		.right{
			flex-grow: 1;
			display: flex;
			justify-content: space-between;
			.reviews,
			.customers{
				flex: 0 0 48%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border:1px solid #d3d3d3;
				border-radius: 15px ;
				.info-item	{
					border-radius: 15px 15px 0 0;
					margin-bottom: 10px;
				}
				.item{
					display: flex;
					width: 100%;
					padding: 10px 15px;
					cursor: pointer;
					transition: all 0.3s ease-in-out;
					&:hover{
						background-color: $light-color;
					}
				}
				.see__all{
					width: 100%;
					display: inline-block;
					padding: 15px;
					color: $main-color;
					font-weight: 500;
					font-size: 18px;
					text-align: center;
					transition: all 0.3s ease-in-out;
					border-radius: 0 0 15px 15px;
					&:hover{
						background-color: $light-color;
					}
				}
			}
			.reviews{
				.review__info{
					font-size: 14px;
					line-height: 1.2;
					color: rgba(0, 0, 0, 0.6);
				}
			}
			.customers{
				.item{
					align-items: center;
					font-size: 16px;
				}
			}
		}
	}
}
</style>
