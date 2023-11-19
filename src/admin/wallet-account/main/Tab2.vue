<template>
  <div style="min-height: 500px">
    <a-form ref="ruleFormTab2" :model="filtersTab2" layout="vertical">
      <a-row :gutter="16" type="flex">
        <a-col :xs="6" :md="6" :lg="6">
          <a-form-item
              label="Tài khoản ví"
              name="name"
              style="margin-bottom: 8px">
            <a-input
                placeholder="Nhập tài khoản ví cần tìm kiếm"
                v-model="filtersTab2.contractNo"
                :maxLength="200">
            </a-input>
          </a-form-item>
        </a-col>
        <div style="display: flex; gap: 10px;">
          <a-button
              type="primary"
              @click="()=> {

                      }"
              style="background-color: rgba(245, 154, 35, 1);margin-top: 28px; width: 100px">
            Tìm kiếm
          </a-button>
          <a-button
              type="primary"
              @click="()=> {

                      }"
              style="background-color: rgba(245, 154, 35, 1); margin-top: 28px;width: 100px">
            Thêm mới
          </a-button>
        </div>
      </a-row>
    </a-form>
    <a-row :gutter="16">
      <a-col :xs="24" :md="24" :lg="24">
        <a-table
            :columns="columnsTab2"
            :rowKey="(record, index) => index"
            :dataSource="dataTab2"
            :pagination="paginationTab2"
            :loading="loading"
            :scroll="{ x: '100%',y:400 }"
            @change="handleTableChange"
            bordered
        >
          <template #bodyCell="{ column, text, record ,index}">
            <template v-if="column.dataIndex === 'rowIndex'">
              <div>
                <span>{{ index + 1 }}</span>
              </div>
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <a @click="edit(record.key)">Edit</a>
              </div>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import columnsTab2 from './columnsTab2';

export default {
  name: "Tab2",
  data() {
    return {
      columnsTab2,
      loadingScreen: false,
      activeSearchKey: 1,
      loading: false,

      filtersTab2: {},
      dataTab2: [{}, {}, {}],
      paginationTab2: {
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
    console.log("tab2")
  },
  methods: {

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