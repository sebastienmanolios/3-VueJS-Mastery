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
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>