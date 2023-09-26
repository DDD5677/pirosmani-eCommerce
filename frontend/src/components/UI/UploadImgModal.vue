<template>
	<div>
		<form @submit.prevent="changeAvatarHandler" enctype="multipart/form-data">
			<label class="custom-file-upload">
				Choose Image
				<input class="input_file" type="file" @change.stop="changeAvatar"/>
				
			</label>
			<span class="image_name" ref="imageName"></span>
			<div>
				<button class="upload__img">Загрузить фотографию</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';

	export default {
		name:'upload-img',
		data(){
			return{
				avatar:null
			}
		},
		computed:{
			...mapState({
				user:state=>state.auth.user.user,
				errors:state=>state.auth.errors,
			})
		},
		methods:{
			changeAvatar(event){
            let inputImage = document.querySelector("input[type=file]").files[0];
            this.$refs.imageName.innerText = inputImage.name;
				console.log(inputImage,event.target.value)
				this.avatar=inputImage;
			},
        	changeAvatarHandler(){
				const data={
					id:this.user.id,
					avatar:this.avatar
				};
				console.log(data)
				this.$store.dispatch('auth/updateUserAvatar',data);
			}	
			
		},
	}
	
</script>

<style lang="scss" scoped>
	.upload__img {
		display: inline-block;
		text-decoration: none;
		border-bottom: 1px solid $main-color;
		color: $main-color;
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
		cursor: pointer;
		background-color: transparent;
	}
	.image_name{
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
</style>