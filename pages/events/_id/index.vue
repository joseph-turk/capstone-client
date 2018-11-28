<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <div v-if="loading === false">
          <h1 class="mb-4">{{ event.name }}</h1>

          <p>{{ event.description }}</p>

          <ul>
            <li><strong>Date:</strong> {{ eventDate }}</li>
            <li><strong>Start:</strong> {{ eventStart }}</li>
            <li><strong>End:</strong> {{ eventEnd }}</li>
            <li><strong>Capacity:</strong> {{ event.capacity }}</li>
            <li>
              <strong>Registrations:</strong> {{ event.registrations.length }}
              <ul>
                <li
                  v-for="registration in event.registrations"
                  :key="registration.id"
                >
                  {{ registration.registrant.name }}
                </li>
              </ul>
            </li>
          </ul>

          <div class="mt-5">
            <b-btn
              v-b-modal.registerModal
              variant="primary"
            >
              Register
            </b-btn>

            <b-btn
              :to="`/events/${event.id}/edit`"
              exact
              variant="secondary"
            >
              Edit
            </b-btn>

            <back-button
              to="/events"
              text="Back to All Events"
            />
          </div>
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

    <b-modal
      id="confirmDelete"
      title="Are you sure?"
      ok-variant="danger"
      ok-title="Delete"
      @ok="deleteEvent"
    >
      <p class="my-2">This will permanently delete this event.</p>
    </b-modal>

    <register-modal
      :event="event"
      @registered="fetchEvent(false)"
    />
  </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import RegisterModal from '~/components/registrations/RegisterModal.vue'
import BackButton from '~/components/BackButton.vue'

export default {
  components: {
    RegisterModal,
    BackButton
  },

  data () {
    return {
      event: {
        id: null,
        name: '',
        description: '',
        start: null,
        end: null,
        capacity: null
      },
      loading: true
    }
  },

  computed: {
    eventDate () {
      return moment.utc(this.event.start).local().format('MMMM Do, YYYY')
    },

    eventStart () {
      return moment.utc(this.event.start).local().format('h:mm A')
    },

    eventEnd () {
      return moment.utc(this.event.end).local().format('h:mm A')
    }
  },

  created () {
    this.fetchEvent(true)
  },

  methods: {
    async fetchEvent (setLoading) {
      if (setLoading) this.loading = true
      const eventId = this.$route.params.id
      const event = await axios.get(
        `https://localhost:5001/api/events/${eventId}`
      )
      this.event = event.data
      if (setLoading) this.loading = false
    },

    deleteEvent () {
      axios
        .delete(`https://localhost:5001/api/events/${this.event.id}`)
        .then(() => this.$router.push('/events'))
    }
  }
}
</script>
