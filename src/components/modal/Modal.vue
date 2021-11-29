<template>
  <div id="login-modal-div">
    <form class="login-form" @submit.prevent="onLogin">
      <p id="modal-header-text">Admin Login</p>
      <div class="input-group">
        <label for="username" class="login-form-label">Username</label
        ><input id="username" type="text" v-model.lazy="username" required class="login-form-input"/>
      </div>
      <div class="input-group">
        <label for="password" class="login-form-label">Password</label
        ><input
          id="password"
          type="password"
          v-model.lazy="password"
          required
          class="login-form-input"
        />
      </div>
      <div class="error" v-if="error">Invalid credentials</div>
      <button class="button" type="submit">Login</button>
    </form>
  </div>
</template>
<script>

import axios from 'axios'
import { closeModal } from 'jenesius-vue-modal'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    onLogin () {
      axios.post('http://127.0.0.1:8000/check/', { username: this.username, password: this.password }).then((res) => {
        if (res.data === 'True') {
          this.$store.dispatch('setLoginTrue')
          closeModal()
          alert('Successfully logged in.')
          sessionStorage.setItem('login', 'true')
        } else {
          this.error = 'error'
        }
      }).catch(e => {
        console.log(e)
        this.error = 'error'
      })
    }
  }
}
</script>

<style scoped src="../../assets/styles/modal_page.css"></style>
