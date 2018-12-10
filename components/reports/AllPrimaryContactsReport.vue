<template>
  <b-card
    title="All Primary Contacts"
  >
    <div class="card-text">
      <b-table
        v-if="loading === false"
        :items="primaryContacts"
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
      primaryContacts: [],
      loading: true
    }
  },

  created () {
    this.fetchPrimaryContacts()
  },

  methods: {
    async fetchPrimaryContacts () {
      const primaryContacts = await axios.get(`/api/primarycontacts`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`
        }
      })
      this.primaryContacts = primaryContacts.data.map(contact => {
        return {
          Name: contact.name,
          '# Registrations': contact.registrations.length
        }
      })
      this.loading = false
    }
  }
}
</script>
