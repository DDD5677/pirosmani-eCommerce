<template>
	<div class="modal__body">
		<h5 class="title">Добавить отзыв</h5>
		<div class="rating__box">
			<span>Ваша оценка:</span>
			<div class="card__rating">
				<span v-for="index in 5" @click="ratingHandler(index)" :class="index<= rating? 'green':''" class="star"></span>
			</div>
		</div>
		<div class="your__review">
			<label>Ваш отзыв:
				<textarea v-model="bodyText"></textarea>
			</label>
		</div>
	</div>
	<div class="modal__footer">
		<green-btn @click.prevent="postReviewsHandler" class="green__btn">Добавить отзыв</green-btn>
	</div>
           
   
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
	name:'add-reviews',
	data(){
		return{
			rating:null,
			bodyText:null
		}
	},
	computed:{
		...mapState({
			user:state=>state.auth.user.user,
		})
	},
	methods:{
		...mapMutations({
			toggleModal:'navbar/toggleModal',
		}),
		ratingHandler(index){
			this.rating=index;
		},
		postReviewsHandler(){
			const data={
				product:this.$route.params.id,
				user:this.user.id,
				rating:this.rating,
				bodyText:this.bodyText
			}
			this.$store.dispatch('singleProduct/postReviews',data).then(()=>{
				this.$store.dispatch('singleProduct/getReviews',this.$route.params.id);
				this.toggleModal(false)
				this.bodyText=null;
				this.rating=null;
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	margin: 15px 0;
	font-weight: 500;
	font-size: 17.4636px;
	line-height: 22px;
	text-align: center;
}

.modal__body {
	font-weight: 400;
	font-size: 14px;
	line-height: 23px;
	label {
		text-align: left;
		width: 100%;
	}
	.rating__box {
		display: flex;
		align-items: center;
		.card__rating {
			margin-left: 10px;
			display: flex;
			align-items: center;
		}

		.star {
			width: 15px;
			height: 15px;
			background-image: url(@/assets/images/card__star-grey.svg);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin-right: 4px;
			cursor: pointer;
			&.green {
				background-image: url(@/assets/images/card__star.svg);

			}
		}
	}

	.your__review {
		display: flex;
		margin-bottom: 14px;

		textarea {
			padding: 10px;
			width: 100%;
			height: 174.93px;
			resize: none;
			border: 1px solid #EBEBEB;
			border-radius: 6px;

			&:focus {
				border-color: $main-color;
			}
		}
	}
}

</style>