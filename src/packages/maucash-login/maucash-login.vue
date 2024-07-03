<template>
  <div class="login-page">
    <div v-if="!isReview" id="menu">
      <div id="canvas" class="canvas" :style="`background-image:url('${this.imgUrl}/resource/welab-web/login_bg.png')`"></div>
      <div class="login">
        <div class="login-box" :class="{'no-pointer-events': submitting}">
          <div class="app-name" :style="`background-image:url('${this.imgUrl}/resource/welab-web/login_log.png')`"></div>
          <Form ref="userForm" :model="userForm" :rules="userRule" v-show="!secondFactor">
            <FormItem prop="mobile">
              <Input :maxlength="20" type="text" v-model="userForm.mobile" icon="ios-person" placeholder="Please enter mobile" autofocus></Input>
            </FormItem>
            <FormItem prop="password">
              <Input :maxlength="20" type="password" v-model="userForm.password" icon="ios-locked-outline" placeholder="Please enter password" @on-enter="enterLogin('userForm')"></Input>
            </FormItem>
            <FormItem prop="code" v-if="isSms">
              <Input :maxlength="4" type="text" v-model="userForm.code" placeholder="Please enter code">
                <span slot="append" class="get-code" @click="getCode" v-if="!is_get_code">get sms code</span>
                <span slot="append" class="get-code" v-if="is_get_code">{{time_txt}}</span>
              </Input>
            </FormItem>
            <Button type="primary" :loading="submitting" @click="handleLogin('userForm')" long style="background:#FA5C2D; border: 1px solid #FA5C2D">
              <span v-if="!submitting">Login</span>
              <span v-else>Loading...</span>
            </Button>
          </Form>
        </div>
        <Alert v-show="error" type="error" class="error">{{error}}</Alert>
      </div>
      <p class="login-info" v-if="isLogInfo">This technology is the proprietary property of WeLab and its affiliates. Any system grant does not provide ownership or the right to own the system or any specific module.</p>
    </div>
    <div v-else>
      <maucash-review :baseUrl="baseUrl" :imgUrl="imgUrl" :accessToken="accessToken" :headers="headers" @loginHandle="loginHandle"></maucash-review>
    </div>
    <change-password ref="changePassword" :baseUrl="baseUrl" :headers="headers" @changePassword="changePwd"/>
  </div>
</template>
<script>
import { mobileReg, passwordReg } from './patterns';
import axios from 'axios';
import { autoCloseModal } from './mixins';
import MaucashReview from './maucash-review';
import changePassword from './change-password';
import Particle from 'zhihu-particle';

export default {
  mixins: [autoCloseModal],
  name: 'maucashLogin',
  components: {
    MaucashReview,
    changePassword
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    imgUrl:{
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isSms: {
      type: Boolean,
      default: true
    },
    isLogInfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter the username'));
      } else if (!mobileReg.test(value)) {
        callback(new Error('username format error '));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter the password'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!window.localStorage.getItem('max_time_out')) {
        callback(new Error('please get sms code'));
      } else if (value === '') {
        callback(new Error('please enter the code'));
      } else {
        callback();
      }
    };
    return {
      loginUrl: '/welab-user/api/v1/user-login',
      smsUrl: '/welab-user/api/v1/send-sms-code/by-user',
      getLatestConfigUrl:'/welab-message/api/v1/otpConfigLog',
      isReview: false,
      accessToken: '',
      submitting: false,
      secondFactor: false,
      error: '',
      is_get_code: false,
      time_txt: '',
      resendTime: 0,
      smsCodeId: '',
      userForm: {
        mobile: '',
        password: '',
        code: ''
      },
      userRule: {
        mobile: [
          { required: true, trigger: 'blur', message: '' },
          { required: true, validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '' },
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '' },
          { required: true, validator: validateCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    errorHanler(error) {
      this.error = error || error.error;
    },
    setSubmitState(state) {
      this.submitting = state;
    },
    async getLatestConfig() {
      try {
        const response = await axios.get(`${this.baseUrl}${this.getLatestConfigUrl}`, {
          headers: this.headers,
          params: {
            otpSectionId: 2
          }
        });
        const { code, result, message } = response; 
        if (code === 0) {
          return result;
        } else {
          this.warningAlert(message);
        }
      } catch (error) {
        this.warningAlert(error);
      }
    },
    async getCode() {
      let mobile = this.userForm.mobile;
      if (mobile && mobileReg.test(mobile)) {
        let config = await this.getLatestConfig();
        if (config) {
          this.resendTime = config.resendTimeDurationAfter;
          this.time_txt = `${this.resendTime}s`;
        }

        axios
          .post(`${this.baseUrl}${this.smsUrl}`, {mobile}, {
            headers: this.headers,
            params: {
              otpSectionId: 2
            }
          })
          .then(data => {
            const { code, result, message } = data
            if (code == 0) {
              this.is_get_code = true;
              window.localStorage.setItem('smsCodeId', result);
              window.localStorage.setItem('max_time_out', '5minutes');
              let maxTime = this.resendTime;
              let getCodeState = setInterval(() => {
                this.time_txt = `${maxTime}s`;
                maxTime--;
                if (maxTime == 0) {
                  window.clearInterval(getCodeState);
                  this.is_get_code = false;
                }
              }, 1000);
              setTimeout(() => {
                window.localStorage.removeItem('max_time_out');
                window.localStorage.removeItem('smsCodeId');
              }, 5 * 60 * 1000);
              this.successAlert(
                'SMS verification code has been sent to your phone'
              );
            } else {
              this.warningAlert(message);
            }
          })
          .catch(e => {
            console.error(e);
            this.warningAlert(e);
          });
      } else {
        this.warningAlert('Please check your mobile phone number');
      }
    },
    handleLogin(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        let postData = {};
        if (this.isSms) {
          postData = Object.assign(
            {},
            {
              mobile: this.userForm.mobile,
              passwd: this.userForm.password,
              smsCode: {
                smsCodeId: window.localStorage.getItem('smsCodeId'),
                smsCodeValue: this.userForm.code
              }
            }
          );
        } else {
          postData = Object.assign(
            {},
            {
              mobile: this.userForm.mobile,
              passwd: this.userForm.password
            }
          );
        }
        this.setSubmitState(true);
        axios
          .post(this.baseUrl + this.loginUrl, postData, {
            headers: this.headers
          })
          .then(res => {
            this.setSubmitState(false);
            const { code, message, result } = res;
            if (code == 0) {
              const {
                mobile,
                token,
                userId,
                email,
                temporaryLogin,
                accessToken
              } = result;
              window.localStorage.removeItem('max_time_out');
              window.localStorage.removeItem('smsCodeId');
              if (!temporaryLogin) {
                const {token,passwordExpired} = result;
                if (passwordExpired) {
                  this.$refs.changePassword.openModal(token);
                } else {
                  this.$emit('loginHandle', result);
                }
              } else {
                this.accessToken = accessToken;
                this.isReview = true;
              }
            } else {
              this.errorHanler(message);
            }
          })
          .catch(e => {
            console.error(e);
            this.setSubmitState(false);
            this.errorHanler(e);
          });
      });
    },
    enterLogin(name) {
      this.handleLogin(name);
    },
    changePwd(result) {
      console.log('事件已经发送', result);
      this.$emit('loginHandle', result);
    },
    loginHandle(result) {
      this.$emit('loginHandle', result);
    },
  },
  mounted() {
    new Particle(document.getElementById('canvas'), {
      interactive: true,
      density: 'low',
      atomColor: 'rgba(255,255,255,0.15)'
    });
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', () => {
      history.pushState(null, null, document.URL);
    });
  }
};
</script>
<style>
html, body, #app {
  height: 100%;
}
</style>

<style scoped>
.login-page {
  height: 100%;
}
#menu {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  background-color: #2680ca;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 40%;
}
.login {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 350px;
  margin: 15rem auto 0;
}
.login-box {
  background: #fff;
  /* border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 5px 1px rgb(0 0 0 / 10%); */
  border-radius: 5px;
  padding: 2rem;
}
.app-name {
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
}
.ivu-form-item {
  margin-bottom: 2rem;
}
.app-name,
.login-box {
  margin-bottom: 1rem;
}

.reset-password {
  line-height: 30px;
  text-align: right;
  margin-top: 10px;
}
.get-code {
  cursor: pointer;
}
.login-info {
  text-align: center;
  color: #fff;
  font-weight: 800;
  position: fixed;
  bottom: 70px;
  left: 50%;
  max-width: 980px;
  margin-left: -490px;
  z-index: -1;
}
</style>
