<template>
	<section class="order-detail">
		<div class="container">
			<loading v-if="orderLoading"/>
			<div v-if="!orderLoading" class="order-detail__inner">
				<h2 class="main-title">Order Information</h2>
				<div class="order-top">
					<div class="order-info">
						<div class="info">
							<div class="date">
								<div><span class="title">Date</span><span>{{ formatDate(order.dateOrdered) }}</span></div>
							</div>
							<div class="status">
								<select name="status" id="status" v-model="status">
									<option value="Delivered">Delivered</option>
									<option value="Pending">Pending</option>
									<option value="Canceled">Canceled</option>
								</select>
							</div>
						</div>
						<div class="address">
							<div><span class="title">City</span><span>{{ order.city }}</span></div>
							<div><span class="title">Address 1</span><span>{{ order.shippingAdress1 }}</span></div>
							<div v-if="order.shippingAdress2"><span class="title">Address 2</span><span>{{ order.shippingAdress2 }}</span></div>
						</div>
						<div class="phone">
							<span class="title">Phone</span><span>{{ order.phone }}</span>
						</div>
					</div>
					<div class="customer-info">
						<div class="user">
							<span class="title">User</span>
							<span>{{ order.user.name }} {{ order.user.surname }}</span>
						</div>
						<div class="email">
							<span class="title">Email</span>
							<span>{{ order.user.email }}</span>
						</div>
						<div class="customer">
							<span class="title">Customer</span>
							<span>{{ order.name }}</span>
						</div>
						<div class="comment">
							<span class="title">Comment</span>
							<p v-if="order.comment">{{ order.comment }}</p>
							<p v-if="!order.comment">No comment</p>
						</div>
					</div>
				</div>
				<h2 class="main-title">Products</h2>
				<div class="order-items">
					<table>
						<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Unit Price</th>
								<th>Quantity</th>
								<th>Total Price</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in order.orderItems" :id="item._id" @click="this.$router.push(`/products/${item.product.id}`)">
								<td><avatar :info="{image:item.product.img, name:item.product.name}"/> </td>
								<td>{{item.product.name}}</td>
								<td>{{item.product.price}}$</td>
								<td>{{item.quantity}}</td>
								<td>{{ (item.quantity*item.product.price.toFixed(2)) }}$</td>
							</tr>
						</tbody>
					</table>
					<div class="total-price">
						<span class="title">Total</span>
						<span>{{ order.totalPrice }}$</span>
					</div>
				</div>
				<div class="btns">
					<green-btn :disabled="isDisable" @click.prevent="updateOrder" class="green-btn">Save</green-btn>
					<button @click.prevent="deleteOrders" class="delete"> <i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
	export default {
		data(){
			return{
				status:''
			}
		},
		computed:{
			...mapState({
				orderLoading:state=>state.order.isLoading,
				errors:state=>state.order.errors,
				order:state=>state.order.order,
			}),
			isDisable(){
				return this.status===this.order.status
			}
		},
		methods:{
			formatDate (dateString){
  				const options = { year: "numeric", month: "long", day: "numeric" }
  				return new Date(dateString).toLocaleDateString(undefined, options) +" " + new Date(dateString).toLocaleTimeString('it-IT')
			},
			updateOrder(){
				const data ={
					id:this.order.id,
					status:this.status
				}
				this.$store.dispatch('order/updateOrder',data)
			},
			deleteOrders(){
				const data= {
					orders:[this.order.id]
				}
				this.$store.dispatch('order/deleteOrders',data).then(()=>{
					this.$router.push('/orders')
				});

			},
		},
		created(){
			this.$store.dispatch('order/getOrderById',this.$route.params.id).then(order=>{
				this.status=order.status
			})
		}
	}
</script>

<style lang="scss" scoped>
.order-detail{
	.order-detail__inner{
		font-size: 16px;
		.main-title{
			margin-bottom: 15px;
		}
		.title{
			margin-top: 10px;
			margin-bottom: 5px;
			font-size: 20px;
			font-weight: 500;
			display: block;

		}
		.order-top{
			display: flex;
			gap: 30px;
			padding: 20px;
			margin-bottom: 20px;
			border: 1px solid #c6c6c6;
			border-radius: 15px;
			.order-info{
				flex: 1 0 48%;
				.info{
					display: flex;
					justify-content: space-between;
					select{
						width: 150px;
						margin-top: 10px;
						display: block;
						padding: 5px 10px;
						background: #FCFCFC;
						border: 1.1194px solid #EBEBEB;
						border-radius: 7.11356px;
						font-size: 16px;
						&:focus {
							border: 1.1194px solid $main-color;
						}
					}
				}
			}
			.customer-info{
				flex: 1 0 48%;
				.comment{
					p{
						display: block;
						padding: 10px 15px;
						color: #939191;
						margin-top: 10px;
						background-color: #fcfcfc;
						border: 1px solid #EBEBEB;
						border-radius: 8px;
					}
				}
			}
		}

		.order-items{
			margin-bottom: 20px;
			border: 1px solid #c6c6c6;
			border-radius: 15px;
			table{
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0px;
				tr th:first-child,
				tr td:first-child{
					padding-left: 15px;
					text-align: start;
				}
				tr th:nth-child(2),
				tr td:nth-child(2){
					text-align: start;
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
					text-align: end;
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

			.total-price{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 15px;
				.title{
					margin: 0;
				}
			}
		}

		.btns{
			display: flex;
			justify-content: space-between;
			.green-btn{
				width: 100px;
				font-size: 16px;
				text-transform: uppercase;
			}
			.delete{
				font-size: 16px;
				width: 100px;
				padding: .5em;
				border-radius: 5px;
				text-transform: uppercase;
				color: rgb(142, 0, 0);
				font-weight: 500;
				cursor: pointer;
				transition: all 0.3s ease-in-out;
				&:hover{
					background-color: rgba(142, 0, 0, 0.3);

				}
			}
		}
	}
}
</style>