const LOCAL_STORAGE_USER_ID = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_ID
const LOCAL_STORAGE_USER_EMAIL  = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_EMAIL
const LOCAL_STORAGE_USER_ACCESS_TOKEN  = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_TOKEN
const LOCAL_STORAGE_USER_REFRESH_TOKEN = process.env.VUE_APP_LOCAL_STORAGE_ITEM_NAME_ACCESS_USER_REFRESH_TOKEN

export default {
  computed: {
    $storage: function () {
      return {
        getItem: this.$_get_item,
        setItem: this.$_set_item,
        removeItem: this.$_remove_item,
        getAccessInfo: this.$_get_access_infomation,
        setAccessInfo: this.$_set_access_infomation,
        removeAccessInfo: this.$_remove_access_infomation
      }
    }
  },
  methods: {
    $_get_access_infomation: () => {      
      return {
        userId: localStorage.getItem(LOCAL_STORAGE_USER_ID),
        userEmail: localStorage.getItem(LOCAL_STORAGE_USER_EMAIL),
        accessToken: localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
        refreshToken: localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)
      }
    },
    $_set_access_infomation: (param) => {
      localStorage.setItem(LOCAL_STORAGE_USER_ID, param.userId)
      localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, param.userEmail)
      localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, param.accessToken)
      localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, param.refreshToken)
    },
    $_remove_access_infomation: () => {
      localStorage.removeItem(LOCAL_STORAGE_USER_ID)
      localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
      localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN)
    },
    $_get_item: (key) => {
      return localStorage.getItem(key)
    },
    $_set_item: (key, value) => {
      localStorage.setItem(key, value)
    },
    $_remove_item: (key) => {
      localStorage.removeItem(key)
    }
  }
}