<template>
	<ul class="pagination">
		<li v-for="pageNum in pageSize" class="page-item" @click.prevent.stop="changePageData(pageNum)">
			<a class="page-link" :class="{'active':pageNum===page}" href="#">{{ pageNum }}</a>
		</li>
		
		<li class="page-item" @click.prevent.stop="changePageData(increamentPage())">
			<a class="page-link" href="#"
				><img src="@/assets/images/pagination-arrow.svg" alt=""
			/></a>
		</li>
	</ul>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

	export default {
		name:"product-pagination",
		computed:{
			...mapState({
			page:state=>state.product.page,
			pageSize:state=>state.product.pageSize,
			category:state=>state.product.category,
			})
		},
		methods:{
			...mapMutations({
				activePage:'product/activePage',
				changePage:'product/changePage'
			}),
			changePageData(page){
				this.changePage(page);
				this.$store.dispatch('product/getProductByCategory',{
					page:page,
					id:this.$route.query.categories||this.category
				})
				if(this.$route.query.categories){
					this.$router.push({ path: "/products", query: {categories:this.$route.query.categories, page:page } });
				}
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			},
			increamentPage(){
				if(this.page===this.pageSize){
					return 1
				}
				return this.page+1
				
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.pagination {
		display: flex;
      margin-top: -14px;
      justify-content: center;

      --bs-pagination-focus-box-shadow: 0;

      .page-item {
         &:focus {
            border: 1px red solid;
         }

         margin-right: 7px;

         .page-link {
            border: none;
            padding: 8px 18px;
            border-radius: 5px;
            font-weight: 500;
            font-size: 20px;
            line-height: 25px;
            color: #000000;

            &:focus {
               outline: none;
            }
				&:hover{
					background-color: #f3f3fc
				}
            &.active {
               background-color: $main-color;
               color: #fff;
            }

            img {
               vertical-align: none;
            }

            span {
               position: relative;
            }

            span,
            span::before,
            span::after {
               vertical-align: middle;
               width: 4px;
               height: 4px;
               display: inline-block;
               background-color: #000;
               border-radius: 50%;
               top: 50%;
               transform: translateY(-50%);
            }

            span::before,
            span::after {
               position: absolute;
               content: "";
            }

            span::before {
               left: -8px;
            }

            span::after {
               right: -8px;
            }
         }
      }
   }
</style>