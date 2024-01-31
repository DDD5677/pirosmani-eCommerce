<template>
	<navbar @toggleSidebar="toggleSidebar" :mobile="mobile" />
	<div class="body">
		<sidebar :show="showSidebar && !mobile" />
		<div class="content" :class="{ 'showSidebar': !showSidebar || mobile }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			showSidebar: true,
			mobile: false,
			windowWith: null,
		}
	},
	computed: {
		...mapState({
			user: state => state.auth.user
		})
	},
	methods: {
		toggleSidebar(item) {
			this.showSidebar = item
			console.log(item)
		},
		checkScreen() {
			this.windowWith = window.innerWidth;
			if (this.windowWith <= 820) {
				this.mobile = true
				//this.showSidebar = false
				return
			}
			this.mobile = false
			this.showSidebar = true
		},
	},
	created() {
		window.addEventListener('resize', this.checkScreen);
		this.checkScreen();
	},
}
</script>
<style lang="scss" scoped>
.content {
	min-height: 100vh;
	padding: 100px 0 40px 260px;

}

.showSidebar {
	padding-left: 70px;
}

@media(max-width:480px) {
	.content {
		padding-top: 80px;
	}

	.showSidebar {
		padding-left: 60px;
	}
}
</style>
