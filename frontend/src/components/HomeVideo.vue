<template>
	<section class="home__video">
         <div class="container">
            <div class="home__video-wrapper">
					<iframe
						
						class="video"
						:src="videoLink+'&rel=0'"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
         </div>
   </section>
</template>

<script>
import { mapState } from 'vuex';
	export default {
		name:'home-video',
		data(){
			return{
				//videoLink:'https://www.youtube.com/embed/bQUg2Z2Gny4?si=vqf8D0JiHNoMJFPf',
				
			}
		},
		computed:{
			...mapState({
				videoLink:state=>state.info.info.video,
				isLoading:state=>state.info.isLoading
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
.home__video-wrapper {
	iframe {
		width: 100%;
		height: auto;
		aspect-ratio: 21 / 9;
    	border: 0;
	}
}
@media(max-width:540px){
	.home__video-wrapper {
	
		iframe {
			aspect-ratio: 16 / 9;
		}
	}
}
</style>