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
          v-on:click="onButtonClick_Update"
        >
          UPDATE
        </v-btn>
        <v-btn
          text
          color="primary"
          v-on:click="model = false"
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
    id: {
      type: String,
      required: false
    },
    callback: {
      type: Function,
      default: function () {},
      required: false
    }
  },
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
      this.$api.get('/api/admin/enumeration/' + this.id).then(response => {
        if (response.succeeded && !this.$util.isEmpty(response.data.pid)) {
          this.enumeration.id = response.data.id
          this.enumeration.nid = response.data.nid
          this.enumeration.name = response.data.name
          this.enumeration.sequence = response.data.sequence
          this.enumeration.active = response.data.active
          this.enumeration.default = response.data.default
          this.enumeration.description = response.data.description
          this.enumeration.pid = response.data.pid
          
          if (response.data.pid === '00000000-0000-0000-0000-000000000000') {
            this.enumeration.parent.name = null,
            this.enumeration.parent.sequence = null,
            this.enumeration.parent.active = true,
            this.enumeration.parent.default = false,
            this.enumeration.parent.description = null
            this.enumeration.parent.id = response.data.pid
            this.enumeration.parent.nid = 'ROOT'
          } else {
            this.$api.get('/api/admin/enumeration/' + response.data.pid,).then(parent => {
              if (parent.succeeded && parent.data !== null && !this.$util.isEmpty(parent.data.id)) {
                this.enumeration.parent.id = parent.data.id
                this.enumeration.parent.nid = parent.data.nid
                this.enumeration.parent.name = parent.data.name
                this.enumeration.parent.sequence = parent.data.sequence
                this.enumeration.parent.active = parent.data.active
                this.enumeration.parent.default = parent.data.default
                this.enumeration.parent.description = parent.data.description
                this.enumeration.parent.pid = parent.data.pid
              }
            }).catch(error => {
              this.$dialog.open({ message: error.reason })
            })
          }
        }
      }).catch(error => {
        this.$dialog.open({ message: error.reason })
      })
    },
    finalize: function () {
      this.model = false
      this.$emit('on-closed')
    },
    onButtonClick_Update: function () {
      this.$api.put('/api/admin/enumeration', {
          id: this.enumeration.id,
          nid: this.enumeration.nid,
          name: this.enumeration.name,
          sequence: this.enumeration.sequence,
          active: this.enumeration.active,
          default: this.enumeration.default,
          description: this.enumeration.description,
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