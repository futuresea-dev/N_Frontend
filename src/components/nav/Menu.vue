<template>
<div class='menu-navbar'>
  <div class="top-menu-container">
    <div class="topnav"><router-link :to='{ name: "Home" }'><img src='../../assets/images/logo-small.png' class="logo-img"></router-link></div>
    <div class="test-menu">
      <span id="topnav" class="dropdown">Collections
        <span class='active' >
          <router-link :to='{ name: "Active" }'>Active</router-link>
            <li v-for='title in series' :key='title.collection_id' :slug="title.collection_id"><router-link :to="{ name: 'Serie', params: { slug: title.collection_id } }">{{title.collection_id}}</router-link></li>
        </span>
      </span>

      <div id="topnav"><router-link :to='{ name: "About" }'>About us</router-link></div>
      <div id="topnav"><router-link :to='{ name: "Charity" }'>Charity</router-link></div>
      <div id="topnav" v-if="isLoggedIn"><router-link :to='{ name: "Mint" }'>Mint</router-link></div>
    </div>
  </div>
  <div id='topnav-actions'>
    <span class='social-media'>
      <a :href='sm[0].web' target="blank">
        <img :src="sm[0].img" alt="" class='sm-pics'></a>
      <a :href="sm[1].web" target="blank">
        <img :src="sm[1].img" alt="" class="sm-pics"></a>
      <a :href="sm[2].web" target="blank">
        <img :src="sm[2].img" alt="" class="sm-pics"></a>
      <a v-on:click="loginAdmin" v-if="!isLoggedIn" target="blank">
        <img :src="sm[3].img" alt="" class="sm-pics"></a>
      <a v-on:click="logOutAdmin" v-if="isLoggedIn" target="blank">
        <img :src="sm[4].img" alt="" class="sm-pics"></a>
      <a target="blank" v-on:click="connectMetamask">
        <img :src="sm[5].img" alt="" class="sm-pics">
      </a>
    </span>
  </div>
  <hr>
    <vue-metamask
      userMessage="msg"
      @onComplete="onComplete"
      v-if="metamaskConnected"
    >
    </vue-metamask>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'
import axios from 'axios'
import { openModal } from 'jenesius-vue-modal'
import WidgeTestModal from '../modal/Modal.vue'
import VueMetamask from 'vue-metamask'

export default {
  components: {
    VueMetamask
  },
  setup () {
    const series = ref([])

    const load = () => axios.get('http://127.0.0.1:8000/serie/get_collections/')
      .then(response => {
        series.value = response.data
      })
      .catch(error => {
        console.log(error)
      })
    load()
    return { series }
  },
  computed: {
    ...mapGetters({
      sm: 'sm',
      isLoggedIn: 'isLoggedIn',
      metamaskConnected: 'metamaskConnected'
    })
  },
  data () {
    return {
      isModalVisible: false,
      msg: 'This is metamask'
    }
  },
  methods: {
    loginAdmin () {
      openModal(WidgeTestModal, {
      })
    },
    logOutAdmin () {
      this.$store.dispatch('setLoginFalse')
      this.$router.go('/home')
      sessionStorage.setItem('login', 'false')
    },
    connectMetamask () {
      console.log('metamask')
      this.$store.dispatch('connectMetamask')
    }
  }
}
</script>

<style scoped src="../../assets/styles/menu.css"></style>
