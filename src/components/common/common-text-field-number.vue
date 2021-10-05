<template>
  <v-text-field
    v-model="model"
    v-bind:label="required ? label + ' *' : label"
    v-bind:hide-details="hideDetails"
    v-bind:hint="hint"
    v-bind:flat="flat"
    v-bind:placeholder="placeholder"
    v-bind:error-messages="errorMessages"
    v-bind:autofocus="autofocus"
    v-bind:disabled="disabled"
    v-bind:readonly="readonly"
    v-bind:required="required"
    v-bind:dense="dense"
    v-on:focus="onFocus"
    v-on:keypress="onKeypress"
    v-on:input.native="onInputNative"
    class="mr-1"
  >
  </v-text-field>
</template>
<script>
export default {
  name: 'text-field-number',
  created: function () {
    this.model = this.getFilteredValue(this.value)
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
      required: false
    },
    label: {
      type: String,
      default: null,
      requried: false
    },
    hideDetails: {
      type: Boolean,
      default: true,
      required: false
    },
    flat: {
      type: Boolean,
      default: false,
      required: false
    },
    hint: {
      type: String,
      default: null,
      required: false
    },
    placeholder: {
      type: String,
      default: null,
      required: false
    },
    errorMessages: {
      type: String,
      default: null,
      required: false
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    dense: {
      type: Boolean,
      default: false,
      required: false
    },
    digit: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    model: null
  }),
  watch: {
    model (newValue) {
      const emitValue = this.getFilteredValue(newValue)
      this.$emit('input', emitValue)
    },
    value (newValue) {
      if (newValue === this.model) return
      this.model = this.getFilteredValue(newValue)
    }
  },
  methods: {
    onFocus: function () {
      this.$emit('focus')
    },
    onKeypress: function ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which)

      if (this.digit === 0) {
        if (keyCode < 48 || keyCode > 57) {
          $event.preventDefault()
        }
      } else {
        if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.model.indexOf('.') !== -1)) {
          $event.preventDefault()
        }
        if (this.model !== null && this.model.toString().indexOf(".") > -1 && (this.model.toString().split('.')[1].length > (this.digit - 1))) {
          $event.preventDefault()
        }
      }
      
      this.$emit('keypress')
    },
    onInputNative: function ($event) {
      const emitValue = this.getFilteredValue($event.target.value)
      this.model = emitValue
      this.$emit('input', emitValue)
    },
    getFilteredValue: function (value) {
      if (value === undefined || value === null || value === '') return ''
      
      if (typeof(value) !== 'string') value = value.toString()

      if (value === '.') {
        return '0.'
      } else {
        return value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
      }
    }
  }
}
</script>