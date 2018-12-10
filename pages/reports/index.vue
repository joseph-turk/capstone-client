<template>
  <b-container fluid>
    <b-row class="py-4">
      <b-col>
        <events-this-week-report />
      </b-col>
    </b-row>

    <b-row class="py-4">
      <b-col>
        <all-events-report class="h-100" />
      </b-col>
    </b-row>

    <b-row class="pb-4">
      <b-col>
        <all-registrants-report class="h-100" />
      </b-col>

      <b-col>
        <all-primary-contacts-report class="h-100" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AllRegistrantsReport from '~/components/reports/AllRegistrantsReport.vue'
import AllEventsReport from '~/components/reports/AllEventsReport.vue'
import AllPrimaryContactsReport from '~/components/reports/AllPrimaryContactsReport.vue'
import EventsThisWeekReport from '~/components/reports/EventsThisWeekReport.vue'

export default {
  components: {
    AllRegistrantsReport,
    AllEventsReport,
    AllPrimaryContactsReport,
    EventsThisWeekReport
  }
}
</script>
