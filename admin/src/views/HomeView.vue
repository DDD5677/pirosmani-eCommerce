<template>
	<section class="dashboard">
		<div class="container">
			<loading v-if="ordersLoading || usersLoading || reviewsLoading" />
			<div v-if="!ordersLoading && !usersLoading && !reviewsLoading" class="dashboard_inner">
				<div class="left">
					<div class="info">
						<div class="benefit">
							<info class="info-item" title="Total Benefits" amount="5000$"
								:src="require('@/assets/images/dollar-sign-svgrepo-com.svg')" />
						</div>
						<div class="new-orders">
							<info class="info-item" title="New Orders" :amount="orders.length"
								:src="require('@/assets/images/shopping-basket.svg')" />
						</div>
					</div>
					<div class="orders">
						<h3 class="title">Pending Orders</h3>
						<h3 class="empty" v-if="orders.length === 0">There is not orders yet!</h3>
						<ul>
							<li v-for="order in orders" class="order__item">
								<avatar :info="order.user" />
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
						<div>
							<info class="info-item" title="Pending reviews" :amount="reviews.length"
								:src="require('@/assets/images/reviews-icon.svg')" />
							<ul>
								<li v-for="review in reviews.slice(0, 10)" class="item">
									<avatar :info="review.user" />
									<div class="review__info">
										<span class="review__title">{{ review.user.name }}</span>
										<p>
											{{ review.bodyText }}
										</p>
									</div>
								</li>
							</ul>
						</div>
						<router-link class="see__all" :to="{ name: 'reviews', query: { page: 1, limit: 10 } }">See all
							reviews</router-link>


					</div>
					<div class="customers">
						<div>
							<info class="info-item" title="New customers" :amount="users.length"
								:src="require('@/assets/images/user-icon.svg')" />
							<ul>
								<li v-for="user in users.slice(-10)" class="item">
									<avatar :info="user" />
									<div class="user__info">
										<p>
											{{ user.name }} {{ user.surname }}
										</p>
									</div>
								</li>
							</ul>
						</div>
						<router-link class="see__all" :to="{ name: 'users', query: { page: 1, limit: 10 } }">See all
							customers</router-link>

					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: {
		...mapState({
			orders: state => state.order.orders,
			users: state => state.user.users,
			reviews: state => state.review.reviews,

			ordersError: state => state.order.errors,
			reviewsError: state => state.review.errors,
			usersError: state => state.user.errors,
			authError: state => state.auth.errors,

			reviewsLoading: state => state.review.isLoading,
			ordersLoading: state => state.order.isLoading,
			usersLoading: state => state.user.isLoading
		})
	},
	methods: {
		formatDate(dateString) {
			const options = { year: "numeric", month: "long", day: "numeric" }
			return new Date(dateString).toLocaleDateString(undefined, options) + " " + new Date(dateString).toLocaleTimeString('it-IT')
		},
	},
	updated() {
		console.log("updated")
	},
	created() {
		if (!this.authError) {
			console.log("mounted homeview")
			this.$store.dispatch('order/getOrders', { page: 1, limit: 10, status: 'Pending' })
			this.$store.dispatch('review/getReviews', { status: 'Pending' })
			this.$store.dispatch('user/getUsers', { sort: 'createdAt' })
		}

	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	.dashboard_inner {
		display: flex;
		align-items: flex-start;
		gap: 20px;

		.info-item {
			width: 100%;
		}

		.left {
			flex: 1 0 50%;

			.empty {
				padding: 15px;
				color: red;
			}

			.info {
				display: flex;
				justify-content: space-between;
				gap: 20px;

				.benefit,
				.new-orders {
					flex: 1 0 45%;
				}
			}

			.orders {
				margin-top: 20px;
				border: 1px solid #d3d3d3;
				border-radius: 15px;
				padding: 15px 0;

				.title {
					font-size: 24px;
					padding: 5px 15px;
				}

				.order__item {
					display: flex;
					width: 100%;
					padding: 5px 15px;
					cursor: pointer;
					transition: all 0.3s ease-in-out;

					&:hover {
						background-color: $light-color;
					}

					.order__info {
						margin-left: 15px;
						display: flex;
						width: 100%;
						align-items: center;
						justify-content: space-between;

						.order__date,
						.order__name {
							display: block;
							font-size: 14px;
						}

						.order__name {
							color: rgba(0, 0, 0, 0.6);
						}

						.order__price {
							display: inline-block;
							font-size: 18px;
							font-weight: 500;
						}
					}
				}
			}
		}

		.right {
			display: flex;
			flex: 1 0 45%;
			justify-content: space-between;
			gap: 20px;

			.reviews,
			.customers {
				flex: 1 0 45%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border: 1px solid #d3d3d3;
				border-radius: 15px;

				.info-item {
					border-radius: 15px 15px 0 0;
					border-width: 0 0 1px 0;
					margin-bottom: 10px;
				}

				.item {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 5px 15px;
					cursor: pointer;
					transition: all 0.3s ease-in-out;

					&:hover {
						background-color: $light-color;
					}
				}

				.see__all {
					width: 100%;
					display: inline-block;
					padding: 15px;
					color: $main-color;
					font-weight: 500;
					font-size: 18px;
					text-align: center;
					transition: all 0.3s ease-in-out;
					border-radius: 0 0 15px 15px;

					&:hover {
						background-color: $light-color;
					}
				}
			}

			.reviews {
				.review__info {
					margin-left: 10px;
					font-size: 14px;
					line-height: 1.2;
					color: rgba(0, 0, 0, 0.6);

					.review__title {
						font-size: 14px;
						color: #000;
						font-weight: 500;
					}
				}
			}

			.customers {
				.user__info {
					margin-left: 10px;
				}

				.item {
					align-items: center;
					font-size: 16px;
				}
			}
		}
	}
}

@media(max-width:1220px) {
	.dashboard {
		.dashboard_inner {
			flex-direction: column;

			.left,
			.right {

				width: 100%;
			}
		}
	}
}

@media(max-width:820px) {
	.dashboard {
		.dashboard_inner {
			.right {

				.customers {
					.item {
						font-size: 14px;
					}
				}
			}
		}
	}
}

@media(max-width:580px) {
	.dashboard {
		.dashboard_inner {
			.left {
				.info {
					.info-item {
						padding: 10px;

					}

				}
			}

			.right {
				flex-direction: column;

			}
		}
	}
}

@media(max-width:520px) {
	.dashboard {
		.container {
			margin-right: 10px;
			padding: 0;
			background-color: transparent;
			box-shadow: none;
		}

		.dashboard_inner {
			.left {
				.info {
					flex-direction: column;

					.info-item {
						width: 100%;
					}
				}
			}
		}
	}
}

@media(max-width:420px) {
	.dashboard {

		.dashboard_inner {
			.left {
				.orders {
					.order__item {
						padding: 5px 10px;

						a {
							display: none;
						}

						.order__info {
							margin-left: 0;

							.order__price {
								font-size: 16px;
							}
						}
					}
				}
			}

			.right {
				.reviews {
					.info-item {
						padding: 15px 10px;
					}

					.item {
						padding: 5px 10px;

						a {
							display: none;
						}

						.review__info {
							margin-left: 0;
						}
					}
				}

				.customers {
					.info-item {
						padding: 15px 10px;
					}

					.item {
						padding: 5px 10px;
					}
				}
			}
		}
	}
}
</style>
