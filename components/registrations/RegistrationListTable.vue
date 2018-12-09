<template>
  <b-table
    :items="filteredRegistrations"
    :fields="fields"
    bordered
  />
</template>

<script>
export default {
  props: {
    registrations: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      fields: [
        {
          key: 'primaryContact',
          label: 'Primary Contact',
          formatter: (val, key, item) => item.primaryContact.name
        },
        {
          key: 'email',
          label: 'Contact Email',
          formatter: (val, key, item) => item.primaryContact.emailAddress
        },
        {
          key: 'phone',
          label: 'Contact Phone',
          formatter: (val, key, item) => item.primaryContact.phoneNumber
        },
        {
          key: 'registrant',
          label: 'Registrant',
          formatter: (val, key, item) => item.registrant.name
        },
        {
          key: 'photoRelease',
          label: 'Photo Release',
          formatter: (val, key, item) => (item.hasPhotoRelease ? 'Yes' : 'No')
        }
      ]
    }
  },

  computed: {
    filteredRegistrations () {
      return this.registrations.filter(r => !r.isWaitList)
    }
  }
}
</script>
