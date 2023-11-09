<template>
	<a class="transparent__btn">
		<span><slot></slot></span>
		<img src="@/assets/images/transparent_btn-arrow.svg" alt=""/>
	</a>
</template>

<script>
	export default {
		name:'transparent-btn'
	}
</script>

<style lang="scss" scoped>
	.transparent__btn {
         text-decoration: none;
   		padding: 0.5em 1em 0.55em;
			display: inline-flex;
			align-items: center;
         font-weight: 400;
         line-height: 29px;
         text-align: center;
         color: $main-color;
			cursor: pointer;
         img {
				transform: scale(0.8);
            margin-left: 10px;
         }
      }

</style>