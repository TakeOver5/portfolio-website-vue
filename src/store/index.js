import { createStore } from 'vuex';

export default createStore({
  namespaced: true,
  state: {
    loginDialog: false,
    AUTH: '',
    ID: '',
    EMAIL: '',
  },
  getters: {
    setAuth: (state, auth) => {
      state.AUTH = auth;
    },
    getAuth: (state) => state.AUTH,
    setID: (state, id) => {
      state.ID = id;
    },
    getID: (state) => state.AUTH,
    setEMAIL: (state, email) => {
      state.EMAIL = email;
    },
    getEMAIL: (state) => state.EMAIL,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
