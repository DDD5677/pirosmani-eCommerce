<template>
	<section class="products">
		<div class="filter">
			<div class="filter-item" v-for="(filter, index) in filters" :id="index" v-show="filter.show">
				<div v-if="(filter.title !== 'Featured') && (filter.title !== 'Category')">
					<span>{{ filter.title }}</span>
					<input type="number" :placeholder="filter.title" v-model="filter.source" @change="sumbitFilters">
					<button @click.prevent="removeFilter(index)"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<div v-if="filter.title === 'Featured'">
					<span>{{ filter.title }}</span>
					<select name="status" id="status" v-model="filter.source" @change="sumbitFilters">
						<option value="" selected disabled hidden>Select an option</option>
						<option value="true">Featured</option>
						<option value="false">Not Featured</option>
					</select>
					<button @click.prevent="removeFilter(index)"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<div v-if="filter.title === 'Category'">
					<span>{{ filter.title }}</span>
					<select name="Category" id="Category" v-model="filter.source" @change="sumbitFilters">
						<option value="" selected disabled hidden>Select an option</option>
						<option v-for="category in categories" :id="category.id" :value="category.id">{{ category.name }}
						</option>
					</select>
					<button @click.prevent="removeFilter(index)"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="products__inner">
				<div class="table__nav">

					<div class="filters">
						<div class="search">
							<input type="text" placeholder="Search" v-model="search" class="search__input"
								@change="getProducts(1, this.$route.query.limit)">
							<div v-if="!search" class="search__span"><i class="fa fa-search" aria-hidden="true"></i></div>
							<button v-if="search" @click="cleanSearch" class="search__btn"><i class="fa fa-times"
									aria-hidden="true"></i></button>
						</div>
						<div class="buttons">
							<button @click="toggleColumns" class="btn"><i class="fa fa-th" aria-hidden="true"></i>Columns</button>
							<transition name="modal">
								<ul v-show="columns" class="columns">
									<li v-for="(option, index) in options" class="options">
										<label @click="addOptions(index)" :for="'option-' + index">
											<input checked type="checkbox" ref="option" :id="'option-' + index">
											<span class="shortline" :class="{ 'checked': option.show }" ref="shortline">
												<span class="circle"></span>
											</span>

											{{ option.title }}
										</label>
									</li>
								</ul>
							</transition>
							<router-link :to="{ name: 'create-product' }" class="btn"><i class="fa fa-plus"
									aria-hidden="true"></i>Create</router-link>

							<button @click="toggleFilters" class="btn"><i class="fa fa-filter"
									aria-hidden="true"></i>Filter</button>
							<transition name="modal">
								<ul v-show="filter_box" class="filter__box">
									<li v-for="(option, index) in filters" :id="index" @click="addFilter(index)" class="options">
										{{ option.title }}
									</li>
								</ul>
							</transition>
							<button class="btn"><i class="fa fa-download" aria-hidden="true"></i>Export</button>
						</div>
					</div>

				</div>
				<div class="products__table">
					<table>
						<thead>
							<tr>
								<th v-if="!productsError">
									<span></span>
									<input class="checkbox" ref="foomain" @click="allCheck" type="checkbox">
								</th>
								<th v-if="options[0].show">{{ options[0].title }}</th>
								<th v-if="options[1].show">
									<span class="sort_btn" @click="sortHandler('name')">
										{{ options[1].title }}
										<i v-if="sort === 'name' || sort === '-name'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[2].show">
									<span @click="sortHandler('price')" class="sort_btn">
										{{ options[2].title }}
										<i v-if="sort === 'price' || sort === '-price'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[3].show">
									<span @click="sortHandler('countInStock')" class="sort_btn">
										{{ options[3].title }}
										<i v-if="sort === 'countInStock' || sort === '-countInStock'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[4].show">
									<span @click="sortHandler('ratings')" class="sort_btn">
										{{ options[4].title }}
										<i v-if="sort === 'ratings' || sort === '-ratings'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[5].show">{{ options[5].title }}</th>
								<th v-if="options[6].show">{{ options[6].title }}</th>
							</tr>
							<div v-if="checked > 0" class="checked__block">
								<div>
									<button @click="removeCheck" type="button" class="btn-close"></button>
									<span class="checked">{{ checked }} Items selected</span>
								</div>
								<a @click.prevent="deleteProducts" class="delete__btn"><i class="fa fa-trash"
										aria-hidden="true"></i> Delete</a>
							</div>
						</thead>

						<tbody v-if="!productsLoading && !productsError">

							<tr v-for="product in products" :id="product.id">
								<td>
									<span></span>
									<input class="checkbox" ref="foo" @click="removedProductsId($event, product.id)"
										type="checkbox">
								</td>
								<td v-if="options[0].show">
									<avatar :info="{ image: product.img, name: product.name }" />
								</td>
								<td v-if="options[1].show" @click="productDetail(product.id)">{{ product.name }}</td>
								<td v-if="options[2].show" @click="productDetail(product.id)">{{ product.price }}$</td>
								<td v-if="options[3].show" @click="productDetail(product.id)">{{ product.countInStock }}</td>
								<td v-if="options[4].show" @click="productDetail(product.id)"><product-rating
										:rating="product.ratings" /></td>
								<td v-if="options[5].show" @click="productDetail(product.id)">{{ product.isFeatured }}</td>
								<td v-if="options[6].show" @click="productDetail(product.id)">{{ formatDate(product.dateCreated) }}
								</td>
							</tr>
						</tbody>
					</table>
					<loading v-if="productsLoading" />
					<error v-if="productsError" :error="productsError" />
				</div>
				<pagination :getData="getProducts" :page="page" :pageSize="pageSize" />
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getItem, setItem } from '@/helpers/localStorage';
export default {
	data() {
		return {
			sort: '',
			checked: null,
			search: '',
			columns: false,
			filter_box: false,
			removedProdId: [],
			options: [],
			filters: [],
		}
	},
	computed: {
		...mapState({
			products: state => state.product.products,
			page: state => state.product.page,
			pageSize: state => state.product.pageSize,
			productsLoading: state => state.product.isLoading,
			productsError: state => state.product.errors,
			categories: state => state.category.categories,
		}),

	},
	methods: {
		...mapMutations({
			changePage: 'product/changePage',
			changeLimit: 'product/changeLimit'
		}),
		productDetail(id) {
			this.$router.push(`/products/${id}`)
		},
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
		sortHandler(sort) {
			if (this.sort === sort) {
				if (this.sort[0] === '-') {
					this.sort = this.sort.substring(1)
				} else {
					this.sort = '-' + this.sort
				}
			} else {
				this.sort = sort
			}
			this.getProducts(this.$route.query.page, this.$route.query.limit)
			const sorts = getItem('sorts')
			setItem('sorts', { ...sorts, product: this.sort })
		},
		toggleColumns() {
			this.columns = !this.columns
			this.filter_box = false
		},
		toggleFilters() {
			this.filter_box = !this.filter_box
			this.columns = false
		},
		addFilter(index) {
			this.filters[index].show = true
			this.filter_box = false
			setItem('product-filters', this.filters);
		},
		removeFilter(index) {
			this.filters[index].show = false
			if (this.filters[index].source) {
				this.filters[index].source = ''
				this.getProducts(1, this.$route.query.limit)
			}
			setItem('product-filters', this.filters);
		},
		sumbitFilters() {
			setItem('product-filters', this.filters);
			this.getProducts(1, this.$route.query.limit)
		},
		addOptions(index) {
			const shortline = this.$refs.shortline
			const option = this.$refs.option
			if (option[index].checked) {
				shortline[index].classList.add('checked')
				this.options[index].show = true
			} else {
				shortline[index].classList.remove('checked')
				this.options[index].show = false
			}
			setItem('product-options', this.options)
		},
		cleanSearch() {
			this.search = '';
			this.getProducts()
		},
		// delete checked data logic
		removedProductsId(checkbox, id) {
			if (checkbox.target.checked) {
				this.removedProdId.push(id)
				this.countCheckedItems()
			} else {
				this.removedProdId = this.removedProdId.filter(item => item !== id)
				this.countCheckedItems()
				console.log('not checked')
			}
		},
		countCheckedItems() {
			let k = 0;
			for (let i of this.$refs.foo) {
				if (i.checked) {
					k++
				}
			}
			this.checked = k
		},
		toggle() {
			for (let i of this.$refs.foo) {
				i.checked = this.$refs.foomain.checked
			}
			this.countCheckedItems()
		},
		removeCheck() {
			this.$refs.foomain.checked = false;
			this.removedProdId = []
			this.toggle()
		},
		allCheck() {
			this.removedProdId = [];
			for (let product of this.products) {
				this.removedProdId.push(product.id)
			}
			this.toggle()
		},

		deleteProducts() {
			const data = {
				products: this.removedProdId
			}
			this.$store.dispatch('product/deleteProducts', data).then(() => {
				location.reload()
			});

		},
		//------------------------------------------------------------------------
		getProducts(page, limit) {
			const queries = {
				page: page,
				limit: limit,
				sort: this.sort,
				search: this.search,
				min_price: this.filters[0].source,
				max_price: this.filters[1].source,
				min_count: this.filters[3].source,
				isFeatured: this.filters[4].source,
				category: this.filters[5].source,
			}
			this.$store.dispatch('product/getProducts', queries);
			this.changePage(page);
			this.changeLimit(limit);
			this.$router.push({ path: "/products", query: queries });
		}
	},
	watch: {
		page(newp, old) {
			this.removedProdId = [];
			this.checked = 0
		},
		filters(newFilter, oldFilter) {
			setItem('product-filters', newFilter);
			this.getProducts(this.$route.query.page, this.$route.query.limit)
		}
	},
	created() {
		this.$store.dispatch('category/getCategory')
		this.options = getItem('product-options')
		this.filters = getItem('product-filters')
		this.sort = getItem('sorts').product
		this.getProducts(this.$route.query.page, this.$route.query.limit)

	}
}
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
	transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.products {
	.filter {
		display: flex;
		flex-wrap: wrap;

		select {
			width: 140px;
			padding: 20px 8px 5px;
			border-radius: 10px 10px 0 0;
			border-bottom: 1px solid #000;
			background-color: $light-color;
			display: inline-block;
		}

		.filter-item {
			div {
				position: relative;
				margin-bottom: 10px;
				margin-right: 10px;

				span {
					font-size: 11px;
					position: absolute;
					top: 5px;
					left: 10px;
					color: $main-color;
				}
			}
		}

		input {
			width: 120px;
			padding: 20px 10px 5px;
			border-radius: 10px 10px 0 0;
			border-bottom: 1px solid #000;
			background-color: $light-color;
			display: inline-block;
		}

		button {
			position: absolute;
			top: -5px;
			right: -5px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			cursor: pointer;
			background-color: $light-color;
		}
	}

	.table__nav {
		margin-bottom: 10px;

		.filters {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.search {
				display: inline-flex;
				flex-wrap: nowrap;
				border-bottom: 1px solid #454444;
				border-radius: 10px 10px 0 0;
				margin-right: 10px;

				&:hover {
					background-color: $light-color;
				}

				//background-color: $light-color;
				&__input {
					width: 120px;
					background-color: $light-color;
					border-radius: 10px 0 0;
					padding: 10px 0 10px 15px;

				}

				&__btn {
					padding: 10px;
					border-radius: 0 10px 0 0;
					background-color: $light-color;
					cursor: pointer;
					width: 35px;

				}

				&__span {
					width: 35px;
					padding: 10px;
					border-radius: 0 10px 0 0;
					background-color: $light-color;
					display: inline-block;
					font-size: 13px;
				}
			}

		}

		.buttons {
			position: relative;

			.btn {
				border-radius: 10px;
				padding: 10px 15px;
				color: $main-color;
				font-size: 16px;
				font-weight: 500;
				background-color: transparent;
				cursor: pointer;
				text-transform: uppercase;
				transition: all 0.5s ease-in-out;

				&:hover {
					background-color: $light-color;
				}

				i {
					margin-right: 10px;
				}
			}

			.filter__box {
				position: absolute;
				left: 50%;
				z-index: 52;
				background-color: #fff;
				padding: 10px 0;
				border-radius: 10px;
				-webkit-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
				-moz-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
				box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);

				.options {
					padding: 5px 15px;
					cursor: pointer;

					&:hover {
						background-color: $light-color;
					}
				}
			}

			.columns {
				position: absolute;
				left: 0;
				z-index: 52;
				background-color: #fff;
				padding: 15px;
				border-radius: 15px;
				-webkit-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
				-moz-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
				box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);

				.options {
					padding: 5px 0;

					label {
						cursor: pointer;
						letter-spacing: 0.8px;
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
			}
		}
	}

	&__table {
		padding: 0 0 15px;
		border: 1px solid #d3d3d3;
		border-radius: 15px;
		margin-bottom: 50px;

		table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0px;

			.rotate {
				transition: all 0.3s ease-in-out;
				transform: rotate(180deg);
			}

			tr th:first-child,
			tr td:first-child {
				padding-left: 15px;
			}

			tr th:first-child {
				border-radius: 15px 0 0 0;
			}

			tr th:last-child {
				border-radius: 0 15px 0 0;
			}

			tr th:last-child,
			tr td:last-child {
				padding-right: 15px;
			}

			th,
			td {
				padding: 5px;
				border-bottom: 1px solid #d3d3d3;
			}

			thead {
				position: sticky;
				top: 69px;
				z-index: 50;

				.sort_btn {

					font-weight: 500;
					cursor: pointer;
					transition: all 0.3s ease-in-out;

					i {
						transition: all 0.1s ease-in;
					}

					&:hover {
						color: $main-color;
					}
				}

				th {
					font-weight: 500;
					background-color: #fff;
					padding: 18px 10px;
				}
			}

			tbody tr {
				text-align: center;
				cursor: pointer;

				&:hover {
					background-color: $light-color;
				}
			}
		}

		.checked__block {
			width: 100%;
			background-color: rgb(188 255 188);
			//background-color: $main-color;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			z-index: 2;
			top: 0;
			padding: 15px 20px;
			border-radius: 15px 15px 0 0;

			div {
				display: flex;
				align-items: center;
			}

			.btn-close {
				width: 25px;
				height: 25px;
				margin-right: 10px;
				background-image: url(@/assets/images/modal__btn-close.svg);
				background-size: auto;
				background-position: center;
				background-color: transparent;
				opacity: 1;
				cursor: pointer;
			}

			.checked {
				font-size: 18px;
				line-height: 1.75;
				color: $main-color;
			}

			.delete__btn {
				padding: 5px;
				border-radius: 5px;
				color: rgb(140, 0, 0);
				font-size: 18px;
				font-weight: 500;
				text-transform: uppercase;
				transition: all 0.3s ease-in;

				&:hover {
					background-color: rgba(140, 0, 0, 0.238);
				}
			}
		}

		.checkbox {
			width: 20px;
			height: 20px;
			accent-color: green;
			cursor: pointer;
		}
	}
}

@media(max-width:1100px) {
	.products__table {
		overflow-x: auto;

		table {

			thead {
				top: 0
			}
		}
	}
}

@media(max-width:950px) {
	.products {
		.table__nav {
			.filters {
				flex-direction: column;
				align-items: center;
				gap: 5px;

				.buttons {

					.columns,
					.filter__box {
						top: 45px;
					}
				}
			}

		}
	}
}

@media(max-width:590px) {
	.products {
		.filter {
			margin-right: 15px;

			.filter-item {
				flex: 1 0 45%;

				input,
				select {
					width: 100%;
				}
			}

		}

		.container {
			box-shadow: none;
			background-color: transparent;
			padding: 0;
		}

		.table__nav {
			.filters {
				.buttons {
					display: flex;
					justify-content: space-between;

					.btn {
						flex-grow: 1;
						font-size: 14px;
						padding: 10px;
						border-radius: 5px;
					}
				}

			}

		}
	}

	.products__table {
		margin-bottom: 25px;
	}
}

@media(max-width:530px) {
	.products {
		.table__nav {
			.filters {
				.buttons {
					flex-wrap: wrap;
					width: 100%;

					.btn {
						text-align: center;
						width: 45%;
					}

					.filter__box {
						top: 80px;
						left: 0;
					}
				}

			}

		}
	}
}
</style>