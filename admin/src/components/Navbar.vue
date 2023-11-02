<template>
	<section class="navbar">
		<div class="container">
			<div class="nav">
				<div class="nav-blocks">
					<router-link :to="{name:'home'}" class="brand">
					<img src="@/assets/images/logo.svg" alt="">
					</router-link>
					<button v-if="false" class="nav-toggle active">
						<span></span>
					</button>
				</div>
				<div class="nav-blocks">
					<ul class="nav-menu">
						
						<li><router-link :to="{name:'products',query:{page:1,limit:productLimit,category:''}}" class="nav-link">Products</router-link></li>
						<li><router-link :to="{name:'users',query:{page:1,limit:userLimit}}" class="nav-link">Users</router-link></li>
						<li><router-link :to="{name:'orders',query:{page:1,limit:orderLimit}}" class="nav-link">Orders</router-link></li>
						<li><router-link :to="{name:'categories'}" class="nav-link">Categories</router-link></li>
						<li><router-link :to="{name:'reviews',query:{page:1,limit:productLimit}}"  class="nav-link">Reviews</router-link></li>
						<li><router-link :to="{name:'reservations',query:{page:1,limit:productLimit}}"  class="nav-link">Reservations</router-link></li>
						
					</ul>
					<div v-if="!isLoading" class="profile">
						<a>
							<img v-if="user.user.image" :src="user.user.image" alt="">
							<span v-if="!user.user.image">{{ user.user.name[0] }}</span>
						</a>
					</div>
				</div>
		
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
	export default {
		name:'navbar',
		computed:{
			...mapState({
				user:state=>state.auth.user,
				isLoading:state=>state.auth.isLoading,
				userLimit:state=>state.user.limit,
				productLimit:state=>state.product.limit,
				orderLimit:state=>state.order.limit
			})
		}
	}
</script>

<style lang="scss" scoped>
.navbar{
	position: fixed;
	z-index: 9999;
	width: 100%;
	background-color: #fff;
	-webkit-box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
-moz-box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
}
.nav{
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25px 10px;
	
	&-blocks{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&-menu{
		display: flex;
		.nav-link{
			color: #000;
			background-color: transparent;
			font-size: 20px;
			letter-spacing: 2px;
			font-weight: 500;
			border: none;
			padding: 0.5em 1em;
			transition: color 0.3s ease-in-out;
			cursor: pointer;
			&:hover{
				color: $main-color;
			}
		}
	}
	.profile{
		width: 35px;
		height: 35px;
		background-color: $main-color;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		border-radius: 50%;
		cursor: pointer;
		a{
			height: 35px;
			width: 35px;
		}
		img{
			width: 35px;
			height: 35px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&-toggle{
		border: none;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		span,
		span::before,
		span::after{
			width: 18px;
			height: 2px;
			background-color: black;
			display: inline-block;
		}
		span{
			position: relative;
		}
		span::before{
			content: '';
			position: absolute;
			top: -6px;
			left: 0;
		}
		span::after{
			content: '';
			position: absolute;
			top: 6px;
			left: 0;
		}
		&.active{
			span{
				height:  0;
				&::after{
					top: -1px;
					transform: rotate(135deg);
				}
				&::before{
					top: -1px;
					transform: rotate(45deg);
				}
			}
		}
	}

}
</style>