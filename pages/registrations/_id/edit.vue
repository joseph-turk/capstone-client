<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <h1 class="mb-4">Edit Registration</h1>

        <b-form
          v-if="registration"
          @submit.prevent="submit"
        >
          <p class="h5 font-weight-normal">
            <strong>Registrant:</strong> {{ registration.registrant.name }}
          </p>

          <b-form-group
            label="Consent to Photo Release?"
            label-for="photoRelease"
          >
            <b-form-radio-group
              id="photoRelease"
              v-model="hasPhotoRelease"
              buttons
            >
              <b-form-radio value="1">Yes</b-form-radio>
              <b-form-radio value="0">No</b-form-radio>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Wait List?"
            label-for="waitList"
          >
            <b-form-radio-group
              id="waitList"
              v-model="isWaitList"
              buttons
            >
              <b-form-radio value="1">Yes</b-form-radio>
              <b-form-radio value="0">No</b-form-radio>
            </b-form-radio-group>
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
              :to="`/events/${registration.event.id}`"
              variant="secondary"
            >
              <font-awesome-icon
                icon="times"
                class="mr-1"
              />
              Cancel
            </b-btn>

            <b-btn
              v-b-modal.confirmDelete
              variant="danger"
            >
              <font-awesome-icon
                icon="ban"
                class="mr-1"
              />
              Delete
            </b-btn>
          </div>
        </b-form>

        <loading-icon v-else />
      </b-col>
    </b-row>

    <registration-delete-modal
      v-if="registration"
      :registration-id="registration.id"
      :event-id="registration.event.id"
    />
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import LoadingIcon from '~/components/LoadingIcon.vue'
import RegistrationDeleteModal from '~/components/registrations/RegistrationDeleteModal.vue'

export default {
  components: {
    LoadingIcon,
    RegistrationDeleteModal
  },

  data () {
    return {
      registration: null,
      hasPhotoRelease: null,
      isWaitList: null
    }
  },

  created () {
    this.fetchRegistration()
  },

  methods: {
    fetchRegistration () {
      const registrationId = this.$route.params.id

      axios
        .get(`/api/registrations/${registrationId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(response => {
          this.registration = response.data
          this.hasPhotoRelease = this.registration.hasPhotoRelease ? '1' : '0'
          this.isWaitList = this.registration.isWaitList ? '1' : '0'
        })
        .catch(err => console.log(err))
    },

    submit () {
      let putRegistration = this.registration
      putRegistration.hasPhotoRelease = this.hasPhotoRelease === '1'
      putRegistration.isWaitList = this.isWaitList === '1'

      axios
        .put(`/api/registrations/${this.registration.id}`, putRegistration, {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(() => this.$router.push(`/events/${this.registration.event.id}`))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
