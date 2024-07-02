<template>
  <div>
    <maucash-modal ref="modal" :modalForm="changeForm" :rulesForm="rulesForm" @fetchData="fetchData">
      <FormItem label="Old Password" prop="passwd">
        <Input type="password" v-model="changeForm.passwd"></Input>
      </FormItem>
      <FormItem label="new Password" prop="newPasswd">
        <Input type="password" v-model="changeForm.newPasswd"></Input>
      </FormItem>
      <FormItem label="Repeat Password" prop="newPasswdCheck">
        <Input type="password" v-model="changeForm.newPasswdCheck"></Input>
      </FormItem>
    </maucash-modal>
  </div>
</template>

<script>
import { passwordReg } from "./../patterns";
import MaucashModal from './../maucash-modal';
export default {
  name: 'MaucashChangePassword',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('Enter the new password again'));
      } else if (value !== this.changeForm.newPasswd) {
        callback(new Error('The input does not agree with the new password'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please enter the password"));
      } else if (!passwordReg.test(value)) {
        callback(new Error("Uppercase lowercase digital special character 8 to 20"));
      } else {
        callback();
      }
    };
    return {
      changeForm: {
        passwd: '',
        newPasswd: '',
        newPasswdCheck: ''
      },
      rulesForm: {
        passwd: [
          { required: true, message: 'The old password cannot be empty', tragger: "blur" },
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        newPasswd: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        newPasswdCheck: [
          { required: true, validator: validatePassCheck, tragger: "blur" },
          { required: true, validator: validatePassword, trigger: "blur" },
        ]
      }
    }
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    fetchData() {
      this.$emit('fetchData', this.changeForm);
    },
  },
  components: {
    MaucashModal,
  }
};
</script>

<style scoped>
</style>