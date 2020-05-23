import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false } // 添加额外的自定义数据
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requiresAuth: false } // 添加额外的自定义数据
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requiresAuth: false } // 添加额外的自定义数据
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requiresAuth: false } // 添加额外的自定义数据
      }
    ]
  },
  {
    path: '/search',
    name: 'searchIndex',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article/'),
    props: true,
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/user/chat',
    name: 'UserChat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true } // 添加额外的自定义数据
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    // 如果已登录，则直接通过
    if (store.state.user) {
      return next()
    }

    // 没有登录，提示是否登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { // 确认执行这里
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { // 取消执行这里
      // 取消了，中断路由导航
      next(false)
    })
  } else {
    /// 不需要登录状态的页面，直接过去
    next()
  }
})
export default router
