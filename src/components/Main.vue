<template>
  <div>
      <div class="mainpage-tokens">
        <div class='token-container'  v-for='token in randomTokens' :key=token.id>
              <img :src='token.image'>
            <span class='token-undertitle'>
              <span class='title'>{{token.title}}</span>
              <span class='undertitle'>s{{token.collection_id}}|#{{token.description}}</span>
            </span>
        </div>
      </div>
      <vue-metamask
        userMessage="msg"
        @onComplete="onComplete"
        v-if="metamaskConnected"
      >
      </vue-metamask>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import Web3 from 'web3'
import ArtMarketplace from '../abi/ArtMarketplace.json'
import VueMetamask from 'vue-metamask'
import { mapGetters } from 'vuex'

export default {
  components: {
    VueMetamask
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
      imageURL: '',
      title: '',
      description: '',
      collection_name: '',
      msg: 'This is metamask'
    }
  },
  setup () {
    const randomTokens = ref([])
    const error = ref('')

    const load = () => axios.get('http://127.0.0.1:8000/serie/random/')
      .then(response => {
        console.log(response)
        randomTokens.value = []
        randomTokens.value.push(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    load()
    return { randomTokens, error }
  },
  methods: {
    onComplete (data) {
      console.log('data:', data)
    },
    async buyNFT () {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const PUBLIC_KEY = accounts[0]
      const marketContractAddr = '0x91d0aba75572c46ccb7864a7dfaf741fafbb3a53'
      const web3 = new Web3(window.ethereum)
      const marketContract = new web3.eth.Contract(ArtMarketplace, marketContractAddr)
      marketContract.setProvider(window.ethereum)
      const amount = '0.1'
      const amountToBuy = web3.utils.toWei(amount, 'ether')
      const tx = await marketContract.methods.buyItem(0).send({ from: PUBLIC_KEY, value: amountToBuy })
      console.log(tx)
      axios.post('http://127.0.0.1:8000/serie/update/', { token_id: this.randomTokens[0].token_id }, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          alert('You purchased NFT successfully.')
          console.log(response)
          this.$router.go('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src='../assets/styles/main-page.css'></style>
