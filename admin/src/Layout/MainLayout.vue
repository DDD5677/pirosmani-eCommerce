<template>
	<navbar @toggleSidebar="toggleSidebar"/>
	<div class="body">
		<sidebar :show="showSidebar"/>
		<div class="content" :class="{'showSidebar':!showSidebar}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data(){
		return{
			showSidebar:true
		}
	},
	computed:{
		...mapState({
			user:state=>state.auth.user
		})
	},
	methods:{
		toggleSidebar(item){
			this.showSidebar = item
			console.log(item)
		}
	}
}
</script>
<style lang="scss" scoped>
.content{
	min-height: 100vh;
	padding: 100px 0 40px 260px;
	
}
.showSidebar{
	padding-left: 70px;
}

</style>
