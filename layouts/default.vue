<template>
  <div>
    <the-header />

    <div id="main-content">
      <nuxt/>
    </div>

    <the-footer />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: { TheHeader, TheFooter }
}
</script>

<style>
#main-content {
  margin-top: 56px;
  margin-bottom: 32px;
}
</style>
