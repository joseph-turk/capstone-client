<template>
  <section class="bg-secondary text-light">
    <b-container>
      <h2 class="h1 mb-5">Register for Events</h2>

      <b-row class="py-5">
        <home-feature
          icon="binoculars"
          title="Find Events"
          content="Browse events by date or search for them by name"
        />

        <home-feature
          icon="check"
          title="Reserve Your Spot"
          content="Register to attend and receive email confirmation"
        />

        <home-feature
          icon="ban"
          title="No Account Needed"
          content="Just provide your information when registering"
        />
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HomeFeature from '~/components/home/HomeFeature.vue'

export default {
  components: {
    HomeFeature
  }
}
</script>

<style scoped>
section {
  padding: 4rem 0;
}
</style>
