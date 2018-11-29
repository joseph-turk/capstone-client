<template>
  <b-container fluid>
    <b-row class="py-4">
      <b-col>
        <all-registrants-report class="h-100" />
      </b-col>

      <b-col>
        <all-events-report class="h-100" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AllRegistrantsReport from '~/components/reports/AllRegistrantsReport.vue'
import AllEventsReport from '~/components/reports/AllEventsReport.vue'

export default {
  components: {
    AllRegistrantsReport,
    AllEventsReport
  }
}
</script>
