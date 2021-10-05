<template>
  <v-btn
    block
    outlined
    color="primary"
    v-bind:disabled="disabled"
    v-bind:small="small"
  >
    {{ label }}
  </v-btn>
</template>
<script>
export default {
  name: 'button-action',
  props: {
    label: {
      type: String,
      default: 'ACTION',
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