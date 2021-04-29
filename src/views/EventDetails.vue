<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <h5>{{ event.time }} on {{ event.date }} @ {{ event.location }}</h5>
    <h5>{{ event.description }}</h5>
    <h5>Organized by {{ event.organizer ? event.organizer.name : '' }} </h5>
    <h5>Category: {{ event.category }}</h5>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['id'],
  created() {
    this.$store.dispatch('event/fetchEvent', this.id)
  },
  // In doing modules we don't have to change event to event.event everywhere, we just have
  // to redefine the mapState as an object
  computed : mapState({
    event : state => state.event.event
  })
}
</script>