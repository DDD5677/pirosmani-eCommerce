<template>
	<div class="category-detail">
		<div class="top">
			<h2 class="title">Banner Detail</h2>
			<button class="close-btn" @click.prevent="closeSidebar"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<loading v-if="bannerLoading" />
		<form v-if="!bannerLoading" enctype="multipart/form-data">
			<div class="category-info">
				<div class="name">
					<span class="title">Banner title</span>
					<textarea placeholder="Title of banner" cols="30" rows="2"
						@change="assignData($event, 'title')">{{ banner.title }}</textarea>
				</div>
				<div class="name">
					<span class="title">Banner subtitle</span>
					<textarea placeholder="Subtitle of banner" cols="30" rows="2"
						@change="assignData($event, 'subtitle')">{{ banner.subtitle }}</textarea>
				</div>
				<div class="name">
					<span class="title">Banner link</span>
					<input placeholder="Link of banner" type="text" :value="banner.link" @change="assignData($event, 'link')">
				</div>
				<div class="name">
					<span class="title">Banner button</span>
					<input placeholder="Button text of banner" type="text" :value="banner.button"
						@change="assignData($event, 'button')">
				</div>
			</div>
			<div class="img-box">
				<img :src="banner.image" alt="image">
			</div>
			<div class="category-img">
				<label class="custom-file-upload">
					<span class="upload__title">Update Image<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
					<input class="input_file" type="file" id="image" @change.stop="changeImage" />

				</label>
				<span class="image_name" ref="imageName"></span>
			</div>


			<div class="review-btns">
				<button @click.prevent="submitHandler" class="review-save"><i class="fa fa-save" aria-hidden="true"></i>
					Save</button>
				<button @click.prevent="deleteBanner" class="review-delete"><i class="fa fa-trash" aria-hidden="true"></i>
					Delete</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'banner-detail',
	data() {
		return {
			data: {
				title: '',
				subtitle: '',
				link: '',
				button: ''
			},
			image: null,
		}
	},
	computed: {
		...mapState({
			banner: state => state.banner.banner,
			bannerLoading: state => state.banner.bannerLoading,
			bannerError: state => state.banner.errors
		}),
	},
	methods: {
		assignData(e, field) {
			this.data[field] = e.target.value
		},
		closeSidebar() {
			this.$emit('close', false)
		},
		formatDate(dateString) {
			const options = { year: "numeric", month: "numeric", day: "numeric" }
			return new Date(dateString).toLocaleDateString(undefined, options)
		},
		changeImage(event) {
			let inputImage = document.querySelector("#image").files[0];
			if (inputImage) {
				this.$refs.imageName.innerText = inputImage.name;
			}
			this.image = inputImage;
		},
		deleteBanner() {
			this.$store.dispatch('banner/deleteBanner', this.banner.id).then((res) => {
				this.$store.dispatch('banner/getBanner')
				this.closeSidebar()
			});

		},
		submitHandler() {
			const data = {
				...this.data,
				id: this.banner.id,
				image: this.image,
			}
			console.log(data)
			this.$store.dispatch('banner/updateBanner', data).then((res) => {
				this.$store.dispatch('banner/getBanner')
				this.closeSidebar()
			})
		}
	},
}
</script>

<style lang="scss" scoped>
.category-detail {
	padding: 20px;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;

		h2.title {
			font-weight: 500;
			font-size: 1.25rem;
			line-height: 1.6;
			letter-spacing: 0.0075em;
		}

		.close-btn {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			font-size: 24px;
			color: #7a7979;
			cursor: pointer;
			background-color: transparent;
			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: $light-color;
				color: $main-color;
			}
		}
	}

	.category-info {

		.name {
			margin-bottom: 10px;
		}

		textarea {
			border-radius: 10px;
			width: 100%;
			background-color: $light-color;
			resize: none;
			padding: 10px;
			font-size: 16px;
		}

		.title {
			margin-bottom: 5px;
			display: block;
			font-weight: 500;
		}

		input {
			width: 100%;
			padding: 12px 20px;
			background: #FCFCFC;
			border: 1.1194px solid #EBEBEB;
			border-radius: 7.11356px;
			font-size: 16px;

			&:focus {
				border: 1.1194px solid $main-color;
			}

			&::placeholder {
				font-weight: 400;
				font-size: 16px;
				line-height: 24px;
				color: #C6C6C6;
			}
		}
	}

	.img-box {
		border: 1px solid #C6C6C6;
		height: 250px;
		border-radius: 10px;
		background-image: url(@/assets/images/card__bg-big.svg);
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: all 0.3s ease-in-out;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.category-img {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		margin-top: 20px;

		.custom-file-upload {
			border-radius: 5px;
			border: 1px solid $main-color;
			color: $main-color;
			display: inline-block;
			font-size: 14px;
			font-weight: 500;
			padding: 10px;
			cursor: pointer;

			.upload__title {
				display: inline-block;
				line-height: 1;
				margin-left: 10px;

				i {
					margin-left: 5px;
				}

			}

			input[type="file"] {
				display: none;
			}
		}

		.image_name {
			font-size: 12px;
			color: $main-color;
		}
	}

	.review-btns {
		padding: 20px 0;
		display: flex;
		justify-content: space-between;

		button {
			width: 120px;
			padding: 10px;
			border-radius: 5px;
			font-size: 18px;
			text-transform: uppercase;
			font-weight: 500;
			cursor: pointer;

			i {
				margin-right: 5px;
			}
		}

		.review-delete {
			background-color: transparent;
			border: 2px solid rgb(149, 2, 2);
			color: rgb(149, 2, 2);
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: rgba(149, 2, 2, 0.1);
			}
		}

		.review-save {
			background-color: transparent;
			border: 2px solid $main-color;
			color: $main-color;
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: rgba(172, 255, 172, 0.2);
			}
		}

	}
}
</style>