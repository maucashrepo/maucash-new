<template>
  <Modal
    v-model="modal"
    :title="title"
    :width="modelWidth"
    :class-name="className"
    @on-cancel="cancelModel"
    @on-ok="confirmBtn"
    :draggable="draggable"
  >
    <div slot="header" v-if="!title">
      <slot name="header"></slot>
    </div>
    <template v-if="modalType == 'form'">
      <Form ref="modalForm" :model="modalForm" :rules="rulesForm" label-position="top">
        <slot name="body"></slot>
        <FormItem>
          <Button
            type="primary"
            :loading="submitting"
            @click="handleSubmit(modalForm)"
            style="float:right;"
          >
            <span v-if="!submitting">Confirm</span>
            <span v-else>loading...</span>
          </Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </template>
    <template v-else-if="modalType == 'alert'">
      <div class="modal-container" :style="containerStyle">
        <slot name="body"></slot>
      </div>
      <div slot="footer">
        <template v-if="isFooter">
          <Button type="primary" :loading="submitting" @click="handleSubmit(modalForm)">
            <span v-if="!submitting">{{okText}}</span>
            <span v-else>loading...</span>
          </Button>
          <Button type="warning" @click="cancelHandle">{{cancelText}}</Button>
        </template>
      </div>
    </template>
    <template v-else>
      <slot></slot>
      <!-- <div slot="footer">
        <template v-if="isFooter">
          <Button type="primary" :loading="submitting" @click="handleSubmit(modalForm)">
            <span v-if="!submitting">{{okText}}</span>
            <span v-else>loading...</span>
          </Button>
          <Button type="warning" @click="cancelHandle">{{cancelText}}</Button>
        </template>
      </div>-->
    </template>
  </Modal>
</template>

<script>
export default {
  name: "MaucashModal",
  props: {
    modalType: {
      // 模块类型 form是表单方式 alert是内容板块
      type: String,
      default: "form"
    },
    title: {
      // 标题,如果传递了就是默认头部,如果没有传这个参数就自定义头部
      type: String,
      default: ""
    },
    modalForm: {
      // 表单数据
      type: Object,
      default: function() {
        return {};
      }
    },
    rulesForm: {
      // 表单校验规则
      type: Object,
      default: function() {
        return {};
      }
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    modelWidth: {
      // 模态框的宽度
      type: Number | String,
      default: 600
    },
    containerStyle: {
      // 当弹框类型为alert的时候设置内容的高度样式
      type: Object,
      default: () => {}
    },
    isFooter: {
      // 是否显示底部按钮
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    okText: {
      type: String,
      default: "Confirm"
    }
  },
  data() {
    return {
      modal: false,
      submitting: false,
    };
  },
  methods: {
    open() {
      this.modal = true;
      if (this.modalType == "form") {
        this.$refs.modalForm.resetFields();
      }
    },
    setSubmitState(state) {
      this.submitting = state;
    },
    // 提交数据
    handleSubmit(name) {
      if (Object.keys(this.rulesForm).length) {
        this.$refs.modalForm.validate(valid => {
          if (!valid) return false;
          this.setSubmitState(true);
          // 发送数据到父组件
          this.$emit("fetchData", this.modalForm);
          this.cancelModel();
        });
      } else {
        this.$emit("fetchData", this.modalForm);
        this.cancelModel();
      }
    },
    confirmBtn() {
      this.$emit("fetchData");
      this.cancelModel();
    },
    cancelModel() {
      this.modal = false;
      this.setSubmitState(false);
      this.$emit('closeModal');
    },
    cancelHandle() {
      this.cancelModel();
    }
  },
  computed: {
    className() {
      if (this.modalType == "form" || !this.isFooter) {
        return "nofooter";
      } else {
        return "info-model";
      }
    }
  }
};
</script>

<style>
.nofooter .ivu-modal-footer {
  border-top: none;
  padding: 0;
}
.modal-container {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.hiddleFooter {
  padding-bottom: 0;
}
</style>
