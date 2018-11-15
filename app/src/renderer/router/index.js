import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Main').default
    },
    {
      path: '/main',
      component: require('@/components/Main').default
    },
    // {
    //   path: '/store',
    //   component: require('@/components/Store').default
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
