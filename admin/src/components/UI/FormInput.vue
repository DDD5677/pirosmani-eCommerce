<template>
	<div>
		<label  :for="label">{{ label }}</label>
		<input
			:value="modelValue"
			@input="$emit('update:modelValue',$event.target.value)"
			:type="type"
			:placeholder="placeholder"
		/>
		<div class="error__message" v-if="errors&&error">{{ error }}</div>
	</div>
</template>

<script>
	export default {
		name:'form-input',
		props:{
			label:{
				type:String,
				required:true
			},
			type:{
				type:String,
				required:true
			},
			placeholder:{
				type:String,
				required:true
			},
			errors:{
				type:Object,
			},
			error:{
				type:String,
			},
			modelValue:[String,Number]
		}
	}
</script>

<style lang="scss" scoped>
	label{
		display: block;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 10px;
	};
	input {
		width: 100%;
		padding: 12px 20px;
		background: #FCFCFC;
		border: 1.1194px solid #EBEBEB;
		border-radius: 7.11356px;
		//margin-bottom: 15px;
		font-size: 16px;
		&:focus {
			border: 1.1194px solid $main-color;
		}

		&::placeholder {
			font-weight: 400;
			font-size: 16px;
			line-height: 24px;
			color: #C6C6C6;
		}
	}
	.error__message{
		font-size: 14px;
		color: red;
		margin-top: -15px;
		margin-bottom: 10px;
	}
</style>