<template>
	<div class="loading container ">
		<half-circle-spinner
		:animation-duration="1000"
		:size="50"
		color="#00AC4E"
		class="loading-spinner"
		/>
	</div>

</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
	export default {
		name:'loading',
		components:{
			HalfCircleSpinner
		}
	}
</script>

<style lang="scss" scoped>
	.loading{
		display: flex;
		justify-content: center;
		.loading-spinner{
			margin-top: 50px;
		}
	min-height: 400px;
}
</style>