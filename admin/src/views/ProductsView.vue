<template>
	<section class="users">
		<div class="container">
			<error v-if="productsError" :error="productsError"/>
			<loading v-if="productsLoading"/>
			<div v-if="!productsLoading&&!productsError" class="users__inner">
				<div class="table__nav">
					<div class="filters">
						<div class="search">
							<input type="text" placeholder="Search" v-model="search" class="search__input">
							<div v-if="!search" class="search__span"><i class="fa fa-search" aria-hidden="true"></i></div>
							<button v-if="search" @click="cleanSearch" class="search__btn"><i class="fa fa-times" aria-hidden="true"></i></button>
						</div>
						
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
						<router-link :to="{name:'create-user'}" class="btn"><i class="fa fa-plus" aria-hidden="true"></i>Create</router-link>
						
						<button class="btn"><i class="fa fa-download" aria-hidden="true"></i>Export</button>
					</div>
				</div>
				<div class="users__table">
					<table>
						<thead>
							<tr >
								<th>
									<span></span>
									<input class="checkbox" ref="foomain" @click="toggle()" type="checkbox">
								</th>
								<th v-if="options[0].show">{{options[0].title}}</th>
								<th v-if="options[1].show">{{options[1].title}}</th>
								<th v-if="options[2].show">{{options[2].title}}</th>
								<th v-if="options[3].show">{{options[3].title}}</th>
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
								<a href="" class="delete__btn"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a>
							</div>
						</thead>
						<tbody>
							<tr v-for="product in products">
								<td>
									<span></span>
									<input class="checkbox" ref="foo" @click="addChecked" type="checkbox">
								</td>
								<td v-if="options[0].show">
									Image
									<!-- <avatar :user="product"/> -->
								</td>
								<td v-if="options[1].show">{{ product.name }}</td>
								<td v-if="options[2].show">{{ product.price }}$</td>
								<td v-if="options[3].show">{{ product.countInStock }}</td>
								<td v-if="options[4].show">{{ product.rate }}</td>
								<td v-if="options[5].show">{{ product.dateCreated }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<pagination :getData="getProducts" :page="page" :pageSize="pageSize"/>

		</div>
		
	</section>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { getItem, setItem } from '@/helpers/localStorage';
	export default {
		data(){
			return{
				checked:null,
				search:'',
				columns:false,
				options:[
					{
						title:'Image',
						show:true
					},
					{
						title:'Name',
						show:true
					},
					{
						title:'Price',
						show:true
					},
					{
						title:'Count in stock',
						show:true
					},
					{
						title:'Rate',
						show:true
					},
					{
						title:'Date created',
						show:true
					}
				]
			}
		},
		computed:{
			...mapState({
				products:state=>state.product.products,
				page:state=>state.product.page,
				pageSize:state=>state.product.pageSize,
				productsLoading:state=>state.product.isLoading,
				productsError:state=>state.product.errors
			}),
		},
		methods:{
			...mapMutations({
				changePage:'product/changePage',
				changeLimit:'product/changeLimit'
			}),
			toggleColumns(){
				this.columns=!this.columns
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
				setItem('column-options',this.options)
			},
			cleanSearch(){
				this.search=''
			},
			addChecked(){
				let k=0;
				for(let i of this.$refs.foo ){
					if(i.checked){
						k++
					}
				}
				this.checked=k
			},
			removeCheck(){
				this.$refs.foomain.checked=false;
				this.toggle()
			},
			toggle(){
				for(let i of this.$refs.foo ){
				i.checked=this.$refs.foomain.checked}
				this.addChecked()
			},
			getProducts(page,limit){
				this.$store.dispatch('product/getProducts',{page:page,limit:limit});
				this.changePage(page);
				this.changeLimit(limit);
				this.$router.push({ path: "/products", query: { page:page,limit:limit} });
			}
		},
		mounted(){
			console.log("userview mounted")
			this.getProducts(this.$route.query.page,this.$route.query.limit)

			//this.$store.dispatch('product/getProducts',{page:this.$route.query.page,limit:this.$route.query.limit})
			//this.$store.dispatch('product/getProducts',{page:1,limit:10})
			//this.options=getItem('column-options')
		}
	}
</script>

<style lang="scss" scoped>
	.users{
		padding: 100px 0 40px;

		.table__nav{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;
			.filters{
				.search{
					display: inline-block;
					font-size: 16px;
					border-bottom: 1px solid #454444;
					border-radius: 15px 15px 0 0;
					&:hover{
						background-color: $light-color;
					}
					//background-color: $light-color;
					&__input{
						background-color: $light-color;
						border-radius: 15px  0 0;
						padding: 10px 0 10px 15px;
						
					}
					&__btn{
						padding: 10px;
						border-radius: 0 15px 0 0;
						background-color: $light-color;
						cursor: pointer;
						width: 35px;
						
					}
					&__span{
						width: 35px;
						padding: 10px;
						border-radius: 0 15px 0 0;
						background-color: $light-color;
						display: inline-block;
						font-size: 13px;
					}
				}
			}
			.buttons{
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
				.columns{
					position: absolute;
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
					padding: 5px;
					border-bottom: 1px solid #d3d3d3;
				}
				thead{
					position: sticky;
					top: 85px;
					z-index: 50;
					th{
						font-weight: 500;
						background-color: #fff;
						padding: 18px 0;
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