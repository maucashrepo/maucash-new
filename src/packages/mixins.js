
const filterTag = (str) => {
  str = str.replace(/&/ig, "&amp;");
  str = str.replace(/</ig, "&lt;");
  str = str.replace(/>/ig, "&gt;");
  str = str.replace(" ", "&nbsp;");
  return str;
}

export const autoCloseModal = {
  methods: {
    successAlert (message = 'Request Successful') {
      this.$Modal.success({
        title: 'Operation Info',
        content: filterTag(message),
        okText: 'Confirm',
      });
      setTimeout(() => {
        this.$Modal.remove();
      }, 2000);
    },
    errorAlert (message = '') {
      this.$Modal.error({
        title: 'Operation Info',
        content: filterTag(message),
        okText: 'Confirm',
      });
    },
    warningAlert (message) {
      this.$Modal.warning({
        title: 'Operation Info',
        content: filterTag(message),
        okText: 'Confirm',
      });
    }
  }
}

