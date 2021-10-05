export default {
  namespaced: true,
  state: () => ({
    properties: {
      overlay: false
    },
    functions: { 
      beforeOverlay: function () {},
      afterOverlay: function () {}
    }
  })
}