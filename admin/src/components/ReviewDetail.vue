<template>
	<div class="review-detail">
		<div class="top">
			<h2 class="title">Review Detail</h2>
			<button class="close-btn" @click.prevent="closeSidebar"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<loading v-if="reviewLoading" />
		<div v-if="!reviewLoading">
			<div class="review-info">
				<div class="info">
					<div class="info-item">
						<span class="title">Customer</span>
						<div class="customer">
							<avatar :info="review.user" :width="'30px'" />
							<span @click="this.$router.push(`/users/${review.user.id}`)" class="info-link">
								{{ review.user.name + ' ' + review.user.surname }}
							</span>
						</div>
					</div>
					<div class="info-item">
						<span class="title">Product</span>
						<span @click="this.$router.push(`/products/${review.product.id}`)" class="info-link">{{
							review.product.name }}</span>
					</div>
				</div>
				<div class="info">
					<div class="info-item">
						<span class="title">Date</span>
						<span>{{ formatDate(review.createdAt) }}</span>
					</div>
					<div class="info-item">
						<span class="title">Rating</span>
						<product-rating :rating="review.rating" />
					</div>
				</div>
			</div>
			<div class="review-body" tabindex="0">
				<span class="title">Comments</span>
				<textarea name="" id="" cols="30" rows="10" @change="assignData($event)">{{ review.bodyText }}</textarea>
			</div>
			<div v-if="review.status !== 'Pending'" class="review-btns">
				<button @click.prevent="updateReview" class="review-save"><i class="fa fa-save" aria-hidden="true"></i>
					Save</button>
				<button @click.prevent="deleteReviews" class="review-delete"><i class="fa fa-trash" aria-hidden="true"></i>
					Delete</button>
			</div>
			<div v-if="review.status === 'Pending'" class="review-btns">
				<button @click.prevent="updateReviewStatus(true)" class="review-accept"><i class="fa fa-thumbs-up"
						aria-hidden="true"></i> Accept</button>
				<button @click.prevent="updateReviewStatus(false)" class="review-reject"><i class="fa fa-thumbs-down"
						aria-hidden="true"></i> Reject</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'review-detail',
	props: {
		getData: {
			type: Function,
			required: true
		}
	},
	data() {
		return {
			reviewText: ''
		}
	},
	computed: {
		...mapState({
			review: state => state.review.review,
			reviewLoading: state => state.review.reviewLoading,
			reviewsError: state => state.review.errors
		}),
	},
	methods: {
		closeSidebar() {
			this.$emit('close', false)
		},
		formatDate(dateString) {
			const options = { year: "numeric", month: "numeric", day: "numeric" }
			return new Date(dateString).toLocaleDateString(undefined, options)
		},
		assignData(e) {
			this.reviewText = e.target.value
		},
		updateReviewStatus(status) {
			let data = {
				id: this.review._id
			};
			if (status) {
				data['status'] = 'Accepted';
			} else {
				data['status'] = 'Rejected';
			}
			this.$store.dispatch('review/updateReview', data).then((res) => {
				this.getData(this.$route.query.page, this.$route.query.limit);
				this.closeSidebar()
			})
		},
		updateReview() {
			let data = {
				id: this.review._id,
				bodyText: this.reviewText
			};

			this.$store.dispatch('review/updateReview', data).then((res) => {
				this.getData(this.$route.query.page, this.$route.query.limit);
				this.closeSidebar()
			})
		},
		deleteReviews() {
			const data = {
				reviews: [this.review._id]
			}
			this.$store.dispatch('review/deleteReviews', data).then(() => {
				this.getData(this.$route.query.page, this.$route.query.limit);
				this.closeSidebar()
			});

		},
	},
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
.review-detail {
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;

		h2.title {
			font-weight: 500;
			font-size: 1.25rem;
			line-height: 1.6;
			letter-spacing: 0.0075em;
		}

		.close-btn {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			font-size: 24px;
			color: #7a7979;
			cursor: pointer;
			background-color: transparent;
			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: $light-color;
				color: $main-color;
			}
		}
	}

	.review-info {
		padding: 0 20px;

		.customer {
			display: flex;
			gap: 10px;
			align-items: center;

		}

		.info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: 10px;
			margin-bottom: 20px;

			.info-item {
				flex: 1 0 48%;
				font-size: 16px;

				.info-link {
					color: $main-color;
					cursor: pointer;
				}

				.title {
					display: block;
					margin-bottom: 5px;
					font-size: 14px;
					line-height: 1.5;
					letter-spacing: 0.00938em;
					color: rgba(0, 0, 0, 0.6);

				}
			}
		}
	}

	.review-body {
		margin: 0 20px;
		padding: 5px 5px 0;
		background-color: $light-color;
		border-bottom: 2px solid $main-color;

		border-radius: 10px 10px 0 0;

		.title {
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			margin-left: 10px;
			;
		}

		textarea {
			width: 100%;
			background-color: $light-color;
			resize: none;
			padding: 10px;
			font-size: 16px;
		}
	}

	.review-btns {
		padding: 20px;
		display: flex;
		justify-content: space-between;

		button {
			width: 120px;
			padding: 10px;
			border-radius: 5px;
			font-size: 18px;
			text-transform: uppercase;
			font-weight: 500;
			cursor: pointer;

			i {
				margin-right: 5px;
			}
		}

		.review-delete,
		.review-reject {
			background-color: transparent;
			border: 2px solid rgb(149, 2, 2);
			color: rgb(149, 2, 2);
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: rgba(149, 2, 2, 0.1);
			}
		}

		.review-accept,
		.review-save {
			background-color: transparent;
			border: 2px solid $main-color;
			color: $main-color;
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: rgba(172, 255, 172, 0.2);
			}
		}

	}
}
</style>