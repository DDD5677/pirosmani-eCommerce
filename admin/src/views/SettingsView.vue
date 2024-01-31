<template>
	<section class="settings">
		<div class="container">
			<loading v-if="isLoading" />
			<div v-if="!isLoading" class="settings-inner">
				<div class="admin-info">
					<h2 class="title">Admin Informations</h2>
					<form @submit.prevent="submitHandler" enctype="multipart/form-data">
						<div class="labels">
							<div class="img-box">
								<avatar :info="admin" :width="'70px'" />
							</div>
							<label class="custom-file-upload">
								<div>
									<span class="upload__title">Change Avatar<i class="fa fa-cloud-upload"
											aria-hidden="true"></i></span>
									<input class="input_file" type="file" @change.stop="changeAvatar" />

									<span class="image_name" ref="imageName"></span>
								</div>
							</label>
						</div>
						<div class="body">
							<form-input class="inputs" :label="'Name'" :type="'text'" :placeholder="'Name'" :errors="errors"
								:error="errors ? errors.name : ''" v-model="name" />
							<form-input class="inputs" :label="'Surname'" :type="'text'" :placeholder="'Surname'" :errors="errors"
								:error="errors ? errors.surname : ''" v-model="surname" />
							<form-input class="inputs" :label="'Email'" :type="'email'" :placeholder="'Email'" :errors="errors"
								:error="errors ? errors.email : ''" v-model="email" />
							<form-input class="inputs" :label="'Password'" :type="'password'" :placeholder="'Password'"
								:errors="errors" :error="errors ? errors.password : ''" v-model="password" />
							<form-input class="inputs" :label="'Phone'" :type="'tel'" :placeholder="'Phone'" :errors="errors"
								:error="errors ? errors.phone : ''" v-model="phone" />
							<form-input class="inputs" :label="'Extra phone'" :type="'tel'" :placeholder="'Extra phone'"
								:errors="errors" :error="errors ? errors.extraPhone : ''" v-model="extraPhone" />
						</div>
						<div class="btns">
							<green-btn class="green__btn">Update</green-btn>
							<button @click.prevent="logoutAdmin" class="transp__btn">Log out</button>
						</div>
					</form>
				</div>
				<div class="site-info">
					<h2 class="title"> E-Commerce Informations</h2>
					<div class="body">
						<form-input class="inputs" :label="'Main phone'" :type="'tel'" :placeholder="'Main phone'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.mainPhone : ''" v-model="mainPhone" />
						<form-input class="inputs" :label="'Order phone'" :type="'tel'" :placeholder="'Order phone'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.orderPhone : ''" v-model="orderPhone" />
						<form-input class="inputs" :label="'Email for site'" :type="'email'" :placeholder="'Email for site'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.email : ''" v-model="mainEmail" />
						<form-input class="inputs" :label="'Telegram'" :type="'text'" :placeholder="'Telegram'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.telegram : ''" v-model="telegram" />
						<form-input class="inputs" :label="'Instagram'" :type="'text'" :placeholder="'Instagram'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.instagram : ''" v-model="instagram" />
						<form-input class="inputs" :label="'Youtube video'" :type="'text'" :placeholder="'Youtube video link'"
							:errors="infoErrors" :error="infoErrors ? infoErrors.video : ''" v-model="video" />
						<form-input class="inputs" :label="'Working time from'" :type="'time'" :placeholder="'from'"
							:step="'3600000'" :errors="infoErrors" :error="infoErrors ? infoErrors.workingTimeFrom : ''"
							v-model="workingTimeFrom" />
						<form-input class="inputs" :label="'Working time to'" :type="'time'" :placeholder="'to'"
							:step="'3600000'" :errors="errors" :error="infoErrors ? infoErrors.workingTimeTo : ''"
							v-model="workingTimeTo" />
					</div>
					<div class="btn">
						<green-btn @click.prevent="updateInfo">Update</green-btn>
					</div>
				</div>
			</div>
		</div>

	</section>
</template>

<script>
import { removeItem } from '@/helpers/localStorage';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			name: '',
			surname: '',
			email: '',
			phone: '',
			extraPhone: '',
			password: '',
			confirmPassword: '',
			avatar: null,

			mainPhone: '',
			orderPhone: '',
			video: '',
			telegram: '',
			instagram: '',
			mainEmail: '',
			workingTimeFrom: '',
			workingTimeTo: ''
		}
	},
	computed: {
		...mapState({
			admin: state => state.auth.user.user,
			isLoading: state => state.auth.isLoading,
			errors: state => state.user.errors,
			infoErrors: state => state.info.errors,
			info: state => state.info.info[0]
		})
	},
	methods: {
		changeAvatar() {
			let inputImage = document.querySelector("input[type=file]").files[0];
			this.$refs.imageName.innerText = inputImage.name;
			this.avatar = inputImage;
		},
		assignUserData(user) {
			this.name = user.name
			this.surname = user.surname
			this.email = user.email
			this.phone = user.phone
			this.extraPhone = user.extraPhone
			this.image = user.image
		},
		assignInfoData(info) {
			this.mainPhone = info.mainPhone
			this.orderPhone = info.orderPhone
			this.mainEmail = info.email
			this.telegram = info.telegram
			this.instagram = info.instagram
			this.video = info.video
			this.workingTimeFrom = info.workingTimeFrom
			this.workingTimeTo = info.workingTimeTo
		},
		logoutAdmin() {
			removeItem('token');
			this.$router.push('/login')
		},
		updateInfo() {
			const data = {
				id: this.info.id,
				mainPhone: this.mainPhone,
				orderPhone: this.orderPhone,
				email: this.mainEmail,
				telegam: this.telegram,
				instagram: this.instagram,
				video: this.video,
				workingTimeFrom: this.workingTimeFrom,
				workingTimeTo: this.workingTimeTo,
			}
			this.$store.dispatch('info/updateInfo', data)
		},
		submitHandler() {
			const data = {
				id: this.admin.id,
				name: this.name,
				surname: this.surname,
				email: this.email,
				phone: this.phone,
				extraPhone: this.extraPhone,
				password: this.password,
				avatar: this.avatar,
			}
			this.$store.dispatch('user/updateUser', data)
		}
	},
	created() {
		this.$store.dispatch('info/getInfo').then(info => {
			this.assignInfoData(info[0])
		})
		this.$store.dispatch('auth/refresh').then(admin => {
			this.assignUserData(admin)
		})

	},
}
</script>

<style lang="scss" scoped>
.settings {
	.settings-inner {
		display: flex;
		gap: 40px;
	}

	.title {
		font-size: 24px;
		font-weight: 500;
		margin: 10px 0 20px;
	}

	.body {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;

		.inputs {
			flex: 1 0 48%;
			font-size: 18px;
		}
	}

	.admin-info {
		flex-grow: 1;

		.labels {
			display: flex;
			align-items: center;
			gap: 20px;
			margin-bottom: 20px;
		}

		.btns {
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.green__btn {
				font-size: 18px;
			}

			.transp__btn {
				cursor: pointer;
				background-color: transparent;
				color: $main-color;
				font-size: 18px;
				font-weight: 500;
				padding: .5em 1.2em;
				border: solid 1px $main-color;
				border-radius: .4em;
			}
		}

		.custom-file-upload {
			display: flex;
			max-width: 250px;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			border: 1px solid $main-color;
			color: $main-color;
			font-size: 14px;
			font-weight: 500;
			padding: 10px;
			cursor: pointer;

			span {
				display: block;
				text-align: center;
			}

			.upload__title {
				line-height: 1;

				i {
					margin-left: 5px;
				}

			}

			input[type="file"] {
				display: none;
			}
		}
	}

	.site-info {
		flex-grow: 1;

		.btn {
			display: flex;
			justify-content: flex-end;
			margin-top: 30px;

			.green__btn {
				font-size: 18px;
			}
		}
	}
}

@media(max-width:1100px) {
	.settings {
		.settings-inner {
			gap: 20px;
			flex-wrap: wrap;
		}
	}
}



@media(max-width:410px) {
	.settings {
		.container {
			margin-right: 10px;
			padding: 15px 10px 20px;
		}

		.title {
			font-size: 20px;
		}
	}
}
</style>