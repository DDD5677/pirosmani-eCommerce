<template>
	<div class="modal__header">
		<div class="img-box">
			<img src="@/assets/images/log__in-grey.svg" alt="" />
		</div>
	</div>
	<div>
		<h5 class="title">Войти</h5>
		<form >
			<div class="modal__body">
				<input class="email" type="email" placeholder="Email" v-model="email" />
				<input
					class="password"
					type="password"
					placeholder="Пароль"
					v-model="password"
				/>
				<span class="error__text active"
					>{{ errors?errors.auth:'' }}</span
				>
				<div class="forgot__password">
					<a
					@click="toggleForgotPassword"
					>
					Забыли пароль?
					</a>
				</div>
				<green-btn class="enter__profile" @click.prevent="submitHandler" >
				Войти
				</green-btn>
			</div>
		</form>
	</div>
</template>

<script>
import { setItem } from '@/helpers/localStorage';
import { mapMutations, mapState } from 'vuex';
export default {
	name:'sign-in',
	data(){
		return{
			email:'',
			password:'',
			product_options:[
					{
						title:'Image',
						show:true
					},
					{
						title:'Name',
						show:true
					},
					{
						title:'Price',
						show:true
					},
					{
						title:'Count in stock',
						show:true
					},
					{
						title:'Rate',
						show:true
					},
					{
						title:'Featured',
						show:true
					},
					{
						title:'Date created',
						show:true
					}
			],
			order_options:[
					{
						title:'Customer',
						show:true
					},
					{
						title:'Phone',
						show:true
					},
					{
						title:'City',
						show:true
					},
					{
						title:'Adress',
						show:true
					},
					{
						title:'Status',
						show:true
					},
					{
						title:'Total price',
						show:true
					},
					{
						title:'Date ordered',
						show:true
					}
			],
			user_options:[
				{
					title:'Avatars',
					show:true
				},
				{
					title:'Customers',
					show:true
				},
				{
					title:'Phone',
					show:true
				},
				{
					title:'Email',
					show:true
				},
				{
					title:'Total spent',
					show:true
				},
				{
					title:'Admin',
					show:true
				}
				
			],
			review_options:[
				{
					title:'Date',
					show:true
				},
				{
					title:'Customer',
					show:true
				},
				{
					title:'Product',
					show:true
				},
				{
					title:'Rating',
					show:true
				},
				{
					title:'Comment',
					show:true
				},
				{
					title:'Status',
					show:true
				}
			],
			product_filters:[
				{
					title:'Min price',
					source:'',
					show:false
				},
				{
					title:'Max price',
					source:'',
					show:false
				},
				{
					title:'Min rate',
					source:'',
					show:false
				},
				{
					title:'Min count in stock',
					source:'',
					show:false
				},
				{
					title:'Featured',
					source:'',
					show:false
				},
				{
					title:'Category',
					source:'',
					show:false
				},
			],
			order_filters:[
				{
					title:'Min price',
					source:'',
					show:false
				},
				{
					title:'Max price',
					source:'',
					show:false
				},
				{
					title:'Status',
					source:'',
					show:false
				},
			],
			review_filters:[
				{
					title:'Status',
					source:'',
					show:false
				},
				{
					title:'Posted since',
					source:'',
					show:false
				},
				{
					title:'Posted before',
					source:'',
					show:false
				},
				{
					title:'Min Rate',
					source:'',
					show:false
				}
			],
			sorts:{
				user:'',
				product:'',
				order:'',
				review:''
			}
		}
	},
	computed:{
		...mapState({
			errors:state=>state.auth.errors
		})
	},
	methods:{
		submitHandler(){
			const data={
				email:this.email,
				password:this.password
			}
			
			this.$store.dispatch('auth/login',data).then(()=>{
				this.$router.push("/");
				setItem('sorts',this.sorts)
				setItem('user-options',this.user_options)
				setItem('product-options',this.product_options)
				setItem('order-options',this.order_options)
				setItem('review-options',this.review_options)
				setItem('product-filters',this.product_filters)
				setItem('order-filters',this.order_filters)
				setItem('review-filters',this.review_filters)
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.modal__header {
	.img-box {
		text-align: center;
		margin-bottom: 14px;
	}
}
.title {
		margin-bottom: 30px;
		font-weight: 500;
		font-size: 17.4636px;
		line-height: 22px;
		text-align: center;
	}
	.modal__body {
			text-align: center;
			margin-bottom: 24px;
			.enter__profile {
				padding-top: 13px;
				padding-bottom: 13px;
				display: inline-block;
				width: 143.2px;
				height: 45.41px;
				font-weight: 500;
				font-size: 14.1972px;
				line-height: 18px;
			}
         input {
            margin-bottom: 25px;
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

            &.password {
               background-image: url(@/assets/images/input__password.svg);

            }
         }
      }
	.forgot__password {
		text-align: center;
		margin-bottom: 10px;
		cursor: pointer;
		a {
			font-weight: 400;
			font-size: 14.1972px;
			line-height: 17px;
			color: $main-color;
			text-decoration: none;
			border-bottom: 1px solid $main-color;
			display: inline-block;
			margin: 0 auto;
		}
	}

	

	.error__text {
		margin-top: -20px;

		display: none;

		&.active {
			display: block;
		}

		font-weight: 400;
		font-size: 10px;
		line-height: 15px;
		text-align: center;
		color: #EB5757;
	}


</style>