export default {
  namespaced: true,
  state: () => ({
    properties: {
      isOpen: false,
      isConfirm: false,
      title: null,
      message: null
    },
    functions: {
      onButtonClick_Confirm: function () {},
      onButtonClick_Cancel: function () {},
      onButtonClick_Ok: function () {}
    }
  })
}