<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1>Reports</h1>

        <h2>All Registrants</h2>
        <b-table
          v-if="loading === false"
          :items="registrants"
          striped
          hover
        />

        <loading-icon v-else />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
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
      const registrants = await axios.get(`https://localhost:5001/api/registrants`)
      this.registrants = registrants.data.map(registrant => {
        return {
          'Name': registrant.name,
          '# Registrations': registrant.registrations.length
        }
      })
      this.loading = false
    }
  }
}
</script>
