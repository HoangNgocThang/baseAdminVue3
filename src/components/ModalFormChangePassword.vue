<template>
  <div>
    <a-drawer
        style="overflow: scroll; padding-bottom: 30px"
        :visible="visibleModalForm"
        width="25%"
        @close="closeModal"
        :destroy-on-close="true"
        :maskClosable="false"
        :title="'Đổi mật khẩu'">
      <a-spin :spinning="loading">
        <div style="padding: 0 0 60px 0; margin: 0">
          <a-form ref="ruleFormChangePassword" :model="filters" layout="vertical">
            <a-card style="width: 100%;border: none">
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-item
                      label="Mật khẩu hiện tại"
                      name="passCurrent"
                      style="margin-bottom: 8px"
                      :rules="[{
                       required: true,
                       message: 'Trường bắt buộc'
                 },
                ]"
                  >
                    <a-input
                        placeholder="Nhập mật khẩu hiện tại"
                        v-model:value="filters.passCurrent"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-item
                      label="Mật khẩu mới"
                      name="passNew"
                      style="margin-bottom: 8px"
                      :rules="[{
                         required: true,
                         message: 'Trường bắt buộc'
                 },
                ]"
                  >
                    <a-input
                        placeholder="Nhập mật khẩu mới"
                        v-model:value="filters.passNew"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24">
                  <a-form-item
                      label="Mật khẩu mới"
                      name="passNew2"
                      style="margin-bottom: 8px"
                      :rules="[{
                        required: true,
                        message: 'Trường bắt buộc'
                 },
                ]"
                  >
                    <a-input
                        placeholder="Nhập lại mật khẩu mới"
                        v-model:value="filters.passNew2"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-card>
          </a-form>
          <a-card style="width: 100%;border: none">
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
          </a-card>
        </div>
      </a-spin>
      <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
            }"
      >
        <a-button :style="{ marginLeft: '8px' }" @click="closeModal">
          Bỏ qua
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" type="primary" @click="onSave">
          Đồng ý
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">

import {Modal} from 'ant-design-vue';
import {PlusOutlined, ExclamationCircleOutlined} from "@ant-design/icons-vue";
import {createVNode} from 'vue'
import {$post} from "@/lib/utils";
import {API_CODE} from "@/define";

export default {
  components: {
    PlusOutlined,
    Modal,
    ExclamationCircleOutlined
  },
  props: {
    visibleModalForm: {
      type: Boolean,
      default: false,
      required: true
    },
    // providerData: {
    //   type: Array,
    //   default: null,
    //   required: true
    // },
  },
  data() {
    return {
      filters: {
        passCurrent: '',
        passNew: '',
        passNew2: ''
      },
      listProvinceByStaff: [],
      listDistrictByStaff: [],
      listCommuneByStaff: [],
      listNV: [],
      form: {
        provinceUnitId: '', // Mã Tỉnh
        districtUnitId: '', // Mã Huyện
        communeUnitId: '', // Mã Bưu cục
        personPhoneNub: null // Số điện thoại Nhân viên tư vấn
      },
      provinceUnitId: '',
      districtUnitId: '',
      communeUnitId: '',
      loading: false,
      disabledProvince: true,
      disabledDistrict: true,
      disabledCommune: true,
      disabledNV: true
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    closeModal(_: any, reload = false) {
      this.$emit('closeModal', reload)
    },
    onSave() {
      this.$refs.ruleFormChangePassword.validate().then(() => {
        Modal.confirm({
          title: 'Đổi mật khẩu',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Bạn có chắc muốn đổi mật khẩu ?',
          okText: 'Đồng ý',
          cancelText: 'Bỏ qua',
          onOk: async () => {
            try {
              if (this.filters.passNew !== this.filters.passNew2) {
                Modal.error({
                  title: 'Thông báo',
                  content: 'Mật khẩu mới không khớp nhau',
                });
              } else {
                const param = {
                  password: this.filters.passCurrent,
                  newPassword: this.filters.passNew,
                }
                const res = await $post('/ew-web/user/auth/v1/change-password', param);
                const {code} = res;
                if (code === API_CODE.SUCCESS) {
                  Modal.success({
                    title: 'Thông báo',
                    content: 'Đổi mật khẩu thành công',
                  });
                  setTimeout(() => {
                    this.$router.push({name: 'login'})
                  })
                } else {
                  Modal.error({
                    title: 'Thông báo',
                    content: res?.message,
                  });
                }
              }
            } catch (e) {

            }
          }
        });
      }).catch((error: any) => {
        //error?.errorFields[0].name.toString()
        console.log('error', error,);
      });
      // const _this = this
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      //     this.$confirm({
      //       title: `Phân tuyến`,
      //       content: `Bạn có chắc chắn muốn thực hiện thao tác`,
      //       onOk() {
      //         _this.onAssignment()
      //       }
      //     })
      //   }
      // })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  },
  watch: {
    'form.communeUnitId': function () {
      console.log('vao111444')
      this.disabledNV = false
      this.form.personPhoneNub = null
      this.listNV = []
      const params =
          {
            orgUnitCode: this.listCommuneByStaff.find(e => e?.orgUnitId === this.form.communeUnitId)?.orgUnitCode || ''
          }
      this.onFindByOrgUnitCode(params)
    },
    'form.provinceUnitId': function () {
      this.form.personPhoneNub = null
      this.listNV = []
    },
    'form.districtUnitId': function () {
      this.form.personPhoneNub = null
      this.listNV = []
    }
  }
}
</script>
