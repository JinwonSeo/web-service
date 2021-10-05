<template>
  <v-overlay v-bind:value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  computed: {
    overlay: function () {
      return this.$store.state.overlay.properties.overlay
    }
  }
}
</script>