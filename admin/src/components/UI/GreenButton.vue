<template>
	<button :disabled="isLoading" class="green__btn" :class="{ 'disabled': isLoading }">
		<slot></slot>
		<span v-if="isLoading" class="isLoading"><i class="fa fa-refresh fa-spin fa-fw"></i></span>
	</button>
</template>

<script>
export default {
	name: 'green-btn',
	props: {
		isLoading: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
.green__btn {
	background-color: $main-color;
	padding: 0.5em 1.2em 0.55em;
	text-align: center;
	color: #fff;
	border-radius: 5px;
	cursor: pointer;

	&.disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}
}



.isLoading {
	margin-left: 10px;
	font-size: 16px;
}
</style>