<template>
	
	<a>
		<img v-if="user.image" :src="user.image" alt="" class="avatar__img">
		<span v-if="!user.image" class="avatar__img avatar__name">{{ user.name[0] }}</span>
	</a>
	
</template>

<script>
	export default {
		name:'avatar',
		props:{
			user:{
				type:Object,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
.avatar__img{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 15px;
	object-fit: cover;
}
.avatar__name{
	text-align: center;
	text-transform: uppercase;
	font-weight: 500;
	font-size: 22px;
	display: inline-block;
	background-color: $main-color;
	color: #fff;
	line-height: 39px;
}
</style>