import { createStore } from 'vuex'

export default createStore({
  state: {
    sm: [
      {
        id: 0,
        web: 'https://twitter.com/dialogboxNFT',
        img: require('../assets/images/twitter.png')
      },
      {
        id: 1,
        web: 'https://www.instagram.com/dialogbox_nft/',
        img: require('../assets/images/insta.png')
      },
      {
        id: 2,
        web: 'https://opensea.io/',
        img: require('../assets/images/opensea.png')
      },
      {
        id: 3,
        web: '',
        img: require('../assets/images/userbw.png')
      },
      {
        id: 4,
        web: '',
        img: require('../assets/images/logout.png')
      },
      {
        id: 5,
        web: '',
        img: require('../assets/images/metamask.png')
      }
    ],
    backendUrl: 'http://127.0.0.1:8000',
    isLoggedIn: false,
    metamaskConnected: false
  },
  getters: {
    sm (state) {
      return state.sm
    },
    backendUrl (state) {
      return state.backendUrl
    },
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    metamaskConnected (state) {
      return state.metamaskConnected
    }
  },
  mutations: {
    setLoginTrue (state) {
      state.isLoggedIn = true
    },
    setLoginFalse (state) {
      state.isLoggedIn = false
    },
    connectMetamask (state) {
      state.metamaskConnected = true
    }
  },
  actions: {
    setLoginTrue (context) {
      context.commit('setLoginTrue')
    },
    setLoginFalse (context) {
      context.commit('setLoginFalse')
    },
    connectMetamask (context) {
      context.commit('connectMetamask')
    }
  },
  modules: {
  }
})
