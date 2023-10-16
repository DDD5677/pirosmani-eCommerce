<template>
	<section class="reviews">
		<div class="container">
			
			<div  class="reviews__inner">
				<div class="table__nav">
					<div class="filter">
						<div v-for="(filter,index) in filters" :id="index">
							<div v-if="filter.show&&(filter.title!=='Featured')">
								<input type="number" :placeholder="filter.title" v-model="filter.source" @change="sumbitFilters">
								<button @click.prevent="removeFilter(index)"><i class="fa fa-times" aria-hidden="true" ></i></button>
							</div>
							<div v-if="filter.show&&(filter.title==='Featured')">
								<select name="status" id="status" v-model="filter.source" @change="sumbitFilters">
									<option value="" selected disabled hidden >Select an option</option>
									<option value="true">Featured</option>
									<option value="false">Not Featured</option>
								</select>
								<button @click.prevent="removeFilter(index)"><i class="fa fa-times" aria-hidden="true" ></i></button>
							</div>
						</div>
					</div>
					<div class="filters">
						<div class="search">
							<input type="text" placeholder="Search" v-model="search" class="search__input" @change="getReviews(1,this.$route.query.limit)">
							<div v-if="!search" class="search__span"><i class="fa fa-search" aria-hidden="true"></i></div>
							<button v-if="search" @click="cleanSearch" class="search__btn"><i class="fa fa-times" aria-hidden="true"></i></button>
						</div>
						<div class="buttons">
							<button @click="toggleColumns" class="btn"><i class="fa fa-th" aria-hidden="true"></i>Columns</button>
							<ul v-show="columns" class="columns">
									<li v-for="(option,index) in options" class="options">
										<label @click="addOptions(index)" :for="'option-'+index">
											<input checked type="checkbox" ref="option" :id="'option-'+index">
											<span class="shortline" :class="{'checked':option.show}" ref="shortline">
												<span class="circle"></span>
											</span>
										
										{{ option.title }}
										</label>
									</li>
							</ul>
							<router-link :to="{name:'create-product'}" class="btn"><i class="fa fa-plus" aria-hidden="true"></i>Create</router-link>
							
							<button @click="toggleFilters" class="btn"><i class="fa fa-filter" aria-hidden="true"></i>Filter</button>
							<ul v-show="filter_box" class="filter__box">
									<li v-for="(option,index) in filters" :id="index" @click="addFilter(index)" class="options">
										{{ option.title }}
									</li>
							</ul>
							<button class="btn"><i class="fa fa-download" aria-hidden="true"></i>Export</button>
						</div>
					</div>
					
				</div>
				<div class="reviews__table">
					<table>
						<thead>
							<tr >
								<th v-if="!reviewsError">
									<span></span>
									<input class="checkbox" ref="foomain" @click="allCheck" type="checkbox">
								</th>
								<th v-if="options[0].show">{{options[0].title}}</th>
								<th v-if="options[1].show"  >
									<span class="sort_btn" @click="sortHandler('name')">
									{{options[1].title}}
									<i v-if="sort==='name'||sort==='-name'" class="fa fa-arrow-up" :class="sort[0]==='-'?'rotate':''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[2].show" >
									<span @click="sortHandler('price')" class="sort_btn">
									{{options[2].title}} 
									<i v-if="sort==='price'||sort==='-price'" class="fa fa-arrow-up" :class="sort[0]==='-'?'rotate':''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[3].show" >
									<span @click="sortHandler('countInStock')" class="sort_btn">
									{{options[3].title}} 
									<i v-if="sort==='countInStock'||sort==='-countInStock'" class="fa fa-arrow-up" :class="sort[0]==='-'?'rotate':''" aria-hidden="true"></i>
									</span>
								</th>
								<th v-if="options[4].show">{{options[4].title}}</th>
								<th v-if="options[5].show">{{options[5].title}}</th>
							</tr>
							<div v-if="checked>0" class="checked__block">
								<div>
									<button
									@click="removeCheck"
										type="button"
										class="btn-close"
									></button>
									<span class="checked">{{ checked }} Items selected</span>
								</div>
								<a @click.prevent="deleteReviews" class="delete__btn"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a>
							</div>
						</thead>
						
						<tbody v-if="!isLoading&&!reviewsError">
							<tr v-for="review in reviews" :id="review.id">
								<td>
									<span></span>
									<input class="checkbox" ref="foo" @click="removedReviewsId($event,review.id)" type="checkbox">
								</td>
								<td v-if="options[0].show">
									{{ formatDate(review.createdAt) }}
								</td>
								<td  v-if="options[1].show" @click="reviewDetail(review._id)"><span class="customer"><avatar :info="review.user" :width="'30px'"/><span>{{ review.user.name }}</span></span></td>
								<td v-if="options[2].show" @click="reviewDetail(review._id)">{{ review.product.name }}</td>
								<td v-if="options[3].show" @click="reviewDetail(review._id)"><product-rating :rating="review.rating"/></td>
								<td v-if="options[4].show" @click="reviewDetail(review._id)">{{ review.bodyText }}</td>
								<td v-if="options[5].show" @click="reviewDetail(review._id)">{{ review.status }}</td>
							</tr>
						</tbody>
					</table>
					<loading v-if="isLoading"/>
					<error v-if="reviewsError" :error="reviewsError"/>
				</div>
				<pagination :getData="getReviews" :page="page" :pageSize="pageSize"/>
			</div>
			<review-detail v-if="reviewDetailShow" class="review-detail" @close="reviewDetailToggle"/>
		</div>
	</section>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { getItem, setItem } from '@/helpers/localStorage';
	export default {
		data(){
			return{
				sort:'',
				checked:null,
				search:'',
				columns:false,
				filter_box:false,
				removedReviewId:[],
				options:[],
				filters:[],
				reviewDetailShow:false,
			}
		},
		computed:{
			...mapState({
				reviews:state=>state.review.reviews,
				page:state=>state.review.page,
				pageSize:state=>state.review.pageSize,
				isLoading:state=>state.review.isLoading,
				reviewLoading:state=>state.review.reviewLoading,
				reviewsError:state=>state.review.errors
			}),
			
		},
		methods:{
			...mapMutations({
				changePage:'review/changePage',
				changeLimit:'review/changeLimit'
			}),
			reviewDetailToggle(item){
				this.reviewDetailShow=item
			},
			reviewDetail(id){
				this.reviewDetailToggle(true)
				this.$store.dispatch('review/getReviewById',id)
			},
			ratingCalc(ratings){
				let items = Object.entries(ratings);
            let sum = 0;
            let total = 0;

            for (let [key, value] of items) {
               total += value;
               sum += value * parseInt(key);
            }
				if(total){
            	return Math.round(sum / total);
				}else{
					return 0
				}
			},
			formatDate (dateString){
  				const options = { year: "numeric", month: "numeric", day: "numeric" }
  				return new Date(dateString).toLocaleDateString(undefined, options)
			},
			sortHandler(sort){
				if(this.sort===sort){
					if(this.sort[0]==='-'){
						this.sort=this.sort.substring(1)
					}else{
					this.sort='-'+this.sort
					}
				}else{
					this.sort=sort
				}
				this.getReviews(this.$route.query.page,this.$route.query.limit)
				const sorts=getItem('sorts')
				setItem('sorts',{...sorts,review:this.sort})
			},
			toggleColumns(){
				this.columns=!this.columns
			},
			toggleFilters(){
				this.filter_box=!this.filter_box
			},
			addFilter(index){
				this.filters[index].show=true
				this.filter_box=false
			},
			removeFilter(index){
				this.filters[index].show=false
				if(this.filters[index].source){
					this.filters[index].source=''
					setItem('review-filters',this.filters);
					this.getReviews(1,this.$route.query.limit)
				}
			},
			sumbitFilters(){
				setItem('review-filters',this.filters);
				this.getReviews(1,this.$route.query.limit)
			},
			addOptions(index){
				const shortline = this.$refs.shortline
				const option = this.$refs.option
				if(option[index].checked){
				shortline[index].classList.add('checked')
				this.options[index].show=true
				}else{
					shortline[index].classList.remove('checked')
					this.options[index].show=false
				}
				setItem('review-options',this.options)
			},
			cleanSearch(){
				this.search='';
				this.getReviews()
			},
			// delete checked data logic
			removedReviewsId(checkbox,id){
				if(checkbox.target.checked){
					this.removedReviewId.push(id)
					this.countCheckedItems()
				}else{
					this.removedReviewId=this.removedReviewId.filter(item=>item!==id)
					this.countCheckedItems()
					console.log('not checked')
				}
			},
			countCheckedItems(){
				let k=0;
				for(let i of this.$refs.foo ){
					if(i.checked){
						k++
					}
				}
				this.checked=k
			},
			toggle(){
				for(let i of this.$refs.foo ){
				i.checked=this.$refs.foomain.checked
				}
				this.countCheckedItems()
			},
			removeCheck(){
				this.$refs.foomain.checked=false;
				this.removedReviewId=[]
				this.toggle()
			},
			allCheck(){
				this.removedReviewId=[];
				for( let product of this.products){
					this.removedReviewId.push(product.id)
				}
				this.toggle()
			},

			deleteReviews(){
				const data= {
					reviews:this.removedReviewId
				}
				this.$store.dispatch('review/deleteReviews',data).then(()=>{
					location.reload()
				});

			},
			//------------------------------------------------------------------------
			getReviews(page,limit){
				const queries = {
					page:page,
					limit:limit,
					sort:this.sort,
					search:this.search,
					// min_price:this.filters[0].source,
					// max_price:this.filters[1].source,
					// min_count:this.filters[3].source,
					// isFeatured:this.filters[4].source,
				}
				this.$store.dispatch('review/getReviews',queries);
				this.changePage(page);
				this.changeLimit(limit);
				this.$router.push({ path: "/reviews", query: queries });
			}
		},
		watch:{
			page(newp,old){
				this.removedReviewId=[];
				this.checked=0
			},
			filters(newFilter,oldFilter){
				setItem('review-filters',newFilter);
				this.getReviews(this.$route.query.page,this.$route.query.limit)
			}
		},
		created(){
			this.options=getItem('review-options')
			this.filters=getItem('review-filters')
			this.sort=getItem('sorts').review

		},
		mounted(){
			this.getReviews(this.$route.query.page,this.$route.query.limit)
		}
	}
</script>

<style lang="scss" scoped>
	.reviews{
		padding: 100px 0 40px;
		position: relative;
		.review-detail{
			background-color: #fff;
			width: 500px;
			position: absolute;
			z-index: 99;
			top: 0;
			right: 0;
			bottom: 0;
			border-left: 1px solid #9d9d9d;
			padding: 100px 0 50px;
		}
		.table__nav{
			margin-bottom: 10px;
			.filter{
				display: flex;
				margin-bottom: 10px;
				select{
					width: 140px;
					padding: 9px ;
					border-radius: 10px 10px 0 0;
					border-bottom: 1px solid #000;
					background-color: $light-color;
					display: inline-block;
				}
				div{
					position: relative;
					margin-right: 5px;
				}
				input{
					width: 100px;
					padding: 10px ;
					border-radius: 10px 10px 0 0;
					border-bottom: 1px solid #000;
					background-color: $light-color;
					display: inline-block;
				}
				button{
					position: absolute;
					top: -5px;
					right: -5px;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					cursor: pointer;
					background-color: $light-color;
				}
			}
			.filters{
			display: flex;
			justify-content: space-between;
			align-items: center;
				.search{
					display: inline-flex;
					flex-wrap: nowrap;
					border-bottom: 1px solid #454444;
					border-radius: 10px 10px 0 0;
					margin-right: 10px;
					&:hover{
						background-color: $light-color;
					}
					//background-color: $light-color;
					&__input{
						width: 120px;
						background-color: $light-color;
						border-radius: 10px  0 0;
						padding: 10px 0 10px 15px;
						
					}
					&__btn{
						padding: 10px;
						border-radius: 0 10px 0 0;
						background-color: $light-color;
						cursor: pointer;
						width: 35px;
						
					}
					&__span{
						width: 35px;
						padding: 10px;
						border-radius: 0 10px 0 0;
						background-color: $light-color;
						display: inline-block;
						font-size: 13px;
					}
				}
				
			}
			.buttons{
				position: relative;
				.btn{
					border-radius: 15px;
					padding: 10px 15px;
					color: $main-color;
					font-size: 16px;
					font-weight: 500;
					background-color: transparent;
					cursor: pointer;
					text-transform: uppercase;
					transition: all 0.5s ease-in-out;
					&:hover{
						background-color: $light-color;
					}
					i{
						margin-right: 10px;
					}
				}
				.filter__box{
					position: absolute;
					left: 50%;
					z-index: 52;
					background-color: #fff;
					padding: 10px 0;
					border-radius: 10px;
					width: 180px;
					-webkit-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
					-moz-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
					box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);	
					.options{
						padding: 5px 15px;
						cursor: pointer;
						&:hover{
							background-color: $light-color;
						}
					}
				}
				.columns{
					position: absolute;
					left: 0;
					z-index: 52;
					background-color: #fff;
					padding: 15px;
					border-radius: 15px;
					width: 160px;
					-webkit-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
					-moz-box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);
					box-shadow: 2px 12px 59px 3px rgba(34, 60, 80, 0.2);	
					.options{
						padding: 5px 0;
						
						label{
							cursor: pointer;
							letter-spacing: 0.8px;
						}
						input{
							height: 0;
							width: 0;
							opacity: 0;
						}
						.shortline{
							cursor: pointer;
							background-color: #9d9d9d;
							display: inline-block;
							width: 30px;
							height: 10px;
							border-radius: 5px;
							position: relative;
							transition: all 0.2s ease-in-out;
							&.checked{
								background-color: $light1-color;

								.circle{
									background-color: $main-color;
									left: calc(100% - 15px);
									box-shadow: none;
								}
							}

							.circle{
								position: absolute;
								left: 0;
								top: -3px;
								display: inline-block;
								width: 15px;
								height: 15px;
								background-color: #fff;
								border-radius: 50%;
								transition: all 0.2s ease-in-out;
								-webkit-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
								-moz-box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
								box-shadow: 0px 0px 4px 3px rgba(34, 60, 80, 0.2);
							}
						}
						
						
					}
				}
			}
		}
		&__table{
			padding: 0  0 15px;
			border: 1px solid #d3d3d3;
			border-radius: 15px;
			margin-bottom: 50px;
			table{
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0px;
				.customer{
					display: flex;
					gap: 10px;
					align-items: center;
				}
				.rotate{
					transition: all 0.3s ease-in-out;
					transform: rotate(180deg);
				}
				tr th:first-child,
				tr td:first-child{
					padding-left: 15px;
				}
				tr th:first-child{
					border-radius: 15px 0 0 0;
				}
				tr th:last-child{
					border-radius: 0 15px 0 0;
				}
				tr th:last-child,
				tr td:last-child{
					padding-right: 15px;
				}
				th,td{
					text-align: start;
					padding: 5px;
					border-bottom: 1px solid #d3d3d3;
				}
				thead{
					position: sticky;
					top: 85px;
					z-index: 50;
					.sort_btn{
						
						font-weight: 500;
						cursor: pointer;
						transition: all 0.3s ease-in-out;
						i{
							transition: all 0.1s ease-in;
						}
						&:hover{
							color: $main-color;
						}
					}
					th{
						font-weight: 500;
						background-color: #fff;
						padding: 18px 10px;
					}
				}
				tbody tr{
					text-align: center;
					cursor: pointer;
					&:hover{
						background-color: $light-color;
					}
				}
			}
			.checked__block{
				width: 100%;
				background-color: rgb(188 255 188);
				//background-color: $main-color;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				z-index: 2;
				top: 0;
				padding: 15px 20px;
				border-radius: 15px 15px 0 0;
				div{
					display: flex;
					align-items: center;
				}
				.btn-close {
					width: 25px;
					height: 25px;
					margin-right: 10px;
					background-image: url(@/assets/images/modal__btn-close.svg);
					background-size:auto;
					background-position: center;
					background-color: transparent;
					opacity: 1;
					cursor: pointer;
				}
				.checked{
					font-size: 18px;
					line-height: 1.75;
					color: $main-color;
				}
				.delete__btn{
					padding: 5px;
					border-radius: 5px;
					color: rgb(140, 0, 0);
					font-size: 18px;
					font-weight: 500;
					text-transform: uppercase;
					transition: all 0.3s ease-in;
					&:hover{
						background-color: rgba(140, 0, 0, 0.238);
					}
				}
			}
			.checkbox{
				width: 20px;
				height: 20px;
				accent-color: green;
				cursor: pointer;
			}
		}
	}
</style>