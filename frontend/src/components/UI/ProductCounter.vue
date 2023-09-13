<template>
   <div class="product__counter">
      <div class="items__control" @click="decrement">
			<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> 
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11 8H4V7H11V8Z" fill="black"/> 
			</svg>
		</div>
      <div class="items__current" data-counter>{{counter}}шт</div>
      <div class="items__control" @click="increment">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"> 
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> 
			</svg>
		</div>
   </div>
</template>

<script>
	export default {
		name:'product-counter',
		props:{
			quantity:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				counter:this.quantity,
			}
		},
		methods:{
			increment(){
				this.counter++;
				this.$emit('counter',this.counter)
			},
			decrement(){
				if(this.counter>1){
				this.counter--}
				this.$emit('counter',this.counter)
			}
		}
	}
</script>

<style lang="scss" scoped>
	 .product__counter {
            cursor: pointer;
				font-weight: 500;
            display: flex;
            background: #FCFCFC;
            border: 0.903636px solid #EBEBEB;
            border-radius: 9.03636px;
            color: #000000;
            position: relative;
				&:focus{
					background: #FCFCFC;

				}
            &::after {
               content: 'Ед. изм.: упаковка';
               font-weight: 400;
               font-size: 9.03636px;
               line-height: 14px;
               color: #C6C6C6;
               position: absolute;
               bottom: -15px;
               right: 0;
            }
            .items__control {
					&:focus{
						outline: none;
					}
               padding: 10px 10px;
					display: flex;
					justify-content: space-between;
					align-items: center;
            }
				
            .items__current {
					user-select: none;
               padding: 10px 10px;

            }
         }
</style>