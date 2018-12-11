<template>
  <b-container>
    <b-row class="py-4">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <back-button
            to="/reports"
            text="Back to Standard Reports"
          />

          <div>
            <b-btn
              :disabled="loading"
              variant="primary"
              @click="fetchEvents"
            >
              <font-awesome-icon
                icon="sync"
                class="mr-1"
              />
              Refresh Data
            </b-btn>

            <b-btn
              ref="toggleButton"
              @click="toggleSelection"
            >
              Filters
              <font-awesome-icon
                :icon="showSelection ? 'caret-up' : 'caret-down'"
                class="ml-1"
              />
            </b-btn>
          </div>
        </div>

        <b-collapse
          id="selectEvents"
          v-model="showSelection"
          class="my-3"
        >
          <b-card
            bg-variant="dark"
            text-variant="light"
          >
            <b-form @submit.prevent="applyFilters">
              <b-form-row>
                <b-col>
                  <h5>Date</h5>

                  <b-form-row>
                    <b-col>
                      <b-form-group label="Events on or After">
                        <b-form-input
                          v-model="dateAfter"
                          type="date"
                        />
                      </b-form-group>
                    </b-col>

                    <b-col>
                      <b-form-group label="Events on or Before">
                        <b-form-input
                          v-model="dateBefore"
                          type="date"
                        />
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                </b-col>
              </b-form-row>

              <b-form-row>
                <b-col>
                  <h5>Status</h5>

                  <b-form-group>
                    <b-form-radio-group
                      v-model="selectedStatus"
                      :options="statusFilters"
                      buttons
                    />
                  </b-form-group>
                </b-col>
              </b-form-row>

              <b-form-row>
                <b-col>
                  <h5>Search</h5>

                  <div class="d-flex justify-content-start align-items-center">
                    <b-form-input
                      v-model="searchString"
                      class="mr-2"
                    />
                    <b-btn @click="searchString = null">
                      <font-awesome-icon
                        icon="times"
                        class="mr-1"
                      />
                      Clear
                    </b-btn>
                  </div>
                </b-col>
              </b-form-row>

              <div class="mt-3">
                <b-btn
                  variant="primary"
                  @click="applyFilters"
                >
                  <font-awesome-icon
                    icon="check"
                    class="mr-1"
                  />
                  Apply
                </b-btn>

                <b-btn @click="resetFilters">
                  <font-awesome-icon
                    icon="times"
                    class="mr-1"
                  />
                  Reset
                </b-btn>
              </div>
            </b-form>
          </b-card>
        </b-collapse>

        <b-card
          v-if="loading || events"
          no-body
          class="mt-3"
        >
          <b-card-header
            class="d-flex justify-content-between align-items-center"
            header-bg-variant="dark"
            header-text-variant="light"
          >
            <h4 class="mb-0">Custom Events Report</h4>

            <div
              v-if="generated"
              class="d-flex justify-content-end align-items-center"
            >
              <div><strong>Generated:</strong> {{ generated }}</div>

              <b-btn
                ref="toggleColumnsButton"
                class="ml-3"
                @click="toggleColumns"
              >
                Columns
                <font-awesome-icon
                  :icon="showColumns ? 'caret-up' : 'caret-down'"
                  class="ml-1"
                />
              </b-btn>
            </div>
          </b-card-header>

          <b-collapse
            id="selectColumns"
            v-model="showColumns"
          >
            <b-card-body
              body-bg-variant="secondary"
              body-text-variant="light"
            >
              <div>
                <b-row>
                  <b-col>
                    <b-form-group class="mb-0">
                      <b-form-checkbox v-model="includeStatus">
                        Status
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <b-col>
                    <b-form-group class="mb-0">
                      <b-form-checkbox v-model="includeCapacity">
                        Capacity
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <b-col>
                    <b-form-group class="mb-0">
                      <b-form-checkbox v-model="includeRegistrations">
                        # Registrations
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <b-col>
                    <b-form-group class="mb-0">
                      <b-form-checkbox v-model="includeWaitList">
                        # Wait List
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>

                  <b-col>
                    <b-form-group class="mb-0">
                      <b-form-checkbox v-model="includeSpotsOpen">
                        # Spots Open
                      </b-form-checkbox>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-card-body>
          </b-collapse>

          <b-table
            v-if="eventReport"
            :items="eventReport"
            :fields="fields"
            striped
            bordered
            class="mb-0"
          >
            <template
              slot="status"
              slot-scope="data"
            >
              <div
                v-b-popover.hover="data.value.status === 'success' ? 'Spots Open' : 'No Spots Open'"
                :class="`bg-${data.value.status}`"
                class="status"
              />
            </template>

            <template
              slot="name"
              slot-scope="data"
            >
              <nuxt-link :to="`/events/${data.value.id}`">
                {{ data.value.name }}
              </nuxt-link>
            </template>
          </b-table>

          <loading-icon
            v-else
            text-alignment="center"
          />

          <b-card-footer
            v-if="events && eventReport"
            footer-bg-variant="secondary"
            footer-text-variant="light"
          >
            Showing {{ eventReport.length }} of {{ events.length }} events
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'
import BackButton from '~/components/BackButton.vue'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: {
    BackButton,
    LoadingIcon
  },

  data () {
    return {
      loading: false,
      showSelection: false,
      showColumns: false,
      generated: null,
      events: null,
      includeStatus: false,
      includeCapacity: true,
      includeRegistrations: true,
      includeWaitList: true,
      includeSpotsOpen: false,
      dateBefore: null,
      dateAfter: null,
      eventReport: null,
      selectedStatus: 'all',
      statusFilters: [
        { text: 'All', value: 'all' },
        { text: 'Spots Open', value: 'spotsOpen' },
        { text: 'Wait List', value: 'waitList' }
      ],
      searchString: null
    }
  },

  computed: {
    fields () {
      return [
        this.includeStatus && {
          key: 'status',
          label: '',
          formatter: (val, key, item) => {
            return {
              status:
                item.registrationCount >= item.capacity ? 'danger' : 'success'
            }
          }
        },
        {
          key: 'name',
          label: 'Name',
          formatter: (val, key, item) => {
            return {
              id: item.id,
              name: item.name
            }
          }
        },
        {
          key: 'day',
          label: 'Day',
          formatter: (val, key, item) =>
            moment
              .utc(item.start)
              .local()
              .format('MM/DD/YYYY')
        },
        {
          key: 'time',
          label: 'Time',
          formatter: (val, key, item) => {
            return `${moment
              .utc(item.start)
              .local()
              .format('hh:mm A')} - ${moment
              .utc(item.end)
              .local()
              .format('hh:mm A')}`
          }
        },
        this.includeCapacity && {
          key: 'capacity',
          label: 'Capacity'
        },
        this.includeRegistrations && {
          key: 'registrationCount',
          label: '# Registrations'
        },
        this.includeWaitList && {
          key: 'waitListCount',
          label: '# Wait List'
        },
        this.includeSpotsOpen && {
          key: 'spotsOpen',
          label: '# Spots Open',
          formatter: (val, key, item) => {
            return item.registrationCount >= item.capacity
              ? 0
              : item.capacity - item.registrationCount
          }
        }
      ]
    }
  },

  created () {
    this.fetchEvents()
  },

  methods: {
    fetchEvents () {
      this.generated = null
      this.loading = true
      this.events = null
      this.eventReport = null

      axios
        .get('/api/events/foruser', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(response => {
          this.events = response.data
          this.sortEvents()
          this.eventReport = this.events
          this.generated = moment().format('MM/DD/YYYY h:mm A')
          this.applyFilters()
          this.loading = false
        })
        .catch(err => console.log(err))
    },

    toggleSelection () {
      this.showSelection = !this.showSelection
      this.$refs.toggleButton.blur()
    },

    toggleColumns () {
      this.showColumns = !this.showColumns
      this.$refs.toggleColumnsButton.blur()
    },

    applyFilters () {
      let filteredEvents = this.events

      // Filter by date
      if (this.dateAfter) {
        filteredEvents = filteredEvents.filter(event => {
          return moment(event.start).isSameOrAfter(moment(this.dateAfter))
        })
      }

      if (this.dateBefore) {
        filteredEvents = filteredEvents.filter(event => {
          return moment(event.start).isSameOrBefore(moment(this.dateBefore))
        })
      }

      // Filter by status
      if (this.selectedStatus === 'spotsOpen') {
        filteredEvents = filteredEvents.filter(event => {
          return event.registrationCount < event.capacity
        })
      }

      if (this.selectedStatus === 'waitList') {
        filteredEvents = filteredEvents.filter(event => {
          return event.registrationCount >= event.capacity
        })
      }

      // Filter by search string
      if (this.searchString && this.searchString.length > 0) {
        filteredEvents = filteredEvents.filter(event => {
          const eventName = event.name.toLowerCase()
          const eventDescription = event.description.toLowerCase()
          const searchTerm = this.searchString.toLowerCase()

          return (
            eventName.includes(searchTerm) ||
            eventDescription.includes(searchTerm)
          )
        })
      }

      this.eventReport = filteredEvents
    },

    sortEvents () {
      this.events.sort((a, b) => {
        return new Date(a.start) - new Date(b.start)
      })
    },

    resetFilters () {
      this.dateAfter = null
      this.dateBefore = null
      this.selectedStatus = 'all'
      this.searchString = null
      this.applyFilters()
    }
  }
}
</script>

<style scoped>
.status {
  width: 1em;
  height: 1em;
  border-radius: 100%;
}

input[type="text"] {
  width: auto;
}
</style>
