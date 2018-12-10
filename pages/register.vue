<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1>Register</h1>

        <b-form @submit.prevent="submit">
          <b-form-group
            label="Email"
            label-for="emailAddress"
          >
            <b-form-input
              id="emailAddress"
              v-model="email"
              type="email"
              required
            />
          </b-form-group>

          <b-form-group
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
            />
          </b-form-group>

          <div class="mb-3">
            <b-button
              type="submit"
              variant="primary"
            >
              Submit
            </b-button>

            <b-button
              to="/"
              variant="secondary"
            >
              Cancel
            </b-button>
          </div>

          <nuxt-link to="/login">Already have an account? Log in.</nuxt-link>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
const Cookie = process.browser ? require('js-cookie') : undefined

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    submit () {
      axios
        .post('/api/users/register', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response)
          this.$store.commit('setAuth', { accessToken: response.data.token })
          this.$store.commit('setUser', {
            email: response.data.email,
            id: response.data.id
          })
          Cookie.set('auth', { accessToken: response.data.token })
          Cookie.set('user', {
            email: response.data.email,
            id: response.data.id
          })
          this.$router.push('/')
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
