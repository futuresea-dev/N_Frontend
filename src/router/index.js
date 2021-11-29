import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Active from '../views/Active.vue'
import About from '../views/About.vue'
import Charity from '../views/Charity.vue'
import Serie from '../views/Serie.vue'
import NotFound from '../components/NotFound.vue'
import Mint from '../views/Mint.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Active
  },
  {
    path: '/active/',
    name: 'Active',
    component: Home,
    beforeEnter: (to, from, next) => {
      next('/')
    }
  },
  {
    path: '/about-us/',
    name: 'About',
    component: About
  },
  {
    path: '/charity/',
    name: 'Charity',
    component: Charity
  },
  {
    path: '/serie/:slug/',
    name: 'Serie',
    component: Serie
  },
  {
    path: '/admin/mint',
    name: 'Mint',
    component: Mint,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn || sessionStorage.getItem('login') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('login') === 'true') {
    store.dispatch('setLoginTrue')
  }

  next()
})

export default router
