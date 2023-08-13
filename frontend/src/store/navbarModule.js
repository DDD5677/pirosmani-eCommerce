export const navbarModule = {
   state: () => ({
      showDropdown: false,
      showNavbar: null,
      mobile: false,
   }),
   mutations: {
      toggleDropdown(state, showDropdown) {
         state.showDropdown = showDropdown;
      },
      showNavbarHandler(state, showNavbar) {
         state.showNavbar = showNavbar;
      },
      toggleMobile(state, mobile) {
         state.mobile = mobile;
      },
   },
   namespaced: true,
};
