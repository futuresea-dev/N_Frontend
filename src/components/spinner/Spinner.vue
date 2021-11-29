<template>
<div class='spinner-bg' v-if="show">
    <div class="lds-roller">
        <img class='spinner-img' src='../../assets/images/logo-small.png'>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  mounted () {
    this.spinner()
  },
  methods: {
    spinner () {
      setTimeout(() => {
        this.show = false
      }, 1500)
    }
  }
}
</script>

<style scoped src='../../assets/styles/spinner.css'></style>
