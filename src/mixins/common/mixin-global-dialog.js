export default {
  computed: {
    $dialog: function () {
      return {
        open: this.$_openDialog,
        confirm: this.$_openConfirmDialog
      }
    }
  },
  methods: {
    $_openDialog: function (option) {
      this.$store.state.dialog.properties.isOpen = true
      this.$store.state.dialog.properties.isConfirm = false
      this.$store.state.dialog.properties.title = option.title
      this.$store.state.dialog.properties.message = option.message
      
      if (option.onButtonClick_Ok === undefined || option.onButtonClick_Ok === null) {
        this.$store.state.dialog.functions.onButtonClick_Ok = function () {}
      } else {
        this.$store.state.dialog.functions.onButtonClick_Ok = option.onButtonClick_Ok
      }
    },
    $_openConfirmDialog: function (option) {
      this.$store.state.dialog.properties.isOpen = true
      this.$store.state.dialog.properties.isConfirm = true
      this.$store.state.dialog.properties.title = option.title
      this.$store.state.dialog.properties.message = option.message

      if (option.onButtonClick_Confirm === undefined || option.onButtonClick_Confirm === null) {
        this.$store.state.dialog.functions.onButtonClick_Confirm = function () {}
      } else {
        this.$store.state.dialog.functions.onButtonClick_Confirm = option.onButtonClick_Confirm
      }

      if (option.onButtonClick_Cancel === undefined || option.onButtonClick_Cancel === null) {
        this.$store.state.dialog.functions.onButtonClick_Cancel = function () {}
      } else {
        this.$store.state.dialog.functions.onButtonClick_Cancel = option.onButtonClick_Cancel
      }
    }
  }
}