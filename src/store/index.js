import { createStore } from 'vuex';

export default createStore({
  state: {
    loginDialog: false,
  },
  getters: {
    setLoginDialog: (state, setLoginDialogswitch) => {
      state.loginDialog = setLoginDialogswitch;
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
