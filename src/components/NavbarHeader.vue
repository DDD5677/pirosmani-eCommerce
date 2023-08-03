<template>
	<header class="header">
         <div class="container">
            <nav class="navbar navbar-expand-lg">
               <div class="container-fluid">
                  <div class="logo-wrapper">
                     <a class="navbar-brand" href="index.html"
                        ><img src="@/assets/images/logo.svg" alt=""
                     /></a>
                     <button
                        class="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                     >
                        <span class="navbar-toggler-icon"></span>
                     </button>
                  </div>
                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
                     <ul class="navbar-nav">
                        <li v-for="(item, index) in nav_item" class="nav-item" :class="{'dropdown':index===0,'nav-item__support':item.hide_lg}" :key="index">
                           <a
                              :class="[activeIndex===index?'nav-link active':'nav-link',!index&&'dropdown-toggle']"
                              aria-current="page"
                              href="#"
										:role="index===0?'button':''"
										:data-bs-toggle="index===0?'dropdown':''"
                              :aria-expanded="index===0?'false':''"
										@click.stop="toggleActive(index)"
                              ><img
                                 :src ="item.img"
                                 :alt="item.title" 
                              />{{item.title}}</a
                           >
									<dropdown-menu :categories="categories" v-if="index===0"/>
                        </li>
                        
                     </ul>
                  </div>
                  <div class="header__info">
                     <a class="phone" href="tel:+78312826000">
                        <img src="@/assets/images/nav-phone.svg" alt="" />
                        <span>+7 (831) 282-60-00</span>
                     </a>
                     <a
                        href="#"
                        class="user"
                        data-bs-toggle="modal"
                        data-bs-target="#LogIn"
                        ><img src="@/assets/images/nav-person.svg" alt=""
                     /></a>
                     <a href="basket.html" class="shopping-cart"
                        ><img src="@/assets/images/nav-shopping-cart.svg" alt=""
                     /></a>
                  </div>
               </div>
            </nav>
         </div>
   </header>
</template>

<script>
import item_1 from '@/assets/images/nav-item-1.svg'
import item_2 from '@/assets/images/nav-item-2.svg'
import item_3 from '@/assets/images/nav-item-3.svg'
import item_4 from '@/assets/images/nav-item-4.svg'
import item_5 from '@/assets/images/nav-item-5.svg'
	export default{
		name:'navbar-header',
		props:{
			categories:{
				type:Array,
				required:true
			}
		},
		data(){
			return {
				active_item:false,
				nav_item:[
				{
					title:'Меню',
					img:item_1,
					hide_lg:false

				},
				{
					title:'Доставка',
					img:item_2,
					hide_lg:false
				},
				{
					title:'Оплата',
					img:item_3,
					hide_lg:false
				},
				{
					title:'Вакансии',
					img:item_4,
					hide_lg:false
				},
				{
					title:'Поддержка',
					img:item_5,
					hide_lg:true
				}
				
				],
				activeIndex: undefined,
			}
			

		},
		methods: {
			toggleActive(index) {
			this.activeIndex=index;
			console.log(this.nav_item[index].img)
}
	}
	}
</script>

<style lang="scss" scoped>
.navbar{
   height: 100px;
   background: #FFFFFF;

   .navbar-brand {
      margin-right: 54px;
   }

   .nav-item {
      img {
         display: none;
      }
   }

   .nav-item.nav-item__support {
      display: none;
   }

   .nav-link {
      margin-right: 45px;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #333333;

      &.active,
		&:hover {
         color: $main-color;
      }
   }

}

.header {
   position: fixed;
   width: 100%;
   z-index: 5;
   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12);

   .container {
      padding: 0;
   }

   .dropdown {
      .dropdown-toggle {
         position: relative;
         z-index: 15;
      }

      .dropdown-toggle::after {
         display: none;
      }

      .dropdown-menu {
         padding: 46px 0px 10px;
         top: -12px;
         left: -18px;
         z-index: 5;
      }

      
   }

   .header__info {
      display: flex;
      align-items: center;

      .phone {
         display: flex;
         align-items: center;
         margin-right: 50px;
         font-weight: 500;
         font-size: 18px;
         line-height: 21px;
         color: #000000;
         text-decoration: none;
      }

      .user {
         margin-right: 30px;
      }
   }
}


</style>