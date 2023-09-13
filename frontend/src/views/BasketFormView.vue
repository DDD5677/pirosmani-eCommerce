<template>
	<section class="page__basket">
         <div class="container">
            <div class="page__basket-wrapper">
               <div class="basket__left">
                  <basket/>
                  <basket-tab @tabs="tabsHandler"/>
               </div>
               <div class="basket__right">
                  <basket-form :tab1="tab1" :tab2="tab2"/>
               </div>
            </div>
         </div>
      </section>
</template>

<script>
	export default {
		data(){
			return{
				tab1:true,
				tab2:false
			}
		},
		methods:{
			tabsHandler(tabs){
				this.tab1=tabs.tab1
				this.tab2=tabs.tab2
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page__basket {
   padding: 140px 0 60px;

   .page__basket-wrapper {
      display: flex;
      justify-content: space-between;

      .basket__left {
         flex: 0 0 60%;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         
      }
      .basket__right {
         flex: 0 0 35%;
         
      }
   }
}
</style>