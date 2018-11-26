<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">{{ event.name }}</h1>

        <p>{{ event.description }}</p>

        <ul>
          <li><strong>Date:</strong> {{ eventDate }}</li>
          <li><strong>Start:</strong> {{ eventStart }}</li>
          <li><strong>End:</strong> {{ eventEnd }}</li>
        </ul>

        <div class="mt-5">
          <b-btn
            :to="`/events/${event.id}/edit`"
            exact
            variant="primary"
          >
            Edit
          </b-btn>

          <b-btn
            exact
            to="/events"
            variant="secondary"
          >
            Back to All Events
          </b-btn>
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
  </b-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      event: {
        id: null,
        name: '',
        description: '',
        start: null,
        end: null
      },
      showModal: false
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
    this.fetchEvent()
  },

  methods: {
    async fetchEvent () {
      const eventId = this.$route.params.id
      const event = await axios.get(
        `https://localhost:5001/api/events/${eventId}`
      )
      this.event = event.data
    },

    deleteEvent () {
      axios
        .delete(`https://localhost:5001/api/events/${this.event.id}`)
        .then(() => this.$router.push('/events'))
    }
  }
}
</script>
