<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">Chuyển tiền cá nhân</span></div>
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="/dashboard">Trang chủ</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Chuyển tiền cá nhân</li>
                    </ol>
                </div>
            </div> <!-- /breadcrumb --> <!-- row -->

            <div class="row row-sm">

                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex justify-content-between">
                                <h4 class="card-title mg-b-0">Thêm mới giao dịch chuyển tiền cá nhân</h4></div>

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
                                <div class="col-lg-8 col-xs-12 col-sm-12">
                                    <template v-if="transferStep === 0">
                                        <div class="form-group">
                                            <label>
                                                Hình thức chuyển tiền: Qua số điện thoại
                                            </label>
                                        </div>
                                        <InputText label="Số điện thoại người nhận" :required="true"  :errors="errors.phone" v-model="model.desCustomerPhone" placeholder="Số điện thoại người nhận"/>
                                        <InputNumber label="Số tiền" :required="true" :errors="errors.amount" v-model="model.amount" :min="0" placeholder="Số tiền" />
                                        <InputTextArea label="Nội dung chuyển khoản" :required="true" :errors="errors.memo" v-model="model.memo" placeholder="Nội dung chuyển khoản"/>
                                    </template>
                                    <template v-else-if="transferStep === 1">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Hình thức chuyển tiền</td>
                                                    <th>Qua số điện thoại</th>
                                                </tr>
                                                <tr>
                                                    <td>Số điện thoại người nhận</td>
                                                    <th>{{model.desCustomerPhone}}</th>
                                                </tr>
                                                <tr>
                                                    <td>Tên người nhận</td>
                                                    <th>{{model.desCustomerName}}</th>
                                                </tr>
                                                <tr>
                                                    <td> Số tiền</td>
                                                    <th>{{n(model.amount)}}</th>
                                                </tr>
                                                <tr>
                                                    <td>Phí giao dịch</td>
                                                    <th>0</th>
                                                </tr>
                                                <tr>
                                                    <td>Nội dung chuyển khoản</td>
                                                    <th>{{model.memo}}</th>
                                                </tr>
                                            </tbody>
                                        </table>


                                    </template>
                                    <template v-else-if="transferStep === 2">
                                        <h3>Chuyển khoản thành công <i style="color: #0b8949" class="fas fa-check-circle"/></h3>
                                        <table class="table table-bordered">
                                            <tbody>
                                            <tr>
                                                <td>Hình thức chuyển tiền</td>
                                                <th>Qua số điện thoại</th>
                                            </tr>
                                            <tr>
                                                <td>Mã giao dịch</td>
                                                <th>#{{model.orderCode}}</th>
                                            </tr>
                                            <tr>
                                                <td>Số điện thoại người nhận</td>
                                                <th>{{model.desCustomerPhone}}</th>
                                            </tr>
                                            <tr>
                                                <td>Tên người nhận</td>
                                                <th>{{model.desCustomerName}}</th>
                                            </tr>
                                            <tr>
                                                <td> Số tiền</td>
                                                <th>{{n(model.amount)}}</th>
                                            </tr>
                                            <tr>
                                                <td>Phí giao dịch</td>
                                                <th>0</th>
                                            </tr>
                                            <tr>
                                                <td>Nội dung chuyển khoản</td>
                                                <th>{{model.memo}}</th>
                                            </tr>
                                            </tbody>
                                        </table>


                                    </template>
                                    <div class="form-group">
                                        <button style="margin-right: 15px" v-if="transferStep===2" type="button" class="btn btn-primary" @click="resetTransfer()" > Trở về
                                            <i class="fas fa-angle-left"/>
                                        </button>
                                        <button style="margin-right: 15px" v-if="transferStep===1" type="button" class="btn btn-primary" @click="goBack()" > Quay lại
                                            <i class="fas fa-angle-left"/>
                                        </button>

                                        <button  type="button" v-if="transferStep!==2" class="btn btn-purple" @click="doTransferConfirm()" > Tiếp tục
                                            <i class="fas fa-angle-right"/>
                                        </button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div> <!--/div--> <!--div-->

            </div> <!-- /row -->
        </div>

        <ModalConfirmPassword ref="modalConfirmPassowrd"/>
    </div> <!-- /main-content -->

</template>

<script>
import NumberFormatInput from "@/components/NumberFormatInput.vue";
import InputNumber from "@/components/InputNumber.vue";
import ErrorLabel from "@/components/ErrorLabel.vue";
import {$post, isStringNullOrWhiteSpace, validatePhone} from "@/lib/utils.ts";
import ModalConfirmPassword from "@/components/ModalConfirmPassword.vue";
import {API_CODE} from "@/define.js";
import InputText from "@/components/InputText.vue";
import InputTextArea from "@/components/InputTextarea.vue";
let loading = false;

const debugModel = {
    orderCode: '',
    srcAccountId: null,
    descAccountId: null,
    desCustomerPhone: '0395056645',
    desCustomerName: '',
    memo: 'Test CK',
    amount: 10000,
};
let defaultModel = {
    orderCode: '',
    srcAccountId: null,
    descAccountId: null,
    desCustomerPhone: '',
    desCustomerName: '',
    memo: '',
    amount: 0,
};
if (location.host.indexOf('localhost:') === 0) {
    defaultModel = debugModel;
}

export default {
    name: "TransferForm",
    components: {InputTextArea, InputText, ModalConfirmPassword, ErrorLabel, InputNumber, NumberFormatInput},
    data() {
        return {
            tempToken: null,
            auth: window.$auth,
            transferStep: 0,
            customerAccount: {
                balance: 0
            },
            errors: {
            },
            transferOrderModel: null,
            model: defaultModel
        }
    },
    mounted() {
        this.loadWalletInfo();
    },
    methods: {
        async loadDesWalletInfo(mobile) {
            loading = true;
            const res = await $post('/api/wallets/getListWalletIdV10', {
                mobile: mobile
            });
            loading = false;
            return res;
        },
        async loadWalletInfo() {
            loading = true;
            const res = await $post('/api/wallets/getMyListWallets');
            loading = false;
            if (res.code !== API_CODE.SUCCESS) {
                toastr.error(res.message);
                return;
            }

            res.data.balance = parseInt(res.data.balance);
            this.customerAccount = res.data;
            this.model.srcAccountId = this.customerAccount.accountId;
        },
        resetTransfer() {
            this.model = {
                orderCode: '',
                srcAccountId: null,
                descAccountId: null,
                desCustomerPhone: '',
                desCustomerName: '',
                memo: '',
                amount: 0,
            };

            this.transferStep = 0;
        },
        goBack() {
            this.transferStep = 0;
        },
        async doTransferConfirm() {
            if (loading) {
                return;
            }

            if (this.transferStep === 0) {
                this.errors = {};
                let hasError = false;
                if (isStringNullOrWhiteSpace(this.model.memo)) {
                    this.errors.memo = ['Vui lòng nhập nội dung chuyển khoản'];
                    hasError = true;
                }

                if (!validatePhone(this.model.desCustomerPhone)) {
                    this.errors.phone = ['Vui lòng nhập số điện thoại hợp lệ'];
                    hasError = true;
                }

                if (this.model.amount < 1000) {
                    this.errors.amount = ['Số tiền tối thiểu là 1,000đ'];
                    hasError = true;
                }

                if (this.model.amount > this.customerAccount.balance) {
                    this.errors.amount = ['Số dư không đủ để thực hiện giao dịch này'];
                    hasError = true;
                }

                if (hasError) {
                    return;
                }

                const desWalletInfo = await this.loadDesWalletInfo(this.model.desCustomerPhone);
                if (desWalletInfo.code !== API_CODE.SUCCESS) {
                    this.errors.phone = [desWalletInfo.message];
                    hasError = true;
                } else {
                    this.model.desCustomerName = desWalletInfo.data.customerName;
                    this.model.descAccountId = desWalletInfo.data.accountId;
                }


                if (!hasError) {
                    this.transferStep = 1;
                }

            } else if (this.transferStep === 1) {

                const res = await $post('/api/transfers/createTransferOrder', {
                    amount: this.model.amount,
                    descAccountId: this.model.descAccountId
                });

                if (res.code !== API_CODE.SUCCESS) {
                    toastr.error(res.message);
                    return;
                }

                this.transferOrderModel = res.body;

                this.$refs.modalConfirmPassowrd.show(async (password) => {
                    const res = await $post('/api/transfers/confirmTransferByPassword', {
                        tempToken: this.transferOrderModel.tempToken,
                        password: password,
                        transNote: this.model.memo,
                    });

                    if (res.code === API_CODE.FORCE_LOGOUT) {
                        // location.href= '/logout';
                      location.href ='/login'
                      return;
                    }

                    if (res.code !== API_CODE.SUCCESS) {
                        toastr.error(res.message);
                        this.$refs.modalConfirmPassowrd.setErrorMessage(res.message);
                        return;
                    }

                    toastr.success('Chuyển khoản thành công');
                    this.$refs.modalConfirmPassowrd.hide();
                    this.transferStep = 2;
                    this.model.orderCode = res.body.orderCode;
                    this.loadWalletInfo();
                });
            }

        }
    }
}
</script>

<style scoped>

</style>
