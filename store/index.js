import Vuex from 'vuex'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      user: null
    },

    mutations: {
      setAuth (state, auth) {
        state.auth = auth
      },

      setUser (state, user) {
        state.user = user
      }
    },

    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let auth = null
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
            user = JSON.parse(parsed.user)
          } catch (err) {
            console.log(err)
          }
        }
        commit('setAuth', auth)
        commit('setUser', user)
      }
    }
  })
}

export default createStore
