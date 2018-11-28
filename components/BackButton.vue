<template>
  <b-btn
    :to="to"
    exact
    variant="secondary"
  >
    <font-awesome-icon
      icon="chevron-left"
      class="mr-2"
    />
    {{ text }}
  </b-btn>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
