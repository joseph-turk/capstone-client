<template>
  <b-container>
    <b-row class="py-4">
      <b-col>

        <h1>Profile</h1>

        <b-card
          no-body
          class="mb-5"
        >
          <h3
            slot="header"
            class="mb-0"
          >
            My Info
          </h3>

          <b-list-group flush>
            <b-list-group-item>
              <span>
                <strong class="mr-2">Email:</strong><span v-if="user">{{ user.email }}</span>
              </span>
            </b-list-group-item>

            <b-list-group-item>
              <span class="d-flex justify-content-start align-items-center">
                <strong class="mr-2">Password:</strong>
                <div class="d-flex justify-content-start align-items-center">
                  <font-awesome-icon
                    v-for="n in 10"
                    :key="n"
                    icon="circle"
                    style="font-size: 8px; margin-right: 2px;"
                  />
                </div>
                <b-btn
                  v-b-modal.changePasswordModal
                  :disabled="!user"
                  size="sm"
                  class="ml-3"
                >
                  Change
                </b-btn>
              </span>
            </b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card no-body>
          <h3
            slot="header"
            class="mb-0"
          >
            My Events
          </h3>

          <event-list-table :events="user ? user.events : []" />
        </b-card>
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
