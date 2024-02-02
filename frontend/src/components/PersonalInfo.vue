<template>
	<div class="personal__info">
		<form @submit.prevent="submitHandler" enctype="multipart/form-data">
			<div class="personal__left">
				<h2 class="title">Персональная информация</h2>
				<div class="top">
					<div class="img-box">
						<a :href="user.image">
							<img :src="user.image" alt="" />
						</a>
					</div>

					<label class="custom-file-upload">
						Choose Image
						<input class="input_file" type="file" @change.stop="changeAvatar" />

					</label>
					<span class="image_name" ref="imageName"></span>

				</div>
				<div class="personal__form" action="">

					<form-input class="name" :label="'Ваше имя'" :type="'text'" :placeholder="'Имя'" :errors="errors"
						:error="errors ? errors.name : ''" v-model="name" />

					<form-input class="surname" :label="'Ваша фамилия'" :type="'text'" :placeholder="'Фамилия'"
						v-model="surname" />

					<form-input :label="'Адрес электронной почты'" :type="'email'" :placeholder="'Email'" :errors="errors"
						:error="errors ? errors.email : ''" v-model="email" />
				</div>
			</div>
			<div class="personal__right">
				<h2 class="title">Контактная информация</h2>
				<span class="subtitle">(подтверждение заказов)</span>

				<div class="top">
					<form-input :label="'Основной телефон'" :type="'tel'" :placeholder="'+998'" :errors="errors"
						:error="errors ? errors.phone : ''" v-model="phone" />
					<form-input :label="'Дополнительный'" :type="'tel'" :placeholder="'+998'" v-model="extraPhone" />

				</div>
				<div class="body">
					<h3 class="title">Изменение пароля</h3>
					<div class="input">
						<form-input :label="'Ваш старый пароль'" :type="passwordType ? 'password' : 'text'"
							:placeholder="'Старый пароль'" :errors="errors" :error="errors ? errors.error : ''"
							v-model="password" />
						<span @click="togglePasswordType" :class="passwordType ? 'eye-btn' : 'eye-slash-btn'"></span>
					</div>
					<div class="input">
						<form-input :label="'Ваш новый пароль'" :type="newPasswordType ? 'password' : 'text'"
							:placeholder="'Новый пароль'" :errors="errors" :error="errors ? errors.password : ''"
							v-model="newPassword" />
						<span @click="toggleNewPasswordType" :class="newPasswordType ? 'eye-btn' : 'eye-slash-btn'"></span>
					</div>
					<div class="input">
						<form-input :label="'Подтверждение'" :type="cmfPasswordType ? 'password' : 'text'"
							:placeholder="'Подтвердите пароль'" v-model="confirmPassword" :errors="{}" :error="matchPassword" />
						<span @click="toggleCmfPasswordType" :class="cmfPasswordType ? 'eye-btn' : 'eye-slash-btn'"></span>
					</div>

				</div>
				<green-btn :disabled="!changed || imageCompressing" class="green__btn">Сохранить изменения</green-btn>
				<transparent-btn @click="logOutHandler">Log out</transparent-btn>

			</div>
		</form>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { removeItem } from "@/helpers/localStorage";
//import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
export default {
	name: 'personal-info',
	data() {
		return {
			name: '',
			surname: '',
			email: '',
			phone: '',
			extraPhone: '',
			password: '',
			newPassword: '',
			confirmPassword: '',
			avatar: null,
			imageCompressing: false,
			passwordType: true,
			newPasswordType: true,
			cmfPasswordType: true,
		}
	},
	computed: {
		...mapState({
			user: state => state.auth.user.user,
			errors: state => state.auth.updateErrors,
		}),
		changed() {
			const user = this.user
			return this.name !== user.name || this.surname !== user.surname || this.email !== user.email || this.avatar || this.phone !== user.phone || this.extraPhone !== user.extraPhone || this.password
		},
		matchPassword() {
			if (this.newPassword !== this.confirmPassword) return "Password doesn't match"
			return ''
		}
	},
	methods: {
		togglePasswordType() {
			this.passwordType = !this.passwordType
		},
		toggleNewPasswordType() {
			this.newPasswordType = !this.newPasswordType
		},
		toggleCmfPasswordType() {
			this.cmfPasswordType = !this.cmfPasswordType
		},
		assignUserData(user) {
			this.name = user.name;
			this.surname = user.surname;
			this.email = user.email;
			this.phone = user.phone;
			this.extraPhone = user.extraPhone;
		},
		changeAvatar(event) {
			let inputImage = event.target.files[0];
			const FILE_TYPE_MAP = {
				"image/png": "png",
				"image/jpeg": "jpeg",
				"image/jpg": "jpg",
			};
			if (!inputImage) {
				return
			}
			if (!FILE_TYPE_MAP[inputImage.type]) {
				alert('Можно загружать только файлы jpeg, jpg и png')
				return
			}
			if (inputImage.size > 10 * 1024 * 1024) {
				alert('Размер файла должен быть меньше 10 МБ.')
				return
			}
			this.avatar = inputImage
			this.$refs.imageName.innerText = inputImage.name;
		},
		async submitHandler() {
			this.imageCompressing = true;
			const data = {
				id: this.user.id,
				name: this.name,
				surname: this.surname,
				email: this.email,
				phone: this.phone,
				extraPhone: this.extraPhone,
				password: this.password,
				newPassword: this.newPassword,
				avatar: this.avatar
			}
			if (!this.avatar) {
				this.$store.dispatch('auth/updateUserInfo', data).then(user => {
					this.imageCompressing = false;
					this.assignUserData(user)
				});
				return
			}
			if (this.avatar.size > 1024 * 1024) {
				const options = {
					maxSizeMB: 1,
					maxWidthOrHeight: 1920,
					useWebWorker: true,
				}
				try {
					const compressedFile = await imageCompression(this.avatar, options);
					console.log('compressed', compressedFile)
					data.avatar = compressedFile;
					this.$store.dispatch('auth/updateUserInfo', data).then(user => {
						this.imageCompressing = false;
						this.assignUserData(user)
					});
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("orginal", this.avatar)
				this.$store.dispatch('auth/updateUserInfo', data).then(user => {
					this.imageCompressing = false;
					this.assignUserData(user)
				});
			}

		},
		logOutHandler() {
			removeItem('token');
			this.$router.push('/')
			this.$store.commit("auth/loginStart")
		}
	},
	mounted() {
		this.assignUserData(this.user)

	}
}
</script>

<style lang="scss">
.personal__info {

	padding: 45px 0 0;

	form {
		display: flex;
		justify-content: space-between;
	}

	.image_name {
		margin-left: 10px;
		font-size: 11px;
		color: $main-color;
	}

	.custom-file-upload {
		margin-bottom: 10px;
		border-radius: 5px;
		border: 1px solid $main-color;

		color: $main-color;
		display: inline-block;
		font-size: 12px;
		font-weight: 500;
		padding: 3px 8px;
		cursor: pointer;
	}

	input[type="file"] {
		display: none;
	}

	.green__btn {
		margin-top: 18px;
		margin-right: 15px;
	}

	.title {
		font-weight: 500;
		font-size: 28px;
		line-height: 18px;
	}

	.personal__left {
		flex: 0 0 45%;

		.top {
			display: flex;
			align-items: center;
			margin-bottom: 45px;
			margin-top: 30px;

			.img-box {
				margin-right: 18px;
				width: 75px;
				height: 75px;
				background-image: url(@/assets/images/user__bg.png);
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;

				img {
					width: 75px;
					height: 75px;
					border-radius: 5px;
					cursor: pointer;
					object-fit: cover;
				}
			}


		}

	}

	.personal__right {
		flex: 0 0 45%;

		.subtitle {
			font-weight: 500;
			font-size: 20px;
			line-height: 18px;
		}

		.top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 28px;
			margin-top: 30px;

			div {
				flex: 0 0 45%;
			}
		}

		.body {
			.title {
				margin-bottom: 30px;
			}
		}


		.input {
			position: relative;

			input {
				padding-right: 50px;
			}


			span {
				padding: 25px;
				position: absolute;
				bottom: 15px;
				right: 0;
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;
			}

			.eye-btn {
				background-image: url("../assets/images/eye-regular.svg");
				background-size: 18px;
			}

			.eye-slash-btn {
				background-size: 20px;
				background-image: url("../assets/images/eye-slash-regular.svg");

			}
		}
	}
}
</style>