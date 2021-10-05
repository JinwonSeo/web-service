<template>
  <v-app>
    <layout-header>
      <template v-slot:navigation>
        <v-app-bar-nav-icon
          color="white"
          v-on:click.stop="navigationDrawer.model = !navigationDrawer.model"
        ></v-app-bar-nav-icon>
      </template>
      <template v-slot:menu>
        <layout-account-card />
      </template>
    </layout-header>
    <layout-navigation-drawer
      v-model="navigationDrawer.model"
      v-bind:items="navigationDrawer.items"
    ></layout-navigation-drawer>
    <v-main>
      <slot /> <!-- router-view -->
    </v-main>
  </v-app>
</template>
<script>
import LayoutHeader from './layout-header.vue'
import LayoutAccountCard from './layout-account-card.vue'
import LayoutNavigationDrawer from './layout-navigation-drawer.vue'

export default {
  created: function () {
    let tempRoot = []
    
    this.$api.get('/api/admin/menu-and-program', {
      menuPId: '00000000-0000-0000-0000-000000000000' // root
    }).then(root => {
      if (root.succeeded === false) return false

      this.$api.get('/api/admin/menu-and-program', {
        menuPId: root.data[0].menuId
      }).then(listGroup => {
        if (listGroup.succeeded === false) return false

        listGroup.data.forEach(group => {
          let tempListGroup = {
            append: (group.menuSequence === 10) ? true : false,
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            id: group.menuId,
            nId: group.menuNId,
            name: group.menuName,
            items: []
          }

          this.$api.get('/api/admin/menu-and-program', {
            menuPId: group.menuId
          }).then(listItem => {
            if (listItem.succeeded === false) return false

            listItem.data.forEach(item => {
              let tempListItem = {
                id: item.menuId,
                nId: item.menuNId,
                name: item.menuName,
                icon: item.menuIcon,
                path: item.programPath
              }

              tempListGroup.items.push(tempListItem)
            });

            tempRoot.push(tempListGroup)
          }).catch(error => {
            this.$dialog.open({ message: error.reason })
          })
        });
      }).catch(error => {
        this.$dialog.open({ message: error.reason })
      })
    }).catch(error => {
      this.$dialog.open({ message: error.reason })
    })

    this.navigationDrawer.items.root = tempRoot
  },
  components: {
    LayoutHeader,
    LayoutAccountCard,
    LayoutNavigationDrawer
  },
  data: () => ({
    navigationDrawer: {
      model: false,
      items: {
        root: []
      }
    }
  })
}
</script>