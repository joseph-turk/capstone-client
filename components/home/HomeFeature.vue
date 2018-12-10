<template>
  <b-col
    md
    class="text-center p-4"
  >
    <font-awesome-icon
      :icon="icon"
      size="5x"
      class="mb-3"
    />
    <h3 class="mb-4">{{ title }}</h3>

    <p class="card-text">{{ content }}</p>
  </b-col>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
p {
  font-size: 1.3em;
  max-width: 80%;
  margin: auto;
}
</style>
