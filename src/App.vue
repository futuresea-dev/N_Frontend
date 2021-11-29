<template>
  <div>
    <Menu></Menu>
      <Spinner :key="$route.path"/>
      <router-view :key="$route.path"/>
      <widget-container-modal />
  </div>
</template>

<script>
import { container } from 'jenesius-vue-modal'
import Menu from '@/components/nav/Menu.vue'
import Spinner from '@/components/spinner/Spinner.vue'
import './assets/styles/global.css'

export default {
  components: {
    Menu,
    Spinner,
    WidgetContainerModal: container
  }
}
</script>

<style scoped>

</style>
