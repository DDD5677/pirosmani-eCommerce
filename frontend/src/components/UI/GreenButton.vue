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
   padding: 0.5em 1.2em 0.55em;
	font-size: 16px;
   text-align: center;
   color: #fff;
   border-radius: 5px;
	cursor: pointer;
}
</style>