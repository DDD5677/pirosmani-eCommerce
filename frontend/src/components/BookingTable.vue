<template>
	<div class="modal__body">
		<h5 class="title" id="staticBackdropLabel">
			Бронирование стола
		</h5>
		<form action="">
			<input class="name" type="text" placeholder="Имя" />
			<input type="tel" placeholder="+998" />
			<input type="number" placeholder="Количество человек" />
			<input
				type="time"
				data-placeholder="Время: _ _ : _ _"
				required
			/>
			<input
				type="date"
				data-placeholder="Дата:  дд.мм.гг"
				required
			/>
			
		</form>
	</div>
	<div class="modal__footer">
		<green-btn href="" class="green__btn">Забронировать</green-btn>
	</div>
			
</template>

<script>
	export default {
		name:'book-table',
	}
</script>

<style lang="scss" scoped>
.modal__body {
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
			margin-top: 15px;
		}
	}
.modal__body {
	.title {
		font-weight: 500;
		font-size: 24px;
		line-height: 18px;
		margin: 20px 0;
	}
	

	input {
		padding-left: 20px;

		&::placeholder {
			font-size: 14px;
		}
	}

	div {
		display: flex;
		justify-content: space-between;

		input {
			width: 254px;
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
	}
}
   
</style>