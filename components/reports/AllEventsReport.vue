<template>
  <b-card title="All Events">
    <div class="card-text">
      <b-table
        v-if="loading === false"
        :items="events"
        striped
        bordered
        class="mb-0"
      />

      <loading-icon v-else />
    </div>
  </b-card>
</template>

<script>
import axios from 'axios'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: { LoadingIcon },

  data () {
    return {
      events: [],
      loading: true
    }
  },

  created () {
    this.fetchEvents()
  },

  methods: {
    async fetchEvents () {
      const events = await axios.get('https://localhost:5001/api/events')
      this.events = events.data.map(event => {
        return {
          'Name': event.name,
          '# Registrations': event.registrations.length
        }
      })
      this.loading = false
    }
  }
}
</script>
