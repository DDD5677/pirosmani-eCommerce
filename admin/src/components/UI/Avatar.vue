<template>
	<a class="avatar__link" :href="info.image" target="_blank">
		<img v-if="info.image" :src="info.image" alt="" class="avatar__img">
		<span v-if="!info.image" class="avatar__img avatar__name">{{ info.name[0] }}</span>
	</a>
</template>

<script>
export default {
	name: 'avatar',
	props: {
		info: {
			type: Object,
			required: true
		},
		width: {
			type: String,
			default: '35px'
		}
	},
	computed: {
		fontSize() {
			const font = parseInt(this.width) * 0.7;
			return font + 'px'
		}
	}
}
</script>

<style lang="scss" scoped>
.avatar__link {
	display: inline-block;
	width: v-bind(width);
	height: v-bind(width);
}

.avatar__img {
	width: v-bind(width);
	height: v-bind(width);
	border-radius: 50%;
	object-fit: cover;
	background-color: $light-color;
}

.avatar__name {
	text-align: center;
	text-transform: uppercase;
	font-weight: 500;
	font-size: v-bind(fontSize);
	display: inline-block;
	background-color: $main-color;
	color: #fff;
	line-height: v-bind(width);
	;
}
</style>