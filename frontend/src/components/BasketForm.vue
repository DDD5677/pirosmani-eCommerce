<template>
	<form action="" class="makeAnOrder-form">
		<div class="select-box" :class="{'none':tab2}" id="region-box">
			<label for="regions">Район доставки</label>
			<select v-model="customerInfo.city">
				<option v-for="region in regions">{{ region }}</option>
			</select>
		</div>
		<div class="error__message" :class="{'none':tab2}" v-if="errors&&errors.city">{{ errors.city }}</div>
		<form-input 
		:label="'ФИО'" 
		:type="'text'" 
		:placeholder="'Введите Ваше полное имя'" 
		:errors="errors" 
		:error="errors?errors.name:''" 
		v-model="customerInfo.name"/>
		
		<form-input 
		:label="'Телефон'" 
		:type="'tel'" 
		:placeholder="'+998'" 
		:errors="errors" 
		:error="errors?errors.phone:''" 
		v-model="customerInfo.phone"/>


		<div :class="{'none':tab2}">
			<form-input 
			:label="'Адрес доставки 1'" 
			:type="'text'" 
			:placeholder="'Введите адрес доставки'" 
			:errors="errors"
			:error="errors?errors.shippingAdress1:''" 
			v-model="customerInfo.shippingAdress1"/>
			
			<form-input 
			:label="'Адрес доставки 2'" 
			:type="'text'" 
			:placeholder="'Введите адрес доставки'" 
			v-model="customerInfo.shippingAdress2"/>

		</div>

		<div class="select-box" :class="{'none':tab1}" id="delivery-box">
			<label for="">Когда заберете?</label>
			<select name="data-del" id="data-del">
				<option value="volvo">В ближайшее время</option>
				<option value="saab">Через неделя</option>
			</select>
		</div>
		<div class="comment" :class="{'none':tab2}">
			<span class="comment__link" @click="commentHandler">Добавить комментарий.</span>
			<form-input 
			v-if="comment"
			class="comment__input"
			:label="''" 
			:type="'text'" 
			:placeholder="'Введите ваш комментарий...'" 
			v-model="customerInfo.comment"/>
			
		</div>
		<green-btn  @click.prevent="submitHandler" class="green__btn">Оформить заказ</green-btn>
	</form>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		name:'basket-form',
		props:{
			tab1:Boolean,
			tab2:Boolean
		},
		data(){
			return{
				regions:[
					'Ташкент',
					'Ташкентская область',
					'Наманган',
					'Фергана',
					'Андижан',
					'Сырдарья',
					'Джизак',
					'Самарканд',
					'Навои',
					'Хорезм',
					'Бухара',
					'Кашкадарья',
					'Сурхандарьинская'
				],
				customerInfo:{
					name:'',
					city:'',
					shippingAdress1:'',
					shippingAdress2:'',
					phone:'',
					orderItems:null,
					user:'',
					comment:''
				},
				comment:false
			}
		},
		computed:{
			...mapState({
				orderProducts: state=>state.order.userOrder.orderProducts,
				user: state=>state.auth.user.user,
				errors:state=>state.order.errors
			}),
		},
		methods:{
			commentHandler(){
				this.comment=!this.comment
				this.customerInfo.comment=''
			},
			submitHandler(){
				const data={
					...this.customerInfo,user:this.user.id,orderItems:this.orderProducts
				}
				this.$store.dispatch('order/addOrder',data).then(res=>{
					this.customerInfo.name='';
					this.customerInfo.city='';
					this.customerInfo.shippingAdress1='';
					this.customerInfo.shippingAdress2='';
					this.customerInfo.phone='';
					this.customerInfo.comment='';
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.makeAnOrder-form {
	.error__message{
		font-size: 14px;
		color: red;
		margin-top: -15px;
	}
	label {

		margin-bottom: 5px;
		font-weight: 400;
		font-size: 16	px;
		line-height: 24px;
	}
	.select-box {
		position: relative;
		margin-bottom: 15px;

		&::after {
			content: '';
			display: block;
			width: 26px;
			height: 26px;
			background-position: center;
			background-size: cover;
			background-image: url(@/assets/images/select-arrow-down.svg);
			position: absolute;
			top: 65%;
			transform: translateY(-50%);
			right: 15px;
			pointer-events: none;
		}
		&:focus::after{
		transform: rotate(180deg);
	}
	}
	
	select {
		width: 100%;
		padding: 12px 20px;
		background: #FCFCFC;
		border: 1.1194px solid #EBEBEB;
		border-radius: 7.11356px;
		appearance: none;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		cursor: pointer;

		&:focus {
			border: 1.1194px solid $main-color;
		}

		option {
			padding: 10px;
		}
	}

	input {
		width: 100%;
		padding: 20px 30px;
		background: #FCFCFC;
		border: 1.1194px solid #EBEBEB;
		border-radius: 7.11356px;
		margin-bottom: 15px;

		&:focus {
			border: 1.1194px solid $main-color;
		}

		&::placeholder {
			font-weight: 400;
			font-size: 15.6716px;
			line-height: 24px;
			color: #C6C6C6;
		}
	}

	.comment {
		margin-bottom: 60px;
		position: relative;

		span {
			font-weight: 500;
			font-size: 17.0726px;
			line-height: 24px;
			color: $main-color;
			cursor: pointer;
			border-bottom: 1px solid $main-color;
			margin-bottom: 15px;
			display: inline-block;

		}

		.comment__input {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: -60px
		}
	}

}
</style>