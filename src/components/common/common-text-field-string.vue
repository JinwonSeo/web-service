<template>
  <v-text-field
    v-model="model"
    v-bind:label="required ? label + ' *' : label"
    v-bind:hide-details="hideDetails"
    v-bind:hint="hint"
    v-bind:placeholder="placeholder"
    v-on:focus="onFocus"
    v-on:keypress="onKeypress"
    v-on:input.native="onInputNative"
    class="mr-1"
  >
  </v-text-field>
</template>
<script>
export default {
  name: 'text-field-string',
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
    required: {
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
    allowOnlyAlphabet: {
      type: Boolean,
      required: false,
      default: false
    },
    allowOnlyUpperCase: {
      type: Boolean,
      required: false,
      default: false
    },
    notAllowKorean: {
      type: Boolean,
      required: false,
      default: false
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
      if (this.allowOnlyAlphabet) {
        if (keyCode < 65 || keyCode > 122 || (keyCode > 90 && keyCode < 97)) {
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

      if ((this.allowOnlyAlphabet || this.notAllowKorean) && this.allowOnlyUpperCase) {
        return value.toUpperCase().replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
      } else if (this.allowOnlyAlphabet || this.notAllowKorean) {
        return value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
      } else if (this.allowOnlyUpperCase) {
        return value.toUpperCase()
      } else {
        return value
      }
    }
  }
}
</script>