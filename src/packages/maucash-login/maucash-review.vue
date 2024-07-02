<template>
  <div style="height:100%;background:#fefefe">
    <div class="review-wrapper">
      <img :src="`${this.imgUrl}/resource/welab-web/review.png`" />
      <div class="review-form">
        <h1>Login under review...</h1>
        <Form
          ref="reviewForm"
          :model="reviewForm"
          :rules="reviewFormRule"
          :label-width="100"
          inline
          @submit.native.prevent
        >
          <FormItem
            prop="code"
            label="Login Code:"
            style="width: 300px"
          >
            <Input
              v-model.number="reviewForm.code"
              @on-enter="review"
            />
          </FormItem>
          <span
            v-if="!sendFlag"
            class="send-mail"
            @click="sendMail"
          >Resend mail</span>
          <Button
            v-else
            type="default"
            disabled
            style="width:95px"
          >{{countDown}}</Button>
        </Form>
        <Button
          type="primary"
          @click="review"
          :loading="reviewLoading"
        >Login</Button>
      </div>
    </div>
    <change-password
      ref="changePassword"
      :baseUrl="baseUrl"
      :headers="headers"
      @changePassword="changePwd"
    />
  </div>
</template>

<script>
// import { storageHelper } from "utils";
// import { authToken, authMobile, authEmail } from "configs";
import axios from "axios";
import { autoCloseModal } from "./../mixins";
import changePassword from './change-password';
export default {
  name: "review",
  mixins: [autoCloseModal],
  components: {
    changePassword
  },
  props: {
    baseUrl: {
      type: String,
      default: ""
    },
    imgUrl: {
      type: String,
      default: ""
    },
    accessToken: {
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
    return {
      reviewUrl: "/welab-user/api/v1/temporary/check-code", // code检验登录
      sendMailUrl: "/welab-user/api/v1/temporary/send-email", // 发送邮件
      checkAuthoriceUrl: "/welab-user/api/v1/temporary/info", // 检验临时员工是否已授权
      reviewLoading: false,
      sendFlag: false,
      countDown: "",
      reviewForm: {
        code: ""
      },
      reviewFormRule: {
        code: [
          {
            required: true,
            type: "number",
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("please enter code"));
              } else if (/^[0-9]{4}$/.test(value)) {
                callback();
              } else {
                callback(new Error("please enter a number of 4 digits"));
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.timingReview();
  },
  methods: {
    /**@method 校验code登录 */
    async review() {
      try {
        let valid = await this.$refs.reviewForm.validate();
        if (!valid) return;
        this.reviewLoading = true;
        try {
          let {
            data: { code, message }
          } = await axios.get(
            `${this.baseUrl + this.reviewUrl}?accessToken=${
              this.accessToken
            }&code=${this.reviewForm.code}`,
            { headers: this.headers }
          );
          this.reviewLoading = false;
          if (code != 0) {
            this.warningAlert(message);
          }
        } catch (e) {
          this.reviewLoading = false;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**@method 发送邮件 */
    async sendMail() {
      try {
        let {
          data: { code, message, result }
        } = await axios.get(
          `${this.baseUrl + this.sendMailUrl}?accessToken=${this.accessToken}`,
          { headers: this.headers }
        );
        if (code == 0) {
          this.sendFlag = true;
          let maxTime = 30;
          this.countDown = `${maxTime}s`;
          let getCodeState = setInterval(() => {
            this.countDown = `${maxTime}s`;
            maxTime--;
            if (maxTime == 0) {
              window.clearInterval(getCodeState);
              this.sendFlag = false;
            }
          }, 1000);
        } else {
          this.sendFlag = false;
        }
      } catch (e) {
        this.sendFlag = false;
      }
    },

    /**@method 定时校验是否授权 */
    async timingReview() {
      try {
        let {
          data: { code, message, result }
        } = await await axios.get(
          `${this.baseUrl + this.checkAuthoriceUrl}?accessToken=${
            this.accessToken
          }`,
          { headers: this.headers }
        );
        const { state, mobile, token, userId, email, passwordExpired } = result;
        if (code == 0) {
          switch (state) {
            case 0: //审核中
              setTimeout(() => {
                this.timingReview();
              }, 1000);
              break;
            case 1: //审核通过
              if (passwordExpired) {
                 this.$refs.changePassword.openModal(token);
              } else {
                this.login(mobile, token, userId, email);
              }
              break;
            case 2: //accessToken 失效
              window.location.href = `/${this.headers["X-Origin"]}/login`;
              break;
          }
        } else {
          //accessToken 失效
          window.location.href = `/${this.headers["X-Origin"]}/login`;
        }
      } catch (e) {
        console.log(e);
      }
    },
    changePwd(result) {
      this.$emit("loginHandle", result);
    },
    /**@method 登录 */
    login(mobile, token, userId, email) {
      this.$emit("loginHandle", {
        mobile: mobile,
        token: token,
        userId: userId,
        email: email
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.review-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
  }
  .review-form {
    min-width: 500px;
  }
  .send-mail {
    padding: 6px 10px 10px 20px;
    color: #2b85e4;
    cursor: pointer;
    display: inline-block;
    &:hover {
      color: #5cadff;
    }
  }
}
</style>

