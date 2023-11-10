<template>
	<div class="history__products">
		<div v-for="(order,index) in orderList" class="orders" id="orders">
			<div class="info">
				<div class="order__number">
					Номер заказа:
					<span
						@click="showProductHandler(index)"
						class="status green"
						id="order__number-open"
						><span>№{{ order.id }}</span>
						<img src="@/assets/images/orders__arrow.svg" alt=""/>
					</span>
				</div>
				<div class="order__data">
					Дата заказа: <span>{{formatDate(order.dateOrdered)}}</span>
				</div>
				<div class="delivery__data">
					Общая сумма: <span>{{ order.totalPrice }} сум</span>
				</div>
				<div class="delivery__data">
					Тип заказа: <span>{{ (order.typeOrder==='Deliver')?'Доставка':'Самовывоз' }}</span>
				</div>
				<div class="order__status">
					Статус заказа:
					<span class ="status" :class="(order.status==='Canceled')?'red':'green'">{{order.status}}</span>
				</div>
			</div>
			<div v-if="!mobile||(index===activeIndex?true:false)&&showProducts" class="products" id="products" >
				<div>
					<div class="order__number">
						<span @click="showProductHandler(index)" class="status green" id="order__number"
							><img
								src="@/assets/images/orders__arrow-left.svg"
								alt=""
							/>Заказ №2334678954
						</span>
					</div>
					<div v-for="product in order.orderItems" :id="product.product.id" class="product">
						<img
							:src="product.product.img"
							alt=""
							class="product__img"
						/>
						<span class="product__name">{{product.product.name}}</span>
						<product-counter :quantity="product.quantity" :btns="false"/>
						<span class="product__price">{{ totalSumm(product)}} сум</span>
					</div>
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
			}),
			
		},
		methods:{
			totalSumm(product){
				return (product.product.price*product.quantity).toFixed(2)
			},
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
      padding: 30px 0 0;

      .orders {
         display: flex;
         justify-content: space-between;
         background: #FFFFFF;
         box-shadow: 0px 0px 16.2899px rgba(0, 0, 0, 0.07);
         border-radius: 13.0319px;
         padding: 24px;
         margin: 20px 0;
			.status{
				cursor: pointer;

				img {
					margin-left: 5px;
					transform: scale(1.3);
				}
			}
			.green {
				color: $main-color;
				
			}
			.red{
				color: red;
			}
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
				.order__number{
					.status{
						display: flex;
						align-items: center;
						
					}
					img{
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
                  font-size: 19px;
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
					padding: 20px 5px 20px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-top: 1px solid #EBEBEB;
					border-bottom: 1px solid #EBEBEB;
					
					img {
						width: 60px;
						object-fit: contain;
						border-radius: 5px;
					}

					.product__name {
						text-align: center;
						width: 220px;
						font-weight: 500;
						font-size: 18px;
						line-height: 21px;
						margin-right: 20px;
					}

					

					.product__price {
						margin-left: 20px;
						font-weight: 500;
						font-size: 18px;
						line-height: 21px;
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