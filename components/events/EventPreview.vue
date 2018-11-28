<template>
  <b-card class="my-3">
    <div class="d-flex">
      <b-img
        blank
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
          <p class="card-text">{{ event.description }}</p>
          <p class="card-text">{{ slotsAvailable }}/{{ event.capacity }} Slots Available</p>
        </div>

        <b-button
          :to="`/events/${event.id}`"
          variant="primary"
        >
          View Event
        </b-button>
      </div>
    </div>
  </b-card>
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
      return moment.utc(this.event.start).local().format('MM/DD/YYYY (h:mm A)')
    }
  }
}
</script>

<style scoped>
.image-placeholder {
  width: 150px;
  height: 150px;
  margin-right: 2rem;
  background-color: gray;
}
</style>
