import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/home/Home.vue'
import Welcome from './views/home/Welcome.vue'
import Userlist from './views/user/Userlist.vue'
import Power from './views/power/Power.vue'
import Role from './views/power/Role.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      redirect: '/welcome',
      component: Home,
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Userlist },
        { path: '/rights', component: Power },
        { path: '/roles', component: Role }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router