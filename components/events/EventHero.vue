<template>
  <div
    :style="{
      'background-color': '#343a40',
      'background-image': imageId ? `url(${process.env.apiUrl}/uploads/${imageId}/hero${imageExtension})` : '',
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
        'background': 'linear-gradient(0deg, #343a40 0%, rgba(0,0,0,0) 100%)',
        'padding-top': '2rem'
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
    imageId: {
      type: String,
      required: true
    },
    imageExtension: {
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
