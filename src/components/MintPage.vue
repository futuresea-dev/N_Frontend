<template>
    <div id="nft-container">
        <div id="nft-img-container">
            <img :src="imageURL"/>
            <div>
                <form id="uploadForm" enctype="multipart/form-data" v-on:change="uploadFile">
                    <input type="file" id="file" name="file">
                </form>
            </div>
        </div>
        <div id="nft-data-container">
            <div class="nft-mint-item-container">
                <label for="">Collection Name: </label>
                <input type="text" v-model="collection_name"/>
            </div>
            <div class="nft-mint-item-container">
                <label for="">Title: </label>
                <input type="text" v-model="title"/>
            </div>
            <div class="nft-mint-item-container">
                <label for="">Description: </label>
                <textarea type="text" v-model="description"/>
            </div>
            <div class="nft-mint-item-container">
                <button v-on:click="mintNFT">MINT ARTWORK</button>
            </div>
            <vue-metamask
              userMessage="msg"
              @onComplete="onComplete"
            >
            </vue-metamask>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'
import Web3 from 'web3'
import ArtToken from '../abi/ArtToken.json'
import ArtMarketplace from '../abi/ArtMarketplace.json'
import VueMetamask from 'vue-metamask'

export default {
  components: {
    VueMetamask
  },
  created () {
    console.log(this.$store.isLoggedIn)
  },

  data () {
    return {
      imageURL: require('../assets/images/upload_img.png'),
      title: '',
      description: '',
      collection_name: '',
      msg: 'This is metamask'
    }
  },
  methods: {
    onComplete (data) {
      console.log('data:', data)
    },
    uploadFile: function (event) {
      const data = new FormData()
      const file = event.target.files[0]
      data.append('file', file)
      const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
      const pinataApiKey = '3f738e77f36cc4c97692'
      const pinataSecretApiKey = 'ab2b6d8fcb491410d2198258d6fb5ab93b553453d14359e169f5a5642b936a2b'
      const pinataBaseURL = 'https://ipfs.io/ipfs/'
      const that = this
      axios.post(url, data, { maxBodyLength: 'Infinity', headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}`, pinata_api_key: pinataApiKey, pinata_secret_api_key: pinataSecretApiKey } })
        .then(function (response) {
          console.log(response)
          that.imageURL = pinataBaseURL + response.data.IpfsHash
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async mintNFT () {
      if (this.collection_name.length < 1) {
        alert('Input the collection name.')
      } else if (this.title.length < 1) {
        alert('Input the title.')
      } else if (this.description.length < 1) {
        alert('Input the description.')
      } else if (this.imageURL.indexOf('ipfs') === -1) {
        alert('Upload the image.')
      } else {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const PUBLIC_KEY = accounts[0]
        console.log(PUBLIC_KEY)
        const contractAddr = '0x6a969c35a995e0d2e0abac487ef6be50816937a9'
        const marketContractAddr = '0x91d0aba75572c46ccb7864a7dfaf741fafbb3a53'
        const web3 = new Web3(window.ethereum)
        const nftContract = new web3.eth.Contract(ArtToken, contractAddr)
        const marketContract = new web3.eth.Contract(ArtMarketplace, marketContractAddr)
        nftContract.setProvider(window.ethereum)
        marketContract.setProvider(window.ethereum)
        const amount = '0.1'
        const amountToBuy = web3.utils.toWei(amount, 'ether')
        // console.log(amountToBuy)
        // const tx = await marketContract.methods.buyItem(0).send({ from: PUBLIC_KEY, value: amountToBuy })
        // console.log(tx)
        const tx = await nftContract.methods.mint(this.imageURL).send({ from: PUBLIC_KEY })
        console.log(tx.events.Transfer.returnValues.tokenId)
        const mintedTokenId = tx.events.Transfer.returnValues.tokenId
        if (tx.status) {
          console.log('Successfully minted')
        } else {
          alert('Error')
        }
        // const tmp = await nftContract.methods.setMarketplace(marketContractAddr).send({ from: PUBLIC_KEY })
        // console.log(tmp)
        const receipt = await nftContract.methods.approve(marketContractAddr, mintedTokenId).send({ from: PUBLIC_KEY })
        console.log(receipt.events.Approval.returnValues.tokenId)
        const approvedTokenId = receipt.events.Approval.returnValues.tokenId
        const txApprove = await marketContract.methods.putItemForSale(approvedTokenId, amountToBuy).send({ from: PUBLIC_KEY })
        const buyId = txApprove.events.itemAddedForSale.returnValues.id
        console.log(buyId)
        const that = this
        axios.post('http://127.0.0.1:8000/serie/add/', { collection_id: this.collection_name, title: this.title, description: this.description, image: this.imageURL, status: 'ACTIVE', token_id: buyId }, { headers: { 'Content-Type': 'application/json' } })
          .then(function (response) {
            console.log(response)
            that.collection_name = ''
            that.title = ''
            that.description = ''
            that.imageURL = require('../assets/images/upload_img.png')
            alert('Successfully Minted')
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped src='../assets/styles/mint_page.css'></style>
