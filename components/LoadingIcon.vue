<template>
  <div
    :class="`text-${textAlignment}`"
    class="m-5"
  >
    <font-awesome-icon
      icon="spinner"
      pulse
      size="3x"
    />
  </div>
</template>

<script>
export default {
  props: {
    textAlignment: {
      type: String,
      required: false,
      default: 'left'
    }
  }
}
</script>
