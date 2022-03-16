import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/user-signup.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/user-login.vue'),
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../components/user-profil.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/user-home.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
