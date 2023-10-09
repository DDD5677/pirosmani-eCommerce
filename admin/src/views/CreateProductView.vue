<template>
	<section class="create__users">
		<div class="container">
			<h2 class="title">Please fill in the Product information</h2>
			<div class="blocks">
				<form @submit.prevent="submitHandler" enctype="multipart/form-data">
					<label class="custom-file-upload">
						<span class="upload__title">Choose Image<i class="fa fa-cloud-upload" aria-hidden="true"></i></span>
						<input class="input_file" type="file" @change.stop="changeAvatar"/>
						
						<span class="image_name" ref="imageName"></span>
					</label>
					<label @click="isFeaturedHandler" for="">
						<input  type="checkbox" name="">
						<span class="shortline" :class="{'checked':isFeatured}">
							<span class="circle"></span>
						</span>
						isFeatured
					</label>
					<form-input
					class="inputs" 
					:label="'Name'" 
					:type="'text'" 
					:placeholder="'Name'" 
					:errors="errors" 
					:error="errors?errors.name:''" 
					v-model="name"/>
					<div class="inputs">
						<label class="">
						Country
							<select  name="countries" v-model="country">
								<option v-for="(country,index) in country_list" 
								:value="country">
									{{ country }}
								</option>
							</select>
						</label>
						<label class="">
							Category
							<select  name="categories" v-model="category">
								<option v-for="(category,index) in categories" 
								:value="category._id">
									{{ category.name }}
								</option>
							</select>
						</label>
					</div>
					<form-input
					class="inputs" 
					:label="'Count in stock'" 
					:type="'number'" 
					:placeholder="'Count in stock'" 
					:errors="errors" 
					:error="errors?errors.name:''" 
					v-model="countInStock"/>
					<form-input
					class="inputs" 
					:label="'Price'" 
					:type="'number'" 
					:placeholder="'Price'" 
					:errors="errors" 
					:error="errors?errors.name:''" 
					v-model="price"/>
					<!-- Country names and Country Name -->
					
					<div class="textarea_block">
						<div class="rich_dsc">
							<label for="richDsc">Rich description</label>
							<textarea  v-model="richDsc" name="richDsc" id="richDsc" cols="10" rows="8" placeholder="Rich description"></textarea>

						</div>
						<div class="short_dsc">
							<label for="shortDsc">Short description</label>

							<textarea  v-model="dsc" name="shortDsc" id="shortDsc" cols="10" rows="4" placeholder="Short description"></textarea>
						<green-btn class="green__btn">Create</green-btn>

						</div>
					</div>
				</form>
				
			</div>
		</div>
	</section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

	export default {
		name:'create-user',
		data(){
			return{
				name:'',
				country:'',
				category:'',
				price:null,
				isFeatured:false,
				countInStock:'',
				dsc:'',
				richDsc:'',
				image:null,
				country_list:["Countries","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
			}
		},
		computed:{
			...mapState({
				errors:state=>state.auth.errors,
				categories:state=>state.category.categories
			})
		},
		methods:{
			changeAvatar(event){
            let inputImage = document.querySelector("input[type=file]").files[0];
				if(inputImage){
            	this.$refs.imageName.innerText = inputImage.name;
				}
				console.log(inputImage,event.target.value)
				this.image=inputImage;
			},
			isFeaturedHandler(){
				console.log(this.isFeatured)
				this.isFeatured=!this.isFeatured
			},
			submitHandler(){
				const data={
					name:this.name,
					country:this.country,
					category:this.category,
					isFeatured:this.isFeatured,
					countInStock:this.countInStock,
					price:this.price,
					dsc:this.dsc,
					richDsc:this.richDsc,
					image:this.image,
				}
				console.log(data)
				this.$store.dispatch('product/postProducts',data).then(()=>{
					this.name='';
					this.country='';
					this.category=''
					this.isFeatured=false
					this.countInStock=''
					this.price=null
					this.dsc=''
					this.richDsc=''
					this.image=null
					this.$refs.imageName.innerText = '';
				})
			}
		},
		mounted(){
			this.$store.dispatch('category/getCategory')
		}
		
	}
</script>

<style lang="scss" scoped>
.create__users{
	padding: 120px 0 50px;
	.title{
		font-size: 24px;
		font-weight: 500;
		margin-bottom: 20px;
	}
	.blocks{
		border: 1px solid #C6C6C6;
		padding: 20px 15px;
		border-radius: 15px;
		form{
			display: flex;
			gap: 20px;
			flex-wrap: wrap;
			width: 100%;
			select{
				margin-top: 10px;
				display: block;
				padding: 11px 10px;
				background: #FCFCFC;
				border: 1.1194px solid #EBEBEB;
				border-radius: 7.11356px;
				font-size: 16px;
				&:focus {
					border: 1.1194px solid $main-color;
				}
			}
			.textarea_block{
				display: flex;
				align-items: flex-start;
				gap: 20px;
				width: 100%;
				label{
					padding-left: 0;
				}
				.short_dsc{
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					width: 50%;
					label{
						width: 100%;
					}
				}
			}
			.rich_dsc{
				width: 50%;
			}
			.short_dsc{
				width: 100%;
			}
			textarea{
				display: inline-block;
				width: 100%;
				padding: 10px;
				font-size: 14px;
				background: #FCFCFC;
				border: 1.1194px solid #EBEBEB;
				border-radius: 10px;
				resize: none;
				transition: all 0.3s ease-in-out;
				&:focus{
					border-color: $main-color;
				}
				&::placeholder {
					font-weight: 400;
					font-size: 16px;
					line-height: 24px;
					color: #C6C6C6;
				}
			}
		}
	
	.custom-file-upload {
		border-radius: 5px;
		border: 1px solid $main-color;
		color: $main-color;
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		padding: 3px 8px;
		cursor: pointer;
		.upload__title{
			margin-top: 8px;
			display: inline-block;
			line-height: 1;
			i{
				margin-left: 5px;
			}

		}
		.image_name{
			margin-left: 10px;
			font-size: 11px;
			color: $main-color;
		}
		input[type="file"] {
    		display: none;
		}
	}	
	
		.inputs{
			flex: 1 0 45%;
			select{
				width: 100%;
				
			}
			label{
				margin-right: 20px;
				padding: 0;
				width: 45%;
			}
		}
		.green__btn{
			margin-top: 25px;
			width: 150px;
			font-size: 16px;
			letter-spacing: 1.5px;
		}
		label{
			flex: 1 0 45%;
			cursor: pointer;
			letter-spacing: 0.8px;
			padding: 10px;
			display: inline-block;
			font-weight: 500;
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
</style>