export const navbarModule = {
   state: () => ({
      showDropdown: false,
      showNavbar: null,
      mobile: false,
      showModal: false,
      signUp: false,
      signIn: true,
      forgotPassword: false,
      addReviews: false,
      bookTable: false,
   }),
   mutations: {
      toggleModal(state, showModal) {
         state.showModal = showModal;
      },

      toggleSignUp(state) {
         state.signIn = false;
         state.signUp = true;
         state.forgotPassword = false;
         state.addReviews = false;
      },
      toggleSignIn(state) {
         state.signIn = true;
         state.signUp = false;
         state.forgotPassword = false;
         state.addReviews = false;
         state.bookTable = false;
      },
      toggleForgotPassword(state) {
         state.signIn = false;
         state.signUp = false;
         state.forgotPassword = true;
         state.addReviews = false;
      },
      toggleAddReviews(state) {
         state.signIn = false;
         state.signUp = false;
         state.forgotPassword = false;
         state.addReviews = true;
         state.bookTable = false;
      },
      toggleBookTable(state) {
         state.signIn = false;
         state.signUp = false;
         state.forgotPassword = false;
         state.addReviews = false;
         state.bookTable = true;
      },
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
