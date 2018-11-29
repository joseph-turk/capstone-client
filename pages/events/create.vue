<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">Create New Event</h1>

        <b-form @submit.prevent="submit">
          <b-form-group
            label="Event Name"
            label-for="eventName"
          >
            <b-form-input
              id="eventName"
              v-model="name"
              type="text"
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

          <b-form-group
            label="Event Image"
            label-for="eventImage"
          >
            <b-form-file
              id="eventImage"
              v-model="image"
              placeholder="Choose an image..."
            />
          </b-form-group>

          <div class="mt-5">
            <b-button
              type="submit"
              variant="primary"
            >
              Submit
            </b-button>

            <b-button
              to="/events"
              variant="secondary"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  middleware: 'authenticated',

  data () {
    return {
      name: '',
      description: '',
      date: null,
      startTime: null,
      endTime: null,
      capacity: null,
      image: null
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

  methods: {
    submit () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('start', this.eventStart.toUTCString())
      formData.append('end', this.eventEnd.toUTCString())
      formData.append('capacity', this.capacity)
      formData.append('image', this.image)

      axios
        .post('https://localhost:5001/api/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => { this.$router.push('/events') })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
