<template>
  <v-btn
    text
    color="primary"
    v-bind:disabled="disabled"
    v-bind:small="small"
  >
    {{ label }}
  </v-btn>
</template>
<script>
export default {
  name: 'button-simple',
  props: {
    label: {
      type: String,
      default: '',
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