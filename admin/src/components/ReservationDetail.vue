<template>
	<div class="reservation-detail">
		<div class="top">
			<h2 class="title">Reservation Detail</h2>
			<button class="close-btn" @click.prevent="closeSidebar"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<loading v-if="reserLoading"/>
		<div v-if="!reserLoading" class="body">
			<div class="info">
				<span class="title">User</span>
				<span class="customer" @click="this.$router.push(`/users/${reservation.user.id}`)">{{reservation.user.name}}</span>
			</div>
			<div class="info">
				<span class="title">Phone</span>
				<span>{{reservation.user.phone}}</span>
			</div>
		</div>
		<form @submit.prevent="submitHandler" v-if="!reserLoading" action="">
			<span class="title">Number of people</span>
			<input type="number" placeholder="Number of people" :value="reservation.numOfPeople" @change="numOfPeopleToggle($event)">
			<span class="title">Time</span>
			<input type="time" placeholder="Time" :value="reservation.time" @change="timeToggle($event)">
			<span class="title">Date</span>
			<input type="date" placeholder="Date" :value="reservation.date" @change="dateToggle($event)">
			<span class="title">Status</span>
			<select name="" id="" :value="reservation.status" @change="statusToggle($event)">
				<option value="Pending">Pending</option>
				<option value="Serviced">Serviced</option>
				<option value="Canceled">Canceled</option>
			</select>
			<div class="btns">
				<green-btn class="green-btn">Update</green-btn>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name:'reservation-detail',
		data(){
			return{
				numOfPeople:null,
				date:'',
				time:'',
				status:''
			}
		},
		computed:{
			...mapState({
				reservation:state=>state.reservation.reserv,
				reserLoading:state=>state.reservation.reserLoading,
				reserError:state=>state.reservation.errors
			}),
			
		},
		methods:{
			closeSidebar(){
				this.$emit('close',false)
			},
			formatDate (dateString){
  				const options = { year: "numeric", month: "numeric", day: "numeric" }
  				return new Date(dateString).toLocaleDateString(undefined, options)
			},
			deleteCategory(){
				console.log(this.category.id)
				this.$store.dispatch('category/deleteCategory',this.category.id).then((res)=>{
					this.$store.dispatch('category/getCategory')
					this.closeSidebar()
				});

			},
			submitHandler(){
				const data={
					id:this.reservation.id,
					numOfPeople:this.numOfPeople,
					time:this.time,
					date:this.date,
					status:this.status
				}
				console.log(data)
				this.$store.dispatch('reservation/updateReservation',data).then((res)=>{
					this.$store.dispatch('reservation/getReservations',{page:this.$route.query.page})
					this.closeSidebar()
				})
			},
			numOfPeopleToggle(e){
				this.numOfPeople=e.target.value
			},
			timeToggle(e){
				this.time=e.target.value
			},
			dateToggle(e){
				this.date=e.target.value
			},
			statusToggle(e){
				this.status=e.target.value
			}
		},
	}
</script>

<style lang="scss" scoped>
.reservation-detail{
	.title{
		display: block;
		font-weight: 500;
		margin-bottom: 5px;
	}
	.btns{
		display: flex;
		justify-content: flex-end;
		.green-btn{
			font-size: 16px;
		}
	}
	.top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		h2.title{
			font-weight: 500;
			font-size: 1.25rem;
			line-height: 1.6;
			letter-spacing: 0.0075em;
		}
		.close-btn{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			font-size: 24px;
			color: #7a7979;
			cursor: pointer;
			background-color: transparent;
			transition: all 0.2s ease-in-out;
			&:hover{
				background-color: $light-color;
				color: $main-color;
			}
		}
	}
	.body{
		display: flex;
		gap: 20px;
		padding: 0 20px;
		font-size: 16px;
		.info{
			flex:1 0 48%;
			.customer{
				color: $main-color;
				cursor: pointer;
			}
		}
	}
	form{
		margin: 20px;
		input,select{
			width: 100%;
			padding: 12px 20px;
			background: #FCFCFC;
			border: 1.1194px solid #EBEBEB;
			border-radius: 7.11356px;
			margin-bottom: 15px;
			font-size: 16px;
			&:focus {
				border: 1.1194px solid $main-color;
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
</style>