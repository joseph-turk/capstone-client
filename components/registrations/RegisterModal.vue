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

          <b-form-group
            v-for="(registrant, index) in registrants"
            :key="index"
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
          name: ''
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
          registrants: this.registrants
        })
        .then(response => {
          this.$emit('registered')
        })
        .catch(err => {
          console.log(`err: ${err}`)
          e.preventDefault()
        })
    },

    addRegistrant () {
      this.registrants.push({
        name: ''
      })
    },

    removeRegistrant (index) {
      this.registrants.splice(index, 1)
    }
  }
}
</script>
