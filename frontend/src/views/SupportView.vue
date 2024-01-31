<template>
	<section class="page__support">
		<div class="container">
			<h1 class="title">Поддержка</h1>
			<form action="">
				<textarea name="" id="" cols="30" rows="10" placeholder="Напишите сообщение..."></textarea>
			</form>
			<green-btn @click.prevent="alertMessage" class="green__btn">Отправить</green-btn>
		</div>
	</section>
</template>

<script>
export default {
	methods: {
		alertMessage() {
			alert('Данная услуга находится в разработке')
		},
	}
}
</script>

<style lang="scss" scoped>
.page__support {
	padding: 145px 0 60px;

	@media (max-width: 819px) {
		padding: 85px 0 60px;

	}

	@media (max-width: 630px) {
		padding: 75px 0 50px;
	}

	@media (max-width: 450px) {
		padding: 65px 0 25px;
	}

	.title {
		font-family: $font;
		font-weight: 500;
		font-size: 28px;
		line-height: 33px;
		margin-bottom: 45px;

		@media (max-width: 630px) {
			margin-bottom: 20px;
		}

		@media (max-width: 450px) {
			font-size: 24px;
			margin-bottom: 10px;
		}
	}

	textarea {
		width: min(672px, 100%);
		height: 174px;
		padding: 20px;
		resize: none;
		background: #F9F9F9;
		border-radius: 5px;
		margin-bottom: 45px;
		font-size: 18px;

		&::placeholder {
			font-family: $font;
			font-weight: 400;
			font-size: 20px;
			line-height: 21px;
			color: #BDBDBD;
		}
	}

}
</style>