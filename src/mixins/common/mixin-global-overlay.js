export default {
  computed: {
    $overlay: function () {
      return {
        show: this.$_showOverlay,
        hide: this.$_hideOverlay
      }
    }
  },
  methods: {
    $_showOverlay: function () {
      this.$store.state.overlay.properties.overlay = true
    },
    $_hideOverlay: function () {
      this.$store.state.overlay.properties.overlay = false
    }
  }
}