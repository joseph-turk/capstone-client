<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">Edit {{ name }}</h1>

        <b-form
          v-if="!loading"
          @submit.prevent="submit"
        >
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
            <text-editor
              v-model="description"
              :value="description"
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
            <time-picker
              ref="startTime"
              :default-time="startTime"
            />
          </b-form-group>

          <b-form-group
            label="End Time"
            label-for="eventEndTime"
          >
            <time-picker
              ref="endTime"
              :default-time="endTime"
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

          <b-form-group label="Current Image">
            <b-img
              v-if="imageId"
              :src="`http://localhost:5000/uploads/${imageId}/thumbnail${imageExtension}`"
            />
          </b-form-group>

          <b-form-group
            label="Update Image"
            label-for="updatedImage"
          >
            <b-form-file
              id="updatedImage"
              v-model="image"
              placeholder="Choose a new image..."
              accept="image/*"
            />
          </b-form-group>

          <div class="mt-5">
            <b-btn
              type="submit"
              variant="primary"
            >
              <font-awesome-icon
                icon="check"
                class="mr-1"
              />
              Save
            </b-btn>

            <b-btn
              :to="`/events/${eventId}`"
              variant="secondary"
            >
              <font-awesome-icon
                icon="times"
                class="mr-1"
              />
              Cancel
            </b-btn>

            <b-btn
              v-b-modal.confirmDelete
              variant="danger"
            >
              <font-awesome-icon
                icon="ban"
                class="mr-1"
              />
              Delete
            </b-btn>
          </div>
        </b-form>

        <loading-icon v-else />
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
import axios from '~/plugins/axios'
import moment from 'moment'
import TextEditor from '~/components/TextEditor.vue'
import TimePicker from '~/components/TimePicker.vue'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  middleware: 'authenticated',

  components: {
    TextEditor,
    TimePicker,
    LoadingIcon
  },

  data () {
    return {
      eventId: '',
      name: '',
      description: '',
      date: null,
      startTime: null,
      endTime: null,
      capacity: null,
      imageId: null,
      imageExtension: null,
      image: null,
      loading: true
    }
  },

  computed: {
    startTimePicked () {
      return this.$refs.startTime ? this.$refs.startTime.calculatedTime : null
    },

    endTimePicked () {
      return this.$refs.endTime ? this.$refs.endTime.calculatedTime : null
    },

    eventStart () {
      return new Date(`${this.date} ${this.startTimePicked}`)
    },

    eventEnd () {
      return new Date(`${this.date} ${this.endTimePicked}`)
    }
  },

  created () {
    this.fetchEvent()
  },

  methods: {
    submit () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('start', this.eventStart.toUTCString())
      formData.append('end', this.eventEnd.toUTCString())
      formData.append('capacity', this.capacity)
      if (this.image) formData.append('image', this.image)

      axios
        .put(`/api/events/${this.eventId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(() => {
          this.$router.push(`/events/${this.eventId}`)
        })
    },

    async fetchEvent () {
      const eventId = this.$route.params.id
      const event = await axios.get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`
        }
      })
      this.eventId = event.data.id
      this.name = event.data.name
      this.description = event.data.description
      this.date = moment
        .utc(event.data.start)
        .local()
        .format('YYYY-MM-DD')
      this.startTime = moment
        .utc(event.data.start)
        .local()
        .format('HH:mm')
      this.endTime = moment
        .utc(event.data.end)
        .local()
        .format('HH:mm')
      this.capacity = event.data.capacity
      this.imageId = event.data.imageId
      this.imageExtension = event.data.imageExtension
      this.loading = false
    },

    deleteEvent () {
      axios
        .delete(`/api/events/${this.eventId}`)
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
