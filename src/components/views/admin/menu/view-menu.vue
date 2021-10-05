<template>
  <v-container fluid grid-list-md>
    <v-row>
      <v-col xs="3" sm="3">
        <v-card elevation="0" outlined min-height="100%" height="88vh">
          <v-toolbar elevation="0">
            <v-spacer />
            <common-button-action-refresh-icon
              v-on:click.native="onButtonClick_Refresh"
            ></common-button-action-refresh-icon>
          </v-toolbar>
          <v-divider />
          <v-treeview
            activatable
            hoverable
            v-bind:items="menu.treeView.items"
            v-on:update:active="onTreeViewUpdate_Menu"
          ></v-treeview>
        </v-card>
      </v-col>
      <v-col xs="9" sm="9">
        <v-card elevation="0" outlined min-height="100%" height="88vh">
          <v-data-table
            single-select
            show-select
            v-model="menu.dataTable.selected"
            v-bind:headers="menu.dataTable.headers"
            v-bind:items="menu.dataTable.items"
            v-bind:loading="menu.dataTable.isLoading"
            v-bind:items-per-page="5"
            v-on:click:row="onDataTableRowClick_Menu"
            v-on:item-selected="onDataTableItemSelected_Menu"
          >
            <template v-slot:top>
              <v-toolbar
                elevation="0"
              >
                <v-spacer />
                <common-button-action-create-icon
                  v-on:click.native="onButtonClick_Create"
                ></common-button-action-create-icon>
                <common-button-action-update-icon
                  v-on:click.native="onButtonClick_Update"
                ></common-button-action-update-icon>
                <common-button-action-delete-icon
                  v-on:click.native="onButtonClick_Delete"
                ></common-button-action-delete-icon>
              </v-toolbar>
              <v-divider />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  computed:{},
  created: function () {},
  mounted: function () {
    this.initialize()
  },
  updated: function () {},
  data: () => ({
    rootPId: '00000000-0000-0000-0000-000000000000',
    menu: {
      treeView: {
        items: [],
        selectedItemId: undefined
      },
      dataTable: {
        headers: [
          { value: 'id', text: 'Id', align:' d-none'},
          { value: 'nid', text: 'NId', align:'start' },
          { value: 'name', text: 'Name', align:'start' },
          { value: 'icon', text: 'Icon', align:'start' },
          { value: 'sequence', text: 'Sequence', align:'end' },
          { value: 'default', text: 'Default', align:'center' },
          { value: 'active', text: 'Active', align:'center' },
          { value: 'description', text: 'Description', align:'start' },
          { value: 'locked', text: 'Locked', align:'center' }
        ],
        items: [],
        selected: [],
        selectedItem: {},
        itemsPerPage: 5,
        isLoading: false
      }
    }
  }),
  methods: {
    initialize: function () {
      this.$api.get('/api/admin/menu/tree-view').then(response => {
        if (response.succeeded) {
          this.bindMenuTreeView(response.data, this.rootPId)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })

      this.$api.get('/api/admin/menu', {
        pId: (this.$util.isEmpty(this.menu.treeView.selectedItemId)) ? this.rootPId : this.menu.treeView.selectedItemId
      }).then(response => {
        if (response.succeeded) {
          this.bindMenuDataTable(response.data)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })
    },
    bindMenuTreeView: function (items, rootPId) {
      const findRoot = function (pId) {
        let root = {};
        items.forEach(element => {
          if (element.pid === pId) {
            root = element
          }
        });
        return root
      }

      const findChildren = function (id) {
        let children = [];
        items.forEach(element => {
          if (element.pid === id) {
            children.push(element)
          }
        });

        children.sort(function (a, b) {
          return a.sequence - b.sequence
        })
        
        return children
      }

      const recursion = function (data) {
        const children = findChildren(data.id)
        children.forEach(element => {
          recursion(element)
        });
        data.children = children
        return data
      }

      this.menu.treeView.items = []
      this.menu.treeView.items.push(recursion(findRoot(rootPId)))
    },
    bindMenuDataTable: function (items) {
      this.menu.dataTable.selected = []
      this.menu.dataTable.selectedItem = {}

      this.menu.dataTable.items = items
    },
    onTreeViewUpdate_Menu: function (selectedItems) {
      if (selectedItems.length > 1) return false

      this.menu.treeView.selectedItemId = (selectedItems.length === 0) ? this.rootPId : selectedItems[0]

      this.$api.get('/api/admin/menu', {
        pId: this.menu.treeView.selectedItemId
      }).then(response => {
        if (response.succeeded) {
          this.bindMenuDataTable(response.data)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })
    },
    onDataTableRowClick_Menu: function (selectedItem) {
      // single select
      if (this.menu.dataTable.selected[0] === selectedItem) {
        this.menu.dataTable.selected = []  
        this.menu.dataTable.selectedItem = {}
      } else {
        this.menu.dataTable.selected = []  
        this.menu.dataTable.selectedItem = {}

        this.menu.dataTable.selected.push(selectedItem)
        this.menu.dataTable.selectedItem = selectedItem
      }
    },
    onDataTableItemSelected_Menu: function (selectedItem) {
      // single select
      if (selectedItem.value) {
        this.menu.dataTable.selectedItem = selectedItem.item
      } else {
        this.menu.dataTable.selectedItem = {}
      }
    },
  }
}
</script>