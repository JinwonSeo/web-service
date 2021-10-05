<template>
  <v-btn
    block
    color="primary"
    v-bind:disabled="disabled"
    v-bind:small="small"
  >
    {{ label }}
  </v-btn>
</template>
<script>
export default {
  name: 'button-search',
  props: {
    label: {
      type: String,
      default: 'SEARCH',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    small: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>