import { HTTP } from '@/api/http'
import {requestLogin, requestSignup, requestCurrentUser} from '@/api/auth'

export default {
  namespaced: true,

  state: {
    accessToken: '',
    user: {}
  },

  getters: {
    isAuthenticated: state => !!state.accessToken,
    isUser: state => state.user === {} ? state.user.roles.includes("ROLE_USER") : false,
    isDoctor: state => state.user === {} ? state.user.roles.includes("ROLE_DOCTOR") : false,
    isAdmin: state => state.user === {} ? state.user.roles.includes("ROLE_ADMIN") : false,
    user: state => state.user,

  },

  actions: {

    // eslint-disable-next-line no-unused-vars
    login ({ commit, dispatch, state }, model) {
      return new Promise((resolve, reject) => {
        requestLogin(model)
          .then(response => {
            commit('SET_ACCESS_TOKEN', response.data.token)
            resolve(response)
          }).
           then(() => {
            dispatch('getCurrentUser')
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
      })
    },

    // eslint-disable-next-line no-unused-vars
    logout ({ commit, dispatch, state }) {
      commit('SET_ACCESS_TOKEN', '')
      commit('REMOVE_USER')
    },

    // eslint-disable-next-line no-unused-vars
    signup ({ commit, dispatch, state }, model) {
      return new Promise((resolve, reject) => {
        requestSignup(model)
          .then((response) => {
            const payload = {
              username: model.username,
              password: model.password
            }
            dispatch('login', payload)
            return resolve(response)
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
      })
    },

    // eslint-disable-next-line no-unused-vars
    getCurrentUser ({ commit, dispatch, state }) {

      requestCurrentUser()
        .then((response) => {
          commit('SET_USER', response.data)
        })
        .catch(error => {
          commit('SET_ACCESS_TOKEN', '')
          commit('REMOVE_USER')
          console.error(error)
        })
    },

  },

  mutations: {

    SET_ACCESS_TOKEN (state, payload) {
      state.accessToken = payload
      localStorage.setItem(`accessToken`, payload)
      if (payload) {
        HTTP.defaults.headers.common.Authorization = `Bearer_${payload}`
      } else {
        delete HTTP.defaults.headers.common.Authorization
      }
    },

    SET_USER (state, user) {
      state.user = user
    },

    REMOVE_USER (state) {
      state.user = {}
    }

  }

}
