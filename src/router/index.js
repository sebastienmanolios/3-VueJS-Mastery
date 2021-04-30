import Vue from 'vue'
import Router from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventDetails from '../views/EventDetails.vue'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'EventCreate',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'EventDetails',
      props: true,
      component: EventDetails
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
  

export default router
