import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [], 
    event: {}

  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    // The first argument 'state' is called "context object", its serves to have access to the state in this case
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state,event) {
      state.event = event
    }

  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } 
      else {
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  },
  getters: {
    getEventById : state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
