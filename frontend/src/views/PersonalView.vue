<template>
	<section class="personal__tab">
		<div class="container">
			<ul class="nav ">
				<li class="nav-item">
					<button
						@click.prevent="personalHandler"
						:class="{'active':tab1}"
						class="nav-link nav-link-1"
						type="button"
					>
						<span>Личные данные</span>
					</button>
				</li>
				<li class="nav-item" >
					<button
						@click.prevent="historyOrdersHandler"
						:class="{'active':tab2}"
						class="nav-link nav-link-2"
						type="button"
					>
						<span>История заказов</span>
					</button>
				</li>
			</ul>
			<div  class="tab-content">
				<div v-if="tab1" class="tab-pane">
					<loading v-if="userIsLoading"/>
					<personal-info v-if="!userIsLoading"/>
				</div>
				<div v-if="tab2" class="tab-pane">
					<loading v-if="isLoading"/>
					<history-orders v-if="!isLoading&&!errors" :orderList="orderList"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		data(){
			return{
				tab1:true,
				tab2:false,
				orderList:[]
			}
		},
		computed:{
			...mapState({
				user:state=>state.auth.user.user,
				userIsLoading:state=>state.auth.isLoading,
				errors:state=>state.order.errors,
				isLoading:state=>state.order.isLoading,


			})
		},
		methods:{
			personalHandler(){
				this.tab1=true;
				this.tab2=false
			},
			historyOrdersHandler(){
				this.tab2=true;
				this.tab1=false;
				this.$store.dispatch('order/getOrdersByUserId',this.user.id).then(res=>this.orderList=res);

			}
		}
	}
</script>

<style lang="scss" scoped>
.personal__tab {
	padding: 160px 0;
	@media(max-width:820px){
		padding: 80px 0 40px;
	}
	@media(max-width:450px){
		padding: 60px 0 40px;
	}
   .nav {
		display: flex;
      .nav-link {
         padding: 73px 13px 14px;
         color: $main-color;
         background-repeat: no-repeat;
         background-position: 50% 25%;
         font-weight: 500;
         font-size: 14.2907px;
         line-height: 21px;
			border-radius: 10px;
			cursor: pointer;
         &.active {
            background-color: $main-color;
            color: #fff;
         }
      }

      .nav-link-1 {
         background-image: url(@/assets/images/personal__info-green.svg);
         margin-right: 80px;

         &.active {
            background-image: url(@/assets/images/personal__info-white.svg);
            background-color: $main-color;
            color: #fff;
         }
      }

      .nav-link-2 {
         background-image: url(@/assets/images/history_ofOrder-green.svg);

         &.active {
            background-image: url(@/assets/images/history_ofOrder-white.svg);

         }
      }
   }
}
</style>