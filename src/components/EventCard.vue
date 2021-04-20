<template>
    <router-link class="event-link" :to="{ name: 'EventDetails', params: { id: event.id } }">
      <div class="event-card">
        <!-- <h1>Events for good</h1> -->
        <span>@ {{ event.time }} on {{ event.date }} </span>
        <p>{{ event.category }}</p>
        <h4>{{ event.title }}</h4>
      </div>
    </router-link>
</template>

<script>
export default {
  name: 'EventCard',
   props: {
     event: Object
   }
  
}
</script>

<style scoped>
  .event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  transition: transform .5s ease-out;
}

  .event-card:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }

  .event-link {
    text-decoration: none;
    color: #2c3e50;
  }

</style>
