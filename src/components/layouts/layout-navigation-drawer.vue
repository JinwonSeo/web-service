<template>
  <v-navigation-drawer
    app
    v-model="response"
  >
  <v-list>
    <template v-for="listGroup in items.root">
    <v-list-group
      v-model="listGroup.append"
      v-if="listGroup.items"
      v-bind:key="listGroup.nId"
      v-bind:prepend-icon="listGroup.append ? listGroup.icon : listGroup['icon-alt']" append-icon=""
    >
      <template v-slot:activator>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              {{ listGroup.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item 
        v-for="item in listGroup.items" 
        v-bind:key="item.nId" 
        v-bind:to="item.path"
      >
      <v-list-item-action v-if="item.icon">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list-group>
    </template>
  </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
  value: {
    type: Boolean,
    default: false,
    required: false
  },
  items: {
    type: Object,
    default: null,
    required: false
  }
  },
  data: () => ({
  response: null
  }),
  watch: {
  response (newValue) {
    const emitValue = newValue
    this.$emit('input', emitValue)
  },
  value (newValue) {
    if (newValue === this.response) return
    this.response = newValue
  }
  }
}
</script>