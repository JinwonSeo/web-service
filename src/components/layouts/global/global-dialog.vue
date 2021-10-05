<template>
  <v-dialog
    v-model="isOpen"
    v-on:click:outside="onOutsideClick"
    v-on:keydown.esc="onKeydown_ESC"
    max-width="300px"
  >
    <v-card>
      <v-card-title
        class="headline"
      >
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          v-if="isConfirm"
          v-on:click="onButtonClick_Confirm"
        >
          CONFIRM
        </v-btn>
        <v-btn
          text
          color="primary"
          v-if="isConfirm"
          v-on:click="onButtonClick_Cancel"
        >
          CANCEL
        </v-btn>
        <v-btn
          text
          color="primary"
          v-if="!isConfirm"
          v-on:click="onButtonClick_Ok"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  computed: {
    isOpen: function () {
      return this.$store.state.dialog.properties.isOpen
    },
    isConfirm: function () {
      return this.$store.state.dialog.properties.isConfirm
    },
    title: function () {
      return this.$store.state.dialog.properties.title
    },
    message: function () {
      return this.$store.state.dialog.properties.message
    }
  },
  methods: {
    finalize: function () {
      this.$store.state.dialog.properties.isOpen = false
    },
    onOutsideClick: function () {
      if (this.isConfirm) {
        this.onButtonClick_Cancel()
      } else {
        this.onButtonClick_Ok()
      }
    },
    onKeydown_ESC: function () {
      if (this.isConfirm) {
        this.onButtonClick_Cancel()
      } else {
        this.onButtonClick_Ok()
      }
    },
    onButtonClick_Ok: function () {
      this.$store.state.dialog.functions.onButtonClick_Ok()
      this.finalize()
    },
    onButtonClick_Confirm: function () {
      this.$store.state.dialog.functions.onButtonClick_Confirm()
      this.finalize()
    },
    onButtonClick_Cancel: function () {
      this.$store.state.dialog.functions.onButtonClick_Cancel()
      this.finalize()
    }
  }
}
</script>