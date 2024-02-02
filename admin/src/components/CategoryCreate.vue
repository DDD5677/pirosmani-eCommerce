<template>
	<div class="category-detail">
		<div class="top">
			<h2 class="title">Category Create</h2>
			<button class="close-btn" @click.prevent="closeSidebar"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<form enctype="multipart/form-data">
			<div class="category-info">
				<div class="name">
					<span class="title">Category name</span>
					<input type="text" v-model="name">
				</div>
				<span v-if="errors" class="error">{{ errors.name }}</span>
			</div>
			<div class="category-img">
				<label class="custom-file-upload">
					<span class="upload__title">Upload Image<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
					<input class="input_file" type="file" id="image" @change.stop="changeAvatar" />

				</label>
				<span class="image_name" ref="imageName"></span>
				<span v-if="errors && errors.image" class="error">{{ errors.image }}</span>
			</div>

			<div class="category-img">
				<label class="custom-file-upload">
					<span class="upload__title">Upload Icon<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
					<input class="input_file" type="file" id="icon" @change.stop="changeIcon" />

				</label>
				<span class="image_name" ref="iconName"></span>
				<span v-if="errors && errors.icon" class="error">{{ errors.icon }}</span>
			</div>

			<div class="review-btns">
				<green-btn :isLoading="loading" @click.prevent="submitHandler" class="review-save"><i class="fa fa-save"
						aria-hidden="true"></i>
					Save</green-btn>
			</div>
		</form>
	</div>
</template>

<script>
import { changeImage, compressedImage } from '@/helpers/uploadImage';
import { mapState } from 'vuex';
export default {
	name: 'category-create',
	data() {
		return {
			name: '',
			image: null,
			icon: null,
			loading: false,
		}
	},
	computed: {
		...mapState({
			errors: state => state.category.errors
		}),
	},
	methods: {
		closeSidebar() {
			this.$emit('close', false)
		},
		changeAvatar(event) {
			let inputImage = changeImage(event)
			if (inputImage) {
				this.$refs.imageName.innerText = inputImage.name;
			}
			this.image = inputImage;
		},
		changeIcon(event) {
			let inputImage = changeImage(event)
			if (inputImage) {
				this.$refs.iconName.innerText = inputImage.name;
			}
			this.icon = inputImage;
		},
		async submitHandler() {
			this.loading = true;
			let image = this.image;
			let icon = this.icon;
			if (image) {
				image = await compressedImage(image)
			}
			if (icon) {
				icon = await compressedImage(icon)
			}
			const data = {
				name: this.name,
				image: image,
				icon: icon,
			}
			this.$store.dispatch('category/postCategory', data).then((res) => {
				this.$store.dispatch('category/getCategory')
				this.closeSidebar()
				this.loading = false
			}).catch((err) => {
				this.loading = false
			})
		}

	},
}
</script>

<style lang="scss" scoped>
.category-detail {
	.error {
		color: red
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;

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
		padding: 0 20px;

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
			//margin-bottom: 15px;
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
		margin: 20px;
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
		padding: 0 20px;

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
		padding: 20px;
		display: flex;
		justify-content: flex-end;

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