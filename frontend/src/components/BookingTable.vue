<template>
	<div class="modal__body">
		<h5 class="title" id="staticBackdropLabel">
			Бронирование стола
		</h5>
		<form action="">
			<form-input 
			:label="''" 
			:type="'text'" 
			:placeholder="'Имя'" 
			:errors="errors" 
			:error="errors?errors.name:''" 
			v-model="name"/>
			<form-input 
			:label="''" 
			:type="'tel'" 
			:placeholder="'+998'" 
			:errors="errors" 
			:error="errors?errors.phone:''" 
			v-model="phone"/>
			<form-input 
			:label="''" 
			:type="'number'" 
			:placeholder="'Количество человек'" 
			:errors="errors" 
			:error="errors?errors.numOfPeople:''" 
			v-model="numOfPeople"/>
			
			<input
				type="time"
				data-placeholder="Время: _ _ : _ _"
				required
				v-model="time"
			/>
			<div class="error__message" v-if="errors&&errors.time">{{ errors.time }}</div>
			<input
				type="date"
				data-placeholder="Дата:  дд.мм.гг"
				required
				v-model="date"
				name="trip-start"
			/>
			<div class="error__message" v-if="errors&&errors.date">{{ errors.date }}</div>
			
		</form>
	</div>
	<div class="modal__footer">
		<green-btn :disabled="reqLoading" @click.prevent="postReservationHandler" class="green__btn">Забронировать</green-btn>
	</div>
			
</template>

<script>
import { mapState,mapMutations } from 'vuex'
	export default {
		name:'book-table',
		data(){
			return{
				name:'',
				phone:'',
				time:'',
				date:'',
				numOfPeople:null,
				reqLoading:false
			}
		},
		computed:{
			...mapState({
				user:state=>state.auth.user.user,
				errors:state=>state.order.errors,
			})
		},
		methods:{
			...mapMutations({
				toggleModal:'navbar/toggleModal',
			}),
			postReservationHandler(){
				this.reqLoading=true
				const data = {
					user:this.user.id,
					name:this.name,
					phone:this.phone,
					time:this.time,
					date:this.date,
					numOfPeople:this.numOfPeople
				}

				this.$store.dispatch('order/postReservation',data).then((res)=>{
					// this.name='';
					// this.phone='';
					// this.date='',
					// this.time='',
					// this.numOfPeople=null;
					this.reqLoading=true;
					this.toggleModal(false)
				}).catch(err=>{
					this.reqLoading=false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.modal__body {
	.error__message{
		font-size: 14px;
		color: red;
		margin-top: -15px;
		margin-bottom: 10px;
	}
		input {
			margin-bottom: 15px;
			width: 100%;
			background: #FCFCFC;
			border: 0.873181px solid #EBEBEB;
			border-radius: 5.91549px;
			padding: 15px 10px 15px 50px;
			background-repeat: no-repeat;
			background-position: 18px center;

			&:focus {
				border-color: $main-color;
			}

			&::placeholder {
				font-weight: 400;
				font-size: 13px;
				line-height: 18px;
				color: #C6C6C6;
			}

		}
		
		.green__btn {
			margin-top: 15px;
		}
	}
.modal__body {
	.title {
		font-weight: 500;
		font-size: 18px;
		line-height: 18px;
		margin: 20px 0 30px;
	}
	

	input {
		padding-left: 20px;

		&::placeholder {
			font-size: 14px;
		}
	}


	//style of input time

	input[type="time"] {
		position: relative;
	}

	input[type="time"]::before {
		content: attr(data-placeholder);
		width: 100%;
		font-weight: 400;
		font-size: 13.3553px;
		line-height: 17px;
		color: #C6C6C6;

	}

	input[type="time"]::-webkit-calendar-picker-indicator {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		color: transparent;
		cursor: pointer;
	}


	input[type="time"]:valid::before {
		display: none;

	}

	input[type="date"]::-webkit-clear-button,
	input[type="time"]::-webkit-inner-spin-button {
		display: none;
	}

	//style of input date
	input[type="date"] {
		position: relative;
		background-image: url(@/assets/images/input__date-icon.svg);
		background-repeat: no-repeat;
		background-position: right 16px center;
	}

	input[type="date"]::-webkit-clear-button,
	input[type="date"]::-webkit-inner-spin-button {
		display: none;
	}

	input[type="date"]::-webkit-calendar-picker-indicator {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		color: transparent;
		cursor: pointer;
	}

	input[type="date"]::before {
		content: attr(data-placeholder);
		width: 100%;
		font-weight: 400;
		font-size: 13.3553px;
		line-height: 17px;
		color: #C6C6C6;

	}

	input[type="date"]:valid::before {
		display: none;

	}
}

.modal__footer {
	text-align: center;

	.green__btn {
		font-weight: 500;
		font-size: 16.2592px;
		line-height: 21px;
		margin-top: 10px;
	}
}
   
</style>