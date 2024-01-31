<template>
	<div class="modal__header">
		<div class="img-box">
			<img src="@/assets/images/log__in-grey.svg" alt="" />
		</div>
	</div>
	<div>
		<h5 class="title">Войти</h5>
		<form>
			<div class="modal__body">
				<input class="email" type="email" placeholder="Email" v-model="email" />
				<input class="password" type="password" placeholder="Пароль" v-model="password" />
				<span class="error__text active">{{ errors ? errors : '' }}</span>
				<div class="forgot__password">
					<a @click="toggleForgotPassword">
						Забыли пароль?
					</a>
				</div>
				<green-btn :disabled="reqLoading" class="green__btn enter__profile" @click.prevent="submitHandler">
					Войти
				</green-btn>
			</div>
			<div class="modal__footer">
				<span>Впервые у нас? </span>
				<a class="registr" @click="toggleSignUp">
					Зарегистрироваться
				</a>
			</div>
		</form>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'sign-in',
	data() {
		return {
			email: '',
			password: '',
			reqLoading: false
		}
	},
	computed: {
		...mapState({
			errors: state => state.auth.errors
		})
	},
	methods: {
		...mapMutations({
			toggleModal: 'navbar/toggleModal',
			toggleSignUp: 'navbar/toggleSignUp',
			toggleForgotPassword: 'navbar/toggleForgotPassword'
		}),
		submitHandler() {
			this.reqLoading = true;
			const data = {
				email: this.email,
				password: this.password
			}

			this.$store.dispatch('auth/login', data).then(user => {
				//this.$store.dispatch('auth/refresh');
				this.toggleModal(false);
				this.reqLoading = false;
			}).then(err => {
				this.reqLoading = false
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

		&.email {
			background-image: url(@/assets/images/envelope-regular.svg);
			background-size: 15px;

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

.enter__profile {
	margin-top: 20px;
	padding-top: 13px;
	padding-bottom: 13px;
	display: inline-block;
	width: 143.2px;
	height: 45.41px;
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
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

.modal__footer {
	text-align: center;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;

	.registr {
		cursor: pointer;
		color: $main-color;
		text-decoration: none;
	}
}
</style>