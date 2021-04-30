import Vue from 'vue'
import Router from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventDetails from '../views/EventDetails.vue'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../views/NetworkIssue.vue'


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
      component: EventDetails,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'NetworkIssue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/NetworkIssue',
      name: 'NetworkIssue',
      component: NetworkIssue
    },
    // Will catch all navigation that doesnot match
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
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
