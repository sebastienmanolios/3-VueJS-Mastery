// There are alternate ways of modularising our store
// This one allows us to have private variables & methods

// rootState is used in the context object in order to have access to other modules's state
// createEvent({ commit, rootState }, event) .... & rootState.user.user.name

// We can call other modules actions just like components
// createEvent({ commit, dispatch, rootState }, event) .... & rootState.user.user.name
// & dispatch('actionToCall')
// It is possible because our actions are on the name global space $store


import EventService from '@/services/EventService.js'
//--------------------------------------------
export const namespaced = true
//--------------------------------------------


export const state = {
  events: [], 
  event: {}
}

export const mutations = {
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
}

export const actions = {
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
}

export const getters = {
  getEventById : state => id => {
    return state.events.find(event => event.id === id)
  }
}