const toggleOpen = {
  data: function () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleOpen: function () {
      this.isOpen = !this.isOpen
    }
  }
}

export default toggleOpen
