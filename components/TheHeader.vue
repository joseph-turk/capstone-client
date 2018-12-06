<template>
  <header>
    <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
      fixed="top"
    >
      <b-navbar-brand to="/">Capstone Events</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse" />

      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/events">Events</b-nav-item>
          <b-nav-item
            v-if="$store.state.auth"
            to="/reports"
          >
            Reports
          </b-nav-item>
          <b-nav-item-dropdown
            v-if="$store.state.auth && $store.state.user"
            :text="$store.state.user.email"
            right
          >
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            v-else
            to="/login"
          >
            Log In
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
const Cookie = process.browser ? require('js-cookie') : undefined

export default {
  methods: {
    logOut () {
      Cookie.remove('auth')
      Cookie.remove('user')
      this.$store.commit('setAuth', null)
      this.$store.commit('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>
