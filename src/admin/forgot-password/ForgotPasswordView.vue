<!--<template>-->
<!--  <div class="main-signup-header">-->
<!--    <form v-if="!isStepInputNewPassword" method="post" id="loginForm">-->
<!--      <div class="form-group"><label>1Tài khoản truy cập1</label>-->
<!--        <input-->
<!--            v-model="model.username"-->
<!--            class="form-control"-->
<!--            placeholder="Tài khoản truy cập"-->
<!--            name="email"-->
<!--            type="text" required autofocus></div>-->
<!--      <div class="form-group"><label>Mật khẩu</label>-->
<!--        <input-->
<!--            v-model="model.password"-->
<!--            class="form-control"-->
<!--            placeholder="Mật khẩu"-->
<!--            type="password"-->
<!--            required name="password">-->
<!--      </div>-->
<!--      <div class="form-group"><label>Mã captcha</label>-->
<!--        <input-->
<!--            v-model="model.captchaCode"-->
<!--            class="form-control"-->
<!--            placeholder="Mã captcha"-->
<!--            required-->
<!--            name="captchaCode">-->
<!--      </div>-->
<!--      <div-->
<!--          style="display: flex;justify-content: center; flex-direction: row;gap: 10px; margin: 10px;align-items: center"-->
<!--          id="wrapCaptcha">-->
<!--        <img :src="url"/>-->
<!--        <div @click="onClickRefresh">-->
<!--          <img src="/images/refresh.png" style='width: 30px; height: 30px'/>-->
<!--        </div>-->
<!--      </div>-->
<!--      <button class="btn btn-primary btn-block" type="button" @click="loginByPwd()">Đăng nhập</button>-->
<!--      <div-->
<!--          style="display: flex; flex-direction: row; margin-top: 30px; gap: 8px; justify-content: center;align-items: center">-->
<!--        <a-button @click="onClickButtonRegister" style="width: 145px">-->
<!--          <p>Đăng ký tài khoản</p>-->
<!--        </a-button>-->
<!--        <a-button @click="onClickButtonForgotPassword" style="width: 145px">-->
<!--          <p>Quên mật khẩu</p>-->
<!--        </a-button>-->
<!--      </div>-->
<!--    </form>-->
<!--    <form v-else method="post" id="newPasswordForm">-->
<!--      <div class="form-group"><label>Mật khẩu mới</label>-->
<!--        <input-->
<!--            v-model="modelNewPassword.newPass"-->
<!--            class="form-control"-->
<!--            placeholder="Mật khẩu mới"-->
<!--            name="email"-->
<!--            type="text" required autofocus></div>-->
<!--      <div class="form-group"><label>Nhập lại mât khẩu mới</label>-->
<!--        <input-->
<!--            v-model="modelNewPassword.reNewPass"-->
<!--            class="form-control"-->
<!--            placeholder="Mật khẩu mới"-->
<!--            type="password"-->
<!--            required name="password">-->
<!--      </div>-->
<!--      <div-->
<!--          style="display: flex; flex-direction: column; border: 1px solid #ededf5;border-radius: 5px; padding: 8px; margin: 10px 0">-->
<!--        <p style="color: red">Lưu ý:</p>-->
<!--        <p>- Mật khẩu có độ dài ít nhất 8 kí tự</p>-->
<!--        <p>- Mật khẩu có ít nhất một chữ cái viết thường</p>-->
<!--        <p>- Mật khẩu có ít nhất một chữ cái viết hoa</p>-->
<!--        <p>- Mật khẩu có ít nhất một kí tự đặc biệt</p>-->
<!--        <p>- Mật khẩu không chứa dấu cách trống</p>-->
<!--        <p>- Mật khẩu không trùng với mật khẩu gần nhất</p>-->
<!--      </div>-->
<!--      <div style="display: flex;justify-content: center;gap: 10px">-->
<!--        <a-button-->
<!--            @click="onClickCancel"-->
<!--            style="width: 80px">Hủy-->
<!--        </a-button>-->
<!--        <a-button-->
<!--            type="primary"-->
<!--            @click="onClickContinute"-->
<!--            style="background-color: rgba(245, 154, 35, 1); width: 80px">-->
<!--          Tiếp tục-->
<!--        </a-button>-->
<!--      </div>-->
<!--    </form>-->
<!--    <div class="modal" tabindex="-1" ref="otpModal">-->
<!--      <div class="modal-dialog">-->
<!--        <div class="modal-content">-->
<!--          <div class="modal-header">-->
<!--            <h5 class="modal-title">Vui lòng nhập OTP</h5>-->
<!--            <button @click="hideOtpModal()" type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal"-->
<!--                    aria-label="Close">-->
<!--              <i class="fas fa-times"/>-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">-->
<!--            <div class="form-group">-->
<!--              <label>Vui lòng nhập OTP</label>-->
<!--              <input v-model="otp" :disabled="otpRemainTime === 0" class="form-control" placeholder="OTP">-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--              <label>Mã OTP hết hiệu lực trong vòng <strong>{{ otpRemainTime }}</strong> giây</label>-->
<!--            </div>-->
<!--            <p style="color: red">{{ errorOTP }}</p>-->
<!--          </div>-->
<!--          <div class="modal-footer flex-center">-->
<!--            <button :disabled="otpRemainTime === 0" type="button" @click="confirmOtp()" class="btn btn-ok btn-primary">-->
<!--              Gửi-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="container-blank-layout">
    <div class="limiter">
      <div class="container-login">
        <div class="wrap-login">
          <div style="min-height: 1200px; width: 100%">
            <div
                style="display: flex; flex-direction: column; width: 100%;align-items: center; justify-content: center">
              <img src="/assets/vnpost_logo.svg" style="width: 180px; height:135px">
              <h3>Quên mật khẩu</h3>
            </div>

            <form v-if="!isStepInputNewPassword" method="post" id="loginForm">
              <a-row :gutter="16" type="flex" style="margin-top: 20px;margin-bottom: 14px">
                <a-col :xs="24" :md="24" :lg="24">
                  <p>Vui lòng nhập email hoặc số điện thoại đăng ký đễ lấy lại mật khẩu</p>
                  <a-radio-group v-model:value="value" @change="onChange" style="padding: 6px">
                    <a-radio :value="2">
                      Email
                    </a-radio>
                    <a-radio :value="1">
                      Số điện thoại
                    </a-radio>
                  </a-radio-group>
                </a-col>
              </a-row>
              <div class="form-group">
                <slot v-if="value===2">
                  <label>Email</label>
                  <input
                      v-model="model.email"
                      class="form-control"
                      placeholder="Vui lòng nhập email"
                      name="email"
                      type="text" required autofocus>
                </slot>
                <slot v-if="value===1">
                  <label>Số điện thoại</label>
                  <input
                      v-model="model.phone"
                      class="form-control"
                      placeholder="Vui lòng nhập số điện thoại"
                      name="email"
                      type="text" required autofocus>
                </slot>
              </div>
              <button class="btn btn-primary btn-block" type="button" @click="loginByPwd()">Tiếp tục</button>
            </form>

            <form v-if="isStepInputNewPassword" method="post" id="newPasswordForm">
              <div class="form-group"><label>Mật khẩu mới</label>
                <input
                    v-model="modelNewPassword.newPass"
                    class="form-control"
                    placeholder="Mật khẩu mới"
                    name="email"
                    type="text" required autofocus></div>
              <div class="form-group"><label>Nhập lại mât khẩu mới</label>
                <input
                    v-model="modelNewPassword.reNewPass"
                    class="form-control"
                    placeholder="Mật khẩu mới"
                    type="password"
                    required name="password">
              </div>
              <div
                  style="display: flex; flex-direction: column; border: 1px solid #ededf5;border-radius: 5px; padding: 8px; margin: 10px 0">
                <p style="color: red">Lưu ý:</p>
                <p>- Mật khẩu có độ dài ít nhất 8 kí tự</p>
                <p>- Mật khẩu có ít nhất một chữ cái viết thường</p>
                <p>- Mật khẩu có ít nhất một chữ cái viết hoa</p>
                <p>- Mật khẩu có ít nhất một kí tự đặc biệt</p>
                <p>- Mật khẩu không chứa dấu cách trống</p>
                <p>- Mật khẩu không trùng với mật khẩu gần nhất</p>
              </div>
              <div style="display: flex;justify-content: center;gap: 10px">
                <a-button
                    @click="onClickCancel"
                    style="width: 80px">Hủy
                </a-button>
                <a-button
                    type="primary"
                    @click="onClickContinute"
                    style="background-color: rgba(245, 154, 35, 1); width: 80px">
                  Tiếp tục
                </a-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" ref="otpModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div
                style="display: flex;flex-direction: row; align-items: center; justify-content: space-between;width: 100% ">
              <h5 class="modal-title">Vui lòng nhập OTP</h5>
              <button @click="hideOtpModal()"
                      type="button"
                      style="color: inherit;font-size: 24px;background: none !important;border: none"
                      class="modal-btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close">
                <i class="fas fa-times"/>
              </button>
            </div>
          </div>
          <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
            <div class="form-group">
              <label>Vui lòng nhập OTP</label>
              <input v-model="otp" :disabled="otpRemainTime === 0" class="form-control" placeholder="OTP">
            </div>
            <div class="form-group">
              <label>Mã OTP hết hiệu lực trong vòng <strong>{{ otpRemainTime }}</strong> giây</label>
            </div>
            <p v-if="errorOTP!==''" style="color: red">{{ errorOTP }}</p>
          </div>
          <div class="modal-footer flex-center">
            <a-button
                :disabled="otpRemainTime === 0"
                type="primary"
                @click="confirmOtp()"
                style="background-color: rgba(245, 154, 35, 1); color: white; margin-bottom: 10px; width: 100px">
              Gửi
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {$post} from "@/lib/utils";
import config from "@/config";
import {mapState} from 'pinia';
import {useAuthStore} from "@/store/auth";
import {Modal} from 'ant-design-vue';
import {removeAccessToken, setAccessToken} from "@/lib/auth";
import Step1 from "@/admin/register/Step1.vue";
import Step4 from "@/admin/register/Step4.vue";
import Step2 from "@/admin/register/Step2.vue";
import Step3 from "@/admin/register/Step3.vue";
import {API_CODE} from "@/define";

let otpIntervalId: any;
export default {
  name: "ForgotPasswordView",
  components: {Step3, Step2, Step4, Step1},
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
  data() {
    return {
      value: 2,
      tempToken: '',
      otpRemainTime: 0,
      otp: '',
      errorOTP: '',
      tempTokenOtp: '',
      url: `${config.BASE_API_URL}/ew-public/user/auth/v1/create-captcha-login?count=0`,
      model: {
        phone: '',
        email: ''
      },
      isStepInputNewPassword: false,
      modelNewPassword: {
        newPass: '',
        reNewPass: ''
      },
    }
  },
  mounted() {
    removeAccessToken();
    this.authStore.RESET_AUTH()
    this.modal = new bootstrap.Modal(this.$refs.otpModal, {
      backdrop: 'static',
      keyboard: false
    });
  },
  computed: {
    ...mapState(useAuthStore, {
      auth: 'auth',
    }),
  },
  methods: {
    onChange(e: any) {
      console.log('radio checked', e.target.value);
    },
    onClickButtonRegister() {
      this.$router.push('/register')
    },
    onValidateFP() {
      if (this.value === 1 && this.model.phone === '') {
        Modal.error({
          title: 'Thông báo',
          content: 'Vui lòng nhập số điện thoại',
        });
        return false
      }
      if (this.value === 2 && this.model.email === '') {
        Modal.error({
          title: 'Thông báo',
          content: 'Vui lòng nhập email',
        });
        return false
      }
      return true
    },
    async loginByPwd() {
      if (this.onValidateFP()) {
        try {
          const params = {
            emailOrMobileNub: this.value === 1 ? this.model.phone : this.model.email,
            forgotPwType: this.value
          }
          const res = await $post('/ew-public/user/auth/v1/forgot-password', params);
          const {code, body} = res;
          if (code === API_CODE.SUCCESS) {
            this.tempToken = body?.tempToken
            this.otpRemainTime = 120;
            this.showOtpModal();
            this.startOtpCounter();
          } else {
            Modal.error({
              title: 'Thông báo',
              content: res?.message,
            });
          }
        } catch (e) {
          Modal.error({
            title: 'Thông báo',
            content: e?.message,
          });
        }
      }
    },
    startOtpCounter() {
      clearInterval(otpIntervalId);
      otpIntervalId = setInterval(() => {
        this.otpRemainTime--;
        if (this.otpRemainTime <= 0) {
          clearInterval(otpIntervalId);
        }
      }, 1000)
    },
    showOtpModal() {
      this.modal.show();
    },
    hideOtpModal() {
      this.modal.hide();
    },
    async confirmOtp() {
      try {
        this.tempTokenOtp = '';
        this.errorOTP = '';
        const params = {
          tempToken: this.tempToken,
          otp: this.otp
        }
        console.log('PPPP', this.authStore.auth)
        const res = await $post('/ew-public/user/auth/v1/verify-password', params)
        const {code, body} = res;
        console.log('res PP', res)
        if (code === API_CODE.SUCCESS) {
          this.isStepInputNewPassword = true
          this.tempTokenOtp = body?.tempToken
          this.hideOtpModal()
        } else {
          // Modal.error({
          //   title: 'Thông báo',
          //   content: res?.message,
          // });
          this.errorOTP = res?.message
        }
      } catch (e: any) {
        Modal.error({
          title: 'Thông báo',
          content: e?.message,
        });
      }
    },
    onClickCancel() {
      this.isStepInputNewPassword = false
      this.modal.hide();
    },
    onValidate() {
      if (this.modelNewPassword.newPass === '' || this.modelNewPassword.reNewPass === '') {
        Modal.error({
          title: 'Thông báo',
          content: 'Vui lòng điền mật khấu mới',
        });
        return false
      }
      if (this.modelNewPassword.newPass !== this.modelNewPassword.reNewPass) {
        Modal.error({
          title: 'Thông báo',
          content: 'Hai mật khẩu không khớp nhau',
        });
        return false
      }
      return true
    },
    async onClickContinute() {
      if (this.onValidate()) {
        try {
          const param = {
            tempToken: this.tempTokenOtp,
            newPassword: this.modelNewPassword.newPass
          }
          const res = await $post('/ew-web/user/auth/v1/reset-password', param)
          console.log('res onClickContinute', res)
          const {code} = res;
          if (code === API_CODE.SUCCESS) {
            this.$router.push("/")
          } else {
            Modal.error({
              title: 'Thông báo',
              content: res?.message,
            });
          }
        } catch (e: any) {
          Modal.error({
            title: 'Thông báo',
            content: e?.message,
          });
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

@import "ant-design-vue/dist/reset.css";
@import "@/scss/register.scss";

.wrap-step {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center
}

.item-step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: orange;
  border-radius: 17px
}

.line-item-step {
  display: flex;
  width: 100px;
  height: 1px;
  background-color: black;
  align-self: center;
  margin: 0 2px
}

.text-item-step {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 0;
}

p {
  margin-bottom: 0;
}

.title-register {
  font-size: 24px;
  font-weight: bold;
}

.sub-title-register {
  font-size: 20px;
  font-weight: bold;
}

</style>
