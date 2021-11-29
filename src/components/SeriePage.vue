<template>
  <div class="all-content">
      <div class="content">
          <div class="texts">
              <p class="serie-title">
                  {{slugPage}}
              </p>
          </div>
          <div class="serie-gallery">
            <div class='token-container' v-for='token in serieDetails' :key='token'>
                <img :src="token.image" alt="">
            <span class='token-undertitle'>
              <span class='title'>{{token.title}}</span>
              <span class='undertitle'>s{{token.collection_id}}|nº{{token.token_id}}|#{{token.description}}</span>
            </span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const serieDetails = ref([])
    const route = useRoute()
    const slugPage = route.params.slug

    const load = () => axios.post('http://127.0.0.1:8000/serie/get_tokens/', { collection_id: slugPage }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log(response.data)
        serieDetails.value = response.data
      })
      .catch(error => {
        console.log(error)
      })
    load()
    return { serieDetails, slugPage }
  }
}
</script>

<style scoped src='../assets/styles/serie_page.css'></style>
