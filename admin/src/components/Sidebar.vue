<template>
	<section class="sidebar">
		<div class="menu">
			<ul class="menu-list">
				<li class="nav-item">
					<router-link :to="{ name: 'home' }" class="nav-link">
						<span class="nav-icon"><i class="fa-solid fa-house"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Home</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'products', query: { page: 1, limit: productLimit, category: '' } }"
						class="nav-link">
						<span class="nav-icon"><i class="fa fa-cutlery" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Products</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'users', query: { page: 1, limit: userLimit } }" class="nav-link">
						<span class="nav-icon"><i class="fa fa-user" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Users</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'orders', query: { page: 1, limit: orderLimit } }" class="nav-link">
						<span class="nav-icon"><i class="fa fa-usd" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Orders</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'categories' }" class="nav-link">
						<span class="nav-icon"><i class="fa fa-sitemap" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Categories</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'banners' }" class="nav-link">
						<span class="nav-icon"><i class="fa-solid fa-panorama"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Banners</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'reviews', query: { page: 1, limit: productLimit } }" class="nav-link">
						<span class="nav-icon"><i class="fa fa-comment fa-flip-horizontal" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Reviews</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'reservations', query: { page: 1, limit: productLimit } }" class="nav-link">
						<span class="nav-icon"><i class="fa fa-handshake" aria-hidden="true"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Reservations</span>
						</transition>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link :to="{ name: 'settings' }" class="nav-link">
						<span class="nav-icon"><i class="fa-solid fa-gear"></i></span>
						<transition name="fade">
							<span v-if="show" class="nav-text">Settings</span>
						</transition>
					</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'sidebar',
	props: {
		show: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	computed: {
		...mapState({
			user: state => state.auth.user,
			isLoading: state => state.auth.isLoading,
			userLimit: state => state.user.limit,
			productLimit: state => state.product.limit,
			orderLimit: state => state.order.limit
		})
	}
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
	transition: all 0.9s linear;

}

.fade-leave-active {
	transition: all 0.3s linear;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.sidebar {
	padding-top: 70px;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;

	.menu-list {

		.nav-item {
			display: block;
			color: rgba($color: #000000, $alpha: .7);

			&:hover {
				background-color: rgba($color: $main-color, $alpha: .3);

			}

			;

			.nav-icon {
				display: inline-block;
				font-size: 24px;
				padding: 10px;
				width: 60px;
				text-align: center;
			}
		}

		.nav-link {
			display: inline-block;
			color: rgba($color: #000000, $alpha: .6);

			transition: all 0.1s ease;

			&:focus {
				color: $dark-color;
				font-weight: 500;
			}
		}

		.nav-text {
			display: inline-block;
			width: 200px;
			background-color: transparent;
			font-size: 20px;
			letter-spacing: 2px;
			font-weight: 500;
			border: none;
			padding: 10px;
			cursor: pointer;


		}
	}
}

@media(max-width:480px) {
	.sidebar {
		.menu-list {
			.nav-item {
				.nav-icon {
					font-size: 20px;
					width: 50px;
				}
			}
		}
	}
}
</style>