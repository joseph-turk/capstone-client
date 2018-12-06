<template>
  <b-modal
    id="changePasswordModal"
    title="Change Password"
    ok-title="Update Password"
    @ok="submit"
  >
    <b-form @submit.prevent="submit">
      <b-form-group
        label="Current Password"
        label-for="oldPassword"
      >
        <b-form-input
          id="oldPassword"
          v-model="oldPassword"
          type="password"
          required
        />
      </b-form-group>

      <b-form-group
        label="New Password"
        label-for="newPassword"
      >
        <b-form-input
          id="newPassword"
          v-model="newPassword"
          type="password"
          required
        />
      </b-form-group>

      <b-form-group
        label="New Password (Confirm)"
        label-for="newPasswordConfirmation"
      >
        <b-form-input
          id="newPasswordConfirmation"
          v-model="newPasswordConfirmation"
          type="password"
          required
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    }
  },

  methods: {
    submit (e) {
      axios
        .put(
          `/api/users/${this.user.id}`,
          {
            id: this.user.id,
            email: this.user.email,
            password: this.oldPassword,
            newPassword: this.newPassword
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.accessToken}`
            }
          }
        )
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
          e.preventDefault()
        })
    }
  }
}
</script>
