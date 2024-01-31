<template>
	<section class="user__detail">
		<div class="container">
			<h2 class="title">User information</h2>
			<div class="blocks">
				<form v-if="!userLoading" @submit.prevent="submitHandler" enctype="multipart/form-data">
					<div class="labels">
						<div class="img-box">
							<a :href="image">
								<img :src="image" alt="" />
							</a>
						</div>
						<label class="custom-file-upload">
							<div>
								<span class="upload__title">Choose Image<i class="fa fa-cloud-upload"
										aria-hidden="true"></i></span>
								<input class="input_file" type="file" @change.stop="changeAvatar" />

								<span class="image_name" ref="imageName"></span>
							</div>
						</label>
					</div>
					<div class="labels">
						<label @click="isAdminHandler" for="">
							<input type="checkbox" id="">
							<span class="shortline" :class="{ 'checked': admin }">
								<span class="circle"></span>
							</span>

							Admin
						</label>
					</div>
					<form-input class="inputs" :label="'Name'" :type="'text'" :placeholder="'Name'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="name" />
					<form-input class="inputs" :label="'Surname'" :type="'text'" :placeholder="'Surname'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="surname" />
					<form-input class="inputs" :label="'Email'" :type="'email'" :placeholder="'Email'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="email" />
					<form-input class="inputs" :label="'Password'" :type="'password'" :placeholder="'Password'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="password" />
					<form-input class="inputs" :label="'Phone'" :type="'tel'" :placeholder="'Phone'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="phone" />
					<form-input class="inputs" :label="'Extra phone'" :type="'tel'" :placeholder="'Extra phone'"
						:errors="errors" :error="errors ? errors.name : ''" v-model="extraPhone" />
					<div class="btns">
						<green-btn class="green__btn">Update</green-btn>
					</div>
				</form>

			</div>
			<div class="operations">
				<div v-if="!ordersLoading" class="orders">
					<div>
						<info class="info-item" title="Orders" :amount="orders.length"
							:src="require('@/assets/images/shopping-basket.svg')" />
						<ul>
							<li v-for="order in orders" class="item">
								<avatar :info="order.user" />
								<div class="order__info">

									<span class="order__date">{{ formatDate(order.createdAt) }}</span>

									<span class="order__price">{{ order.totalPrice }}$</span>
								</div>
							</li>
						</ul>
					</div>
					<a class="see__all" href="">See all orders</a>
				</div>


				<div v-if="!reviewsLoading" class="reviews">
					<div>
						<info class="info-item" title="Reviews" :amount="reviews.length"
							:src="require('@/assets/images/reviews-icon.svg')" />
						<ul>
							<li v-for="review in reviews.slice(0, 10)" class="item">
								<avatar :info="review.user" />
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
			</div>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	name: 'user-detail',
	data() {
		return {
			name: '',
			surname: '',
			email: '',
			admin: false,
			phone: '',
			extraPhone: '',
			password: '',
			confirmPassword: '',
			image: '',
			avatar: null,
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user,
			userLoading: state => state.user.isLoading,
			errors: state => state.user.errors,
			reviews: state => state.review.reviews,
			reviewsLoading: state => state.review.isLoading,
			orders: state => state.order.orders,
			ordersLoading: state => state.order.isLoading,
		})
	},
	methods: {
		...mapMutations({
			toggleSignIn: 'navbar/toggleSignIn'
		}),
		assignUserData(user) {
			this.name = user.name
			this.surname = user.surname
			this.email = user.email
			this.admin = user.isAdmin
			this.phone = user.phone
			this.extraPhone = user.extraPhone
			this.image = user.image
		},
		formatDate(dateString) {
			const options = { year: "numeric", month: "long", day: "numeric" }
			return new Date(dateString).toLocaleDateString(undefined, options) + " " + new Date(dateString).toLocaleTimeString('it-IT')
		},
		changeAvatar() {
			let inputImage = document.querySelector("input[type=file]").files[0];
			this.$refs.imageName.innerText = inputImage.name;
			this.avatar = inputImage;
		},
		isAdminHandler() {
			this.admin = !this.admin
		},
		submitHandler() {
			const data = {
				id: this.user.id,
				name: this.name,
				surname: this.surname,
				email: this.email,
				isAdmin: this.admin,
				phone: this.phone,
				extraPhone: this.extraPhone,
				password: this.password,
				avatar: this.avatar,
			}
			this.$store.dispatch('user/updateUser', data).then((res) => {
				this.$store.dispatch('user/getUserById', this.$route.params.id).then(user => {
					this.assignUserData(user)
				});
			})
		}
	},
	created() {

		this.$store.dispatch('user/getUserById', this.$route.params.id).then(user => {
			this.assignUserData(user)
		});
		this.$store.dispatch('review/getReviews', { user: this.$route.params.id })
		this.$store.dispatch('order/getOrders', { user: this.$route.params.id })
	}

}
</script>

<style lang="scss" scoped>
.user__detail {
	.title {
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 20px;
	}

	.img-box {
		width: 75px;
		height: 75px;
		background-image: url(@/assets/images/user__bg.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		img {
			width: 75px;
			height: 75px;
			border-radius: 5px;
			cursor: pointer;
			object-fit: cover;
		}
	}

	.blocks {
		border: 1px solid #C6C6C6;
		padding: 20px 15px;
		border-radius: 15px;

		form {
			display: flex;
			gap: 20px;
			flex-wrap: wrap;
			width: 100%;
		}

		.image_name {
			font-size: 11px;
			color: $main-color;
		}



		.inputs {
			flex: 1 0 48%;
		}

		.btns {
			flex: 0 0 100%;
			display: flex;
			justify-content: flex-end;

			.green__btn {
				width: 150px;
				font-size: 16px;
				letter-spacing: 1.5px;
			}
		}

		.labels {
			flex: 1 0 20%;
			display: flex;
			gap: 15px;
			align-items: center;
			justify-content: space-between;

			.custom-file-upload {
				display: flex;
				width: 200px;
				justify-content: center;
				align-items: center;
				border-radius: 5px;
				border: 1px solid $main-color;
				color: $main-color;
				font-size: 14px;
				font-weight: 500;
				padding: 10px;
				cursor: pointer;

				span {
					display: block;
					text-align: center;
				}

				.upload__title {
					line-height: 1;

					i {
						margin-left: 5px;
					}

				}

				input[type="file"] {
					display: none;
				}
			}

			label {
				cursor: pointer;
				letter-spacing: 0.8px;
				padding: 10px;
				min-width: 105px;
			}

		}

		input {
			height: 0;
			width: 0;
			opacity: 0;
		}

		.shortline {
			cursor: pointer;
			background-color: #9d9d9d;
			display: inline-block;
			width: 30px;
			height: 10px;
			border-radius: 5px;
			position: relative;
			transition: all 0.2s ease-in-out;

			&.checked {
				background-color: $light1-color;

				.circle {
					background-color: $main-color;
					left: calc(100% - 15px);
					box-shadow: none;
				}
			}

			.circle {
				position: absolute;
				left: 0;
				top: -3px;
				display: inline-block;
				width: 15px;
				height: 15px;
				background-color: #fff;
				border-radius: 50%;
				transition: all 0.2s ease-in-out;
				-webkit-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
				-moz-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
				box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
			}
		}

	}

	.operations {
		margin-top: 20px;
		display: flex;
		gap: 20px;
		justify-content: space-between;

		.reviews,
		.orders {
			flex: 1 0 48%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border: 1px solid #d3d3d3;
			border-radius: 15px;

			.info-item {
				width: 100%;
				border-radius: 15px 15px 0 0;
				margin-bottom: 10px;
			}

			.item {
				display: flex;
				width: 100%;
				padding: 10px 15px;
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
				width: 100%;
				margin-left: 15px;
				font-size: 14px;
				line-height: 1.2;
				color: rgba(0, 0, 0, 0.6);
			}
		}

		.orders {
			.order__info {
				width: 100%;
				margin-left: 15px;
				display: flex;
				justify-content: space-between;
			}

			.item {
				align-items: center;
				font-size: 16px;
			}

		}
	}

}

@media(max-width: 630px) {
	.user__detail {
		.operations {
			flex-direction: column;
		}
	}
}

@media(max-width: 480px) {

	.user__detail {
		.title {
			font-size: 20px;
			margin-bottom: 10px;
		}

		.container {
			background-color: transparent;
			margin-right: 15px;
			padding: 0;
			box-shadow: none;
		}

		.blocks {
			.labels {
				flex: 0 0 100%;
				flex-wrap: wrap;
			}
		}
	}
}
</style>