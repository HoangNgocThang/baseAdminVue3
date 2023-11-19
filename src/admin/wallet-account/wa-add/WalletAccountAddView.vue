<template>
  <div class="main-content app-content">
    <div class="main-container container-fluid">
      <div class="breadcrumb-header justify-content-between">
        <div class="justify-content-center mt-2">
          <ol class="breadcrumb">
            <li class="breadcrumb-item tx-15"><a href="javascript:void(0);">TRANG CHỦ</a></li>
            <li class="breadcrumb-item tx-15" aria-current="page">Quản lý tài khoản ví</li>
            <li class="breadcrumb-item tx-15 active" aria-current="page">Thêm mới tài khoản Ví</li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="card" style="width: 95%; min-height: 500px; padding: 12px">
            <h5>Tạo tài khoản Ví</h5>
            <a-form ref="ruleForm" :model="filters" layout="vertical">
              <a-card style="width: 100%;border: none">
                <a-row :gutter="16" type="flex">
                  <a-col :xs="12" :md="12" :lg="12">
                    <a-form-item
                        label="Số tài khoản"
                        name="number"
                        style="margin-bottom: 8px"
                        :rules="[{
                          required: true,
                          message: 'Trường bắt buộc'
                         },
                        ]"
                    >
                      <a-input
                          :disabled="true"
                          placeholder="Nhập số tài khoản"
                          v-model:value="filters.number"
                          :maxLength="200">
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16" type="flex">
                  <a-col :xs="24" :md="24" :lg="24">
                    <a-form-item
                        label="Tên tài khoản"
                        name="name"
                        style="margin-bottom: 8px"
                        :rules="[{
                          required: true,
                          message: 'Trường bắt buộc'
                         },
                        ]"
                    >
                      <a-input
                          placeholder="Nhập tên tài khoản"
                          v-model:value="filters.name"
                          :maxLength="200">
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16" type="flex">
                  <a-col :xs="24" :md="24" :lg="24">
                    <a-form-item
                        label="Diễn giải"
                        name="description"
                        :rules="[{
                          required: true,
                          message: 'Trường bắt buộc'
                        }]"
                        style="margin-bottom: 8px"
                    >
                      <a-input
                          placeholder="Diễn giải thông tin tài khoản"
                          v-model:value="filters.description"
                          :maxLength="500">
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <div style="display: flex; width: 100%; flex-direction: row; justify-content: flex-end; gap: 10px">
                  <a-button
                      @click="onClickButtonNext"
                      style="background-color: rgba(245, 154, 35, 1); color: white">
                    Tiếp tục
                  </a-button>
                  <a-button
                      @click="onClickButtonReject"
                  >
                    Bỏ qua
                  </a-button>
                </div>
              </a-card>
            </a-form>
          </div>
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
            <label>Mật khẩu <span style="color: red">*</span></label>
            <input
                name="password"
                v-model="password"
                class="form-control"
                placeholder="Vui lòng nhập mật khẩu"
                type="password"
                required
            >
            <p v-if="erroPass!==''" style="color: red; margin-top: 4px">{{ erroPass }}</p>
          </div>
        </div>
        <div class="modal-footer flex-center">
          <a-button
              @click="confirm"
              style="background-color: rgba(245, 154, 35, 1); color: white; width: 80px">
            Gửi
          </a-button>
          <a-button
              @click="reject"
              style="width: 80px"
          >
            Hủy bỏ
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {$post} from "@/lib/utils";
import {PlusOutlined} from "@ant-design/icons-vue";
import {notification} from 'ant-design-vue';
import {API_CODE} from "@/define";

export default {
  name: "WalletAccountAddView",
  components: {PlusOutlined},
  data() {
    return {
      filters: {
        number: '', // Số tài khoản
        name: '', // Tên tài khoản
        description: '', // Diễn giải
      },
      password: '', // Mật khẩu
      erroPass: ''
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.otpModal, {
      backdrop: 'static',
      keyboard: false
    });
    this.onGenerateNumber()
  },
  methods: {
    showOtpModal() {
      this.modal.show();
    },
    hideOtpModal() {
      this.modal.hide();
    },
    onValidate() {
      if (this.password === '') {
        this.erroPass = 'Trường bắt buộc'
        return false
      }
      return true
    },
    onReset() {
      this.filters.name = ''// Tên tài khoản
      this.filters.description = ''// Diễn giải
      this.password = ''
      this.erroPass = ''
      this.onGenerateNumber()
    },
    async confirm() {
      if (this.onValidate()) {
        try {
          const params = {
            number: this.filters.number,
            name: this.filters.name,
            description: this.filters.description,
            password: this.password
          }
          const res = await $post(`/ew-web/organization/account/v1/create`, params);
          const {code, body, message} = res;
          if (code === API_CODE.SUCCESS) {
            this.onReset()
            this.openNotificationWithIcon('success', 'Thông báo', message)
            this.hideOtpModal()
          } else {
            this.onReset()
            this.hideOtpModal()
            this.openNotificationWithIcon('error', 'Thông báo', message)
          }
        } catch (e: any) {
          this.onReset()
          this.openNotificationWithIcon('error', 'Thông báo', e?.message)
        }
      }
    },
    reject() {
      this.erroPass = ''
      this.hideOtpModal()
    },
    openNotificationWithIcon(type: string, title: string, des: string) {
      // type  success | info | warning | error
      notification[type]({
        message: title,
        description: des,
      });
    },
    onClickButtonNext() {
      this.$refs.ruleForm.validate().then(() => {
        this.showOtpModal()
      }).catch((error: any) => {
        console.log('error', error);
      });
    },
    onClickButtonReject() {
      this.$router.back()
    },
    async onGenerateNumber() {
      try {
        const res = await $post('/ew-web/organization/account/v1/generate-number')
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.filters.number = body?.accountNumber
        } else {
          this.openNotificationWithIcon('error', 'Thông báo', message)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>