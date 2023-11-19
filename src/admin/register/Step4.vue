<template>
  <slot>
    <div style="display: flex;justify-content: center;align-items: center; flex-direction: column">
      <p style="font-size: 18px;font-weight: bold ;margin-top: 20px;margin-bottom: 20px">Vui lòng kiểm tra lại
        thông tin đăng ký của bạn.</p>
      <a-button
          type="primary"
          @click="onClickButtonRegister"
          style="background-color: rgba(245, 154, 35, 1); ">
        Hoàn tất đăng ký
      </a-button>
    </div>
  </slot>
</template>

<script lang="ts">
import {$get, $post, $postForRegister} from "@/lib/utils";
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
import moment from "moment";
import {API_CODE} from "@/define";

export default {
  name: "Step4",
  components: {},
  setup() {
    const registerStore = useRegisterStore()

    return {registerStore}
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
    }
  },
  created() {
  },
  computed: {
    ...mapState(useRegisterStore, {
      currentStep: 'currentStep',
      formStep1: 'formStep1',
      formStep21: 'formStep21',
      formStep22: 'formStep22',
      formStep23: 'formStep23',
      formStep31: 'formStep31',
      formStep32: 'formStep32',
      formStep33: 'formStep33'
    })
  },
  mounted() {
  },
  methods: {
    ...mapActions(useRegisterStore, {
      SAVE_STATE_STEP1_REGISTER,
      SAVE_STATE_STEP2_REGISTER,
      SAVE_STATE_STEP3_REGISTER,
      SET_STEP_REGISTER,
    }),
    async onClickButtonRegister() {
      console.log("vc", config.filesRegisterGlobal)
      try {
        const repList = [this.formStep21, this.formStep22, this.formStep23]
            .filter(e => e.repFullName !== "")
            .map(e => {
              return {...e, repDob: moment(e.repDob).format('DD/MM/YYYY')}
            }) || [];
        const userList = [this.formStep31, this.formStep32, this.formStep33]
            .filter(e => e.userFullName !== "") || [];
        const params = {
          taxCodeParent: this.formStep1.taxCodeParent,
          orgFullName: this.formStep1.orgFullName,
          orgShortName: this.formStep1.orgShortName,
          orgType: this.formStep1.orgType,
          orgField: this.formStep1.orgField,
          description: this.formStep1.description,

          taxCode: this.formStep1.taxCode,
          effectiveDateTax: this.formStep1.effectiveDateTax !== '' ?
              moment(this.formStep1.effectiveDateTax).format('DD/MM/YYYY') : "",
          placeTax: this.formStep1.placeTax,

          businessCode: this.formStep1.businessCode !== '' ?
              this.formStep1.businessCode : this.formStep1.taxCode,
          effectiveDateBusiness: this.formStep1.effectiveDateBusiness !== '' ?
              moment(this.formStep1.effectiveDateBusiness).format('DD/MM/YYYY') :
              moment(this.formStep1.effectiveDateTax).format('DD/MM/YYYY'),
          placeBusiness: this.formStep1.placeBusiness !== '' ?
              this.formStep1.placeBusiness : this.formStep1.placeTax,

          nationId: this.formStep1.nationId,
          provinceId: this.formStep1.provinceId,
          districtId: this.formStep1.districtId,
          communeId: this.formStep1.communeId,
          fullAddress: this.formStep1.fullAddress,
          orgLandlineNumber: this.formStep1.orgLandlineNumber,
          fax: this.formStep1.fax,
          orgMobileNumber: this.formStep1.orgMobileNumber,
          orgEmail: this.formStep1.orgEmail,
          totalEmployees: this.formStep1.totalEmployees,
          charterCapital: this.formStep1.charterCapital,
          repList: repList,
          userList: userList
        }
        const customParam = {
          clientRequest: JSON.stringify(params)
        }
        const res = await $postForRegister('/ew-public/user/auth/v1/register',
            config.filesRegisterGlobal,
            customParam)
        console.log('onClickButtonRegister:', res)
        const {code} = res
        if (code === API_CODE.SUCCESS) {
          Modal.success({
            title: 'Thông báo',
            content: 'Đăng ký thành công',
          });
          setTimeout(() => {
            this.$router.push({name: 'login'})
          }, 200)
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
    scrollToTop() {
      window.scrollTo(0, 0);
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
