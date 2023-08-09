<template>
	<header class="header">
         <div class="container">
            <nav class="navbar navbar-expand-lg">
               <div class="container-fluid">
                  <div class="logo-wrapper">
                     <a class="navbar-brand" @click="$router.push('/')"
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
                        <li class="nav-item dropdown">
                           <a
                              class="nav-link dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              <img src="@/assets/images/nav-item-1.svg" alt="" /> Меню
                           </a>
									<dropdown-menu/>
                        </li>
                        <li class="nav-item">
                           <router-link class="nav-link" :to="{name:'delivery'}">
										<img
                                 src="@/assets/images/nav-item-2.svg"
                                 alt=""
                              />
										Доставка
									</router-link>
                        </li>
                        <li class="nav-item">
                           <router-link class="nav-link" href="#" :to="{name:'payment'}">
										<img
                                 src="@/assets/images/nav-item-3.svg"
                                 alt=""
										/>
										Оплата
									</router-link>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="#"
                              ><img
                                 src="@/assets/images/nav-item-4.svg"
                                 alt=""
                              />Вакансии</a
                           >
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
                           <a class="nav-link" href="#">
                              <img src="@/assets/images/nav-item-5.svg" alt="" />
                              Поддержка</a
                           >
                        </li>
                     </ul>
                  </div>
                  <div class="header__info">
                     <a class="phone" href="tel:+998903385677">
                        <img src="@/assets/images/nav-phone.svg" alt="" />
                        <span>+998 (90) 338-56-77</span>
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
	export default{
		name:'navbar-header'
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