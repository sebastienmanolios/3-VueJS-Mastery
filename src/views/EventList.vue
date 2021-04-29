<template>
  <div class="events">
      <EventCard 
        v-for="event in events" :key=event.id
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
    this.$store.dispatch('fetchEvents')
  },
  computed: {
    ...mapState(['events'])
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
