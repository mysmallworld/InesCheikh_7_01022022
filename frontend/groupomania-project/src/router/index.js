import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/user-signup.vue'),
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/user-login.vue'),
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/user-profil.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/user-home.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/new-post.vue'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/user-edit-profil.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
