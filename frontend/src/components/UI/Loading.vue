<template>
	<div class="loading container ">
		<p>Loading....</p>
	</div>

</template>

<script>
	export default {
		name:'loading'
	}
</script>

<style lang="scss" scoped>
	.loading{
		display: flex;
		justify-content: center;
		p{
			font-size: 20px;
			font-weight: 500;
			padding-top: 50px;
			color: $main-color;
		}
	min-height: 400px;
}
</style>