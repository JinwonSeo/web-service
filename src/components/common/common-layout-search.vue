<template>
  <v-toolbar
    elevation="0"
    outlined
  >
    <slot name="parameters" />
    <v-spacer />
    <slot name="buttons" />
  </v-toolbar>
</template>