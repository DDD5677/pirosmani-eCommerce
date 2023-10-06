<template>
	<div class="pagination__wrapper">
		<div>
			<span>Rows per page:</span>
			<select name="" id="" v-model="limit">
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="20">20</option>
				<option value="30">30</option>
			</select>
		</div>
	<ul class="pagination">
		<li v-for="pageNum in links" 
		class="page-item" 
		@click.prevent.stop="changePageData(pageNum)">
			<a  class="page-link" :class="{'active':pageNum===page}" href="#">{{ pageNum }}</a>
			
		</li>
		<li class="page-item" @click.prevent.stop="changePageData(increamentPage())">
			<a class="page-link" href="#"
				><img src="@/assets/images/pagination-arrow.svg" alt=""
			/></a>
		</li>
	</ul>
	</div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';

	export default {
		name:"pagination",
		props:{
			getData:{
				type:Function,
				required:true
			},
			page:{
				type:[String,Number],
				required:true
			},
			pageSize:{
				type:Number,
				required:true
			},
			pageLimit:{
				type:Number,
				default:4
			}
		},
		data(){
			return{
				limit:this.$route.query.limit,

			}
		},
		computed:{
			pages(){
				let pages=[]

				for( let i=1; i<=this.pageSize;i++){
					pages.push(i)
				}
				return pages
			},
			links(){
				let first=[1,'...'], last=['...',this.pageSize], range=[];
				if(this.page<this.pageLimit){
					range=this.range(1,this.pageLimit)
					return (range.length<this.pageSize)?range.concat(last):range
				}else if(this.page>this.pageSize-this.pageLimit){
					range=this.range(this.pageSize-this.pageLimit,this.pageSize)
					return (range.length<this.pageSize)?first.concat(range):range
				}else{
					range = this.range(this.page-Math.ceil(this.pageLimit/2),this.page+Math.ceil(this.pageLimit/2))
					return first.concat(range).concat(last);
				}
			}
		},
		methods:{

			range(start,end){
				let pages=[];
				for(let i=start-1; i<end;i++){
					if (this.pages[i]) {
                    pages.push(this.pages[i]);
                }
				}

				return pages
			},
			...mapMutations({
				
			}),
			changePageData(page){
				this.getData(page,this.$route.query.limit)
				
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			},
			increamentPage(){
				if(this.page===this.pageSize){
					return 1
				}
				return this.page+1
				
			}
		},
		watch:{
			limit(newlimit,oldlimit) {
				this.getData(1,newlimit)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.pagination__wrapper{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		select{
			display: inline-block;
			margin:0 15px;
			padding: 5px;
			background-color: $light-color;
			cursor: pointer;
		}
		.none{
			display: none;
			
		}
	}
	.pagination {
		display: flex;
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