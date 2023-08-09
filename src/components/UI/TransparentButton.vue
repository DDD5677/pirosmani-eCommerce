<template>
	<a href="#" class="transparent__btn">
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
         padding: 8px 15px;
         font-weight: 400;
         font-size: 22.2162px;
         line-height: 29px;
         text-align: center;
         color: $main-color;

         img {
            margin-left: 10px;
         }
      }

</style>