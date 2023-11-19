<template>
  <div class="modal" tabindex="-1" ref="otpModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div
              style="display: flex;flex-direction: row; align-items: center; justify-content: space-between;width: 100% ">
            <h5 class="modal-title">Vui lòng xác nhận lại hành động bằng mật khẩu đăng nhập:</h5>
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
            <input v-model="otp" class="form-control" placeholder="Vui lòng nhập mật khẩu">
          </div>
          <p v-if="errorOTP!==''" style="color: red">{{ errorOTP }}</p>
        </div>
        <div class="modal-footer flex-center">
          <button type="button" @click="confirm" class="btn btn-ok btn-primary">
            Gửi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "ModalPassword",
  props: {
    // visibleModalForm: {
    //   type: Boolean,
    //   default: false,
    //   required: true
    // },
  },
  data() {
    return {
      otp: '',
      errorOTP: ''
    }
  },
  mounted() {
  },
  methods: {
    showOtpModal() {
      this.modal.show();
    },
    hideOtpModal() {
      this.modal.hide();
    },
    confirm() {

    }
  },
}
</script>


<style lang="scss" scoped>

@import "ant-design-vue/dist/reset.css";
@import "@/scss/register.scss";

</style>