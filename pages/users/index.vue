<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">Users</h1>

        <user-list-table
          v-if="users"
          :users="users"
        />

        <loading-icon v-else />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import LoadingIcon from '~/components/LoadingIcon.vue'
import UserListTable from '~/components/users/UserListTable.vue'

export default {
  middleware: 'authenticated',

  components: {
    LoadingIcon,
    UserListTable
  },

  data () {
    return {
      users: null,
      fetchSucceeded: null
    }
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    fetchUsers () {
      axios
        .get('/api/users', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(response => {
          this.users = response.data
          this.fetchSucceeded = true
        })
        .catch(err => {
          console.log(err)
          this.fetchSucceeded = false
        })
    }
  }
}
</script>
