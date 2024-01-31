<template>
	<section class="product-detail">
		<div class="container">
			<div v-if="!productLoading" class="product-detail__inner">
				<div class="left">
					<div class="left-top">
						<div class="img-box">
							<a :href="img" target="_blank">
								<img :src="img" alt="">
							</a>
						</div>
						<div class="info">
							<div class="info-date">
								<div class="created">
									<span class="info-title">Created at: </span>
									<span>{{ formatDate(dateCreated) }}</span>
								</div>
								<div v-if="dateUpdated" class="updated">
									<span class="info-title">Updated at: </span>
									<span>{{ formatDate(dateUpdated) }}</span>
								</div>
							</div>
							<div class="info-sales">
								<div>
									<span class="info-title">Saled: </span>
									<span>{{ saledCount }}</span>
								</div>
							</div>
						</div>
					</div>
					<div v-if="!reviewsLoading && !reviewsError" class="reviews">
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
				<div class="right">
					<form @submit.prevent="submitHandler" action="" enctype="multipart/form-data" class="product-info">
						<form-input class="inputs" :label="'Name'" :type="'text'" :placeholder="'Name'" :errors="errors"
							:error="errors ? errors.name : ''" v-model="name" />
						<div class="blocks">
							<div class="rating"><span>Rate: </span><product-rating :rating="ratings" /></div>
							<label class="isFeatured" @click="isFeaturedHandler" for="">
								<input type="checkbox" name="">
								<span class="shortline" :class="{ 'checked': isFeatured }">
									<span class="circle"></span>
								</span>
								isFeatured
							</label>
						</div>
						<div class="blocks">
							<form-input class="inputs" :label="'Price (in $)'" :type="'number'" :step="'0.01'"
								:placeholder="'Price'" :errors="errors" :error="errors ? errors.name : ''" v-model="price" />
							<form-input class="inputs" :label="'Count in stock'" :type="'number'" :placeholder="'Count in stock'"
								:errors="errors" :error="errors ? errors.name : ''" v-model="countInStock" />
						</div>
						<div class="blocks">
							<label class="select-labels">
								Country
								<select name="countries" v-model="country">
									<option v-for="(country, index) in country_list" :value="country">
										{{ country }}
									</option>
								</select>
							</label>
							<label class="select-labels">
								Category
								<select name="categories" v-model="category">
									<option v-for="(category, index) in categories" :value="category._id">
										{{ category.name }}
									</option>
								</select>
							</label>
						</div>
						<div class="blocks">
							<label class="custom-file-upload">
								<span class="upload__title">Update Image<i class="fa fa-cloud-upload"
										aria-hidden="true"></i></span>
								<input class="input_file" type="file" @change.stop="changeAvatar" />

							</label>
							<span class="image_name" ref="imageName"></span>
						</div>
						<div class="blocks">
							<div class="textarea-box">
								<div class="short_dsc">
									<label for="shortDsc">Short description</label>

									<textarea v-model="dsc" name="shortDsc" id="shortDsc" cols="10" rows="4"
										placeholder="Short description"></textarea>

								</div>
								<div class="rich_dsc">
									<label for="richDsc">Rich description</label>
									<textarea v-model="richDsc" name="richDsc" id="richDsc" cols="10" rows="8"
										placeholder="Rich description"></textarea>

								</div>

							</div>
						</div>
						<green-btn class="green__btn">Update</green-btn>
					</form>
				</div>
			</div>
			<loading v-else />
		</div>

	</section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {

	data() {
		return {
			name: '',
			isFeatured: false,
			dsc: '',
			richDsc: '',
			price: '',
			country: '',
			category: '',
			countInStock: '',
			ratings: 0,
			img: '',
			image: null,
			dateCreated: '',
			dateUpdated: '',
			country_list: ["Countries", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],

		}
	},
	computed: {
		...mapState({
			productLoading: state => state.product.isLoading,
			errors: state => state.product.errors,
			product: state => state.product.product,
			saledCount: state => state.order.saledCount,
			categories: state => state.category.categories,
			reviews: state => state.review.reviews,
			reviewsLoading: state => state.review.isLoading,
			reviewsError: state => state.review.errors,
		})
	},
	methods: {
		ratingCalc(ratings) {
			let items = Object.entries(ratings);
			let sum = 0;
			let total = 0;

			for (let [key, value] of items) {
				total += value;
				sum += value * parseInt(key);
			}
			if (total) {
				return Math.round(sum / total);
			} else {
				return 0
			}
		},
		formatDate(dateString) {
			const options = { year: "numeric", month: "long", day: "numeric" }
			return new Date(dateString).toLocaleDateString(undefined, options) + " " + new Date(dateString).toLocaleTimeString('it-IT')
		},
		assignUserData(product) {
			this.name = product.name
			this.dsc = product.dsc
			this.richDsc = product.richDsc
			this.isFeatured = product.isFeatured
			this.price = product.price
			this.countInStock = product.countInStock
			this.img = product.img
			this.category = product.category._id
			this.country = product.country,
				this.ratings = product.ratings,
				this.dateCreated = product.dateCreated
			this.dateUpdated = product.updatedAt
		},
		changeAvatar(event) {
			let inputImage = document.querySelector("input[type=file]").files[0];
			if (inputImage) {
				this.$refs.imageName.innerText = inputImage.name;
			}
			console.log(inputImage, event.target.value)
			this.image = inputImage;
		},
		isFeaturedHandler() {
			console.log(this.isFeatured)
			this.isFeatured = !this.isFeatured
		},
		submitHandler() {
			const data = {
				id: this.product.id,
				name: this.name,
				country: this.country,
				category: this.category,
				isFeatured: this.isFeatured,
				countInStock: this.countInStock,
				price: this.price,
				dsc: this.dsc,
				richDsc: this.richDsc,
				image: this.image,
			}
			console.log(data)
			this.$store.dispatch('product/updateProducts', data).then((res) => {
				location.reload()
			})
		}
	},
	created() {
		this.$store.dispatch('product/getProductById', this.$route.params.id).then(product => {
			this.assignUserData(product)
			this.$store.dispatch('order/getSaledCount', product.id)
			this.$store.dispatch('review/getReviews', { product: product.id })
		});
		this.$store.dispatch('category/getCategory')

	}
}
</script>

<style lang="scss" scoped>
.product-detail {
	.product-detail__inner {
		display: flex;
		justify-content: space-between;
		gap: 20px;

		.left,
		.right {
			flex: 1 0 48%;

			border: 1px solid #C6C6C6;
			border-radius: 15px;
		}

		.left {
			display: flex;
			flex-direction: column;

			.left-top {
				display: flex;

				padding: 25px 15px;

				.img-box {
					border: 1px solid #C6C6C6;
					flex: 0 0 60%;
					height: 200px;
					border-radius: 10px;
					background-image: url(@/assets/images/card__bg-big.svg);
					background-position: center;
					background-repeat: no-repeat;
					overflow: hidden;

					a {
						height: 100%;
						width: 100%;
						display: inline-block;
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: all 0.3s ease-in-out;

						&:hover {
							transform: scale(1.05);
						}
					}
				}

				.info {
					padding-left: 15px;

					.info-title {
						font-size: 16px;
						font-weight: 500;

						&+span {
							margin-top: 5px;
							display: inline-block;
							color: rgba(0, 0, 0, 0.6);
						}
					}

					.info-date {
						margin-bottom: 20px;

						.info-title {

							display: block;
						}

						.created {
							margin-bottom: 10px;
						}

					}
				}

			}

			.reviews {
				display: flex;
				flex-grow: 1;
				flex-direction: column;
				justify-content: space-between;

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
		}




		.right {

			padding: 25px 15px;

			form {
				display: flex;
				flex-direction: column;

			}

			.blocks {
				margin-top: 20px;
				display: flex;
				align-items: center;
				gap: 20px;

				.inputs {
					flex: 1 0 48%;
				}

				.rating {
					flex: 0 0 48%;

					span {

						font-weight: 500;
					}
				}

				label {
					font-weight: 500;
				}

				.isFeatured {
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

				.select-labels {
					flex: 1 0 48%;
				}

				select {
					width: 100%;
					margin-top: 10px;
					display: block;
					padding: 11px 10px;
					background: #FCFCFC;
					border: 1.1194px solid #EBEBEB;
					border-radius: 7.11356px;
					font-size: 16px;

					&:focus {
						border: 1.1194px solid $main-color;
					}
				}

				.custom-file-upload {
					border-radius: 5px;
					border: 1px solid $main-color;
					color: $main-color;
					display: inline-block;
					font-size: 14px;
					font-weight: 500;
					padding: 10px;
					cursor: pointer;

					.upload__title {
						display: inline-block;
						line-height: 1;
						font-weight: 500;

						i {
							margin-left: 5px;
						}

					}

					input[type="file"] {
						display: none;
					}
				}

				.image_name {
					margin-left: 10px;
					font-size: 12px;
					color: $main-color;
				}

				.textarea-box {
					width: 100%;

					.rich_dsc,
					.short_dsc {
						width: 100%;
					}

					.rich_dsc {
						margin-top: 10px;
					}

					textarea {
						margin-top: 5px;
						display: inline-block;
						width: 100%;
						padding: 10px;
						font-size: 14px;
						background: #FCFCFC;
						border: 1.1194px solid #EBEBEB;
						border-radius: 10px;
						resize: none;
						transition: all 0.3s ease-in-out;

						&:focus {
							border-color: $main-color;
						}

						&::placeholder {
							font-weight: 400;
							font-size: 16px;
							line-height: 24px;
							color: #C6C6C6;
						}
					}
				}
			}

			.green__btn {
				margin-top: 20px;
				font-size: 18px;
				margin-left: auto;
			}
		}
	}
}

@media(max-width:1100px) {
	.product-detail {
		.product-detail__inner {
			flex-direction: column-reverse;
		}
	}
}

@media(max-width:490px) {
	.product-detail {
		.container {
			padding: 0;
			box-shadow: none;
			background-color: transparent;
			margin-right: 15px;
		}

		.product-detail__inner {
			.left {
				.left-top {
					flex-direction: column;
					gap: 15px;

					.img-box {
						flex-basis: auto;
					}

					.info {
						padding-left: 0;
					}
				}
			}

			.right {
				.blocks {
					flex-wrap: wrap;
				}
			}
		}
	}
}
</style>