<template>
  <slot>
    <a-form ref="ruleForm3" :model="filters3" layout="vertical" class="ant-advanced-search-form">
      <span class="sub-title-register">Thông tin tài khoản</span>
      <a-row :gutter="16" type="flex" style="margin-top: 20px;margin-bottom: 14px">
        <a-col :xs="24" :md="24" :lg="24">
          <p>Cấp phê duyệt</p>
          <a-radio-group v-model:value="value" @change="onChange">
            <a-radio :value="2">
              2 cấp phê duyệt
            </a-radio>
            <a-radio :value="1">
              3 cấp phê duyệt
            </a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <div v-if="value===1" style="width: 100%;border: none">
        <span class="sub-title-register" style="margin-top: 20px">Cấp kế toán viên</span>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="userFullName31"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters3.userFullName31"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="userMobileNumber31"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di động"
                  v-model:value="filters3.userMobileNumber31"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="userEmail31"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters3.userEmail31"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div style="width: 100%;border: none">
        <span class="sub-title-register" style="margin-top: 20px">Cấp kế toán trưởng</span>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="userFullName32"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters3.userFullName32"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="userMobileNumber32"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di động"
                  v-model:value="filters3.userMobileNumber32"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="userEmail32"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters3.userEmail32"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div style="width: 100%;border: none">
        <span class="sub-title-register" style="margin-top: 20px">Cấp giám đốc</span>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Họ và tên"
                name="userFullName33"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Họ và tên"
                  v-model:value="filters3.userFullName33"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="userMobileNumber33"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di động"
                  v-model:value="filters3.userMobileNumber33"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="userEmail33"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email"
                  v-model:value="filters3.userEmail33"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </a-form>
    <div style="display: flex;justify-content: center;gap: 20px">
      <a-button
          @click="onClickButtonPre"
          style="width: 80px; border-radius: 2px">
        Quay lại
      </a-button>
      <a-button
          type="primary"
          @click="onClickButtonNext"
          style="background-color: rgba(245, 154, 35, 1); width: 80px">
        Tiếp tục
      </a-button>
    </div>
  </slot>
</template>

<script lang="ts">
import {useRegisterStore} from "@/store/register";
import {mapActions, mapState} from "pinia";
import {Modal} from 'ant-design-vue';
import {
  SAVE_STATE_STEP1_REGISTER,
  SAVE_STATE_STEP2_REGISTER,
  SAVE_STATE_STEP3_REGISTER,
  SET_STEP_REGISTER,
  RESET_STATE_REGISTER
} from "@/store/actionTypes";

export default {
  name: "Step3",
  components: {},
  setup() {
    const registerStore = useRegisterStore()

    return {registerStore}
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
      value: 2,
      filters3: {
        userLevel31: 1, //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
        userFullName31: "",
        userMobileNumber31: "",
        userEmail31: "",

        userLevel32: 2, //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
        userFullName32: "",
        userMobileNumber32: "",
        userEmail32: "",

        userLevel33: 3, //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
        userFullName33: "",
        userMobileNumber33: "",
        userEmail33: ""
      },
    }
  },
  created() {
    console.log()
  },
  computed: {
    ...mapState(useRegisterStore, {
      currentStep: 'currentStep',
      formStep31: 'formStep31',
      formStep32: 'formStep32',
      formStep33: 'formStep33'
    })
  },
  mounted() {
    this.mapInitState()
  },
  methods: {
    ...mapActions(useRegisterStore, {
      SAVE_STATE_STEP1_REGISTER,
      SAVE_STATE_STEP2_REGISTER,
      SAVE_STATE_STEP3_REGISTER,
      SET_STEP_REGISTER,
    }),
    mapInitState() {

      this.filters3.userLevel31 = this.formStep31.userLevel //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
      this.filters3.userFullName31 = this.formStep31.userFullName
      this.filters3.userMobileNumber31 = this.formStep31.userMobileNumber
      this.filters3.userEmail31 = this.formStep31.userEmail

      this.filters3.userLevel32 = this.formStep32.userLevel//1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
      this.filters3.userFullName32 = this.formStep32.userFullName
      this.filters3.userMobileNumber32 = this.formStep32.userMobileNumber
      this.filters3.userEmail32 = this.formStep32.userEmail

      this.filters3.userLevel33 = this.formStep33.userLevel //1 - Kế toán viên, 2 - Kế toán trưởng, 3 - Giám đốc
      this.filters3.userFullName33 = this.formStep33.userFullName
      this.filters3.userMobileNumber33 = this.formStep33.userMobileNumber
      this.filters3.userEmail33 = this.formStep33.userEmail

    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    onClickButtonPre() {
      this.SET_STEP_REGISTER(2)
    },
    onValidateStep3() {
      return true
    },
    onClickButtonNext() {
      this.$refs.ruleForm3.validate().then(() => {
        if (this.onValidateStep3()) {
          this.scrollToTop()
          this.SAVE_STATE_STEP3_REGISTER(this.filters3)
        }
      }).catch((error: any) => {
        //error?.errorFields[0].name.toString()
        console.log('error', error, );
      });
    },
    onChange(e: any) {
      console.log('radio checked', e.target.value);
    },
  },
  watch: {}
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
