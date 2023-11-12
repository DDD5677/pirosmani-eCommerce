<template>
	<button
   class="green__btn"
    ><slot></slot>
	 </button>
</template>

<script>
	export default {
		name:'green-btn'
	}
</script>

<style lang="scss" scoped>
	.green__btn {
   background-color: $main-color;
   padding: 0.4em 1.2em 0.45em;
	font-size: 16px;
   text-align: center;
   color: #fff;
   border-radius: 5px;
	cursor: pointer;
	}
	button[disabled]{
		background-color: rgba($color: $main-color, $alpha: .7);
	}
</style>