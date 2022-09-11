import { createStore } from 'vuex';

export default createStore({
  namespaced: true,
  state: {
    loginDialog: false,
    AUTH: '',
    ID: '',
    EMAIL: '',
    AVATAR: '',
    USERNAME: '',
    TOKEN: '',
  },
  getters: {
  },
  mutations: {
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
    setAVATAR: (state, avatar) => {
      state.AVATAR = avatar;
    },
    getAVATAR: (state) => state.AVATAR,
    setUSERNAME: (state, username) => {
      state.USERNAME = username;
    },
    getUSESRNAME: (state) => state.USERNAME,
    setTOKEN: (state, token) => {
      state.TOKEN = token;
    },
    getTOKEN: (state) => state.TOKEN,

  },
  actions: {
  },
  modules: {
  },
});
