<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mb-0">Events</h1>

          <div>
            <b-btn
              to="/events/create"
              variant="primary"
            >
              <font-awesome-icon
                icon="plus"
                class="mr-1"
              />
              Create New Event
            </b-btn>

            <b-btn
              ref="refreshButton"
              variant="secondary"
              @click="fetchEvents"
            >
              <font-awesome-icon icon="sync" />
            </b-btn>

            <b-btn
              v-b-toggle.moreFilters
              ref="moreFiltersButton"
              variant="secondary"
              @click="toggleFilters"
            >
              <font-awesome-icon
                :icon="showFilters === true ? 'caret-up' : 'caret-down'"
              />
            </b-btn>
          </div>
        </div>

        <b-collapse
          id="moreFilters"
        >
          <b-card
            bg-variant="dark"
            text-variant="light"
          >
            <b-form
              inline
              @submit.prevent="searchForEvents"
            >
              <b-form-row class="w-100 mb-3">
                <b-form-input
                  v-model="searchString"
                  type="text"
                  placeholder="Search Events"
                  aria-label="Search Events"
                  class="mr-2"
                />
                <b-btn
                  variant="primary"
                  class="mr-2"
                  @click="searchForEvents"
                >
                  <font-awesome-icon
                    icon="search"
                    class="mr-1"
                  />
                  Search
                </b-btn>
                <b-btn
                  variant="secondary"
                  @click="resetSearch"
                >
                  <font-awesome-icon
                    icon="times"
                    class="mr-1"
                  />
                  Reset
                </b-btn>
              </b-form-row>

              <b-form-row class="w-100">
                <b-form-radio-group
                  id="filterButtons"
                  v-model="selectedFilter"
                  :options="eventFilters"
                  buttons
                  button-variant="secondary"
                />
              </b-form-row>
            </b-form>
          </b-card>
        </b-collapse>

        <div v-if="loading === false">
          <div v-if="sortedEvents.length > 0">
            <event-preview
              v-for="event in sortedEvents"
              :key="event.id"
              :event="event"
              :wait-list="event.registrationCount >= event.capacity"
              :registration-count="event.registrationCount"
            />
          </div>

          <div
            v-else
            class="my-3"
          >
            <h3>No events found</h3>
          </div>
        </div>

        <loading-icon v-else />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
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
      searchedEvents: null,
      loading: false,
      selectedFilter: 'upcomingEvents',
      eventFilters: [
        { text: 'Upcoming', value: 'upcomingEvents' },
        { text: 'Past', value: 'pastEvents' },
        { text: 'All', value: 'allEvents' }
      ],
      searchString: '',
      showFilters: false
    }
  },

  computed: {
    sortedEvents () {
      let sortedEventsArray = this.searchedEvents
        ? this.searchedEvents
        : this.selectedEvents
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
          return selectedEventsArray.filter(
            e => moment.utc(e.start).format() > moment.utc().format()
          )
        case 'pastEvents':
          return selectedEventsArray.filter(
            e => moment.utc(e.start).format() < moment.utc().format()
          )
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
      const events = await axios.get('/api/events')
      this.events = events.data
      this.$refs.refreshButton.blur()
      this.loading = false
    },

    toggleFilters () {
      this.showFilters = !this.showFilters
      this.$refs.moreFiltersButton.blur()
    },

    searchForEvents () {
      this.searchedEvents =
        this.searchString.length > 0
          ? this.selectedEvents.filter(e => {
            const eventName = e.name.toLowerCase()
            const eventDescription = e.description.toLowerCase()
            const searchTerm = this.searchString.toLowerCase()

            return (
              eventName.includes(searchTerm) ||
                eventDescription.includes(searchTerm)
            )
          })
          : null
    },

    resetSearch () {
      this.searchString = ''
      this.searchedEvents = null
    }
  }
}
</script>
