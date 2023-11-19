<template>
  <div class="main-content app-content"> <!-- container -->
    <div class="main-container container-fluid"> <!-- breadcrumb -->
      <div class="breadcrumb-header justify-content-between">
        <div class="justify-content-center mt-2">
          <ol class="breadcrumb">
            <li class="breadcrumb-item tx-15"><a href="javascript:void(0);">TRANG CHỦ</a></li>
            <li class="breadcrumb-item tx-15 active" aria-current="page"> Quản lý tài khoản ví</li>
          </ol>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div style="width: 95%">
            <a-card>
              <a-tabs v-model:activeKey="keyTab">
                <a-tab-pane :force-render="false" :key="1" tab="Thông tin tài khoản ví">
                  <Tab1 :keyTab="keyTab"/>
                </a-tab-pane>
                <a-tab-pane :force-render="false" :key="2" tab="Hạn mức giao dịch">
                  <Tab2 :keyTab="keyTab"/>
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Tab1 from "@/admin/wallet-account/main/Tab1.vue";
import Tab2 from "@/admin/wallet-account/main/Tab2.vue";
import {$post} from "@/lib/utils";

export default {
  name: "WalletAccountView",
  components: {Tab2, Tab1},
  data() {
    return {
      loadingScreen: false,
      activeSearchKey: 1,
      loading: false,
      keyTab: 1,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    callback(key: any) {
      console.log(key);
      this.keyTab = key
    },
  },
  watch: {}
}
</script>

<style scoped>

</style>