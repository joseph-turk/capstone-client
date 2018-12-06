<template>
  <b-card
    title="All Registrants"
  >
    <div class="card-text">
      <b-table
        v-if="loading === false"
        :items="registrants"
        striped
        bordered
        class="mb-0"
      />

      <loading-icon v-else />
    </div>
  </b-card>
</template>

<script>
import axios from '~/plugins/axios'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: {
    LoadingIcon
  },

  data () {
    return {
      registrants: [],
      loading: true
    }
  },

  created () {
    this.fetchRegistrants()
  },

  methods: {
    async fetchRegistrants () {
      const registrants = await axios.get(`/api/registrants`)
      this.registrants = registrants.data.map(registrant => {
        return {
          Name: registrant.name,
          '# Registrations': registrant.registrations.length
        }
      })
      this.loading = false
    }
  }
}
</script>
