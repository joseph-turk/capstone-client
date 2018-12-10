<template>
  <b-modal
    id="confirmDelete"
    title="Are you sure?"
    ok-variant="danger"
    ok-title="Delete"
    @ok="deleteRegistration"
  >
    <p class="my-2">This will permanently delete this registration.</p>
  </b-modal>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: {
    registrationId: {
      type: String,
      required: true
    },
    eventId: {
      type: String,
      required: true
    }
  },

  methods: {
    deleteRegistration () {
      axios
        .delete(`/api/registrations/${this.registrationId}`)
        .then(() => this.$router.push(`/events/${this.eventId}`))
        .catch(err => console.log(err))
    }
  }
}
</script>
