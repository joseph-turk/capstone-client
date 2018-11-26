<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1>Log In</h1>

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
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import axios from 'axios'
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
      this.$store.commit('setAuth', { accessToken: 'fakeToken' })
      Cookie.set('auth', { accessToken: 'fakeToken' })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
