<template>
	<div>
		<div class="modal__body">
			<form action="">
				<input class="phone" type="tel" placeholder="Телефон" />
				<input
					class="password"
					type="password"
					placeholder="Пароль"
				/>
			</form>
			<span class="error__text active"
				>Не правильный логин или пароль</span
			>
			<div class="forgot__password">
				<a
				@click="toggleForgotPassword"
				>
				Забыли пароль?
				</a>
			</div>
			<green-btn  
			class="green__btn enter__profile"
			>
			Войти
			</green-btn>
		</div>
		<div class="modal__footer">
			<span>Впервые у нас? </span>
			<a
				class="registr"
				@click="toggleSignUp"
			>
			Зарегистрироваться
			</a>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
	export default {
		name:'sign-in',
		methods:{
			...mapMutations({
				toggleSignUp:'modal/toggleSignUp',
				toggleForgotPassword:'modal/toggleForgotPassword'
			})
		}
	}
</script>

<style lang="scss" scoped>
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

            &.phone {
               background-image: url(@/assets/images/input__phone.svg);

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
		padding-top: 13px;
		padding-bottom: 13px;
		display: inline-block;
		width: 143.2px;
		height: 45.41px;
		font-weight: 500;
		font-size: 14.1972px;
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