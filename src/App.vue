<template class="root">
  <div>
    <global-dialog />
    <global-overlay />
    <div v-if="$route.meta.isFullScreenLayout">
      <router-view />
    </div>
    <div v-else>
      <layout-default>
        <router-view />
      </layout-default>
    </div>
  </div>
</template>
<script>
import LayoutDefault from './components/layouts/layout-default.vue'
import GlobalDialog from './components/layouts/global/global-dialog.vue'
import GlobalOverlay from './components/layouts/global/global-overlay.vue'

export default {
  created: function () {},
  updated: function () {},
  mounted: function () {},
  components: {
    LayoutDefault,
    GlobalDialog,
    GlobalOverlay
  },
  data: () => ({}),
  methods: {}
}
</script>
<style>
  tr.v-data-table__selected {
    background: #E4EFFA !important;
    color: #1975d1 !important;
  }
  /*
  .root {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display:none;
  }*/
</style>