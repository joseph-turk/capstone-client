<template>
  <section class="bg-info text-light">
    <b-container>
      <h2 class="h1 mb-5">Create and Manage Events</h2>

      <b-row class="py-5">
        <home-feature
          icon="calendar-plus"
          title="Create Events"
          content="Schedule events with dates, times, and descriptions"
        />

        <home-feature
          icon="chart-line"
          title="Track Registrations"
          content="Keep track of registrations with automatic wait-listing"
        />

        <home-feature
          icon="dollar-sign"
          title="All for Free"
          content="Sign up without a credit card"
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
