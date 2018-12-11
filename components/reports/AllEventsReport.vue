<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center card-title">
      <h4 class="mb-0">{{ events ? `All Events (${events.length})` : `All Events` }}</h4>

      <b-btn to="/reports/custom">
        <font-awesome-icon
          icon="star"
          class="mr-1"
        />
        Create Custom Report
      </b-btn>
    </div>

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
import axios from '~/plugins/axios'
import moment from 'moment'
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
      const events = await axios.get('/api/events/foruser', {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`
        }
      })
      this.events = events.data.map(event => {
        return {
          Name: event.name,
          Date: moment(event.start).format('MM/DD/YYYY'),
          Capacity: event.capacity,
          '# Registrations': event.registrationCount,
          'Slots Available':
            event.capacity - event.registrationCount < 0
              ? 0
              : event.capacity - event.registrationCount
        }
      })
      this.loading = false
    }
  }
}
</script>
