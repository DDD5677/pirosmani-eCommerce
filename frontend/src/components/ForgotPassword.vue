<template>
	<div>
		<div class="modal__header">
			<div class="img-box">
				<img src="@/assets/images/log__in-grey.svg" alt="" />
			</div>
		</div>
		<div class="modal__body">
			<form action="">
				<input class="phone" type="tel" placeholder="Телефон" />
				<input
					class="password"
					type="password"
					placeholder="Новый пароль (мин. 6 символов)"
				/>
				<input
					class="password"
					type="password"
					placeholder="Подтвердите пароль"
				/>
			</form>
		</div>
		<div class="modal__footer">
			<a href="" class="cansel__btn">Отменить</a>
			<green-btn href="" class="green__btn">Обновить пароль</green-btn>
		</div>
   </div>
</template>

<script>
	export default {
		name:'forgot-password'
	}
</script>

<style lang="scss" scoped>
	.modal__header {
		.img-box {
			text-align: center;
			margin-bottom: 14px;
		}
	}
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
	}
	.modal__footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-weight: 500;
		font-size: 15px;
		line-height: 18px;

		.cansel__btn {
			color: $main-color;
			text-decoration: none;
		}

		.green__btn {
			padding: 10px 12px;
		}

	}
</style>