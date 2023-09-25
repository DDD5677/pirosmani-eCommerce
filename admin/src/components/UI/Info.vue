<template>
	<div class="info">
		<div class="icon">
			<img :src="src" alt="">
		</div>
		<div class="text">
			<div class="title">{{ title }}</div>
			<div class="amount">{{amount}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'info',
		props:{
			src:{
				type:String,
				required:true
			},
			title:{
				type:String,
				required:true
			},
			amount:{
				type:String,
				required:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info{
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		border:1px solid #d3d3d3;
		border-radius: 15px;
		padding: 16px;
		position: relative;
		overflow: hidden;
		&::before{
			content: "";
			background-color: $light-color;
			display: inline-block;
			width: 100%;
			height: 160%;
			position: absolute;
			right: 65%;
			bottom: -17%;
			border-radius: 60%;
			z-index: -1;
			}
		.icon{
			img{
				width: 40px;
				height: 40px;
			}
		}
		.text{
			.title{
				font-size: 16px;
				color: #00000098;
			}
			.amount{
				font-size: 24px;
				text-align: end;
			}
		}
	}
</style>