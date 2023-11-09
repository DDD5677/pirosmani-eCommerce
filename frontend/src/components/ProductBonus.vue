<template>
	<div class="product__bonus">
         <div class="title">Закажите на 3000 сум и получите</div>
            <div class="bonus">
               <img src="@/assets/images/bonus__pig.svg" alt="" />
					<span><b>30 сум</b> на бонусный счет</span>
            </div>
            <div class="product__delivery">
               <img src="@/assets/images/bonus__truck.svg" alt="" />
               <span>Бесплатная доставка</span>
            </div>
         <div class="grey__line">
         <div class="green__line" :style="{width:`${withGreenLine}%`}">
            <span></span>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';

	export default {
		name:'product-bonus',
		computed:{
			...mapState({
				totalSumm:state=>state.order.userOrder.totalSumm,
			}),
			beforeContent(){
				if(this.totalSumm<3000){
				return `'Осталось ${(3000-this.totalSumm).toFixed(2)} сум до бесплатной доставки'`
				}else{
					return '"Поздравляем, вы получили бонус!"'
				}
			},
			withGreenLine(){
				const withLine=this.totalSumm/3000*100;
				if(withLine>100){
					return 100
				}else{
					return withLine
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product__bonus {
   height: 275px;

   padding: 35px 30px;
   flex: 0 0 32%;
   background: #FFFFFF;
   box-shadow: 0px 0px 27.2043px rgba(0, 0, 0, 0.06);
   border-radius: 18.1362px;

   .title {
      font-weight: 400;
      font-size: 14.5089px;
      line-height: 17px;
      margin-bottom: 20px;
   }

   .bonus,
   .product__delivery {
      display: flex;
      align-items: center;
      margin-bottom: 25px;

      span {
         margin-left: 15px;
         font-weight: 500;
         font-size: 14.5089px;
         line-height: 17px;
      }

   }

   .grey__line {
      margin-top: 35px;
      margin-left: 20px;
      width: 80%;
      height: 3px;
      background: #F2F2F2;
      border-radius: 2.28221px;
      position: relative;

      &::before {
         content: '0';
         position: absolute;
         font-weight: 500;
         font-size: 13px;
         line-height: 13px;
         top: -5px;
         left: -15px;
      }

      &::after {
         content: '3000';
         position: absolute;
         font-weight: 500;
         font-size: 13px;
         line-height: 13px;
         top: -5px;
         right: -40px;
      }

      .green__line {
         height: 3px;
         border-radius: 2.28221px;
         width: 66%;
         background-color: $main-color;

         &::before {
            content: '1000 (минимальный заказ)';
            position: absolute;
            font-weight: 500;
            font-size: 11px;
            line-height: 13px;
            top: -18px;
            left: 15px;
         }

         &::after {
            content: v-bind(beforeContent);
            position: absolute;
				display: inline-block;
    			width: 100%;
            font-weight: 400;
            font-size: 9px;
            line-height: 10px;
            bottom: -25px;
            left: 5px;
         }

         span {
            top: 50%;
            left: 33%;
            transform: translateY(-50%);
            position: absolute;
            width: 11.17px;
            height: 11.17px;
            border: 2px solid #FFFFFF;
            background-color: $main-color;
            border-radius: 50%;
         }
      }
   }



}
@media(max-width:1200px){
	.product__bonus {
		padding: 30px 20px;
	}
}
@media(max-width:1030px){
	.product__bonus {
		padding: 30px 20px;
	}
}
@media(max-width:920px){
	.product__bonus {
		flex: 0 0 37%;
	}
}
@media(max-width:819px){
	.product__bonus {
		flex: 0 0 40%;
	}
}
@media(max-width:750px){
	.product__bonus {
		padding: 30px 40px 40px;
	}
}
@media(max-width:540px){
	.product__bonus {
		padding: 20px 30px 40px;
	}
}
@media(max-width:380px){
	.product__bonus {
            padding: 20px 10px 40px;

            .grey__line {
               width: 76%;
            }

            .title,
            .bonus {
               margin-bottom: 15px;
            }
         }
}
</style>