<template>
  <component :is="layout">
	<router-view/>
  </component>
</template>
<script>
import MainLayout from '@/Layout/MainLayout.vue';
import ModalLayout from '@/Layout/ModalLayout.vue';
	export default {
		components:{
			MainLayout,
			ModalLayout
		},
		computed:{
			layout(){
				return (this.$route.meta.layout || 'modal')+'-layout'
			}
		},
		created(){
			this.$store.dispatch('auth/refresh').catch(()=>{
				this.$router.push("/login")
			});
			
		}
	}

</script>
<style lang="scss">
*{	
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	transition: all linear 0.5s;
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	outline: none;
   border: none;
}
html {
   height: 100vh;
   //overflow-x: hidden;
}

a{
	text-decoration: none;

}
ul{
	list-style: none;
}
.container{
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 10px;
}
</style>
