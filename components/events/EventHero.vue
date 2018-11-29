<template>
  <div
    :style="{
      'background-color': '#343a40',
      'background-image': `url(https://localhost:5001/uploads/${imageUrl})`,
      'background-size': 'cover',
      'background-position': 'center',
      'height': '500px',
      'max-height': '60vh',
      'width': '100%'
    }"
    class="position-relative"
  >
    <div
      :style="{
        'position': 'absolute',
        'bottom': '0',
        'width': '100%',
        'background': 'linear-gradient(0deg, #343a40 0%, rgba(255,255,255,0) 100%)'
      }"
    >
      <b-container>
        <h1
          class="display-4 text-light"
          style="text-shadow: 0 0 8px rgba(0, 0, 0, 0.5)"
        >
          {{ titleText }}
        </h1>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    titleText: {
      type: String,
      required: true
    }
  }
}
</script>
