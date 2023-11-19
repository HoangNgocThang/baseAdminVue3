<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">Danh sách lô</span></div>
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="/dashboard">HOME</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Danh sách lô</li>
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
                                                   type="text"
                                                   class="form-control" placeholder="Nhập mã giao dịch">
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <input
                                                v-model="filter.desCustomerPhone"
                                                type="text"
                                                class="form-control" placeholder="Số điện thoại">
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <select v-model="filter.status" class="form-control-select">
                                                <option value="">Trạng thái</option>
                                                <option value="0">Chờ xử lý</option>
                                                <option value="1">Thành công</option>
                                                <option value="2">Thất bại</option>
                                                <option value="3">Dừng xử lý</option>
                                            </select>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2" >
                                            <button type="button" @click="downloadExcel()" class="btn btn-primary"><i class="fas fa-download"/> Tải xuống </button>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <button @click="search()" type="button"
                                                    class="btn btn-primary">
                                                <i class="fa fa-search"/>
                                                Tìm kiếm
                                            </button>
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
                                        <a href="/batch-transfers/create" class="btn btn-primary">
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
                                        <th class="text-left">ID</th>
                                        <th  class="text-left">Trạng thái</th>
                                        <th  class="text-left">Mã lô</th>
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

                                        <td v-text="entry.id"></td>
                                        <td >
                                            <span :class="'transfer-status transfer-status-' + entry.status" v-text="statusText[entry.status]"></span>
                                        </td>
                                        <td v-text="batchCode"></td>
                                        <td v-text="entry.orderCode"></td>
                                        <td v-text="entry.desCustomerName"></td>
                                        <td v-text="entry.desCustomerPhone"></td>
                                        <td v-text="n(entry.amount)"></td>
                                        <td v-text="entry.memo"></td>
                                        <td v-text="d(entry.createdAt)"></td>

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

const statusText = {
    0: 'Chờ xử lý',
    1: 'Thành công',
    2: 'Thất bại',
    3: 'Dừng xử lý',
}
let created = getTimeRangeAll();
const $q = $router.getQuery();

export default {
    name: "BatchTransferShow",
    components: {ProvinceInfo, ActionBar},
    data() {
        return {
            statusText,
            entries: [],
            batchCode: $json.id,
            filter: {
                desCustomerPhone: $q.desCustomerPhone || '',
                keyword: $q.keyword || '',
                created: $q.created || created,
                status: $q.status || '0',
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
            const filename = timestamp + '_batch_transfer_details_' + this.batchCode + '.xlsx';

            let query = $router.getQuery();
            query.batchCode = this.batchCode;
            query.pageSize = 1000;
            await $downloadAsBlob(filename,'/batch-transfers/dataDetails', query);
        },
        async load() {
            let query = $router.getQuery();
            query.batchCode = this.batchCode;
            query.pageSize = 1000;
            const res = await $get('/batch-transfers/dataDetails', query);
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
