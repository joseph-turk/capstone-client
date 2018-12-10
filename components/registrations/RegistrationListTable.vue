<template>
  <b-table
    :items="registrations"
    :fields="fields"
    bordered
  >
    <template
      slot="edit"
      slot-scope="data"
    >
      <b-btn :to="`/registrations/${data.value}/edit`">
        <font-awesome-icon icon="pencil-alt" />
      </b-btn>
    </template>
  </b-table>
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
        },
        {
          key: 'edit',
          label: '',
          formatter: (val, key, item) => item.id
        }
      ]
    }
  },

  methods: {
    editRegistration (e) {
      console.log('show')
      this.$emit('editregistration')
    }
  }
}
</script>
