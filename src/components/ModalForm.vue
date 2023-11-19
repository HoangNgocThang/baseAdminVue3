<template>
  <div>
    <a-drawer
        style="overflow: scroll; padding-bottom: 30px"
        :visible="visibleModalForm"
        width="25%"
        @close="closeModal"
        :destroy-on-close="true"
        :maskClosable="false"
        :title="'Tài khoản cá nhân'">
      <a-spin :spinning="loading">
        <div style="padding: 0 0 60px 0; margin: 0">
          <a-card style="width: 100%;border: none">
            <a-form :model="form" ref="ruleForm" layout="vertical" class="search-container">
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                  <a-form-item
                      label="Tài khoản"
                      name="username"
                      style="margin-bottom: 8px"
                  >
                    <a-input
                        style="color: black"
                        :value="form.username"
                        :disabled="true"
                        placeholder="Tài khoản"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                  <a-form-item
                      label="Họ và tên"
                      name="fullName"
                      style="margin-bottom: 8px"
                  >
                    <a-input
                        style="color: black"
                        :value="form.fullName"
                        :disabled="true"
                        placeholder="Họ và tên"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                  <a-form-item
                      label="Điện thoại di động"
                      name="mobileNumber"
                      style="margin-bottom: 8px"
                  >
                    <a-input
                        style="color: black"
                        :value="form.mobileNumber"
                        :disabled="true"
                        placeholder="Điện thoại di động"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16" type="flex">
                <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                  <a-form-item
                      label="Email"
                      name="email"
                      style="margin-bottom: 8px"
                  >
                    <a-input
                        style="color: black"
                        :value="form.email"
                        :disabled="true"
                        placeholder="Email"
                        :maxLength="200">
                    </a-input>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<script lang="ts">

import {$get} from "@/lib/utils";
import {API_CODE} from "@/define";

export default {
  props: {
    visibleModalForm: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  data() {
    return {
      loading: false,
      form: {
        username: '',
        mobileNumber: '',
        fullName: '',
        email: ''
      }
    }
  },
  created() {

  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await $get('/ew-web/user/auth/v1/user-info');
        console.log('user-info:', res)
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {
          this.form = body
        } else {
          console.log(res?.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeModal(_: any, reload = false) {
      this.$emit('closeModal', reload)
    },
    onSave() {
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  },
  watch: {}
}
</script>
