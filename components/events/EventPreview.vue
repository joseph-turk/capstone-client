<template>
  <nuxt-link :to="`/events/${event.id}`">
    <b-card
      :bg-variant="hover ? 'light' : ''"
      class="my-3"
      @mouseover="hover = true"
      @mouseout="hover = false"
    >
      <div class="d-flex">
        <b-img
          :blank="!imageSrc"
          :src="imageSrc"
          blank-color="#C4C4C4"
          width="150"
          height="150"
          alt="placeholder"
          class="mr-4"
        />

        <div class="d-flex flex-column justify-content-between align-items-start">
          <div class="mb-3">
            <h4 class="card-title">
              {{ event.name }}
              <span
                v-if="slotsAvailable === 0"
                class="text-danger"
              >
                (Wait List)
              </span>
            </h4>
            <h5 class="subtitle">{{ eventStart }}</h5>
          </div>
        </div>
      </div>
    </b-card>
  </nuxt-link>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      hover: false
    }
  },

  computed: {
    slotsFilled () {
      return this.event.registrations.filter(r => r.isWaitList === false).length
    },

    slotsAvailable () {
      return this.event.capacity > this.slotsFilled
        ? this.event.capacity - this.slotsFilled
        : 0
    },

    eventStart () {
      return moment
        .utc(this.event.start)
        .local()
        .format('MMMM Do, YYYY (h:mm A)')
    },

    imageSrc () {
      return this.event
        ? `https://localhost:5001/uploads/${this.event.imageId}/thumbnail${
          this.event.imageExtension
        }`
        : null
    }
  },

  methods: {
    updateCardBackground () {}
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.card {
  transition: background-color 0.1s ease-in-out;
}
</style>
