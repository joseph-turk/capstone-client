<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mb-0">Events {{ today }}</h1>

          <div>
            <b-form-radio-group
              id="filterButtons"
              v-model="selectedFilter"
              :options="eventFilters"
              buttons
              button-variant="secondary"
            />

            <b-button
              to="/events/create"
              variant="primary"
            >
              <font-awesome-icon
                icon="plus"
                class="mr-2"
              />
              Create New Event
            </b-button>
          </div>
        </div>

        <div v-if="loading === false">
          <event-preview
            v-for="event in sortedEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <loading-icon v-else />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import EventPreview from '~/components/events/EventPreview.vue'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: {
    EventPreview,
    LoadingIcon
  },

  data () {
    return {
      events: [],
      loading: false,
      selectedFilter: 'allEvents',
      eventFilters: [
        { text: 'All', value: 'allEvents' },
        { text: 'Upcoming', value: 'upcomingEvents' },
        { text: 'Past', value: 'pastEvents' }
      ]
    }
  },

  computed: {
    today () {
      return moment.utc().format() // this.sortedEvents && moment.utc(this.sortedEvents[0].start).format()
    },

    sortedEvents () {
      let sortedEventsArray = this.selectedEvents
      return sortedEventsArray.sort((a, b) => {
        return new Date(a.start) - new Date(b.start)
      })
    },

    selectedEvents () {
      let selectedEventsArray = this.events
      switch (this.selectedFilter) {
        case 'allEvents':
          return selectedEventsArray
        case 'upcomingEvents':
          return selectedEventsArray.filter(e => moment.utc(e.start).format() > moment.utc().format())
        case 'pastEvents':
          return selectedEventsArray.filter(e => moment.utc(e.start).format() < moment.utc().format())
        default:
          return selectedEventsArray
      }
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
