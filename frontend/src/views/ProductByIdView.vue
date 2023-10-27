<template>
	<section class="page__product">
         <div class="container">
				<error v-if="errors" :error="errors"></error>
				<loading v-if="isLoading"/>
            <div v-if="!isLoading&&!errors">
					<div class="product__top">
               <div class="product__img">
                  <img
							:src="product.img"
                     :alt="product.name"
                  />
               </div>
               <div class="product__info">
                  <div class="product__info-left">
                     <h3 class="title">{{ product.name }}</h3>
                     <product-rating :rating="product.rate"></product-rating>
                     <div class="product__reviews">
                        Кол-во отзывов: <span>23</span>
                     </div>
                  </div>
                  <div class="product__info-right">
                     <div class="product__price">
                        <span>Цена за уп.</span><span class="num">{{product.price}} ₽</span>
                     </div>
                     <div class="product__amount">
                        <span>Кол-во шт в упаковке</span
                        ><span class="num">4 шт.</span>
                     </div>
                     <div class="amount__calc">
                        <span>Количество</span>
                        <product-counter @counter="totalSummHandler"/>
                     </div>
                  </div>
                  <div class="total__price">
                     <span>Итого к оплате</span>
                     <span class="total__price-num">{{ totalSumm }} ₽</span>
                  </div>
                  <div class="product__btns">
                     <green-btn @click.prevent.stop="addProductHandler(product,quantity)" class="product__buy">Купить</green-btn>
                     <router-link :to="{name:'basket'}" class="product__basket"
                        ><img src="@/assets/images/shopping-cart-white.svg" alt=""
                     /></router-link>
                  </div>
               </div>
            </div>
            <div class="product__bottom">
               <product-tab :product="product"/>
               <product-bonus />
            </div>
				</div>
         </div>
      </section>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
	export default {
		data(){
			return{
				productId:this.$route.params.id,
				quantity:1
			}
		},
		computed:{
			...mapState({
				product: state=>state.singleProduct.product,
				totalSumm: state=>state.singleProduct.totalSumm,
				isLoading: state=>state.singleProduct.isLoading,
				errors: state=>state.singleProduct.errors,
				isLogged: state=>state.auth.isLogged,

			}),
		},
		methods:{
			...mapMutations({
				changeTotalSumm:'singleProduct/changeTotalSumm',
				toggleModal:'navbar/toggleModal',
				toggleSignIn:'navbar/toggleSignIn',
			}),
			...mapActions({
				addProduct:'order/addProduct'
			}),
			toggleModalHandler(){
				this.toggleModal(true)
				this.toggleSignIn()
			},
			totalSummHandler(counter){
				const summ = counter*this.product.price;
				this.quantity=counter;
				this.changeTotalSumm(summ.toFixed(2));
			},
			addProductHandler(product,quantity){
				const order={
					product:product,
					quantity:quantity
				}
				if(!this.isLogged){
					this.toggleModal(true)
					this.toggleSignIn()
				}else{
					this.addProduct(order);
				}
			}
		},
		mounted(){
			this.$store.dispatch('singleProduct/getProductById',this.productId).then((res)=>{
				this.$store.dispatch('singleProduct/getReviews',res.id);
			})
		}
	}
</script>

<style lang="scss" scoped>
.page__product {
   padding: 160px 0 60px;

   .product__top {
      display: flex;
      justify-content: space-between;

      .product__img {
         flex: 0 0 65%;
         background: #F9F9F9;
         border-radius: 15px;
         height: 500px;
         background-image: url(@/assets/images/card__bg-big.svg);
         background-position: center;
         background-repeat: no-repeat;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
         }
      }

      .product__info {
         height: 500px;

         padding: 35px 30px;
         flex: 0 0 32%;
         background: #FFFFFF;
         box-shadow: 0px 0px 27.1091px rgba(0, 0, 0, 0.06);
         border-radius: 15px;

         .title {
            font-weight: 500;
            font-size: 22px;
            line-height: 23px;
            margin-bottom: 5px;
         }

         .product__reviews {
            font-weight: 400;
            font-size: 12.6509px;
            line-height: 19px;
            color: #C6C6C6;
            margin-bottom: 28px;
         }

         .product__price,
         .product__amount,
         .amount__calc {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 500;
            font-size: 14.4582px;
            line-height: 22px;
            color: #C6C6C6;
            margin-bottom: 22px;


            .num {
               font-weight: 500;
               font-size: 18.0727px;
               line-height: 23px;
               color: #000000;
            }
         }

        

         .total__price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 500;
            font-size: 14.4582px;
            line-height: 22px;
            margin-top: 45px;
            margin-bottom: 18px;
            color: #000;

            .total__price-num {
               font-weight: 500;
               font-size: 18.0727px;
               line-height: 23px;
               color: $main-color;
            }
         }

         .product__btns {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 60px;

            .product__buy {
               font-weight: 500;
               font-size: 18.0727px;
               line-height: 23px;
               flex-grow: 1;
					&:active{
						opacity: 0.7;
					}
            }

            .product__basket {
               padding: 8px 11px;
               background-color: $main-color;
               border-radius: 5px;
            }
         }
      }
   }

		.product__bottom {
			display: flex;
			justify-content: space-between;
			margin-top: 60px;

   }
}
@media(max-width:1030px){
	.page__product {
      .product__top {
         .product__img {
            height: 400px;
         }

         .product__info {
            height: 400px;
            padding: 20px;

            .card__rating {
               margin-bottom: 0;
            }

            .product__reviews {
               margin-bottom: 15px;
            }

            .product__price {
               margin-bottom: 15px;
            }

            .total__price {
               margin-top: 30px;
            }

            .product__btns {
               margin-top: 35px;
            }
         }
      }
   }
}
@media(max-width:920px){
	.page__product {
      padding: 130px 0 35px;

      .product__top {
         .product__img {
            height: 350px;
            flex: 0 0 60%;
         }

         .product__info {
            flex: 0 0 37%;
            height: 350px;
            padding: 20px;


            .product__amount {
               margin-bottom: 10px;
            }




            .total__price {
               margin-top: 25px;
               margin-bottom: 0;
            }

            .product__btns {
               margin-top: 10px;
            }
         }
      }

      .product__bottom {
         margin-top: 40px;
      }
   }
}
@media(max-width:819px){
	.page__product {
      padding: 100px 0 35px;

      .product__top {
         .product__img {
            min-height: 300px;
            flex: 0 0 58%;
         }

         .product__info {
            flex: 0 0 40%;
            height: 350px;
            padding: 20px;

            .total__price {
               margin-top: 25px;
               margin-bottom: 0;
            }

            .product__btns {
               margin-top: 10px;
            }
         }
      }

      .product__bottom {
         margin-top: 20px;
      }
   }
}
@media(max-width:750px){
	.page__product {
      padding: 100px 0 35px;

      .product__top {
         flex-direction: column;

         .product__img {
            margin-bottom: 20px;

            img {
               height: 380px;
            }
         }

         .product__info {
            display: flex;
            flex-wrap: wrap;
            padding: 30px;

            &-left,
            &-right {
               flex: 0 0 50%;
            }

            .product__reviews {
               margin-top: 10px;
            }

            .product__amount {
               margin-bottom: 10px;
            }

            .amount__calc {
               margin-bottom: 0;
            }


            .total__price {
               flex: 0 0 50%;
               margin-top: 10px;
               margin-bottom: 10px;
            }

            .product__btns {
               flex: 0 0 51%;
               margin-top: 10px;

               .product__basket {
                  margin-left: 20px;
                  margin-right: 10px;
               }
            }
         }
      }

      .product__bottom {
         flex-direction: column;
      }
   }
}
@media(max-width:540px){
	.page__product {
      padding-bottom: 0;

      .product__top {
         .product__img {

            img {
               height: 300px;
            }
         }

         .product__info {
            flex-direction: column;
            padding: 20px 30px;

            .total__price {
               margin-top: 15px;
               margin-bottom: 5px;
            }
         }
      }
   }
}
@media(max-width:450px){
	.page__product {
      padding-top: 80px;

      .product__top {
         .product__img {
            img {
               height: 100%;
            }
         }

         .product__info {
            padding: 20px;
         }
      }

   }
}
@media(max-width:380px){
	.page__product {
      .product__top {
         .product__info {
            padding: 20px 15px;

            .title {
               font-size: 18px;
            }

            .product__reviews {
               margin: 5px 0;
            }

            .product__price {
               margin-bottom: 10px;

               .num {
                  font-size: 16px;
               }
            }

            .product__amount {
               .num {
                  font-size: 16px;
               }
            }

            .product__counter {

               .items__control,
               .items__current {
                  padding: 5px 16px;
               }
            }

            .total__price {
               margin-top: 20px;

               .total__price-num {
                  font-size: 16px;
               }
            }

            .product__btns {
               .product__basket {
                  margin: 0px;
               }
            }
         }
      }

   }
}
</style>