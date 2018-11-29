<template>
  <b-card
    no-body
    header-bg-variant="secondary"
    header-text-variant="light"
    header="<h4 class='mb-0'>Event Details</h4>"
  >
    <b-list-group flush>
      <b-list-group-item>
        <strong>Date:</strong> {{ eventDate }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Start:</strong> {{ eventStart }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>End:</strong> {{ eventEnd }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Capacity:</strong> {{ event.capacity }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Registrations:</strong> {{ event.registrations.length }}
      </b-list-group-item>
    </b-list-group>
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
    eventDate () {
      return moment.utc(this.event.start).local().format('MMMM Do, YYYY')
    },

    eventStart () {
      return moment.utc(this.event.start).local().format('h:mm A')
    },

    eventEnd () {
      return moment.utc(this.event.end).local().format('h:mm A')
    }
  }
}
</script>
