<template>
  <v-dialog
    v-model="model"
    v-bind:max-width="width"
  >
    <v-card>
      <v-toolbar
        dark
        flat
        color="primary"
      >
        <v-spacer />
        <v-btn
          dark
          icon
          v-on:click="model = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col xs="12" sm="12">
              <common-text-field-nid
                v-model="enumeration.parent.nid"
                label="Parent"
                disabled
                readonly
              ></common-text-field-nid>
            </v-col>
            <v-col xs="12" sm="6">
              <common-text-field-nid
                v-model="enumeration.nid"
                label="NId"
              ></common-text-field-nid>
            </v-col>
            <v-col xs="12" sm="6">
              <common-text-field-string
                v-model="enumeration.name"
                label="Name"
              ></common-text-field-string>
            </v-col>
            <v-col xs="12" sm="6">
              <common-text-field-number
                v-model="enumeration.sequence"
                label="Sequence"
              ></common-text-field-number>
            </v-col>
            <v-col xs="12" sm="12">
              <common-text-field-string
                v-model="enumeration.description"
                label="Description"
              ></common-text-field-string>
            </v-col>
            <v-col xs="12" sm="6">
              <v-switch
                v-model="enumeration.active"
                label="Active"
              ></v-switch>
            </v-col>
            <v-col xs="12" sm="6">
              <v-switch
                v-model="enumeration.default"
                label="Default"
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="primary"
          v-on:click="onButtonClick_Create"
        >
          CREATE
        </v-btn>
        <v-btn
          text
          color="primary"
          v-on:click="finalize"
        >
          CANCEL
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
    },
    width: {
      type: Number,
      default: 600,
      required: false
    },
    pid: {
      type: String,
      required: false
    },
    callback: {
      type: Function,
      default: function () {},
      required: false
    }
  },
  created: function () {},
  mounted: function () {},
  updated: function () {},
  data: () => ({
    model: null,
    enumeration: {
      id: null,
      nid: null,
      name: null,
      sequence: null,
      active: true,
      default: false,
      description: null,
      pid: null,
      parent: {
        id: null,
        nid: null,
        name: null,
        sequence: null,
        active: null,
        default: null,
        description: null,
        pid: null
      }
    }
  }),
  watch: {
    model (newValue) {
      const emitValue = newValue
      this.$emit('input', emitValue)
    },
    value (newValue) {
      if (newValue === this.model) return
      if (newValue === true) this.initialize()

      this.model = newValue
    }
  },
  methods: {
    initialize: function () {
      if (this.pid === '00000000-0000-0000-0000-000000000000') {
        this.enumeration.pid = this.pid
        this.enumeration.name = null
        this.enumeration.sequence = null
        this.enumeration.active = true
        this.enumeration.default = false
        this.enumeration.description = null
        this.enumeration.parent.id = this.pid
        this.enumeration.parent.nid = 'ROOT'
      } else {
        this.$api.get('/api/admin/enumeration/' + this.pid).then(response => {
          if (response.succeeded && response.data !== null) {
            this.enumeration.nid = null
            this.enumeration.name = null
            this.enumeration.sequence = null
            this.enumeration.active = true
            this.enumeration.default = false
            this.enumeration.description = null
            this.enumeration.pid = response.data.id
            this.enumeration.parent = response.data
          }
        }).catch(error => {
          this.$dialog.open({ message: error.reason })
        })
      }
    },
    finalize: function () {
      this.model = false
      this.$emit('on-closed')
    },
    onButtonClick_Create: function () {
      this.$api.post('/api/admin/enumeration', {
        id: this.enumeration.id,
        nid: this.enumeration.nid,
        name: this.enumeration.name,
        description: this.enumeration.description,
        active: this.enumeration.active,
        sequence: this.enumeration.sequence,
        default: this.enumeration.default,
        pid: this.enumeration.pid
      }).then(response => {
        if (response.succeeded) {
          this.finalize()
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })
    }
  }
}
</script>