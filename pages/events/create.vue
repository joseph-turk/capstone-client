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
            <text-editor v-model="description" />
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

          <b-form-group label="Start Time">
            <time-picker ref="startTime" />
          </b-form-group>

          <b-form-group label="End Time">
            <time-picker ref="endTime" />
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
              accept="image/*"
            />
          </b-form-group>

          <div class="mt-5">
            <b-button
              type="submit"
              variant="primary"
            >
              <font-awesome-icon
                icon="check"
                class="mr-1"
              />
              Submit
            </b-button>

            <b-button
              to="/events"
              variant="secondary"
            >
              <font-awesome-icon
                icon="times"
                class="mr-1"
              />
              Cancel
            </b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import TextEditor from '~/components/TextEditor.vue'
import TimePicker from '~/components/TimePicker.vue'

export default {
  middleware: 'authenticated',

  components: {
    TextEditor,
    TimePicker
  },

  data () {
    return {
      name: '',
      description: '',
      date: null,
      capacity: null,
      image: null
    }
  },

  computed: {
    startTime () {
      return this.$refs.startTime ? this.$refs.startTime.calculatedTime : null
    },

    endTime () {
      return this.$refs.endTime ? this.$refs.endTime.calculatedTime : null
    },

    eventStart () {
      return new Date(`${this.date} ${this.startTime}`)
    },

    eventEnd () {
      return new Date(`${this.date} ${this.$refs.endTime.calculatedTime}`)
    }
  },

  methods: {
    submit () {
      let authorization = `Bearer ${this.$store.state.auth.accessToken}`
      console.log(authorization)
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('start', this.eventStart.toUTCString())
      formData.append('end', this.eventEnd.toUTCString())
      formData.append('capacity', this.capacity)
      formData.append('image', this.image)

      axios
        .post('/api/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authorization
          }
        })
        .then(() => this.$router.push('/events'))
    },

    setStartTime (e) {
      console.log(e)
      this.startTime = e
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
