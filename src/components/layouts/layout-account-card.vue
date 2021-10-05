<template>
  <div class="text-center">
    <v-menu
      v-bind:close-on-content-click="false"
      v-bind:nudge-width="200"
      offset-x
      rounded="0"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="0"
          color="primary"
          fab
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>

      <v-card rounded="0" elevation="0">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar
                color="indigo"
                size="56"
              >
              <!--
                <v-icon dark>mdi-account-circle</v-icon>
                <span class="white--text">js</span>
              -->
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                elevation="0"
                color="white"
                fab
                v-on:click="signOut"
              >
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  computed: {
    userId: function () {
      return this.$storage.getAccessInfo().userId
    },
    userEmail: function () {
      return this.$storage.getAccessInfo().userEmail
    }
  },
  methods: {
    signOut: function () {
      this.$api.signOut()
    }
  }
}
</script>