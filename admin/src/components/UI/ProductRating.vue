<template>
	<div class="card__rating">
      <span v-for="index in 5"  class="star grey"></span>
		<div class="card__rating-colored" :style="`width:${ratingWith}%;`">
			<span  v-for="index in 5" class="star green"></span>
		</div>
   </div>
</template>

<script>

	export default {
		name:'product-rating',
		props:{
			rating:{
				type:Number,
				required:true
			},
			width:{
				type:String,
				default:'14px'
			}
		},
		computed:{
			ratingWith(){
				return this.rating/5 * 100;
			}
		}
	}
</script>

<style lang="scss" scoped>
.card{
	&__rating {
		display: inline-flex;
		position: relative;
		&-colored{
			display: inline-flex;	
			width: 0%;
			height: 100%;
			position: absolute;
			top: 0;
			left: -0.48px;
			overflow: hidden;
		}
      margin-bottom: 3px;
		.star {
         width: v-bind(width);
         height: v-bind(width);
         display: inline-block;
			flex-shrink: 0;
         background-position: center;
         background-repeat: no-repeat;
         background-size: cover;
         margin: 0 1px;
			&.green{
				background-image: url(@/assets/images/card__star.svg);
			}
			&.grey {
         	background-image: url(@/assets/images/card__star-grey.svg);
         }
      }

   }
}
</style>