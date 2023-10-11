<template>
  <component :is="layout">
	<router-view/>
  </component>
</template>
<script>
import MainLayout from '@/Layout/MainLayout.vue';
import ModalLayout from '@/Layout/ModalLayout.vue';
import { getItem } from './helpers/localStorage';
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
			const token= getItem('token');
			if(token){
				this.$store.dispatch('auth/refresh').then((res)=>{
					this.$store.dispatch('order/getOrders',{page:1,limit:10})
					this.$store.dispatch('review/getReviews',{user:''})
					this.$store.dispatch('user/getUsers',{page:1})
				}).catch((err)=>{
					this.$router.push("/login")
				})
			}else{
				this.$router.push("/login")
			}
			
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
