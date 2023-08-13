export const modalModule = {
   state: () => ({
      showModal: false,
      signUp: false,
      signIn: true,
      forgotPassword: false,
   }),
   mutations: {
      toggleModal(state, showModal) {
         state.showModal = showModal;
         state.signIn = true;
         state.signUp = false;
         state.forgotPassword = false;
      },
      toggleSignUp(state) {
         state.signIn = false;
         state.signUp = true;
         state.forgotPassword = false;
      },
      toggleSignIn(state) {
         state.signIn = true;
         state.signUp = false;
         state.forgotPassword = false;
      },
      toggleForgotPassword(state) {
         state.signIn = false;
         state.signUp = false;
         state.forgotPassword = true;
      },
   },
   namespaced: true,
};
