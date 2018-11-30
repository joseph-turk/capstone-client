<template>
  <b-card
    no-body
    header-bg-variant="secondary"
    header-text-variant="light"
    header="<h4 class='mb-0'>Event Details</h4>"
  >
    <b-list-group flush>
      <b-list-group-item>
        <strong>Date:</strong> {{ loading === false ? eventDate : '' }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Start:</strong> {{ loading === false ? eventStart : '' }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>End:</strong> {{ loading === false ? eventEnd : '' }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Capacity:</strong> {{ loading === false ? event.capacity : '' }}
      </b-list-group-item>
      <b-list-group-item>
        <strong>Registrations:</strong> {{ loading === false ? event.registrations.length : '' }}
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
    },
    loading: {
      type: Boolean,
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
