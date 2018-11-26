<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-end mb-4">
          <h1 class="mb-0">All Events</h1>

          <b-button
            to="/events/create"
            variant="secondary"
          >
            <font-awesome-icon
              icon="plus"
              class="mr-2"
            />
            Create New Event
          </b-button>
        </div>

        <div v-if="loading === false">
          <b-card
            v-for="event in events"
            :key="event.id"
            :title="event.name"
            class="my-3"
          >
            <p class="card-text">{{ event.description }}</p>

            <b-button
              :to="`/events/${event.id}`"
              variant="primary"
            >
              View Event
            </b-button>
          </b-card>
        </div>

        <div
          v-else
          class="text-center"
        >
          <font-awesome-icon
            icon="spinner"
            pulse
            size="3x"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      events: [],
      loading: false
    }
  },

  created () {
    this.fetchEvents()
  },

  methods: {
    async fetchEvents () {
      this.loading = true
      const events = await axios.get('https://localhost:5001/api/events')
      this.events = events.data
      this.loading = false
    }
  }
}
</script>
