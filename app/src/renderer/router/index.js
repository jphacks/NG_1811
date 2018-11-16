import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Terminal').default
    },
    {
      path: '/hint',
      component: require('@/components/Hint').default
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
