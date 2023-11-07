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
					
					<img v-if="user.user.image" :src="user.user.image" alt="">
					<span v-if="!user.user.image">{{ user.user.name[0] }}</span>
					
				</div>
				<span @click="logoutModal" class="user-name">{{ user.user.name }}</span>
				<Transition name="fade">
					<div  v-if="dropdown" @click="logoutAdmin" class="dropdown">
						<span class="logout">Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i></span>
					</div>
				</Transition>
			</div>
	
		</div>
	</section>
</template>

<script>
import { removeItem } from '@/helpers/localStorage';
import { mapState } from 'vuex';
	export default {
		name:'navbar',
		data(){
			return{
				showSidebar:true,
				dropdown:false
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
			logoutAdmin(){
				removeItem('token');
				this.$router.push('/login')
			},
			logoutModal(){
				this.dropdown=!this.dropdown
			},
			toggleSidebar(){
				this.showSidebar=!this.showSidebar
				this.$emit('toggleSidebar',this.showSidebar)
			}
		}
	}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translate(5px,-5px);
}
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
	.dropdown{
		padding: 15px 20px;
		border-radius: 5px;
		cursor: pointer;
		color: rgba($color: #000000, $alpha: .7);
		position: absolute;
		right: 10px;
		top: 58px;
		background-color: #fff;
		z-index: 99999;
		-webkit-box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);
		-moz-box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);
		box-shadow: -2px 1px 8px 2px rgba(34, 60, 80, 0.2);
		&:hover{
			background-color: $light-color;
		}
		.logout{
			font-size: 20px;
			font-weight: 500;
		}
		i{
			margin-left: 10px;
		}
	}
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
		font-size: 22px;
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
		border-radius: 50%;
		cursor: pointer;
		
		span{
			font-size: 22px;
			font-weight: 500;
			font-family: 'Pacifico', cursive, sans-serif;
		}
		img{
			width: 100%;
			height: 100%;
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