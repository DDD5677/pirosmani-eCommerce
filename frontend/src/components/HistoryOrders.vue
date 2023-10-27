<template>
	<div class="history__products">
		<div v-for="(order,index) in orderList" class="orders" id="orders">
			<div class="info">
				<div class="order__number">
					Номер заказа:
					<span
						@click="showProductHandler(index)"
						class="green"
						id="order__number-open"
						>№{{ order.id }}
						<img src="@/assets/images/orders__arrow.svg" alt=""/>
					</span>
				</div>
				<div class="order__data">
					Дата заказа: <span>{{formatDate(order.dateOrdered)}}</span>
				</div>
				<div class="delivery__data">
					Общая сумма: <span>{{ order.totalPrice }} ₽</span>
				</div>
				<div class="order__status">
					Статус заказа:
					<span class="green">{{order.status}}</span>
				</div>
			</div>
			<div v-if="!mobile||(index===activeIndex?true:false)&&showProducts" class="products" id="products" >
				<div>
					<div class="order__number">
						<span @click="showProductHandler(index)" class="green" id="order__number"
							><img
								src="@/assets/images/orders__arrow-left.svg"
								alt=""
							/>Заказ №2334678954
						</span>
					</div>
					<basket-product v-for="product in order.orderItems" :product="product" :id="product.product.id" />
				</div>
				<div class="order__again">
					<a @click="reOrder(order)" href="#" class="order__again-link"
						>Повторить заказ<img
							src="@/assets/images/order__again.svg"
							alt=""
					/></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
		name:'history-orders',
		data(){
			return{
				showProducts:false,
				activeIndex:null
			}
		},
		props:{
			orderList:{
				type:Array,
				required:true
			}
		},
		computed:{
			...mapState({
				mobile:state=>state.navbar.mobile
			})
		},
		methods:{
			showProductHandler(index){
				this.activeIndex=index;
				this.showProducts=!this.showProducts
			},
			formatDate (dateString){
  			const options = { year: "numeric", month: "long", day: "numeric" }
  			return new Date(dateString).toLocaleDateString(undefined, options)
			},
			reOrder(data){
				this.$store.dispatch('order/addOrder',data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history__products {
      padding: 40px 0 0;

      .orders {
         display: flex;
         justify-content: space-between;
         background: #FFFFFF;
         box-shadow: 0px 0px 16.2899px rgba(0, 0, 0, 0.07);
         border-radius: 13.0319px;
         padding: 24px;
         margin: 20px 0;

         .info {

            div {
               margin-bottom: 16px;
               font-weight: 500;
               font-size: 16px;
               line-height: 25px;

               span {
                  font-weight: 400;
               }
            }

            .green {
               color: $main-color;
               display: block;
               cursor: pointer;

               img {
                  vertical-align: 4px;
                  margin-left: 5px;
                  transform: scale(1.3);
                  display: none;
               }
            }
         }

         .products {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
            .order__number {
               display: none;

               .green {
                  color: $main-color;
                  font-size: 19px;
                  cursor: pointer;
                  display: inline-block;
                  padding: 15px;

                  img {
                     vertical-align: 2px;
                     margin-right: 5px;
                     transform: scale(1.3);
                  }
               }
            }

            .product {
               padding: 14px 5px 14px;
               display: flex;
               justify-content: flex-start;
               align-items: center;
               border-top: 1px solid #EBEBEB;
               border-bottom: 1px solid #EBEBEB;



               img {
                  margin-left: 25px;
                  width: 78.92px;
                  object-fit: contain;
                  border-radius: 5px;
               }

               .product__name {
                  text-align: center;
                  width: 220px;
                  font-weight: 500;
                  font-size: 16.1493px;
                  line-height: 15px;

               }

               .product__counter {
                  cursor: pointer;
                  display: flex;
                  background: #FCFCFC;
                  border: 0.903636px solid #EBEBEB;
                  border-radius: 9.03636px;
                  color: #000000;
                  position: relative;

                  .items__control {
                     padding: 10px 16px;
                  }

                  .items__current {
                     padding: 10px 10px;

                  }
               }

               .product__price {
                  margin-left: 30px;
                  font-weight: 500;
                  font-size: 20.1866px;
                  line-height: 17px;
                  width: 60px;
               }
            }

            .order__again {
               text-align: right;
               .order__again-link {
						cursor: pointer;
                  color: $main-color;
                  font-weight: 500;
                  font-size: 16.2899px;
                  line-height: 29px;
                  display: inline-block;
               }


               img {
                  margin-left: 8px;
               }
            }
         }
      }
   }
</style>