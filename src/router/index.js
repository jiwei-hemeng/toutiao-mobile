import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      }
    ]
  },
  {
    path: '/search',
    name: 'searchIndex',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article/'),
    props: true
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/chat',
    name: 'UserChat',
    component: () => import('@/views/user-chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
