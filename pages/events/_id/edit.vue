<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">Edit {{ name }}</h1>

        <b-form @submit.prevent="submit">
          <b-form-group
            label="Event Name"
            label-for="eventName"
          >
            <b-form-input
              id="eventName"
              v-model="name"
              required
            />
          </b-form-group>

          <b-form-group
            label="Event Description"
            label-for="eventDescription"
          >
            <b-form-textarea
              id="eventDescription"
              v-model="description"
              :rows="3"
              required
            />
          </b-form-group>

          <b-form-group
            label="Date"
            label-for="eventDate"
          >
            <b-form-input
              id="eventDate"
              v-model="date"
              type="date"
            />
          </b-form-group>

          <b-form-group
            label="Start Time"
            label-for="eventStartTime"
          >
            <b-form-input
              id="eventStartTime"
              v-model="startTime"
              type="time"
            />
          </b-form-group>

          <b-form-group
            label="End Time"
            label-for="eventEndTime"
          >
            <b-form-input
              id="eventEndTime"
              v-model="endTime"
              type="time"
            />
          </b-form-group>

          <b-form-group
            label="Capacity"
            label-for="eventCapacity"
          >
            <b-form-input
              id="eventCapacity"
              v-model="capacity"
              type="number"
            />
          </b-form-group>

          <div class="mt-5">
            <b-btn
              type="submit"
              variant="primary"
            >
              Save
            </b-btn>

            <b-btn
              :to="`/events/${eventId}`"
              variant="secondary"
            >
              Cancel
            </b-btn>

            <b-btn
              v-b-modal.confirmDelete
              variant="danger"
            >
              Delete
            </b-btn>
          </div>
        </b-form>
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
  middleware: 'authenticated',

  data () {
    return {
      eventId: '',
      name: '',
      description: '',
      date: null,
      startTime: null,
      endTime: null,
      capacity: null,
      event: null
    }
  },

  computed: {
    eventStart () {
      return new Date(`${this.date} ${this.startTime}`)
    },

    eventEnd () {
      return new Date(`${this.date} ${this.endTime}`)
    }
  },

  created () {
    this.fetchEvent()
  },

  methods: {
    submit () {
      console.log(`sending PUT request to /api/events/${this.eventId}`)
      axios
        .put(`https://localhost:5001/api/events/${this.eventId}`, {
          name: this.name,
          description: this.description,
          start: this.eventStart,
          end: this.eventEnd,
          capacity: this.capacity
        })
        .then(() => { this.$router.push(`/events/${this.eventId}`) })
    },

    async fetchEvent () {
      const eventId = this.$route.params.id
      const event = await axios.get(
        `https://localhost:5001/api/events/${eventId}`
      )
      this.eventId = event.data.id
      this.name = event.data.name
      this.description = event.data.description
      this.date = moment.utc(event.data.start).local().format('YYYY-MM-DD')
      this.startTime = moment.utc(event.data.start).local().format('HH:mm')
      this.endTime = moment.utc(event.data.end).local().format('HH:mm')
      this.capacity = event.data.capacity
    },

    deleteEvent () {
      axios
        .delete(`https://localhost:5001/api/events/${this.eventId}`)
        .then(() => this.$router.push('/events'))
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
