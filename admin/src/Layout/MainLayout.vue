<template>
	<navbar/>
	<slot></slot>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed:{
		...mapState({
			user:state=>state.auth.user
		})
	},
}
</script>
