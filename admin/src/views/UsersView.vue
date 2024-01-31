<template>
	<section class="users">
		<div class="container">

			<div class="users__inner">
				<div class="table__nav">
					<div class="filters">
						<div class="search">
							<input type="text" placeholder="Search" v-model="search" class="search__input"
								@change="getUsers(1, this.$route.query.limit)">
							<div v-if="!search" class="search__span"><i class="fa fa-search" aria-hidden="true"></i></div>
							<button v-if="search" @click="cleanSearch" class="search__btn"><i class="fa fa-times"
									aria-hidden="true"></i></button>
						</div>

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
						<router-link :to="{ name: 'create-user' }" class="btn"><i class="fa fa-plus"
								aria-hidden="true"></i>Create</router-link>

						<button class="btn"><i class="fa fa-download" aria-hidden="true"></i>Export</button>
					</div>
				</div>
				<div class="users__table">
					<table>
						<thead>
							<tr>
								<th v-if="!usersError">
									<span></span>
									<input class="checkbox" ref="foomain" @click="allCheck" type="checkbox">
								</th>
								<th v-if="options[0].show">{{ options[0].title }}</th>
								<th v-if="options[1].show">
									<span @click="sortHandler('name')" class="sort_btn">
										{{ options[1].title }}
										<i v-if="sort === 'name' || sort === '-name'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[2].show">{{ options[2].title }}</th>
								<th v-if="options[3].show">{{ options[3].title }}</th>
								<th v-if="options[4].show">{{ options[4].title }}</th>
								<th v-if="options[5].show">{{ options[5].title }}</th>
							</tr>
							<div v-if="checked > 0" class="checked__block">
								<div>
									<button @click="removeCheck" type="button" class="btn-close"></button>
									<span class="checked">{{ checked }} Items selected</span>
								</div>
								<a @click.prevent="deleteUsers" class="delete__btn"><i class="fa fa-trash" aria-hidden="true"></i>
									Delete</a>
							</div>
						</thead>
						<tbody v-if="!usersLoading && !usersError">
							<tr v-for="user in users" :id="user.id">
								<td>
									<span></span>
									<input class="checkbox" ref="foo" @click="removedUsersId($event, user.id)" type="checkbox">
								</td>
								<td v-if="options[0].show">
									<avatar :info="user" />
								</td>
								<td v-if="options[1].show" @click="userDetail(user.id)">{{ user.name }} {{ user.surname }}</td>
								<td v-if="options[2].show" @click="userDetail(user.id)">{{ user.phone }}</td>
								<td v-if="options[3].show" @click="userDetail(user.id)">{{ user.email }}</td>
								<td v-if="options[4].show" @click="userDetail(user.id)">{{ user.totalSpent }}</td>
								<td v-if="options[5].show" @click="userDetail(user.id)">{{ user.isAdmin }}</td>
							</tr>
						</tbody>
					</table>
					<loading v-if="usersLoading" />
					<error v-if="usersError" :error="usersError" />
				</div>
				<pagination :getData="getUsers" :page="page" :pageSize="pageSize" />
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
			removedUserId: [],
			options: []
		}
	},
	computed: {
		...mapState({
			users: state => state.user.users,
			page: state => state.user.page,
			pageSize: state => state.user.pageSize,
			usersLoading: state => state.user.isLoading,
			usersError: state => state.user.errors
		}),

	},
	methods: {
		...mapMutations({
			changePage: 'user/changePage',
			changeLimit: 'user/changeLimit'
		}),
		userDetail(id) {
			this.$router.push(`/users/${id}`)
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
			this.getUsers(this.$route.query.page, this.$route.query.limit)
			const sorts = getItem('sorts')
			setItem('sorts', { ...sorts, user: this.sort })
		},
		toggleColumns() {
			this.columns = !this.columns
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
			setItem('user-options', this.options)
		},
		cleanSearch() {
			this.search = ''
			this.getUsers(1, this.$route.query.limit)
		},
		// delete checked data logic
		removedUsersId(checkbox, id) {
			if (checkbox.target.checked) {
				this.removedUserId.push(id)
				this.countCheckedItems()
			} else {
				this.removedUserId = this.removedUserId.filter(item => item !== id)
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
			this.removedUserId = [];
			this.toggle()
		},
		allCheck() {
			this.removedUserId = [];
			for (let user of this.users) {
				this.removedUserId.push(user.id)
			}
			this.toggle()
		},

		deleteUsers() {
			const data = {
				users: this.removedUserId
			}
			console.log(data)
			this.$store.dispatch('user/deleteUsers', data).then(() => {
				location.reload()
			});

		},
		//------------------------------------------------------

		getUsers(page, limit) {
			const queries = {
				page: page,
				limit: limit,
				sort: this.sort,
				search: this.search
			}
			this.$store.dispatch('user/getUsers', queries);
			this.changePage(page);
			this.changeLimit(limit);
			this.$router.push({ path: "/users", query: queries });
		}
	},
	watch: {
		page(newp, old) {
			this.removedUserId = [];
			this.checked = 0
		},
	},
	created() {
		this.options = getItem('user-options')
		this.sort = getItem('sorts').user
	},
	mounted() {
		this.getUsers(this.$route.query.page, this.$route.query.limit)
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

.users {
	.table__nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;

		.filters {
			.search {
				display: inline-block;
				font-size: 16px;
				border-bottom: 1px solid #454444;
				border-radius: 15px 15px 0 0;

				&:hover {
					background-color: $light-color;
				}

				//background-color: $light-color;
				&__input {
					background-color: $light-color;
					border-radius: 15px 0 0;
					padding: 10px 0 10px 15px;

				}

				&__btn {
					padding: 10px;
					border-radius: 0 15px 0 0;
					background-color: $light-color;
					cursor: pointer;
					width: 35px;

				}

				&__span {
					width: 35px;
					padding: 10px;
					border-radius: 0 15px 0 0;
					background-color: $light-color;
					display: inline-block;
					font-size: 13px;
				}
			}
		}

		.buttons {
			position: relative;

			.btn {
				border-radius: 15px;
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

			.columns {
				position: absolute;
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

		.rotate {
			transition: all 0.3s ease-in-out;
			transform: rotate(180deg);
		}

		table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0px;

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
				top: 85px;
				z-index: 50;

				.sort_btn {
					cursor: pointer;
					font-weight: 500;
					transition: all 0.3s ease-in-out;

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
	.users__table {
		overflow-x: auto;

		table {
			thead {
				top: 0
			}
		}
	}
}

@media(max-width:950px) {
	.users {
		.table__nav {
			flex-direction: column;
			align-items: center;
			gap: 5px;

		}
	}
}

@media(max-width:550px) {
	.users {
		.container {
			box-shadow: none;
			background-color: transparent;
			padding: 0;
		}

		.table__nav {
			.buttons {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.columns {
					top: 45px;
				}

				.btn {
					font-size: 14px;
					padding: 10px;
					border-radius: 5px;
				}
			}

		}
	}
}
</style>