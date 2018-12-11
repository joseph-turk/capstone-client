<template>
  <b-table
    :items="users"
    :fields="fields"
    striped
    bordered
  >
    <template
      slot="id"
      slot-scope="data"
    >
      <b-btn :to="`/users/${data.value}/edit`">
        <font-awesome-icon
          icon="pencil-alt"
          class="mr-1"
        />
        Edit
      </b-btn>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      fields: [
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'isAdmin',
          label: 'Admin?'
        },
        {
          key: 'id',
          label: '',
          formatter: (key, val, item) => item.id
        }
      ]
    }
  }
}
</script>
