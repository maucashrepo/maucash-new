<template>
  <Modal v-model="passwordModal" title="Change Password" class-name="nofooter" :mask-closable="false">
    <Form ref="changeForm" :model="changeForm" :rules="changeValidate" label-position="top">
      <FormItem label="Old Password" prop="passwd">
        <Input type="password" v-model="changeForm.passwd"></Input>
      </FormItem>
      <FormItem label="new Password" prop="newPasswd">
        <Input type="password" v-model="changeForm.newPasswd"></Input>
      </FormItem>
      <FormItem label="Repeat Password" prop="newPasswdCheck">
        <Input type="password" v-model="changeForm.newPasswdCheck"></Input>
      </FormItem>
      <FormItem style="text-align:right;">
        <Button type="primary" :loading="submitting" @click="handleSubmit('changeForm')">
          <span v-if="!submitting">Confirm</span>
          <span v-else>loading...</span>
        </Button>
      </FormItem>
    </Form>
    <Alert v-show="error" type="error" class="error">{{error}}</Alert>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import axios from "axios";
import { storageHelper } from "./../../utils";
import { authId, authToken, authMobile, authEmail } from "./../../configs";
export default {
  props: {
    baseUrl: {
      type: String,
      default: ""
    },
    headers: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#\$%\^&\*\(\)\-\_\+=;:'",.\?<>\\/\[\]\{\}\|])[a-zA-Z\d`~!@#\$%\^&\*\(\)\-\_\+=;:'",.\?<>\\/\[\]\{\}\|]{8,20}$/;
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Enter the new password again"));
      } else if (value !== this.changeForm.newPasswd) {
        callback(new Error("The input does not agree with the new password"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please enter the password"));
      } else if (!passwordReg.test(value)) {
        callback(
          new Error("Uppercase lowercase digital special character 8 to 20")
        );
      } else {
        callback();
      }
    };
    return {
      token: "",
      passwordModal: false,
      changePasswordUrl: "/welab-user/api/v1/update-pwd-by-oldpwd",
      changeForm: {
        passwd: "",
        newPasswd: "",
        newPasswdCheck: ""
      },
      changeValidate: {
        passwd: [
          {
            required: true,
            message: "The old password cannot be empty",
            tragger: "blur"
          },
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        newPasswd: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        newPasswdCheck: [
          { required: true, validator: validatePassCheck, tragger: "blur" },
          { required: true, validator: validatePassword, trigger: "blur" }
        ]
      },
      error: "",
      submitting: false
    };
  },
  methods: {
    openModal(token) {
      this.passwordModal = true;
      this.token = token;
    },
    errorHanler(error) {
      this.error = error.message || error.error;
    },
    setSubmitState(state) {
      this.submitting = state;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let postData = {
            passwd: this.changeForm.newPasswd,
            oldPasswd: this.changeForm.passwd
          };
          let headers = Object.assign({}, this.headers, {
            "X-User-Token": this.token
          });
          axios
            .post(`${this.baseUrl}/${this.changePasswordUrl}`, postData, {
              headers
            })
            .then(res => {
              const { code, message, result } = res.data;
              if (code == 0) {
                this.$Modal.success({
                  title: "Operation Info",
                  content: message
                });
                setTimeout(() => {
                  this.$Modal.remove();
                  this.passwordModal = false;
                  this.$emit("changePassword", result);
                }, 2000);
              } else {
                this.$Modal.error({
                  title: "Operation Info",
                  content: message
                });
              }
              // 清空
              this.$refs[name].resetFields();
            })
            .catch(error => {
              this.$Modal.error({
                title: "Operation Info",
                content: error
              });
              // 清空
              this.$refs[name].resetFields();
            });
        }
      });
    }
  }
};
</script>

<style>
.nofooter .ivu-modal-footer {
  border-top: none;
  padding: 0;
}
</style>
