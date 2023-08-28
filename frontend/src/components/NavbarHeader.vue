<template>
	<header class="header">
         <div class="container">
            <nav class="navbar">
                  <div class="logo-wrapper">
                     <router-link class="navbar-brand" :to="{name:'home'}" @click="closeNavbarDropdown"
                        ><img src="@/assets/images/logo.svg" alt=""
                     /></router-link>
                     <button
                        class="navbar-toggler"
								
								@click="showNavbarHandler(!showNavbar)"
								:class="{'collapsed':showNavbar}"
                     >
                        <span class="first"></span>
                        <span class="second"></span>
                     </button>
                  </div>
                  <div v-if="showNavbar||!mobile" class="navbar-collapse" >
                     <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                           <a
                              class="nav-link dropdown-toggle"
                              href="#"
										@click="toggleDropdown(!showDropdown)"
                           >
                              <img src="@/assets/images/nav-item-1.svg" alt="" /> Меню
                           </a>
									<dropdown-menu v-show="showDropdown"/>
                        </li>
                        <li class="nav-item">
                           <router-link class="nav-link" :to="{name:'delivery'}" @click="closeNavbarDropdown">
										<img
                                 src="@/assets/images/nav-item-2.svg"
                                 alt=""
                              />
										Доставка
									</router-link>
                        </li>
                        <li class="nav-item">
                           <router-link class="nav-link"  :to="{name:'payment'}" @click="closeNavbarDropdown">
										<img
                                 src="@/assets/images/nav-item-3.svg"
                                 alt=""
										/>
										Оплата
									</router-link>
                        </li>
                        <li class="nav-item">
                           <router-link class="nav-link" :to="{name:'vacation'}" @click="closeNavbarDropdown">
										<img
                                 src="@/assets/images/nav-item-4.svg"
                                 alt=""
                              />
										Вакансии
									</router-link>
                        </li>
                        <li class="nav-item nav-item__booking">
                           <a
                              class="nav-link"
                              href=""
                              data-bs-toggle="modal"
                              data-bs-target="#tableReservation"
                              >Бронь стола</a
                           >
                        </li>
                        <li class="nav-item nav-item__support">
                           <router-link class="nav-link" :to="{name:'support'}" @click="closeNavbarDropdown">
                              <img src="@/assets/images/nav-item-5.svg" alt="" />
                              Поддержка
									</router-link>
                        </li>
                     </ul>
                  </div>
                  <div class="header__info">
                     <a class="phone" href="tel:+998903385677">
                        <img src="@/assets/images/nav-phone.svg" alt="" />
                        <span>+998 (90) 338-56-77</span>
                     </a>
                     <a
							v-if="!isLogged"
                     class="user"
							@click="toggleModal(true)"
                     >
								<img src="@/assets/images/nav-person.svg" alt=""/>
							</a>
							<div v-if="isLogged" class="avatar">{{user.user.name[0]}}</div>
                     <a 
							href="basket.html" 
							class="shopping-cart"
                     >
								<img src="@/assets/images/nav-shopping-cart.svg" alt=""/>
							</a>
                  </div>
            </nav>
         </div>
   </header>
	<modal-layout v-if="showModal" >
	<sign-up v-if="signUp" />
	<sign-in v-if="signIn" />
	<forgot-password v-if="forgotPassword" />
	</modal-layout>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
	export default{
		name:'navbar-header',
		data(){
			return{
				windowWith:null,
			}
		},
		created(){
			window.addEventListener('resize',this.checkScreen);
			this.checkScreen();
		},
		computed:{
			...mapState({
				showDropdown:state=>state.navbar.showDropdown,
				showNavbar: state=>state.navbar.showNavbar,
				mobile: state=>state.navbar.mobile,
				showModal:state=>state.auth.showModal,
				signUp:state=>state.auth.signUp,
				signIn:state=>state.auth.signIn,
				forgotPassword:state=>state.auth.forgotPassword,
				category:state=>state.product.category,
				user:state=>state.auth.user,
				isLogged:state=>state.auth.isLogged
			})
		},
		methods:{
			...mapMutations({
				toggleDropdown:'navbar/toggleDropdown',
				showNavbarHandler:'navbar/showNavbarHandler',
				toggleMobile:'navbar/toggleMobile',
				toggleModal:'auth/toggleModal'
			}),
			scrollTop(){
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			},
		
			closeNavbarDropdown(){
				this.toggleDropdown(false);
				this.showNavbarHandler(false)
				this.scrollTop()
			},
			checkScreen(){
				this.windowWith=window.innerWidth;
				if(this.windowWith<=820){
					this.toggleMobile(true)
					return
				}
				this.toggleMobile(false)
				this.showNavbarHandler(false)
			},
			getProduct(){
				this.closeNavbarDropdown()
				this.$store.dispatch('getProductByCategory',{
					id:this.categories,
					page:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.navbar{
	display: flex;
	align-items: center;
	justify-content: space-between;
   height: 100px;
   background: #FFFFFF;

   .navbar-brand {
      margin-right: 54px;
		cursor: pointer;
   }
	.navbar-collapse{
		display: flex;
		flex-grow: 1;
		
	}
	.navbar-nav{
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		padding: 8px;
      margin-right: 30px;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #333333;
		@media(max-width:1080px){
			margin-right: 10px;
			
			
		}
      &:focus,
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
	background-color: #fff;
   .dropdown {
		position: relative;

      .dropdown-toggle {
         position: relative;
         z-index: 15;
      }

      .dropdown-menu {
			position: absolute;
			border:1px solid rgba(0, 0, 0, 0.175);;
			border-radius: 5px;
         padding: 46px 0px 10px;
         top: -12px;
         left: -30px;
         z-index: 5;
      }

      
   }

   .header__info {
      display: flex;
      align-items: center;

      .phone {
         display: flex;
         align-items: center;
         margin-right: 30px;
         font-weight: 500;
         font-size: 18px;
         line-height: 21px;
         color: #000000;
         text-decoration: none;
			@media(max-width:1080px){
				margin-right: 20px;
			}
      }

      .user {
         margin-right: 30px;
			@media(max-width:1080px){
				margin-right: 20px;
			}
      }
		.avatar{
			width: 30px;
			height: 30px;
			border-radius: 50%;
			background-color: $main-color;
			color: white;
			text-transform: uppercase;
			text-align: center;
			line-height: 30px;
			margin-right: 30px;
			@media(max-width:1080px){
				margin-right: 20px;
			}
			cursor: pointer;
		}
   }
}


</style>