<template>
  <b-table
    :items="registrations"
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
          key: 'registrant',
          label: 'Registrant',
          formatter: (val, key, item) => item.registrant.name
        },
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
          key: 'photoRelease',
          label: 'Photo Release',
          formatter: (val, key, item) => (item.hasPhotoRelease ? 'Yes' : 'No')
        }
      ]
    }
  }
}
</script>
