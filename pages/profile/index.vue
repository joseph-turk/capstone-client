<template>
  <b-container>
    <b-row class="py-4">
      <b-col>

        <h1>Profile</h1>

        <b-card class="mb-5">
          <h3
            slot="header"
            class="mb-0"
          >
            My Info
          </h3>
          <ul v-if="user">
            <li><strong>Email:</strong> {{ user.email }}</li>
            <li>
              <strong>Password:</strong> ************
              <b-btn
                v-b-modal.changePasswordModal
                size="sm"
                class="ml-3"
              >
                Change
              </b-btn>
            </li>
          </ul>
        </b-card>

        <h2>My Events</h2>

        <event-list-table :events="user ? user.events : []" />
      </b-col>
    </b-row>

    <change-password-modal :user="user" />
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import ChangePasswordModal from '~/components/users/ChangePasswordModal.vue'
import EventListTable from '~/components/events/EventListTable.vue'

export default {
  components: {
    ChangePasswordModal,
    EventListTable
  },

  data () {
    return {
      user: null
    }
  },

  created () {
    this.fetchUser()
  },

  methods: {
    async fetchUser () {
      const userId = this.$store.state.user.id
      const user = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`
        }
      })
      this.user = user.data
    },

    showPasswordModal () {
      alert('test')
    }
  }
}
</script>
