<template>
	<div class="modal">
		<div class="modal-content">
			<button type="button" class="btn-close" @click="toggleModal(false)"></button>

			<slot></slot>
		</div>
	</div>
</template>
	
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'modal-layout',
	computed: {
		...mapState({
			showModal: state => state.navbar.showModal,
		})
	},
	methods: {
		...mapMutations({
			toggleModal: 'navbar/toggleModal',
		}),
	}
}
</script>
	
<style lang="scss" scoped>
.modal {
	position: fixed;
	z-index: 99999;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;

	.modal-content {
		background: #fff;
		box-shadow: 0px 0px 17.7465px rgba(0, 0, 0, 0.12);
		border-radius: 17.4636px;
		margin: 0 auto;
		position: relative;
		text-align: center;
		width: 384px;
		padding: 30px 46px;

		.btn-close {
			width: 25px;
			height: 25px;
			position: absolute;
			top: 15px;
			right: 15px;
			background-image: url(@/assets/images/modal__btn-close.svg);
			background-size: cover;
			background-color: transparent;
			opacity: 1;
			cursor: pointer;
		}
	}

}

@media(max-width:420px) {
	.modal {
		.modal-content {
			padding: 30px 25px;
			width: 300px;
		}
	}
}
</style>