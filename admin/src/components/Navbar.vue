<template>
	<section class="navbar">
		<div class="nav">
			<div class="nav-blocks">
				<button  @click="toggleSidebar" class="nav-toggle" :class="{'active':showSidebar}">
					<span><i class="fa fa-bars" aria-hidden="true"></i></span>
				</button>
				<div class="brand">
					<span>Pirosmani Admin</span>
				</div>
			</div>
			<div v-if="!isLoading" class="nav-blocks">
				<div  class="profile">
					<a>
						<img v-if="user.user.image" :src="user.user.image" alt="">
						<span v-if="!user.user.image">{{ user.user.name[0] }}</span>
					</a>
				</div>
				<span class="user-name">{{ user.user.name }}</span>
			</div>
	
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
	export default {
		name:'navbar',
		data(){
			return{
				showSidebar:true
			}
		},
		computed:{
			...mapState({
				user:state=>state.auth.user,
				isLoading:state=>state.auth.isLoading,
				userLimit:state=>state.user.limit,
				productLimit:state=>state.product.limit,
				orderLimit:state=>state.order.limit
			})
		},
		methods:{
			toggleSidebar(){
				this.showSidebar=!this.showSidebar
				this.$emit('toggleSidebar',this.showSidebar)
			}
		}
	}
</script>

<style lang="scss" scoped>
.navbar{
	position: fixed;
	z-index: 9999;
	width: 100%;
	background-color: $main-color;
	
	-webkit-box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
	-moz-box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
	box-shadow: -1px 10px 17px -5px rgba(45, 104, 45, 0.2);
}
.nav{
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:10px 20px;
	
	&-blocks{
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		.brand{
			span{
				font-family: 'Pacifico', cursive, sans-serif;
				font-size: 28px;
				color: #fff;
				margin-left: 50px;
				cursor: default;
			}
		}
	}
	.user-name{
		font-size: 20px;
		color: #fff;
		font-weight: 500;
		margin-left: 10px;
		font-family: 'Pacifico', cursive, sans-serif;
		cursor: pointer;
	}
	.profile{
		width: 40px;
		height: 40px;
		color: $main-color;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		border-radius: 50%;
		cursor: pointer;
		a{
			height: 40px;
			width: 40px;
		}
		img{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	&-toggle{
		background-color: $main-color;
		color: #fff;
		font-size: 25px;
		transition: all 0.3s ease-in-out;
		cursor: pointer;
		&.active{
			transform: rotate(180deg);
		}
	}

}
</style>