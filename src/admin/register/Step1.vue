<template>
  <slot>
    <a-form ref="ruleForm1" :model="filters1" layout="vertical">
      <a-card style="width: 100%;border: none">
        <span class="title-register">Thông tin doanh nghiệp</span>
        <a-row :gutter="16" type="flex" style="margin-top: 20px">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Đơn vị trực thuộc"
                name="taxCodeParent"
                style="margin-bottom: 8px"
            >
              <a-input-search
                  v-model:value="filters1.taxCodeParent"
                  placeholder="Nhập mã số thuế"
                  enter-button
                  @search="onSearch"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="orgParent!==null" :gutter="16" type="flex" style="margin-right: 12px ">
          <a-col :xs="24" :md="24" :lg="24"
                 style="margin-left: 8px; ;padding: 8px; margin-bottom: 10px;border-width: 1px;border-style: solid;border-color: #d9d9d9;">
            <div style="display: flex; flex-direction: row;">
              <p>Tên công ty: </p>
              <p style="margin-left: 10px; font-weight: bold">{{ orgParent?.orgFullName }}</p>
            </div>
            <div style="display: flex; flex-direction: row">
              <p>Địa chỉ: </p>
              <p style="margin-left: 10px; font-weight: bold">{{ orgParent?.fullAddress }}</p>
            </div>
            <div style="display: flex; flex-direction: row">
              <p>Email: </p>
              <p style="margin-left: 10px; font-weight: bold">{{ orgParent?.orgEmail }}</p>
            </div>
            <div style="display: flex; flex-direction: row">
              <p>SĐT: </p>
              <p style="margin-left: 10px; font-weight: bold">{{ orgParent?.orgMobileNumber }}</p>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Tên tổ chức"
                name="orgFullName"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Tên tổ chức"
                  v-model:value="filters1.orgFullName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Tên viết tắt"
                name="orgShortName"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Tên viết tắt"
                  v-model:value="filters1.orgShortName"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Đối tượng"
                name="orgType"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.orgType">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Khách hàng nội bộ</a-select-option>
                <a-select-option :value="2" :key="2">Khách hàng ngoài</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Lĩnh vực"
                name="orgField"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.orgField">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="1" :key="1">Thu hộ</a-select-option>
                <a-select-option :value="2" :key="2">Chi hộ</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Mô tả"
                name="description"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Mô tả ngành kinh doanh"
                  v-model:value="filters1.description"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Mã số thuế"
                name="taxCode"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Mã số thuế của tổ chức"
                  v-model:value="filters1.taxCode"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                name="effectiveDateTax"
                label="Ngày cấp"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-date-picker
                  :allow-clear="false"
                  v-model:value="filters1.effectiveDateTax"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  placeholder="Ngày cấp"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Nơi cấp"
                name="placeTax"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Nơi cấp"
                  v-model:value="filters1.placeTax"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex" style="margin-bottom: 20px">
          <a-col :xs="12" :md="12" :lg="12">
            <div style="display: flex;flex-direction: row;align-items: center">
              <p style="color: red">*</p>
              <p style="margin-left: 4px">Số đăng ký kinh doanh</p>
            </div>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <div style="display: flex;flex-direction: row;align-items: center">
              <a-checkbox v-model:checked="checked">Checkbox</a-checkbox>
              <p>Giống mã số thuế</p>
            </div>
          </a-col>
        </a-row>
        <a-row v-if="!checked" :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Mã số ĐKKD"
                name="businessCode"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Mã số ĐKKD của tổ chức"
                  v-model:value="filters1.businessCode"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="!checked" :gutter="16" type="flex" style="margin-bottom: 20px">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                name="effectiveDateBusiness"
                label="Ngày cấp"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-date-picker
                  :allow-clear="false"
                  v-model:value="filters1.effectiveDateBusiness"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  placeholder="Ngày cấp"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Nơi cấp"
                name="placeBusiness"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Nơi cấp"
                  v-model:value="filters1.placeBusiness"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quốc gia"
                name="nationId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.nationId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option :value="84" :key="84">Việt Nam</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Tỉnh/ Thành phố"
                name="provinceId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.provinceId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in province"
                    :value="item?.provinceCode"
                    :key="item?.provinceCode">{{ item?.provinceName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Quận/ Huyện"
                name="districtId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.districtId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in district"
                    :value="item?.districtCode"
                    :key="item?.districtCode">{{ item?.districtName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Phường/ Xã"
                name="communeId"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
                style="margin-bottom: 8px"
            >
              <!--show-search-->
              <a-select
                  style="color: black"
                  :allowClear="false"
                  v-model:value="filters1.communeId">
                <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
                <a-select-option
                    v-for="item in commune"
                    :value="item?.communeCode"
                    :key="item?.communeCode">{{ item?.communeName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="24" :md="24" :lg="24">
            <a-form-item
                label="Địa chỉ"
                name="fullAddress"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Số nhà, tên đường"
                  v-model:value="filters1.fullAddress"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại cố định"
                name="orgLandlineNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại cố định"
                  v-model:value="filters1.orgLandlineNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Fax"
                name="fax"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Fax"
                  v-model:value="filters1.fax"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Điện thoại di động"
                name="orgMobileNumber"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Điện thoại di dộng"
                  v-model:value="filters1.orgMobileNumber"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Email"
                name="orgEmail"
                style="margin-bottom: 8px"
                :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
                ]"
            >
              <a-input
                  placeholder="Địa chỉ Email tổ chức"
                  v-model:value="filters1.orgEmail"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Số lượng nhân viên"
                name="totalEmployees"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Số lượng nhân viên"
                  v-model:value="filters1.totalEmployees"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :xs="12" :md="12" :lg="12">
            <a-form-item
                label="Vốn điều lệ"
                name="charterCapital"
                style="margin-bottom: 8px"
            >
              <a-input
                  placeholder="Vốn điều lệ"
                  v-model:value="filters1.charterCapital"
                  :maxLength="200">
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16" type="flex">
          <a-col :xs="12" :md="12" :lg="12">
            <div style="display: flex;flex-direction: row;gap: 4px;margin-bottom: 8px"><span
                style="color:red">*</span>
              <p>Giấy ĐKKD</p></div>
            <div style="display: flex; flex-direction: row;align-items: center; gap: 10px">
              <input :disabled="disInput" type="file" ref="fileuploadRegister" multiple="multiple"
                     @change="filesChange($event.target.files)">
              <a-button @click="onClickButtonReSelect">
                Chọn lại
              </a-button>
            </div>
            <div v-for="item in fileList" :key="item.name">{{ item.name }}</div>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <div style="display: flex;justify-content: center">
      <a-button
          type="primary"
          @click="onClickButtonNextStep1"
          style="background-color: rgba(245, 154, 35, 1); width: 80px">
        Tiếp tục
      </a-button>
    </div>
  </slot>
</template>

<script lang="ts">
import {$get, $post} from "@/lib/utils";
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
import config from "@/config";
import {API_CODE} from "@/define";

export default {
  name: "Step1",
  components: {},
  setup() {
    const registerStore = useRegisterStore()

    return {registerStore}
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
      checked: true,
      orgParent: null,

      province: [],
      district: [],
      commune: [],
      disableProvince: false,
      disableDistrict: false,
      disableCommune: false,
      disInput: false,

      filters1: {
        taxCodeParent: '', // Đơn vị trực thuộc
        orgFullName: '', // Tên tổ chức
        orgShortName: '',// Tên viết tắt
        orgType: null,// Loại hình tổ chức
        orgField: null,//Ngành kinh doanh
        description: "", // Mô tả
        taxCode: "", // Mã số thuế
        effectiveDateTax: "", //Ngày cấp
        placeTax: "", // Nơi cấp

        businessCode: "", // Số đăng ký kinh doanh
        effectiveDateBusiness: '',
        placeBusiness: '',

        nationId: null, // Quốc gia
        provinceId: null, // Tỉnh/Thành phố
        districtId: null, // Quận/Huyện
        communeId: null, // Phường/Xã

        fullAddress: "", // Địa chỉ
        orgLandlineNumber: "", // Điện thoại cố định
        fax: "", // Fax
        orgMobileNumber: "", // Điện thoại di động
        orgEmail: "", // Email
        totalEmployees: null, // Số lượng nhân viên
        charterCapital: "", // Vốn điều lệ
      },

      fileList: [],
    }
  },
  created() {

  },
  computed: {
    ...mapState(useRegisterStore, {
      currentStep: 'currentStep',
      formStep1: 'formStep1',
    })
  },
  mounted() {
    this.onClickButtonReSelect()
    this.mapInitState()
    this.onProvince()
    // this.searchCode()
  },
  methods: {
    ...mapActions(useRegisterStore, {
      SAVE_STATE_STEP1_REGISTER,
      SAVE_STATE_STEP2_REGISTER,
      SAVE_STATE_STEP3_REGISTER,
      SET_STEP_REGISTER,
    }),
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    filesChange(e: any) {
      if (this.$refs.fileuploadRegister) {
        this.fileList = this.$refs.fileuploadRegister.files
        config.filesRegisterGlobal = this.$refs.fileuploadRegister.files
        this.disInput = true
      }
    },
    onClickButtonReSelect() {
      this.fileList = []
      this.disInput = false
      this.$refs.fileuploadRegister.value = null;
      config.filesRegisterGlobal = []
    },
    mapInitState() {
      this.filters1.taxCodeParent = this.formStep1.taxCodeParent// Đơn vị trực thuộc
      this.filters1.orgFullName = this.formStep1.orgFullName // Tên tổ chức
      this.filters1.orgShortName = this.formStep1.orgShortName// Tên viết tắt
      this.filters1.orgType = this.formStep1.orgType//  Đối tượng
      this.filters1.orgField = this.formStep1.orgField//Lĩnh vực
      this.filters1.description = this.formStep1.description // Mô tả
      this.filters1.taxCode = this.formStep1.taxCode // Mã số thuế
      this.filters1.effectiveDateTax = this.formStep1.effectiveDateTax //Ngày cấp
      this.filters1.placeTax = this.formStep1.placeTax // Nơi cấp

      this.filters1.businessCode = this.formStep1.businessCode // Số đăng ký kinh doanh
      this.filters1.effectiveDateBusiness = this.formStep1.effectiveDateBusiness
      this.filters1.placeBusiness = this.formStep1.placeBusiness

      this.filters1.nationId = this.formStep1.nationId // Quốc gia
      this.filters1.provinceId = this.formStep1.provinceId // Tỉnh/Thành phố
      this.filters1.districtId = this.formStep1.districtId // Quận/Huyện
      this.filters1.communeId = this.formStep1.communeId // Phường/Xã
      this.filters1.fullAddress = this.formStep1.fullAddress// Địa chỉ
      this.filters1.orgLandlineNumber = this.formStep1.orgLandlineNumber // Điện thoại cố định
      this.filters1.fax = this.formStep1.fax // Fax
      this.filters1.orgMobileNumber = this.formStep1.orgMobileNumber// Điện thoại di động
      this.filters1.orgEmail = this.formStep1.orgEmail // Email
      this.filters1.totalEmployees = this.formStep1.totalEmployees // Số lượng nhân viên
      this.filters1.charterCapital = this.formStep1.charterCapital // Vốn điều lệ
    },
    onValidateStep1() {
      if (this.fileList && this.fileList?.length === 0) {
        Modal.error({
          title: 'Thông báo',
          content: 'Vui lòng gửi file Giấy ĐKKD',
        });
        return false;
      }
      return true
    },
    onClickButtonNextStep1() {
      this.$refs.ruleForm1.validate().then(() => {
        if (this.onValidateStep1()) {
          this.scrollToTop()
          this.SAVE_STATE_STEP1_REGISTER(this.filters1)
        }
      }).catch((error: any) => {
        console.log('error', error);
      });
    },
    async onProvince() {
      try {
        const res = await $get('/ew-public/location/v1/province');
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.province = body
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onDistrict(provinceCode: string | number) {
      try {
        const res = await $get(`/ew-public/location/v1/district?provinceCode=${provinceCode}`);
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.district = body
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async onCommune(districtCode: string | number) {
      try {
        const res = await $get(`/ew-public/location/v1/commune?districtCode=${districtCode}`)
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.commune = body
        } else {
          console.log(message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async searchCode() {
      try {
        const res = await $get('/ew-public/sys/global/list/v1/search-code');
        console.log('res', res)
      } catch (e) {
        console.log(e)
      }
    },
    async onSearch() {
      try {
        const params = {
          taxCode: this.filters1.taxCodeParent
        }
        const res = await $post('/ew-public/organization/account/v1/parent-account', params)
        console.log(res)
        const {code, body} = res
        if (code === API_CODE.SUCCESS) {
          this.orgParent = body;
        } else {
          Modal.error({
            title: 'Thông báo',
            content: res?.message,
          });
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  // nationId: null, // Quốc gia
  // provinceId: null, // Tỉnh/Thành phố
  // districtId: null, // Quận/Huyện
  // communeId: null, // Phường/Xã
  watch: {
    'filters1.nationId': function () {

    },
    'filters1.provinceId': function () {
      if (this.filters1.provinceId !== null) {
        this.district = []
        this.commune = []
        this.filters1.districtId = null
        this.filters1.communeId = null
        this.onDistrict(this.filters1.provinceId)
      }
    },
    'filters1.districtId': function () {
      if (this.filters1.districtId !== null) {
        this.commune = []
        this.filters1.communeId = null
        this.onCommune(this.filters1.districtId)
      }
    },
    'filters1.communeId': function () {

    },
  }
}
</script>


<style lang="scss" scoped>

@import "ant-design-vue/dist/reset.css";
@import "@/scss/register.scss";

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
