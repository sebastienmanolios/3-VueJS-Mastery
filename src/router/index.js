import Vue from 'vue'
import Router from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventDetails from '../views/EventDetails.vue'
import store from '@/store'
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
      component: EventDetails,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
      } 
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
