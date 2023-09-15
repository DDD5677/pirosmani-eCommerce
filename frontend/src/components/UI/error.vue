<template>
	<div class="page">
		<div class="container">
			<h1>Error</h1>
			<p>{{ error}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name:'error',
		props:{
			error:{
				type:Object,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	padding: 100px 0;
}
</style>