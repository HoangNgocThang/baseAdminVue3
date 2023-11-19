<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">Lịch sử chuyển tiền</span></div>
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="/dashboard">HOME</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Lịch sử chuyển tiền</li>
                    </ol>
                </div>
            </div> <!-- /breadcrumb --> <!-- row -->

            <div class="row row-sm">

                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex justify-content-between">
                                <h4 class="card-title mg-b-0">Chi tiết lô</h4></div>
                        </div>
                        <div class="card-body">
                            <ProvinceInfo/>
                            <div class="row">
                                <div class="col-xl-8">
                                    <form class="form-inline">
                                        <div class="form-group mx-sm-3 mb-2">
                                            <input
                                                v-model="filter.keyword"
                                                @keyup.enter="search"
                                                type="text"
                                                class="form-control" placeholder="Nhập mã giao dịch">
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <Daterangepicker
                                                v-model="filter.created" placeholder="Ngày tạo"></Daterangepicker>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <select v-model="filter.status" class="form-control-select">
                                                <option value="">Trạng thái</option>
                                                <option v-for="s in listStatus" :value="s.value" v-text="s.label"></option>
                                            </select>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <button @click="search()" type="button"
                                                    class="btn btn-primary">
                                                <i class="fas fa-search"/>
                                                Tìm kiếm
                                            </button>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2" >
                                            <button type="button" @click="downloadExcel()" class="btn btn-primary"> <i class="fas fa-download"/> Tải xuống </button>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <button @click="filterClear()" type="button"
                                                    class="btn btn-light">Xóa
                                            </button>
                                        </div>

                                    </form>
                                </div>
                                <div class="col-xl-4 d-flex">
                                    <div class="margin-left-auto mb-1">
                                        <a href="/transfers" class="btn btn-primary">
                                            <i class="fa fa-plus"/>
                                            Thêm
                                        </a>
                                    </div>
                                </div>
                            </div>


                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th  class="text-left">Trạng thái</th>
                                        <th  class="text-left">Mã giao dịch</th>
                                        <th  class="text-left">Số điện thoại</th>
                                        <th  class="text-left">Người thụ hưởng</th>
                                        <th  class="text-left">Số tiền</th>
                                        <th  class="text-left">Nội dung</th>
                                        <th  class="text-left">Thời gian</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="entry in entries">

                                        <td >
                                            <span :class="'transfer-status transfer-status-' + entry.status" v-text="entry.transStatus"></span>
                                        </td>
                                        <td v-text="entry.orderCode"></td>
                                        <td v-text="entry.desCustomerName"></td>
                                        <td v-text="entry.desCustomerPhone"></td>
                                        <td v-text="n(entry.transAmount)"></td>
                                        <td v-text="entry.transNote"></td>
                                        <td v-text="d(entry.transDate)"></td>

                                    </tr>
                                    </tbody>
                                </table>
                                <div class="float-right" style="margin-top:10px; ">
                                    <Paginate :value="paginate" :pagechange="onPageChange"></Paginate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!--/div--> <!--div-->

            </div> <!-- /row -->
        </div>


    </div> <!-- /main-content -->

</template>

<script>
import {$downloadAsBlob, $get, $post, getTimeRangeAll} from "@/lib/utils.ts";
import $router from '../../lib/SimpleRouter';
import ActionBar from '../../components/ActionBar.vue';
import ProvinceInfo from "@/components/ProvinceInfo.vue";
import moment from "moment/moment.js";

const listStatus = [
    {value: 0, label: 'Thất bại'},
    {value: 1, label: 'Thành công'},
    {value: 2, label: 'Không xác định'},
    {value: 3, label: 'Chờ xử lý'},
    {value: 4, label: 'Đã hủy'},
];
/**
 public static final int FAILURE = 0;                //  thất bại
 public static final int SUCCESS = 1;                //  thành công
 public static final int UNKNOWN = 2;
 public static final int WAITING = 3;
 public static final int CANCEL = 4;
 * @type {string}
 */
let created = getTimeRangeAll();
const $q = $router.getQuery();

export default {
    name: "TransferHistories",
    components: {ActionBar, ProvinceInfo},
    data() {
        return {
            listStatus,
            entries: [],
            batchCode: $json.id,
            filter: {
                desCustomerPhone: $q.desCustomerPhone || '',
                keyword: $q.keyword || '',
                created: $q.created || created,
                status: $q.status || '',
            },
            paginate: {
                currentPage: 1,
                lastPage: 1
            }
        }
    },
    mounted() {
        $router.on('/', this.load).init();
    },
    methods: {
        async downloadExcel() {
            const timestamp = moment().format('YYYY-MM-DD');
            const filename = timestamp + '_transfer.xlsx';

            let query = $router.getQuery();
            query.pageSize = 1000;
            await $downloadAsBlob(filename,'/transfers/data', query);
        },
        async load() {
            let query = $router.getQuery();
            const res = await $get('/transfers/data', query);
            this.paginate = {
                currentPage: res.data.currentPage,
                lastPage: res.data.totalPage
            };
            this.entries = res.data.result;
        },
        search() {
            $router.setQuery(this.filter)
        },
        filterClear() {
            for (var key in this.filter) {
                this.filter[key] = '';
            }

            $router.setQuery({});
        },
        doFilter(field, value, event) {
            return;
            if (event) {
                event.preventDefault();
            }

            const params = {page: 1};
            params[field] = value;
            $router.setQuery(params)
        },
        onPageChange(page) {
            $router.updateQuery({page: page})
        }
    }
}
</script>

<style scoped>

</style>
