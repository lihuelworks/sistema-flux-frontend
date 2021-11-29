import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Inmuebles from '../views/Inmuebles.vue'
import Artefactos from '../views/Artefactos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Inmuebles',
    name: 'Inmuebles',
    component: Inmuebles
  }, {
    path: '/Artefactos',
    name: 'Artefactos',
    component: Artefactos
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
