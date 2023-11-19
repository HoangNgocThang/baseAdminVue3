<template>
  <div class="container-blank-layout">
    <div class="limiter">
      <div class="container-login">
        <div class="wrap-login">
          <div style="min-height: 1200px; width: 100%">
            <div style="display: flex; flex-direction: row; width: 100%; justify-content: center">
              <img src="/assets/vnpost_logo.svg" style="width: 180px; height:135px">
            </div>
            <div class="wrap-step">
              <div class="item-step">
                <p class="text-item-step">1</p>
              </div>
              <div class="line-item-step"></div>
              <div class="item-step"
                   :style="{ backgroundColor:currentStep<2 ? '#FFD9A9':'orange'}">
                <p class="text-item-step" :style="{ color: currentStep<2? 'white':'black'}">2</p>
              </div>
              <div class="line-item-step"></div>
              <div class="item-step"
                   :style="{ backgroundColor:currentStep<3 ? '#FFD9A9':'orange'}">
                <p class="text-item-step" :style="{color: currentStep<3? 'white':'black'}">3</p>
              </div>
              <div class="line-item-step"></div>
              <div class="item-step" :style="{ backgroundColor:currentStep<4 ? '#FFD9A9':'orange'}">
                <p class="text-item-step"
                   :style="{ color: currentStep<4 ? 'white':'black' }">4</p>
              </div>
            </div>
            <div v-show="currentStep===1" style="display: flex; flex-direction: column">
              <Step1/>
            </div>
            <div v-show="currentStep===2" style="display: flex; flex-direction: column">
              <Step2/>
            </div>
            <div v-show="currentStep===3" style="display: flex; flex-direction: column">
              <Step3/>
            </div>
            <div v-show="currentStep===4" style="display: flex; flex-direction: column">
              <Step4/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {useRegisterStore} from "@/store/register";
import {mapActions, mapState} from "pinia";
import {
  SAVE_STATE_STEP1_REGISTER,
  SAVE_STATE_STEP2_REGISTER,
  SAVE_STATE_STEP3_REGISTER,
  SET_STEP_REGISTER,
  RESET_STATE_REGISTER
} from "@/store/actionTypes";
import Step1 from "@/admin/register/Step1.vue";
import Step2 from "@/admin/register/Step2.vue";
import Step3 from "@/admin/register/Step3.vue";
import Step4 from "@/admin/register/Step4.vue";

export default {
  name: "RegisterView",
  components: {
    Step4,
    Step3,
    Step2,
    Step1,
  },
  setup() {
    const registerStore = useRegisterStore()

    return {registerStore}
  },
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
      orgParent: null,
    }
  },
  created() {
  },
  computed: {
    ...mapState(useRegisterStore, {
      currentStep: 'currentStep',
      formStep1formStep1: 'formStep1',
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
