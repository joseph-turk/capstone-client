<template>
  <div>
    <home-jumbotron />

    <home-intro />

    <about-registrants />

    <about-creators />

    <home-register />
  </div>
</template>

<script>
import HomeJumbotron from '~/components/home/HomeJumbotron.vue'
import HomeIntro from '~/components/home/HomeIntro.vue'
import AboutRegistrants from '~/components/home/AboutRegistrants.vue'
import AboutCreators from '~/components/home/AboutCreators.vue'
import HomeRegister from '~/components/home/HomeRegister.vue'

export default {
  components: {
    HomeJumbotron,
    HomeIntro,
    AboutRegistrants,
    AboutCreators,
    HomeRegister
  },

  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
