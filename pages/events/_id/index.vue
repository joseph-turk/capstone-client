<template>
  <div>
    <event-hero
      :image-id="event.imageId ? event.imageId : ''"
      :image-extension="event.imageExtension ? event.imageExtension : ''"
      :title-text="event ? event.name : ''"
    />

    <b-container>
      <b-row class="py-4">
        <b-col
          cols="12"
          class="mb-5"
        >
          <div class="d-flex justify-content-between align-items-center">
            <back-button
              to="/events"
              text="Back to All Events"
            />

            <div>
              <b-btn
                v-if="event.isMyEvent"
                :to="`/events/${event.id}/edit`"
                :disabled="loading"
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
                :disabled="loading"
                variant="primary"
              >
                <font-awesome-icon
                  icon="check"
                  class="mr-1"
                />
                Register
              </b-btn>
            </div>
          </div>
        </b-col>

        <b-col md="8">
          <div v-if="loading === false">
            <div
              class="mr-4 event-description"
              v-html="event.description"
            />
          </div>

          <loading-icon v-else />
        </b-col>

        <b-col md="4">
          <event-details
            :event="event"
            :registration-count="event.registrationCount ? event.registrationCount : 0"
            :loading="loading"
          />
        </b-col>
      </b-row>

      <hr class="mt-4">

      <b-row
        v-if="event.isMyEvent"
        class="py-4"
      >
        <b-col>
          <h2>Registrations</h2>

          <registration-list-table :registrations="event.registrations" />
        </b-col>
      </b-row>
    </b-container>

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
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'
import EventHero from '~/components/events/EventHero.vue'
import EventDetails from '~/components/events/EventDetails.vue'
import RegisterModal from '~/components/registrations/RegisterModal.vue'
import RegistrationListTable from '~/components/registrations/RegistrationListTable.vue'
import BackButton from '~/components/BackButton.vue'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: {
    EventHero,
    EventDetails,
    RegisterModal,
    RegistrationListTable,
    BackButton,
    LoadingIcon
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
      isMyEvent: false,
      loading: true
    }
  },

  computed: {
    eventDate () {
      return moment
        .utc(this.event.start)
        .local()
        .format('MMMM Do, YYYY')
    },

    eventStart () {
      return moment
        .utc(this.event.start)
        .local()
        .format('h:mm A')
    },

    eventEnd () {
      return moment
        .utc(this.event.end)
        .local()
        .format('h:mm A')
    }
  },

  created () {
    this.fetchEvent(true)
  },

  methods: {
    async fetchEvent (setLoading) {
      if (setLoading) this.loading = true
      const eventId = this.$route.params.id
      let headers = null

      if (this.$store.state.auth) {
        headers = {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`
        }
      }

      const event = await axios.get(`/api/events/${eventId}`, {
        headers: headers
      })
      this.event = event.data
      if (setLoading) this.loading = false
    },

    deleteEvent () {
      axios
        .delete(`/api/events/${this.event.id}`)
        .then(() => this.$router.push('/events'))
    }
  }
}
</script>

<style scoped>
.event-description {
  font-size: 1.5em;
}
</style>
