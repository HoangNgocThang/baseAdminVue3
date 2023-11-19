<template>
  <div style="min-height: 500px">
    <a-form ref="ruleFormTab1" :model="filtersTab1" layout="vertical">
      <a-row :gutter="16" type="flex">
        <a-col :xs="6" :md="6" :lg="6">
          <a-form-item
              label="Đơn vị"
              name="code1"
              style="margin-bottom: 8px"
              :rules="[{
                  required: true,
                  message: 'Trường bắt buộc'
                 },
              ]"
          >
            <a-select
                style="color: black"
                :allowClear="true"
                show-search
                v-model="filtersTab1.provinceUnitId">
              <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="6" :md="6" :lg="6">
          <a-form-item
              label="Trạng thái"
              name="code1"
              style="margin-bottom: 8px"
          >
            <a-select
                style="color: black"
                :allowClear="true"
                show-search
                v-model="filtersTab1.provinceUnitId">
              <a-select-option :value="null" :key="'all'">-- Chọn --</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="6" :md="6" :lg="6">
          <a-form-item
              label="Tài khoản Ví"
              name="code2"
              style="margin-bottom: 8px"
          >
            <a-input
                placeholder="Nhập tài khoản Ví"
                v-model="filtersTab1.contractNo"
                :maxLength="200">
            </a-input>
          </a-form-item>
        </a-col>

      </a-row>
      <div style="display: flex; gap: 10px;">
        <a-button
            type="primary"
            @click="onClickButtonButtonFind"
            style="background-color: rgba(245, 154, 35, 1); margin-bottom: 10px; width: 100px">
          Tìm kiếm
        </a-button>
        <a-button
            type="primary"
            @click="onClickButtonAdd"
            style="background-color: rgba(245, 154, 35, 1);margin-bottom: 10px; width: 120px">
          Tạo tài khoản
        </a-button>
      </div>
    </a-form>
    <a-row :gutter="16">
      <a-col :xs="24" :md="24" :lg="24">
        <a-table
            :columns="columnsTab1"
            :rowKey="(record, index) => index"
            :dataSource="dataTab1"
            :pagination="paginationTab1"
            :loading="loading"
            :scroll="{ x: '100%',y:400 }"
            @change="handleTableChange"
            bordered
        >
          <template #bodyCell="{ column, text, record , index}">
            <template v-if="column.dataIndex === 'rowIndex'">
              <div>
                <span>{{ index + 1 }}</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <a @click="onClickOperation(record.key)">Edit</a>
              </div>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>

  </div>
</template>

<script lang="ts">
import columnsTab1 from './columnsTab1';
import {$get, $post} from "@/lib/utils";
import {COMPANY_UNIT} from "@/constant";
import {API_CODE} from "@/define";

export default {
  name: "Tab1",
  data() {
    return {
      columnsTab1,
      loadingScreen: false,
      activeSearchKey: 1,
      loading: false,
      coms: [],

      filtersTab1: {
        status: null,
        number: null
      },
      dataTab1: [{}, {}, {}],
      paginationTab1: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return `Tổng số dòng ${total}`
        }
      },
    }
  },
  mounted() {
    console.log("tab1")
    // this.onSearchCode()
    this.onSearch()
  },
  methods: {
    onClickButtonAdd() {
      this.$router.push('/wallets/add')
    },
    onClickButtonButtonFind() {

    },
    onClickOperation(e: any) {

    },
    async onSearch() {
      try {
        const param = {
          searchAccountSdi: {
            status: this.filtersTab1.status,
            number: this.filtersTab1.number,
          },
          pageInfo: {
            currentPage: 1,
            pageSize: 5
          }
        }
        const res = await $post('/ew-web/organization/account/v1/search', param);
        const {code, body, message} = res
        if (code === API_CODE.SUCCESS) {
            this.coms = body
        } else {

        }
      } catch (e) {
        console.log('e')
      }
    },
    async onSearchCode() {
      try {
        const res = await $get(`/ew-public/sys/global/list/v1/search-code?code=${COMPANY_UNIT}`)
        console.log('res', res)
        const {code, body, message} = res;
        if (code === API_CODE.SUCCESS) {

        } else {

        }
      } catch (e) {
        console.log('e')
      }
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
      // this.pagination = {...pagination}
      // const params = {
      //   insContractWLSdi: {
      //     phoneNub: this.filters.phoneNub,
      //     status: this.filters.status,
      //     fromDate: this.filters.fromDate ? moment(this.filters.fromDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : null,
      //     toDate: this.filters.toDate ? moment(this.filters.toDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : null,
      //     provinceCode: this.listProvinceByStaff.find(e => e?.orgUnitId === this.filters.provinceUnitId)?.orgUnitCode || null,
      //     districtCode: this.listDistrictByStaff.find(e => e?.orgUnitId === this.filters.districtUnitId)?.orgUnitCode || null,
      //   },
      //   pageInfo: {
      //     currentPage: this.pagination.current,
      //     pageSize: this.pagination.pageSize
      //   }
      // }
      // this.onWlFindByCondition(params)
    },
  },
  watch: {}
}
</script>

<style scoped>

</style>