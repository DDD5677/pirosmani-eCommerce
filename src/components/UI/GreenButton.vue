<template>
	<a
   href=""
   class="green__btn"
    ><slot></slot></a>
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
   display: inline-block;
   text-decoration: none;
   text-align: center;
   color: #fff;
   border-radius: 5px;
}
</style>