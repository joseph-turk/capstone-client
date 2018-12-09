<template>
  <b-table
    :items="events"
    :fields="fields"
    class="mb-0"
  >
    <template
      slot="name"
      slot-scope="data"
    >
      <nuxt-link :to="`/events/${data.value.id}`">{{ data.value.name }}</nuxt-link>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
          formatter: (val, key, item) => {
            return { name: item.name, id: item.id }
          }
        },
        {
          key: 'capacity',
          label: 'Capacity'
        },
        {
          key: 'registrations',
          label: '# Registrations',
          formatter: (val, key, item) => item.registrations.length
        },
        {
          key: 'date',
          label: 'Date',
          formatter: (val, key, item) =>
            moment(item.start).format('MMMM Do, YYYY')
        }
      ]
    }
  },

  computed: {
    formattedEvents () {
      return this.events.map(event => {
        return {
          id: event.id,
          name: event.name,
          capacity: event.capacity,
          registrations: event.registrations.length,
          date: moment(event.start).format('MMMM Do, YYYY')
        }
      })
    }
  }
}
</script>
