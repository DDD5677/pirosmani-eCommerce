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
					// this.$store.dispatch('order/getOrders',{page:1,limit:10})
					// this.$store.dispatch('review/getReviews',{user:''})
					// this.$store.dispatch('user/getUsers',{page:1})
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
body{
	background-color: rgba($color: $main-color, $alpha: .03);
}
a{
	text-decoration: none;

}
ul{
	list-style: none;
}
.container{
	margin: 0 20px 0px 0;
	padding: 15px 15px 30px;
	background-color: #fff;
	border-radius: 10px;
	-webkit-box-shadow: 1px -1px 8px 0px rgba($color: $main-color, $alpha: .2);
	-moz-box-shadow: 1px -1px 8px 0px rgba($color: $main-color, $alpha: .2);
	box-shadow: 1px -1px 8px 0px rgba($color: $main-color, $alpha: .2);
}
</style>
