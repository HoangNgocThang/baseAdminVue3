<template>
  <div class="main-signup-header">
    <form v-if="!isStepInputNewPassword" method="post" id="loginForm">
      <div class="form-group"><label>Tài khoản truy cập</label>
        <input
            v-model="model.username"
            class="form-control"
            placeholder="Tài khoản truy cập"
            name="email"
            type="text" required autofocus></div>
      <div class="form-group"><label>Mật khẩu</label>
        <input
            v-model="model.password"
            class="form-control"
            placeholder="Mật khẩu"
            type="password"
            required name="password">
      </div>
      <div class="form-group"><label>Mã captcha</label>
        <input
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="6"
            type="number"
            v-model="model.captchaCode"
            class="form-control"
            placeholder="Mã captcha"
            required
            name="captchaCode">
      </div>
      <div
          style="display: flex;justify-content: center; flex-direction: row;gap: 10px; margin: 10px;align-items: center"
          id="wrapCaptcha">
        <img :src="url"/>
        <div @click="onClickRefresh">
          <img src="/images/refresh.png" style='width: 30px; height: 30px'/>
        </div>
      </div>
      <button class="btn btn-primary btn-block" type="button" @click="loginByPwd()">Đăng nhập</button>
      <div
          style="display: flex; flex-direction: row; margin-top: 30px; gap: 8px; justify-content: center;align-items: center">
        <a-button @click="onClickButtonRegister" style="width: 145px">
          <p>Đăng ký tài khoản</p>
        </a-button>
        <a-button @click="onClickButtonForgotPassword" style="width: 145px">
          <p>Quên mật khẩu</p>
        </a-button>
      </div>
    </form>
    <form v-else method="post" id="newPasswordForm">
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
    <div class="modal" tabindex="-1" ref="otpModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Vui lòng nhập OTP</h5>
            <button @click="hideOtpModal()" type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal"
                    aria-label="Close">
              <i class="fas fa-times"/>
            </button>
          </div>
          <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
            <div class="form-group">
              <label>Vui lòng nhập OTP</label>
              <input v-model="otp" :disabled="otpRemainTime === 0" class="form-control" placeholder="OTP">
            </div>
            <div class="form-group">
              <label>Mã OTP hết hiệu lực trong vòng <strong>{{ otpRemainTime }}</strong> giây</label>
            </div>
            <p style="color: red">{{ errorOTP }}</p>
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
import {getDeviceId} from "@/lib/device";
import config from "@/config";
import {mapState} from 'pinia';
import {mapActions} from 'pinia';
import {useAuthStore} from "@/store/auth";
import {Modal} from 'ant-design-vue';
import {RESET_AUTH, SAVE_AUTH} from "@/store/actionTypes";
import {removeAccessToken, setAccessToken} from "@/lib/auth";
import {API_CODE} from "@/define";

let otpIntervalId: any;
export default {
  name: "LoginApp",
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
  data() {
    return {
      count: 0,
      otpRemainTime: 0,
      otp: '',
      errorOTP: '',
      tempTokenOtp: '',
      url: `${config.BASE_API_URL}/ew-public/user/auth/v1/create-captcha-login?count=0`,
      model: {
        deviceId: getDeviceId(),
        captchaCode: '',
        username: '77777_DinhTienHoang',
        password: ''
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
    ...mapActions(useAuthStore, {
      SAVE_AUTH,
      RESET_AUTH
    }),
    onClickButtonForgotPassword() {
      this.$router.push('/forgot-password')
    },
    onClickButtonRegister() {
      this.$router.push('/register')
    },
    onClickRefresh() {
      this.model.captchaCode = ''
      this.count = this.count + 1
      this.url = `${config.BASE_API_URL}/ew-public/user/auth/v1/create-captcha-login?count=${this.count}`
    },
    async loginByPwd() {
      try {
        const res = await $post('/ew-public/user/auth/v1/login', this.model);
        console.log('RES loginByPwd:', res)
        const {code, body} = res;
        this.onClickRefresh()
        if (code === API_CODE.SUCCESS) {
          await setAccessToken(body?.accessToken)
          this.authStore.SAVE_AUTH(body)
          config.refreshToken = body?.refreshToken
          if (res?.body?.firstActive) {
            // Là lần đầu đăng nhập
            this.otpRemainTime = 120;
            this.showOtpModal();
            this.startOtpCounter();
          } else {
            this.$router.push("/")
          }
        }
        // lỗi sai captcha
        else if (code === 'CTC-001') {
          Modal.error({
            title: 'Thông báo',
            content: res?.message,
          });
        } else {
          Modal.error({
            title: 'Thông báo',
            content: res?.message,
          });
        }
      } catch (e:any) {
        Modal.error({
          title: 'Thông báo',
          content: e?.message,
        });
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
      this.onClickRefresh()
    },
    async confirmOtp() {
      try {
        this.tempTokenOtp = '';
        this.errorOTP = '';
        const params = {
          tempToken: this.authStore.auth?.tempToken,
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
      } catch (e:any) {
        Modal.error({
          title: 'Thông báo',
          content: e?.message,
        });
      }
    },
    onClickCancel() {
      this.isStepInputNewPassword = false
      this.modal.hide();
      this.onClickRefresh()
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
        } catch (e:any) {
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

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
