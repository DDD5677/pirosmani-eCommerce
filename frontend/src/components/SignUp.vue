<template>
	<div class="modal__body">
		<form action="">
		<input class="phone" type="tel" placeholder="Телефон" />
		<input
			class="password"
			type="password"
			placeholder="Пароль"
		/>
		<input
			class="password"
			type="password"
			placeholder="Подтвердите пароль"
		/>
		<span class="error__text"
			>Пользователь с таким номером телефона уже
			зарегистрирован.</span
		>
		<div class="checkbox">
			<input id="reg_check-1" type="checkbox" />
			<label for="reg_check-1"
				>Хочу получать выгодные предложения от
				магазина</label
			>
		</div>
		<div class="checkbox">
			<input id="reg_check-2" type="checkbox" />
			<label for="reg_check-2"
				>Принимаю условия
				<a href="">Пользовательского соглашения</a>,
				<a href="">Политики конфиденциальности</a></label
			>
		</div>
		<green-btn
			class="green__btn"
			@click="toggleSignIn"
			>
			Зарегистрироваться
		</green-btn>
	</form>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';

	export default {
		name:'sign-up',
		methods:{
			...mapMutations({
				toggleSignIn:'modal/toggleSignIn'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.modal__body {
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
		.checkbox {
			display: flex;
			align-items: flex-start;
			margin-bottom: 14px;

			input {
				width: 0px;
				margin: 0;

				&:checked {
					~label {
						&::before {
							background-color: $main-color;
						}
					}
				}

				~label {
					&::before {
						content: '';
						position: absolute;
						width: 15px;
						height: 15px;
						background: #FCFCFC;
						border: 1.87138px solid #EBEBEB;
						border-radius: 50%;
						left: -30px;
						top: 0;
					}
				}
			}

			label {
				text-align: left;
				position: relative;
				margin-left: 30px;
				font-weight: 400;
				font-size: 11px;
				line-height: 15px;

				a {
					color: $main-color;
					text-decoration: none;
				}
			}
		}
		.error__text {
			margin-top: -13px;
			margin-bottom: 13px;
			display: none;

			&.active {
				display: block;
			}

			font-weight: 400;
			font-size: 9px;
			line-height: 8px;
			text-align: center;
			color: #EB5757;
		}

		.green__btn {
			margin-top: 25px;
		}
	}
</style>