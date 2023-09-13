<template>
	<section class="page__basket">
         <div class="container">
            <div class="page__basket-wrapper">
               <div class="basket__left">
						<basket/>
						<product-bonus />
               </div>
               <div class="basket__right flex__row">
                  <div class="product__order">
                     <h4 class="order__number">Заказ №<span>{{ orderNumber }}</span></h4>
                     <div class="product__inbasket">
                        <span>Товаров в корзине</span>
                        <span class="price">{{totalSumm}}₽ </span>
                     </div>
                     <div class="product__discount">
                        <span>Промокод</span>
                        <span class="discount">- 100 ₽ </span>
                     </div>
                     <div class="product__total-price">
                        <span>Итого к оплате</span>
                        <span class="total-price">600 ₽</span>
                     </div>
                     <green-btn  class="green__btn" @click="registerOrder">
								Оформить заказ
							</green-btn>
                  </div>
                  <div class="product__promo">
                     <h4 class="title">Промокод</h4>
                     <form action="">
                        <input type="text" placeholder="Введите промокод" />
                        <green-btn  class="green__btn">Подтвердить</green-btn>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		computed:{
			...mapState({
				totalSumm: state=>state.order.userOrder.totalSumm,
				orderNumber: state=>state.order.userOrder.orderNum,
				orderProducts:state=>state.order.userOrder.orderProducts,
			}),
		},
		methods:{
			registerOrder(){
				if(this.orderProducts.length ===0){
					alert('Basket is empty')
				}else{
				this.$router.push('basket-form')}
			}
		}
	}
</script>

<style lang="scss" scoped>
.page__basket {
   padding: 140px 0 60px;

   .page__basket-wrapper {
      display: flex;
      justify-content: space-between;

      .basket__left {
         flex: 0 0 60%;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
      }

      .basket__right {
         flex: 0 0 35%;

         //basket.html
         .product__order {
            padding: 50px 33px;
            background: #FFFFFF;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            margin-bottom: 45px;

            .order__number {
               font-weight: 500;
               font-size: 20px;
               line-height: 25px;
               margin-bottom: 35px;
            }

            .product__inbasket,
            .product__discount {
               display: flex;
               justify-content: space-between;
               margin-bottom: 35px;
               font-weight: 500;
               font-size: 16px;
               line-height: 24px
            }

            .discount {
               color: $main-color;
            }

            .product__total-price {
               font-weight: 500;
               font-size: 20px;
               line-height: 25px;
               margin-bottom: 30px;

               .total-price {
                  font-size: 20px;
                  line-height: 25px;
                  display: block;
               }
            }
         }

         .product__promo {
            .title {
               font-weight: 500;
               font-size: 20px;
               line-height: 25px;
               margin-bottom: 20px;
            }

            form {
               display: flex;
               justify-content: space-between;
               align-items: center;
            }

            input {
               padding: 10px 15px;
               border: 1px solid #EBEBEB;
               border-radius: 5px;


               &::placeholder {
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 21px;
                  color: #C6C6C6;
               }
            }
         }

         //basket.html

         .makeAnOrder-form {


            label {

               margin-bottom: 5px;
               font-weight: 400;
               font-size: 15.6716px;
               line-height: 24px;


            }

            .select-box {
               position: relative;
               margin-bottom: 15px;

               &::after {
                  content: '';
                  display: block;
                  width: 26px;
                  height: 26px;
                  background-position: center;
                  background-size: cover;
                  background-image: url(@/assets/images/select-arrow-down.svg);
                  position: absolute;
                  top: 65%;
                  transform: translateY(-50%);
                  right: 15px;
                  pointer-events: none;
               }
            }

            select {
               width: 100%;
               padding: 20px 30px;
               background: #FCFCFC;
               border: 1.1194px solid #EBEBEB;
               border-radius: 7.11356px;
               appearance: none;
               font-weight: 400;
               font-size: 15.6716px;
               line-height: 24px;
               cursor: pointer;

               &:focus {
                  border: 1.1194px solid $main-color;
               }

               option {
                  padding: 10px;
               }
            }

            input {
               width: 100%;
               padding: 20px 30px;
               background: #FCFCFC;
               border: 1.1194px solid #EBEBEB;
               border-radius: 7.11356px;
               margin-bottom: 15px;

               &:focus {
                  border: 1.1194px solid $main-color;
               }

               &::placeholder {
                  font-weight: 400;
                  font-size: 15.6716px;
                  line-height: 24px;
                  color: #C6C6C6;
               }
            }

            .comment {
               margin-bottom: 60px;
               position: relative;

               span {
                  font-weight: 500;
                  font-size: 17.0726px;
                  line-height: 24px;
                  color: $main-color;
                  cursor: pointer;
                  border-bottom: 1px solid $main-color;
                  margin-bottom: 15px;
                  display: inline-block;

               }

               input {
                  position: absolute;
                  left: 0;
                  bottom: -70px
               }

               ;
            }

         }
      }
   }
}
</style>