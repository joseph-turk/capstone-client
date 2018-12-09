<template>
  <b-modal
    id="registerModal"
    ref="modal"
    :title="`Register for ${event.name}`"
    ok-title="Register"
    size="lg"
    @ok="submit"
  >
    <b-form @submit.prevent="submit">
      <b-row>
        <b-col>
          <h5>Primary Contact</h5>

          <b-form-group
            label="Name"
            label-for="primaryContactName"
          >
            <b-form-input
              id="primaryContactName"
              v-model="primaryContact.name"
              type="text"
              required
            />
          </b-form-group>

          <b-form-group
            label="Email Address"
            label-for="primaryContactEmail"
          >
            <b-form-input
              id="primaryContactEmail"
              v-model="primaryContact.emailAddress"
              type="email"
              required
            />
          </b-form-group>

          <b-form-group
            label="Phone Number"
            label-for="primaryContactPhone"
          >
            <b-form-input
              id="primaryContactPhone"
              v-model="primaryContact.phoneNumber"
              type="text"
            />
          </b-form-group>
        </b-col>

        <b-col>
          <h5>Registrants</h5>

          <div
            v-for="(registrant, index) in registrants"
            :key="index"
          >
            <b-form-group
              :label-for="`name${index}`"
              label="Name"
            >
              <div class="d-flex align-items-center">
                <b-form-input
                  :id="`name${index}`"
                  v-model="registrants[index].name"
                  type="text"
                  class="mr-2"
                  required
                />

                <b-btn
                  :disabled="index === 0 && registrants.length === 1"
                  type="button"
                  size="sm"
                  @click="removeRegistrant(index)"
                >
                  <font-awesome-icon
                    icon="times"
                    size="xs"
                    class="mr-1"
                  />
                  Remove
                </b-btn>
              </div>
            </b-form-group>

            <b-form-group>
              <label slot="label">
                Consent to Photo Release?
                <font-awesome-icon
                  v-b-popover.click="'By selecting Yes, you consent to allow photos to be taken of this registrant during the event and potentially shared on social media or in marketing materials.'"
                  icon="info-circle"
                  class="ml-2"
                />
              </label>
              <b-form-radio-group
                :id="`photoConsent${index}`"
                v-model="registrants[index].photoConsent"
              >
                <b-form-radio value="1">Yes</b-form-radio>
                <b-form-radio value="0">No</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </div>

          <b-btn
            :disabled="blockAdd"
            type="button"
            size="sm"
            @click="addRegistrant"
          >
            <font-awesome-icon
              icon="plus"
              size="xs"
              class="mr-1"
            />
            Add Another Guest
          </b-btn>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    event: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: '',
          name: '',
          description: '',
          start: null,
          end: null
        }
      }
    }
  },

  data () {
    return {
      registrants: [
        {
          name: '',
          photoConsent: 0
        }
      ],
      primaryContact: {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      }
    }
  },

  computed: {
    blockAdd () {
      return this.registrants[this.registrants.length - 1].name === ''
    }
  },

  methods: {
    submit (e) {
      axios
        .post('https://localhost:5001/api/registrations', {
          event: this.event,
          primaryContact: this.primaryContact,
          registrants: this.registrants.map(registrant => {
            return {
              name: registrant.name,
              photoRelease: registrant.photoConsent === '1'
            }
          })
        })
        .then(response => {
          if (response.status === 201) {
            this.$emit('registered')
          } else {
            e.preventDefault()
          }
        })
        .catch(err => {
          console.log(`err: ${err}`)
          e.preventDefault()
        })
    },

    addRegistrant () {
      this.registrants.push({
        name: '',
        photoConsent: 0
      })
    },

    removeRegistrant (index) {
      this.registrants.splice(index, 1)
    }
  }
}
</script>
