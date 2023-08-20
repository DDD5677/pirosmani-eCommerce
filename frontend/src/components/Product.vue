<template>
	<div  class="card">
                  
		<div>
			<div class="card__img">
			<img
				:src="product.img"
				:alt="product.name"
			/>
			</div>
			<h5 class="card__title">{{ product.name }}</h5>
			<p class="card__desc">
			{{ product.dsc }}
			</p>
		</div>
		<div class="card__box">
			<product-rating :rating="product.rate"/>
		<div class="card__price">
			{{ product.price }} ₽/кг<span>За 500гр.</span>
			
		</div>
		<green-btn @click.prevent.stop="productDetail">В корзину</green-btn>
		</div>
	</div>
</template>

<script>
	export default {
		name:'product',
		props:{
			product:{
				type:Object,
				required:true
			}
		},
		methods:{
			productDetail(){
				this.$router.push(`/product/${this.product.id}`);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}
		}
	}
</script>

<style lang="scss" scoped>
.card {
         margin-bottom: 50px;
         color: #000000;
			background-color: #ececf670;
         border: 2px solid #ececf670;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			&__box{
				padding: 0 10px 10px
			}
         &__img {
            width: 100%;
				//object-fit: contain;
            height: 125.83px;
            background-image: url(@/assets/images/card__bg.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-color: #e5e5e5;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
				@media(max-width: 380px){
					height: 160px;
				}
            img:hover {
               transform: scale(1.2);
            }

            img {
               width: 100%;
               height: 100%;
            }
         }

         &__title {
				padding: 0 10px;
            font-weight: 500;
            font-size: 14.4845px;
            line-height: 22px;
            margin-bottom: 5px;
         }

         &__desc {
				padding: 0 10px;
            font-weight: 400;
            font-size: 12.674px;
            line-height: 19px;
            margin-bottom: 7px;
         }

         

         &__price {
            font-weight: 500;
            font-size: 18px;
            line-height: 23px;
            margin-bottom: 13px;

            span {
               font-weight: 400;
               font-size: 12.674px;
               line-height: 23px;
               color: #828282;
               margin-left: 18px;
            }
         }

         .green__btn {
            // margin-right: 65px;
            display: inline-block;
            font-weight: 500;
            font-size: 18px;
            line-height: 14px;
				width: 100%;
				transition: all 0.5s ease;
            &:hover {
               opacity: 0.8;
            }
         }

      }
</style>