<template>
  <v-app-bar
    elevation="0"
    app
    color="primary"
  >
    <slot name="navigation" />
    <v-spacer></v-spacer>
    <div>
      
    </div>
    <v-spacer></v-spacer>
    <slot name="menu" />
  </v-app-bar>
</template>
<script>
export default {
  
}
</script>