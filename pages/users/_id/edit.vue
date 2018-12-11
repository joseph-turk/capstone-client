<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">
          Edit User
          <small v-if="user"><br>{{ user.email }}</small>
        </h1>

        <b-form
          v-if="!loading && !hasError"
          @submit.prevent="submit"
        >

          <b-form-group>
            <b-form-checkbox v-model="user.isAdmin">
              Is Admin?
            </b-form-checkbox>
          </b-form-group>

          <div class="mt-5">
            <b-btn
              type="submit"
              variant="primary"
            >
              <font-awesome-icon
                icon="check"
                class="mr-1"
              />
              Save
            </b-btn>

            <b-btn
              to="/users"
              variant="secondary"
            >
              <font-awesome-icon
                icon="times"
                class="mr-1"
              />
              Cancel
            </b-btn>
          </div>
        </b-form>

        <loading-icon v-if="loading" />

        <b-alert
          :show="hasError"
          variant="danger"
        >
          {{ errorText }}
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  middleware: 'authenticated',

  components: {
    LoadingIcon
  },

  data () {
    return {
      user: null,
      loading: true,
      hasError: false,
      errorText: 'Something went wrong'
    }
  },

  created () {
    this.fetchUser()
  },

  methods: {
    fetchUser () {
      const userId = this.$route.params.id

      axios
        .get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(response => {
          this.user = response.data
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.hasError = true
        })
    },

    submit () {
      axios
        .put(
          `/api/users/${this.user.id}`,
          {
            id: this.user.id,
            email: this.user.email,
            isAdmin: this.user.isAdmin
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.accessToken}`
            }
          }
        )
        .then(response => {
          this.$router.push('/users')
        })
        .catch(err => {
          console.log(err)
          this.hasError = true
        })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
