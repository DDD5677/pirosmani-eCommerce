<template>
	<section class="home__video">
         <div class="container">
            <div class="home__video-wrapper">
               <div class="ratio ratio-21x9">
                  <iframe
                     class="video"
                     :src="onVideo? videoLink: ''"
                     title="YouTube video player"
                     frameborder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen
                  ></iframe>
               </div>
               <img class="play-img" @click="videoPlayed" :class="{'none':onVideo}" src="@/assets/images/video-play.png" alt="" />
            </div>
         </div>
   </section>
</template>

<script>
	export default {
		name:'home-video',
		data(){
			return{
				videoLink:'https://www.youtube.com/embed/wJJ1irx9tOA?autoplay=1',
				onVideo:false
			}
		},
		methods:{
			videoPlayed(){
				this.onVideo=!this.onVideo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home__video-wrapper {
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   background-image: url(@/assets/images/video-bg.jpg);
   background-position: top center;
   background-size: cover;
	.ratio::before {
    display: block;
    padding-top: calc(9/21*100%);
    content: "";
	}
	.ratio {
    position: relative;
    width: 100%;
}
	.ratio>* {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
	.ratio-21x9 {
    --bs-aspect-ratio: calc(9/21*100%);
	}
	iframe {
    border: 0;
	}

   img {
      position: absolute;
   }
}
</style>