<template>
  <v-container fluid grid-list-md>
    <!-- Addon components -->
    <dialog-enumeration-create
      v-model="enumeration.dialog.create.show"
      v-bind:pid="enumeration.treeView.selectedItemId"
      v-on:on-closed="onDialogClosed_Create"
    >
    </dialog-enumeration-create>
    <dialog-enumeration-update
      v-model="enumeration.dialog.update.show"
      v-bind:id="enumeration.dataTable.selectedItem.id"
      v-on:on-closed="onDialogClosed_Update"
    >
    </dialog-enumeration-update>
    <v-row>
      <v-col xs="3" sm="3">
        <v-card elevation="0" outlined rounded="0" min-height="88vh">
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
            v-bind:items="enumeration.treeView.items"
            v-on:update:active="onTreeViewUpdate_Enumeration"
          ></v-treeview>
     
        </v-card>
      </v-col>
      <v-col xs="9" sm="9">
        <v-card elevation="0" outlined rounded="0" min-height="88vh">
          <v-data-table
            single-select
            show-select
            v-model="enumeration.dataTable.selected"
            v-bind:headers="enumeration.dataTable.headers"
            v-bind:items="enumeration.dataTable.items"
            v-bind:loading="enumeration.dataTable.isLoading"
            v-bind:items-per-page="5"
            v-on:click:row="onDataTableRowClick_Enumeration"
            v-on:item-selected="onDataTableItemSelected_Enumeration"
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
import DialogEnumerationCreate from './dialog/dialog-enumeration-create.vue'
import DialogEnumerationUpdate from './dialog/dialog-enumeration-update.vue'

export default {
  components: { 
    DialogEnumerationCreate,
    DialogEnumerationUpdate
  },
  computed:{},
  created: function () {},
  mounted: function () {
    this.initialize()
  },
  updated: function () {},
  data: () => ({
    rootPId: '00000000-0000-0000-0000-000000000000',
    enumeration: {
      dialog: {
        create: {
          show: false
        },
        update: {
          show: false
        }
      },
      treeView: {
        items: [],
        selectedItemId: undefined
      },
      dataTable: {
        headers: [
          { value: 'id', text: 'Id', align:' d-none'},
          { value: 'nid', text: 'NId', align:'start' },
          { value: 'name', text: 'Name', align:'start' },
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
      if (this.$util.isEmpty(this.enumeration.treeView.selectedItemId)) this.enumeration.treeView.selectedItemId = this.rootPId

      this.$api.get('/api/admin/enumeration/tree-view').then(response => {
        if (response.succeeded) {
          this.bindEnumerationTreeView(response.data, this.rootPId)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })

      this.$api.get('/api/admin/enumeration', {
        pId: (this.$util.isEmpty(this.enumeration.treeView.selectedItemId)) ? this.rootPId : this.enumeration.treeView.selectedItemId
      }).then(response => {
        if (response.succeeded) {
          this.bindEnumerationDataTable(response.data)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })
    },
    bindEnumerationTreeView: function (items, rootPId) {
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

      this.enumeration.treeView.items = []
      this.enumeration.treeView.items.push(recursion(findRoot(rootPId)))
    },
    bindEnumerationDataTable: function (items) {
      this.enumeration.dataTable.selected = []
      this.enumeration.dataTable.selectedItem = {}

      this.enumeration.dataTable.items = items
    },
    deleteEnumeration: function (id) {
      this.$api.delete('/api/admin/enumeration/' + id).then(response => {
        if (response.succeeded) {
          this.initialize()
        }
      }).catch(error => {
        this.$dialog.open({ message: error.reason })
      })
    },
    onButtonClick_Refresh: function () {
      this.initialize()
    },
    onButtonClick_Create: function () {
      if (this.$util.isEmpty(this.enumeration.treeView.selectedItemId)) return false
      if (this.enumeration.treeView.selectedItemId === this.rootPId) return false

      this.enumeration.dialog.create.show = !this.enumeration.dialog.create.show
    },
    onDialogClosed_Create: function () {
      this.initialize()
    },
    onButtonClick_Update: function () {
      if (this.$util.isEmpty(this.enumeration.dataTable.selectedItem.id)) return false

      this.enumeration.dialog.update.show = !this.enumeration.dialog.update.show
    },
    onDialogClosed_Update: function () {
      this.initialize()
    },
    onButtonClick_Delete: function () {
      if (this.$util.isEmpty(this.enumeration.dataTable.selectedItem.id)) return false

      this.$dialog.confirm({ 
        message: '선택한 행을 삭제하시겠습니까?',
        onButtonClick_Confirm: () => {
          this.deleteEnumeration(this.enumeration.dataTable.selectedItem.id)
        }
      })
    },
    onDataTableRowClick_Enumeration: function (selectedItem) {
      // single select
      if (this.enumeration.dataTable.selected[0] === selectedItem) {
        this.enumeration.dataTable.selected = []  
        this.enumeration.dataTable.selectedItem = {}
      } else {
        this.enumeration.dataTable.selected = []  
        this.enumeration.dataTable.selectedItem = {}

        this.enumeration.dataTable.selected.push(selectedItem)
        this.enumeration.dataTable.selectedItem = selectedItem
      }
    },
    onDataTableItemSelected_Enumeration: function (selectedItem) {
      // single select
      if (selectedItem.value) {
        this.enumeration.dataTable.selectedItem = selectedItem.item
      } else {
        this.enumeration.dataTable.selectedItem = {}
      }
    },
    onTreeViewUpdate_Enumeration: function (selectedItems) {
      if (selectedItems.length > 1) return false

      this.enumeration.treeView.selectedItemId = (selectedItems.length === 0) ? this.rootPId : selectedItems[0]

      this.$api.get('/api/admin/enumeration', {
        pId: this.enumeration.treeView.selectedItemId
      }).then(response => {
        if (response.succeeded) {
          this.bindEnumerationDataTable(response.data)
        }
      }).catch(error => {
          this.$dialog.open({ message: error.reason })
      })
    }    
  }
}
</script>