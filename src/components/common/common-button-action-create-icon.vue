<template>
  <v-btn
    v-show="visible"
    icon color="primary"
  >
    <v-icon>mdi-table-plus</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>