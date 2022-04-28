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
    component: () => import('../components/new-post.vue'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../components/edit-profil.vue')
  },
  {
    path: '/updatePost/:id',
    name: 'updatePost',
    component: () => import('../components/update-post.vue')
  },
  {
    path: '/',
    name: 'commentPost',
    component: () => import('../components/new-comment.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
