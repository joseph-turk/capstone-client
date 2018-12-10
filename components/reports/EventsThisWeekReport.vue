<template>
  <b-card title="Events This Week">
    <div class="card-text">
      <b-table
        v-if="loading === false"
        :items="events"
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

      <loading-icon v-else />
    </div>
  </b-card>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'
import LoadingIcon from '~/components/LoadingIcon.vue'

export default {
  components: { LoadingIcon },

  data () {
    return {
      events: [],
      fields: [
        {
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
              .format('dddd')
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
        {
          key: 'capacity',
          label: 'Capacity'
        },
        {
          key: 'registrationCount',
          label: '# Registrations'
        },
        {
          key: 'waitListCount',
          label: '# Wait List'
        },
        {
          key: 'spotsOpen',
          label: '# Spots Open',
          formatter: (val, key, item) => {
            return item.registrationCount >= item.capacity
              ? 0
              : item.capacity - item.registrationCount
          }
        }
      ],
      loading: true
    }
  },

  created () {
    this.fetchEvents()
  },

  methods: {
    fetchEvents () {
      axios
        .get('/api/events/foruser', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.accessToken}`
          }
        })
        .then(response => {
          this.events = response.data
            .filter(event => {
              return (
                moment.utc(event.start).isAfter(moment().startOf('week')) &&
                moment.utc(event.start).isBefore(moment().endOf('week'))
              )
            })
            .sort((a, b) => moment(a.start) - moment(b.start))
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
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
</style>
