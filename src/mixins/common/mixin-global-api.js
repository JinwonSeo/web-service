import axios from 'axios'

const API_BASE_URL  = process.env.VUE_APP_API_END_POINT
const LOCAL_STORAGE_USER_ID = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_ID
const LOCAL_STORAGE_USER_EMAIL  = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_EMAIL
const LOCAL_STORAGE_USER_ACCESS_TOKEN  = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_ACCESS_TOKEN
const LOCAL_STORAGE_USER_REFRESH_TOKEN = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_REFRESH_TOKEN

export default {
  computed: {
    $api: function () {
      return {
        signIn: this.$_sign_in,
        signOut: this.$_sign_out,
        get: this.$_get,
        post: this.$_post,
        put: this.$_put,
        delete: this.$_delete
      }
    }
  },
  methods: {
    $_sign_in: (authentication) => {
      return new Promise ((resolve, reject) => {
        axios.post(API_BASE_URL + '/api/auth/generate-token', {
          email: authentication.email,
          password: authentication.password
        }).then(response => {
          if (response.data.succeeded) {
            localStorage.setItem(LOCAL_STORAGE_USER_ID, response.data.data.userId)
            localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, response.data.data.userEmail)
            localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, response.data.data.accessToken)
            localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, response.data.data.refreshToken)
            
            axios.defaults.headers.common['Authorization'] = response.data.data.accessToken
          }

          resolve(response.data)
        }).catch(error => {
          if (!error.response.status) {
            window.location.href = '/error-network'
          } else {
            switch (error.response.status) {
              case 403:
                localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
                localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

                axios.defaults.headers.common['Authorization'] = undefined

                window.location.href = '/sign-in'
                break

              case 404:
                window.location.href = '/error-404'
                break

              default:
                reject(error.response.data.error)
                break
            }
          }
        })
      })
    },
    $_sign_out: () => {
      return new Promise (() => {
        localStorage.removeItem(LOCAL_STORAGE_USER_ID)
        localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
        localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
        localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

        axios.defaults.headers.common['Authorization'] = undefined
        
        window.location.href = '/sign-in'
      })
    },
    $_get: (url, params) => {
      return new Promise ((resolve, reject) => {
        axios.get(API_BASE_URL + url, {
          params: params
        }).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (!error.response.status) {
            window.location.href = '/error-network'
          } else {
            switch (error.response.status) {
              case 403:
                localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
                localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

                axios.defaults.headers.common['Authorization'] = undefined

                window.location.href = '/sign-in'
                break

              //case 404:
              //  window.location.href = '/error-404'
              //  break

              default:
                reject(error.response.data.error)
                break
            }
          }
        })
      })
    },
    $_post: (url, data, config) => {
      return new Promise((resolve, reject) => {
        axios.post(API_BASE_URL + url, data, config).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (!error.response.status) {
            window.location.href = '/error-network'
          } else {
            switch (error.response.status) {
              case 403:
                localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
                localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

                axios.defaults.headers.common['Authorization'] = undefined

                window.location.href = '/sign-in'
                break

              case 404:
                window.location.href = '/error-404'
                break

              default:
                reject(error.response.data.error)
                break
            }
          }
        })
      })
    },
    $_put: (url, data, config) => {
      return new Promise((resolve, reject) => {
        axios.put(API_BASE_URL + url, data, config).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (!error.response.status) {
            window.location.href = '/error-network'
          } else {
            switch (error.response.status) {
              case 403:
                localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
                localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

                axios.defaults.headers.common['Authorization'] = undefined

                window.location.href = '/sign-in'
                break

              case 404:
                window.location.href = '/error-404'
                break

              default:
                reject(error.response.data.error)
                break
            }
          }
        })
      })
    },
    $_delete: (url, config) => {
      return new Promise((resolve, reject) => {
        axios.delete(API_BASE_URL + url, config).then(response => {
          resolve(response.data)
        }).catch(error => {
          if (!error.response.status) {
            window.location.href = '/error-network'
          } else {
            switch (error.response.status) {
              case 403:
                localStorage.removeItem(LOCAL_STORAGE_USER_ID)
                localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
                localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)

                axios.defaults.headers.common['Authorization'] = undefined

                window.location.href = '/sign-in'
                break

              case 404:
                window.location.href = '/error-404'
                break

              default:
                reject(error.response.data.error)
                break
            }
          }
        })
      })
    }
  }
}