import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './home/Home.vue'

const routes = [
  { path: '/', component: Home },
]

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

// eslint-disable-next-line
new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
