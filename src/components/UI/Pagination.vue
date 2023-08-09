<template>
	<ul class="pagination">
               <li v-for="pageNum in calcPageSize" class="page-item" @click.prevent.stop="activePage(pageNum)">
                  <a class="page-link" :class="{'active':pageNum===page}" href="#">{{ pageNum }}</a>
               </li>
               
               <li class="page-item" @click.prevent.stop="activePage(increamentPage())">
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
		methods:{
			...mapMutations({
				activePage:'product/activePage'
			}),
			increamentPage(){
				if(this.page===this.calcPageSize){
					return 1
				}
				return this.page+1
				
			}
		},
		computed:{
			...mapState({
			page:state=>state.product.page,
			}),
			...mapGetters({
				calcPageSize:'product/calcPageSize',
			}),
		}
	}
</script>

<style lang="scss" scoped>
	.pagination {
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