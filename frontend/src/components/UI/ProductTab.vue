<template>
	<div class="product__tab">
		<ul class="nav" >
			<li class="nav-item">
				<button
					class="nav-link"
					:class="{'active':about}"
					@click="aboutHandler"
				>
					О товаре
				</button>
			</li>
			<li class="nav-item">
				<button
					class="nav-link"
					:class="{'active':service}"

					@click="serviceHandler"
				>
					Параметры
				</button>
			</li>
			<li class="nav-item">
				<button
					class="nav-link"
					:class="{'active':reviews}"

					@click="reviewsHandler"
				>
					Отзывы
				</button>
			</li>
		</ul>
		<div class="tab-content" >
			<div
				v-if="about"
				class="tab-pane"
			>
				<h3 class="tab-pane__title">Описание</h3>
				<p class="tab-pane__text">{{product.richDsc }}
				</p>
				<p class="tab-pane__text">
					Вес головки 500 г. +/-10%. Цена за 1 кг.
				</p>
				<p class="tab-pane__text">
					Продукция компании Alpenville изготовлена
					преимущественно из Шарангского молока
				</p>
			</div>
			<div
			v-if="service"
				class="tab-pane fade product__param"
			>
				<div>Калории: <span>420</span></div>
				<div>Жиры: <span>54</span></div>
				<div>Белки: <span>27</span></div>
				<div>Углеводы: <span>18</span></div>
				<div>Масса: <span>500 грамм</span></div>
			</div>
			<div
			v-if="reviews"
				class="tab-pane__reviews"
			>
				<h3 class="title">Отзывы</h3>
				<div v-if="!reviewLoading"  class="swiper__hidden">
					<swiper
					:spaceBetween="30"
					:slidesPerView='2'
					:navigation="{
						prevEl: prev,
						nextEl: next,
					}"
					:modules="modules"
					:breakpoints="{
					'320': {
         			slidesPerView: 1,
      			},
      			'920': {
         			slidesPerView: 2,
         			spaceBetween: 20,
      			}
					}"
					class="swiper slider__reviews">
						<swiper-slide v-for="review in reviewsShow" class="reviews__item">
							<div class="item__top">
								<img
									:src="review.user.image"
									alt=""
									class="top__img"
								/>
								<div class="top__info">
									<h4 class="name__autor">
										<span>{{ review.user.name }} {{ review.user.surname }}</span>
										<img
												src="@/assets/images/reviews__autor-icon.svg"
												alt=""
											/>
									</h4>
									
									<product-rating :width="'10px'" :rating="review.rating"></product-rating>
									<a href="" class="top__info-link"
										>{{ review.user.email }}</a
									>
								</div>
							</div>
							<div class="item__body">
								{{ review.bodyText }}
							</div>
							<a href="" class="item__link"
								>Читать полностью</a
							>
						</swiper-slide>
					</swiper>
					<div ref="prev" class="swiper-button-prev"></div>	
					<div ref="next" class="swiper-button-next swiper-button-next2">
						<span>Еще</span>
						<img
							src="@/assets/images/product__reviews-arrow.svg"
							alt=""
						/>
					</div>
				</div>
					<green-btn
					@click.prevent="toggleModalHandler"
						class="green__btn"
					>
						Добавить отзыв
					</green-btn>
			</div>
		</div>
   </div>
</template>

<script>
import { ref } from 'vue';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation,FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {mapActions, mapMutations, mapState} from 'vuex';

	export default {
		name:'product-tab',
		components: {
      	Swiper,
      	SwiperSlide,
    	},
		props:{
			product:{
				type:Object,
				required:true
			},
		},
		data(){
			return{
				about:true,
				service:false,
				reviews:false
			}
		},
		computed:{
			...mapState({
				isLogged: state=>state.auth.isLogged,
				reviewsList:state=>state.singleProduct.reviewsList,
				reviewLoading:state=>state.singleProduct.reviewLoading
			}),
			reviewsShow(){
				const reviews = this.reviewsList.filter(review=>review.status==='Accepted')
				return reviews
			}
		},
		methods:{
			...mapMutations({
				toggleModal:'navbar/toggleModal',
				toggleAddReviews:'navbar/toggleAddReviews',
				toggleSignIn:'navbar/toggleSignIn',
			}),
			toggleModalHandler(){
				this.toggleModal(true)
				if(!this.isLogged){
					this.toggleSignIn()
				}else{
					this.toggleAddReviews()

				}
			},
			aboutHandler(){
				this.about=true
				this.service=false
				this.reviews=false
			},
			serviceHandler(){
				this.about=false
				this.service=true
				this.reviews=false			
			},
			reviewsHandler(){
				this.about=false
				this.service=false
				this.reviews=true			
			}
		},
		setup() {
			const prev = ref(null);
    		const next = ref(null);
      	const onSwiper = (swiper) => {
        		console.log(swiper);
      	};
      	const onSlideChange = () => {
        		console.log('slide change');
      	};
      	return {
				onSwiper,
        		onSlideChange,
				prev,
				next,
				modules:[
		  			FreeMode,
		  			Navigation]
         
      	};
    	},
	}
</script>

<style lang="scss" scoped>

.product__tab {
		flex: 0 0 65%;
		height: 275px;
	
	.swiper-button-prev{
		display: none
	}
	
	.nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;

		.nav-link {
			margin-right: 24px;
			padding-left: 0;
			font-weight: 400;
			font-size: 28.8639px;
			line-height: 19px;
			color: #828282;
			background-color: white;
			&.active {
				font-weight: 500;

				color: $main-color;
				background-color: white;
			}
		}
	}
	
	.tab-content {
		width: 760px;
		
		.tab-pane__title {
			font-weight: 500;
			font-size: 21.6479px;
			line-height: 19px;
			margin-bottom: 20px;
		}

		.tab-pane__text {
			font-weight: 400;
			font-size: 18.0399px;
			line-height: 19px;
			color: #828282;
		}

		.product__param {
			div {
				font-weight: 500;
				font-size: 18px;
				line-height: 22px;
				color: #828282;
				margin-bottom: 20px;

				span {
					font-weight: 400;
				}
			}
		}

		.tab-pane__reviews {
			.title {
				font-weight: 500;
				font-size: 20px;
				line-height: 20px;
				margin-bottom: 16px;
			}

			.green__btn {
				margin-top: 16px;
				font-weight: 500;
				font-size: 14px;
				line-height: 24px;
			}

			.swiper__hidden {
				position: relative;


				.swiper-button-next {
					&::after {
						display: none;
					}

					right: 25px;

					span {
						color: $main-color;
						font-weight: 500;
						font-size: 13px;
						line-height: 12px;
						margin-right: 5px;
					}
				}
			}

			.slider__reviews {
				border-radius: 11.1818px;

				width: 88%;
				margin-left: 0;

				.swiper-wrapper {
					justify-content: flex-start;
				}



				.reviews__item {
					padding: 16px;
					background: #F2F2F2;
					border-radius: 11.1818px;
					width: 400px;

					.item__top {
						display: flex;
						margin-bottom: 5px;

						.top__img {
							width: 25px;
							height: 25px;
							align-self: flex-start;
							border-radius: 50%;
						}

						.top__info {
							margin-left: 5px;

							.name__autor {
								margin-bottom: 0px;
								font-weight: 500;
								font-size: 15px;
								line-height: 13px;
							}
							
					

							.top__info-link {
								display: block;
								font-weight: 400;
								font-size: 12px;
								line-height: 11px;
							}


						}


					}

					.item__body {
						font-weight: 400;
						font-size: 12px;
						line-height: 11px;
					}

					.item__link {
						color: $main-color;
						font-weight: 500;
						font-size: 11px;
						line-height: 10px;
						text-decoration-line: underline;
					}
				}
			}
		}
	}
}

@media(max-width:1200px){
	.product__tab {
		.tab-content {
			width: 660px;
		}
	}
}
@media(max-width:1030px){
	.product__tab {
            .tab-content {
               width: 560px;

               .tab-pane__reviews {
                  .slider__reviews {
                     width: 100%;

                     .reviews__item {
                        padding: 12px;
                     }
                  }
               }

               .swiper-button-next {
                  display: none;
               }
            }
         }
}
@media(max-width:920px){
	.product__tab {
		flex: 0 0 60%;

		.nav {
			.nav-link {
				font-size: 24px;
			}
		}

		.tab-content {
			width: 460px;
		}
   }
}
@media(max-width:819px){
		.product__tab {
            flex: 0 0 60%;

            .nav {
               .nav-link {
                  font-size: 20px;
                  margin-right: 10px;
               }
            }

            .tab-content {

               .product__param {
                  div {
                     font-size: 16px;
                     line-height: 18px;
                     margin-bottom: 15px
                  }
               }

               .tab-pane__title {
                  margin-bottom: 10px;
               }

               .tab-pane__text {
                  font-size: 14px;
                  line-height: 16px;
               }

            }
         }
}
@media(max-width:750px){
.product__tab {

	.nav {
		.nav-link {
			margin-left: 20px;
		}
	}

	.tab-content {
		width: 100%;
		margin-bottom: 20px;
		padding: 0 20px;
	}
}
}
@media(max-width:540px){
.product__tab {
	.nav {
		.nav-link {
			margin-left:10px;
		}
	}
}
}
@media(max-width:450px){
	.product__tab {
            .nav {
               margin-bottom: 10px;

               .nav-link {
                  margin-left: 0;
                  font-size: 18px;
               }
            }

            .tab-content {
               padding: 0;

               .tab-pane__title {
                  font-size: 18px;
               }

               .product__param {
                  div {
                     font-size: 14px;
                  }
               }
            }
         }
}
@media(max-width:380px){
	.product__tab {
		.nav {

			.nav-link {
				padding-right: 0;
			}
		}
	}
}
</style>