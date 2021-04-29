<template>
  <div class="events">
    <!-- the first user is the module name, the second one is the state inside -->
    <h1>Events for {{ user.user.name }}</h1>
      <EventCard 
        v-for="event in event.events" :key=event.id
        :event="event"
      />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents')
  },
  computed: {
    // the mapState is now referering the module name event
    ...mapState(['event', 'user'])
  }
}
</script>

<style lang="scss" scoped>
  .events {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
  }
</style>
