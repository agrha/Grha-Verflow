import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Overflow from '@/components/Overflow'
import Question from '@/components/Question'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/overflow',
      meta: { auth: true },
      name: 'overflow',
      component: Overflow
    },
    {
      path: '/detail/:id',
      meta: { auth: true },
      name: 'Detail',
      component: Question,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
