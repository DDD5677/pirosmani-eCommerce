<template>
	<div class="banner-create">
		<div class="top">
			<h2 class="title">Banner Create</h2>
			<button class="close-btn" @click.prevent="closeSidebar"><i class="fa fa-times" aria-hidden="true"></i></button>
		</div>
		<form enctype="multipart/form-data">
			<div class="category-info">
				<div class="name">
					<span class="title">Banner title</span>
					<textarea placeholder="Title of banner" cols="30" rows="2" v-model="title"></textarea>
					<span v-if="errors" class="error">{{ errors.title }}</span>
				</div>
				<div class="name">
					<span class="title">Banner subtitle</span>
					<textarea placeholder="Subtitle of banner" cols="30" rows="2" v-model="subtitle"></textarea>
					<span v-if="errors" class="error">{{ errors.subtitle }}</span>
				</div>
				<div class="name">
					<span class="title">Banner link</span>
					<input placeholder="Link of banner" type="text" v-model="link">
					<span v-if="errors" class="error">{{ errors.link }}</span>
				</div>
				<div class="name">
					<span class="title">Banner button</span>
					<input placeholder="Button text of banner" type="text" v-model="button">
					<span v-if="errors" class="error">{{ errors.button }}</span>
				</div>
			</div>

			<div class="category-img">
				<label class="custom-file-upload">
					<span class="upload__title">Upload Image<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
					<input class="input_file" type="file" id="image" @change.stop="changeImage" />

				</label>
				<span class="image_name" ref="imageName"></span>
				<span v-if="errors && errors.image" class="error">{{ errors.image }}</span>
			</div>


			<div class="review-btns">
				<button @click.prevent="submitHandler" class="review-save"><i class="fa fa-save" aria-hidden="true"></i>
					Save</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'banner-create',
	data() {
		return {
			title: '',
			subtitle: '',
			link: '',
			button: '',
			image: null,
		}
	},
	computed: {
		...mapState({
			errors: state => state.banner.errors
		}),
	},
	methods: {
		closeSidebar() {
			this.$emit('close', false)
		},
		changeImage(event) {
			let inputImage = document.querySelector("#image").files[0];
			if (inputImage) {
				this.$refs.imageName.innerText = inputImage.name;
			}
			this.image = inputImage;
		},
		submitHandler() {
			const data = {
				title: this.title,
				subtitle: this.subtitle,
				link: this.link,
				button: this.button,
				image: this.image,
			}
			this.$store.dispatch('banner/postBanner', data).then((res) => {
				this.$store.dispatch('banner/getBanner')
				this.closeSidebar()
			})
		}

	},
}
</script>

<style lang="scss" scoped>
.banner-create {
	padding: 20px;

	.error {
		color: red
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

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