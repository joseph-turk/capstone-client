<template>
  <div>
    <event-hero
      v-if="loading === false"
      :image-url="event.imageUrl"
      :title-text="event.name"
    />

    <b-container>
      <b-row
        v-if="loading === false"
        class="py-4"
      >
        <b-col
          cols="12"
          class="mb-5"
        >
          <div class="text-right">
            <b-btn
              :to="`/events/${event.id}/edit`"
              exact
              variant="secondary"
            >
              <font-awesome-icon
                icon="pencil-alt"
                class="mr-1"
              />
              Edit
            </b-btn>

            <b-btn
              v-b-modal.registerModal
              variant="primary"
            >
              <font-awesome-icon
                icon="check"
                class="mr-1"
              />
              Register
            </b-btn>
          </div>
        </b-col>

        <b-col md="8">
          <div>
            <div v-html="event.description" />
          </div>
        </b-col>

        <b-col md="4">
          <event-details :event="event" />
        </b-col>

        <b-col cols="12">
          <div class="mt-5">
            <back-button
              to="/events"
              text="Back to All Events"
            />
          </div>
        </b-col>
      </b-row>

      <div
        v-else
        class="text-center py-4"
      >
        <font-awesome-icon
          icon="spinner"
          pulse
          size="3x"
        />
      </div>

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
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import EventHero from '~/components/events/EventHero.vue'
import EventDetails from '~/components/events/EventDetails.vue'
import RegisterModal from '~/components/registrations/RegisterModal.vue'
import BackButton from '~/components/BackButton.vue'

export default {
  components: {
    EventHero,
    EventDetails,
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
