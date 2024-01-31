<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__wrapper">
				<div class="footer__info">
					<div class="info__phones">
						<div class="phone">
							<span>Бесплатный звонок по Узбекистану</span>
							<a v-if="!isLoading" :href="'tel:' + info.mainPhone" class="phone__link">{{ info.mainPhone }}</a>
						</div>
						<div class="phone">
							<span>Для приема заказов</span>
							<a v-if="!isLoading" :href="'tel:' + info.orderPhone" class="phone__link">{{ info.orderPhone }}</a>
						</div>
					</div>
					<div v-if="!isLoading" class="info__right">
						<div class="info__data">
							График работы по будням с {{ info.workingTimeFrom }} до {{ info.workingTimeTo }}
						</div>
						<a href="email:djumaqulovdonisher@mail.ru" class="info__email">Email: {{ info.email }}</a>
					</div>
				</div>
				<div v-if="!isLoading" class="info__social">
					<a :href="info.telegram" target="_blank" class="social__contact">Мы в Телеграмме ></a>
					<a :href="info.instagram" target="_blank" class="social__instagram">Мы в instagram ></a>
				</div>
				<div class="info__login">
					<a @click="toggleModalHandler" class="login__link"><img src="@/assets/images/log_in.svg" alt="" /> Войти /
						Регистрация</a>
				</div>
			</div>
			<router-link :to="{ name: 'support' }" @click="scrollTop" class="support">Поддержка</router-link>
			<div class="footer__rules">
				<a href="" class="rules__link">©2023. Пиросмани</a><a href="" class="rules__link">Условия и соглашения</a><a
					href="" class="rules__link">Политика конфиденциальности</a>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'home-footer',
	computed: {
		...mapState({
			info: state => state.info.info,
			isLoading: state => state.info.isLoading
		})
	},
	methods: {
		...mapMutations({
			toggleModal: 'navbar/toggleModal',
			toggleSignIn: 'navbar/toggleSignIn',
			toggleBookTable: 'navbar/toggleBookTable'
		}),
		toggleModalHandler() {
			this.toggleModal(true)
			this.toggleSignIn()
		},
		scrollTop() {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}
}
</script>

<style lang="scss" scoped>
.footer {
	margin-top: auto;
	padding: 34px 0;
	background-color: $main-color;
	color: #fff;

	@media (max-width: 450px) {
		border-radius: 8px 8px 0 0;
	}

	a {
		color: #fff;
		text-decoration: none;

	}

	.footer__wrapper {
		display: flex;
		justify-content: space-between;

		@media (max-width: 819px) {
			flex-direction: column;
			margin-bottom: 25px;
		}

		.footer__info {
			@media (max-width: 819px) {
				display: flex;
				gap: 80px;
			}

			@media (max-width: 630px) {
				gap: 30px
			}

			@media (max-width: 450px) {
				flex-direction: column;
				gap: 0;
			}

			.info__phones {
				display: flex;
				justify-content: space-between;
				gap: 60px;
				margin-bottom: 15px;

				@media (max-width: 920px) {
					gap: 30px
				}

				@media (max-width: 819px) {
					flex-direction: column;
					gap: 0px;
				}

				.phone {

					span {
						font-weight: 400;
						font-size: 12.3407px;
						line-height: 32px;

						@media (max-width: 630px) {
							font-size: 12px;
							line-height: 18px;
						}
					}

					.phone__link {
						display: block;
						font-weight: 500;
						font-size: 18.511px;
						line-height: 39px;

						@media (max-width: 630px) {
							font-size: 14px;
						}
					}
				}

			}

			.info__data {
				margin-bottom: 10px;
				font-weight: 400;
				font-size: 15.4259px;
				line-height: 32px;

				@media (max-width: 630px) {
					font-size: 12px;
					line-height: 20px;
				}
			}

			.info__email {
				display: inline-block;
				margin-bottom: 10px;
				font-family: $font;
				font-weight: 400;
				font-size: 18.511px;
				line-height: 32px;

				@media (max-width: 630px) {
					font-size: 15px;
					line-height: 20px;
				}
			}
		}

		.info__social {
			@media (max-width: 819px) {
				display: flex;
				gap: 70px;
			}

			@media (max-width: 630px) {
				gap: 30px
			}

			@media (max-width: 450px) {
				flex-direction: column;
				gap: 0;
			}

			a {
				display: block;
				font-weight: 500;
				font-size: 16px;
				line-height: 32px;
				letter-spacing: 2px;
				font-variant: small-caps;
				margin-bottom: 25px;

				@media (max-width: 630px) {
					font-size: 14px;
					line-height: 20px;
					letter-spacing: 3.08517px;
					margin-bottom: 20px;
				}
			}

		}

		.info__login {
			.login__link {
				font-weight: 500;
				font-size: 15.4259px;
				line-height: 32px;
				display: flex;
				align-items: center;
				cursor: pointer;

				img {
					margin-right: 8px;
				}
			}
		}


	}

	.support {
		margin-bottom: 10px;
		display: inline-block;
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
		border-bottom: 1px solid #fff;

		@media (max-width: 819px) {
			display: none;
		}
	}

	.footer__rules {
		.rules__link {
			display: inline-block;
			margin-right: 33px;
			font-family: $font;
			font-weight: 400;
			font-size: 12.3407px;
			line-height: 32px;

			@media (max-width: 450px) {
				margin-right: 15px;
				font-size: 12px;
				line-height: 18px;
			}
		}

	}
}</style>