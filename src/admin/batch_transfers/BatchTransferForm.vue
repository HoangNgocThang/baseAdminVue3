<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">Chuyển tiền theo lô</span>
                </div>
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="/dashboard">Trang chủ</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Chuyển tiền theo lô</li>
                    </ol>
                </div>
            </div> <!-- /breadcrumb --> <!-- row -->

            <div class="row row-sm">

                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex justify-content-between">
                                <h4 class="card-title mg-b-0">Thêm mới giao dịch chuyển tiền theo lô</h4></div>

                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h3>
                                        Số dư tài khoản postpay: {{ n(customerAccount.balance) }}
                                    </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>
                                            Hình thức chuyển tiền: Qua số điện thoại
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <div>
                                            Chọn file excel
                                        </div>
                                        <input @change="onFileChange()" type="file" style="display: none" ref="uploader"
                                               accept=".xlsx">
                                        <button class="btn btn-primary" type="button" @click="chooseFile()">
                                            <i class="fas fa-upload"/>
                                            Chọn file
                                        </button>
                                        <div v-text="filename">

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div>
                                            <a style="color: #4242fa" href="/sample/MMDDYY_CHUYEN_TIEN_LO_ANSINH.xlsx">Click
                                                tải file mẫu</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <form class="form-inline form-inline-2">
                                        <div class="form-group">
                                            <label>
                                                Đã chọn: <span v-text="checkedCount"></span> / <span
                                                v-text="entries.length"></span>
                                            </label>
                                        </div>
                                        <div class="form-group">

                                            <button v-if="transferStep===0" type="button" @click="submitForValidate()"
                                                    class="btn btn-purple">Kiểm tra
                                                <i class="fas fa-angle-right"/>
                                            </button>

                                            <button v-if="transferStep===1" type="button" @click="sendTransferOrder()"
                                                    class="btn btn-purple"> Xác nhận
                                                <i class="fas fa-angle-right"/>
                                            </button>
                                        </div>
                                        <div class="form-group">
                                            <label>Lọc bản ghi</label>
                                            <select class="form-control-select" style="margin-left: 5px"
                                                    @change="filterEntries(entryFilterModel)"
                                                    v-model="entryFilterModel">
                                                <option value="0">Tất cả</option>
                                                <option value="1">Hợp lệ</option>
                                                <option value="2">Không hợp lệ</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <button type="button" @click="downloadExcel()" class="btn btn-primary">
                                                <i class="fas fa-download"/> Tải xuống </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table mg-b-0 text-md-nowrap">
                                        <thead>
                                        <tr>
                                            <th>
                                                <input @change="onCheckedAll(checkedAll)" v-model="checkedAll"
                                                       type="checkbox">
                                            </th>
                                            <th>STT</th>
                                            <th>Trạng thái</th>
                                            <th>Người thụ hưởng</th>
                                            <th>Số điện thoại</th>
                                            <th>Số tiền</th>
                                            <th>Nội dung chuyển tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <template v-for="entry in entries">
                                            <tr v-if="entry.show">
                                                <td class="text-center">
                                                    <input :disabled="entry.disabled" @change="onEntryChecked(entry)"
                                                           v-model="entry.checked" type="checkbox">
                                                </td>
                                                <td class="text-center" v-text="entry.id"></td>
                                                <td class="text-center">
                                                    <label v-if="entry.checkedMessage"
                                                           :class="'checked-status-' + entry.checkedStatus">
                                                        {{ entry.checkedMessage }}
                                                    </label>
                                                </td>
                                                <td class="text-center" v-text="entry.desCustomerName"></td>
                                                <td class="text-center" v-text="entry.desCustomerPhone"></td>
                                                <td class="text-center" v-text="n(entry.amount)"></td>
                                                <td class="text-center" v-text="entry.memo"></td>
                                            </tr>
                                        </template>

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!--/div--> <!--div-->

            </div> <!-- /row -->
        </div>

        <ModalConfirmBatchTransfer ref="modalConfirm"/>

    </div> <!-- /main-content -->

</template>

<script>
import {
    $downloadAsBlob,
    $post,
    $postAsBlob,
    $upload,
    downloadBlob,
    isStringNullOrWhiteSpace,
    validatePhone
} from "@/lib/utils.ts";
import ActionBar from '../../components/ActionBar.vue';
import {API_CODE} from "@/define.js";
import ModalConfirmBatchTransfer from "@/components/ModalConfirmBatchTransfer.vue";
import moment from "moment";

function getInitialState() {
    return {
        tempToken: '',
        transferStep: 0,
        entryFilterModel: '0',
        customerAccount: {balance: 0},
        checkedCount: 0,
        checkedAll: false,
        filename: '',
        entries: [],
        entry: $json.entry || {},
        isLoading: false,
        errors: {}
    }
}

export default {
    name: "BatchTransfersForm",
    components: {ModalConfirmBatchTransfer, ActionBar},
    data() {
        return {
            tempToken: '',
            transferStep: 0,
            entryFilterModel: '0',
            customerAccount: {balance: 0},
            checkedCount: 0,
            checkedAll: false,
            filename: '',
            entries: [],
            entry: $json.entry || {},
            isLoading: false,
            errors: {}
        }
    },
    mounted() {
        this.loadWalletInfo();
    },
    methods: {
        filterEntries(value) {
            value = parseInt(value);
            if (value === 0) {
                this.entries.forEach(e => {
                    e.show = true;
                })
            } else if (value === 1) {
                this.entries.forEach(e => {
                    e.show = (e.checkedStatus === 0);
                })
            } else if (value === 2) {
                this.entries.forEach(e => {
                    e.show = (e.checkedStatus !== 0);
                })
            }
        },
        async downloadExcel() {
            const timestamp = moment().format('YYYY-MM-DD');
            const filename = timestamp + '_batch_transfer.xlsx';
            await $downloadAsBlob(filename, '/batch-transfers/export', {
                entries: this.entries.filter(e => e.show)
            });
        },
        async loadWalletInfo() {
            const res = await $post('/api/wallets/getMyListWallets', {}, false);
            if (res.code !== API_CODE.SUCCESS) {
                toastr.error(res.message);
                return;
            }

            res.data.balance = parseInt(res.data.balance);
            this.customerAccount = res.data;
        },
        onEntryChecked() {
            this.checkedCount = this.entries.filter(e => e.checked).length;
        },
        onCheckedAll(value) {
            this.entries.forEach(e => {
                if (!e.disabled) {
                    e.checked = value;
                }
            });
            this.checkedCount = this.entries.filter(e => e.checked).length;
        },
        async sendTransferOrder() {
            const entries = [];
            const ids = [];
            let requiredAmount = 0;
            this.entries.forEach(e => {
                if (!e.disabled && e.checked) {
                    entries.push(e);
                    requiredAmount += e.amount;
                }

                ids.push(e.id);
            });

            if (entries.length === 0) {
                alert('Vui lòng chọn ít nhất  1 bản ghi');
                return;
            }

            if (requiredAmount > this.customerAccount.balance) {
                const a  = this.n(requiredAmount);
                const b  = this.n(this.customerAccount.balance);
                toastr.error(`Số dư không đủ để thực hiện giao dịch này: ${a} > ${b}`);
                return;
            }

            let totalAmount = 0;
            entries.forEach(e => {
                totalAmount += e.amount;
            })
            this.$refs.modalConfirm.show({
                receiverCount: entries.length,
                totalAmount: totalAmount,
                feeAmount: 0,
            }, async (step, payload) => {
                if (step === 0) {
                    const res = await $post('/api/batch-transfers/transferBatchW2WCreateOrder', {
                        amount: totalAmount
                    });

                    if (res.code !== API_CODE.SUCCESS) {
                        this.$refs.modalConfirm.setErrorMessage(res.message);
                        return;
                    }

                    this.tempToken = res.body.tempToken;
                    this.$refs.modalConfirm.stepOtpCounter(res.body.orderCode);
                } else if (step === 1) {
                    const res = await $post('/api/batch-transfers/transferBatchW2WConfirmOtpV2', {
                        otp: payload.otp,
                        data: entries,
                        tempToken: this.tempToken
                    });

                    if (res.code !== API_CODE.SUCCESS) {
                        toastr.error(res.message);
                        return;
                    }


                    this.$refs.modalConfirm.stepShowSuccess(res.body.batchCode);
                    this.entries = [];
                    this.transferStep = 0;
                    this.checkedCount = 0;
                    this.checkedAll = false;

                    //this.$refs.modalConfirm.showSuccessStep();
                }


            });
        },
        alertInvalidFile() {
            this.entries.forEach(e => {
                e.disabled = true;
                e.checked = false;
            });
            this.checkedAll = false;
            this.checkedCount = 0;
            toastr.error('File không hợp lệ');
        },
        async submitForValidate() {
            //this.clientBasicValidate();

            const entries = [];

            const len = this.entries.length;
            for (let i = 0; i < len; i++) {
                const e = this.entries[i];
                if (!e.disabled && e.checked) {
                    entries.push(e);
                } else {
                    e.disabled = true;
                }


                const id = parseInt(e.id);
                if (id !== (i + 1)) {
                    this.alertInvalidFile();
                    return;
                }
            }

            if (entries.length === 0) {
                alert('Vui lòng chọn ít nhất 1 bản ghi');
                return;
            }

            const res = await $post('/batch-transfers/checkData', {
                data: entries
            });

            if (res.code === API_CODE.SUCCESS) {
                const idMap = {};
                res.body.forEach(e => {
                    e.show = true;
                    idMap[e.id] = e;
                });

                this.entries.forEach((e, index) => {
                    if (idMap[e.id]) {
                        this.entries[index] = idMap[e.id];
                    }
                })
            } else {
                this.alertInvalidFile();
                return;
            }

            this.transferStep = 1;
            this.checkedCount = this.entries.filter(e => e.checked).length;
        },
        clientBasicValidate() {

            this.entries.forEach(entry => {
                const amount = parseInt(entry.amount);
                if (isStringNullOrWhiteSpace(entry.desCustomerName)) {
                    entry.checkedStatus = 1;
                    entry.checkedMessage = 'Vui lòng nhập họ tên người nhận';
                    entry.disabled = true;
                    entry.checked = false;
                    return;
                }

                if (!validatePhone(entry.desCustomerPhone)) {
                    entry.checkedStatus = 1;
                    entry.checkedMessage = 'Số điện thoại không hợp lệ';
                    entry.disabled = true;
                    entry.checked = false;
                    return;
                }

                if (!amount || amount <= 0) {
                    entry.checkedStatus = 1;
                    entry.checkedMessage = 'Số tiền không hợp lệ';
                    entry.disabled = true;
                    entry.checked = false;
                    return;
                }
            })
        },
        validateEntry() {

        },
        chooseFile() {
            this.$refs.uploader.click();
        },
        resetState() {
            const defaultState = getInitialState();
            for (const k in defaultState) {
                this[k] = defaultState[k];
            }
            this.loadWalletInfo();
        },
        async onFileChange() {
            const res = await $upload('/files/upload', this.$refs.uploader.files)
            if (res.code !== 0) {
                toastr.error(res.message);
                return;
            }

            this.resetState();
            const entries = [];
            for (let i = 1; i < res.file.data.length; i++) {
                const e = res.file.data[i];
                entries.push({
                    id: e[0],
                    show: true,
                    checked: false,
                    disabled: false,
                    desCustomerName: e[1],
                    desCustomerPhone: e[2],
                    amount: e[3],
                    memo: e[4],
                    checkedStatus: '',
                    checkedMessage: '',
                })
            }
            this.$refs.uploader.value = '';
            this.entries = entries;

        },
        async save() {
            this.isLoading = true;
            const res = await $post('/batch_transfers/save', {entry: this.entry});
            this.isLoading = false;
            if (res.errors) {
                this.errors = res.errors;
                return;
            }
            if (res.code) {
                toastr.error(res.message);
            } else {
                this.errors = {};
                toastr.success(res.message);

                if (!this.entry.id) {
                    location.replace('/batch_transfers/edit?id=' + res.id);
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
