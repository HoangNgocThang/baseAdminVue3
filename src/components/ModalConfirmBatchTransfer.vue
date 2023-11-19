<template>
    <div style="margin-bottom: 5px">
        <div class="modal" tabindex="-1" ref="modal">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác thực giao dịch</h5>
                        <button v-if="allowClose" @click="hide()"  type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times"/>
                        </button>
                    </div>
                    <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
                        <div v-if="model.batchCode" >
                            <h3>Đặt lệnh chuyển tiền thành công <i style="color: #0b8949" class="fas fa-check-circle"/></h3>
                        </div>

                        <table class="table table-bordered">
                            <tbody>
                                <tr v-if="model.orderCode" >
                                    <th style="width: 40%">Mã giao dịch</th>
                                    <td>{{ model.orderCode }}</td>
                                </tr>
                                <tr v-if="model.batchCode" >
                                    <th style="width: 40%">Mã lô</th>
                                    <td>{{ model.batchCode }}</td>
                                </tr>
                                <tr >
                                    <th >Tổng số người nhận</th>
                                    <td>{{ model.receiverCount }}</td>
                                </tr>
                                <tr>
                                    <th>Tổng số tiền</th>
                                    <td>{{ n(model.totalAmount) }}</td>
                                </tr>
                                <tr>
                                    <th>Phí số tiền</th>
                                    <td>{{ n(model.feeAmount) }}</td>
                                </tr>
                                <tr>
                                    <th>Tổng tiền</th>
                                    <td>{{ n(model.totalAmount) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <template  v-if="showOtpInput">
                            <div class="form-group">
                                <label>Vui lòng nhập OTP</label>
                                <input v-model="otp" :disabled="otpRemainTime === 0" class="form-control" placeholder="OTP">
                            </div>
                            <div class="form-group">
                                <label>Mã OTP hết hiệu lực trong vòng <strong>{{otpRemainTime}}</strong> giây</label>
                            </div>
                        </template>
                        <div class="form-group" v-if="errorMessage">
                            <div class="alert alert-danger" v-text="errorMessage">

                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <template v-if="step !== 2">
                            <button v-if="!showOtpInput"  type="button" @click="confirmOrder()" class="btn btn-primary">Tiếp tục <i class="fas fa-angle-right"/></button>
                            <button v-if="showOtpInput" type="button" @click="confirmOrderOtp()" class="btn btn-primary"> <i class="fas fa-check"/> Đặt lệnh chuyển tiền </button>
                        </template>
                        <button  type="button" class="btn btn-cancel" @click="hide()">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let otpIntervalId;
export default {
    name: "ModalConfirmBatchTransfer",
    data() {
        return {
            otpRemainTime: 0,
            errorMessage: '',
            password: '',
            title: '',
            otp: '',
            allowClose: false,
            showOtpInput: false,
            step: 0,
            model: {
                batchCode: '',
                orderCode: '',
                receiverCount: 0,
                totalAmount: 0,
                feeAmount: 0,
            }
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            backdrop: 'static',
            keyboard: false
        });
    },
    methods: {
        reset() {
            this.step = 0;
            this.otpRemainTime = 0;
            this.otp = '';
            this.model = {
                batchCode: '',
                orderCode: '',
                receiverCount: 0,
                totalAmount: 0,
                feeAmount: 0,
            }
        },
        stepOtpCounter(orderCode) {
            this.model.orderCode = orderCode;
            this.showOtpInput = true;
            this.otpRemainTime = 120;
            this.step = 1;
            clearInterval(otpIntervalId);
            otpIntervalId = setInterval(() => {
                this.otpRemainTime--;
                if (this.otpRemainTime <= 0) {
                    this.otpRemainTime = 0;
                    clearInterval(otpIntervalId);
                }
            }, 1000)

        },
        stepShowSuccess(batchCode) {
            this.showOtpInput = false;
            clearInterval(otpIntervalId);
            this.model.batchCode = batchCode;
            this.step = 2;
        },
        async confirmOrderOtp() {

            this.okCallback(this.step, {
                otp: this.otp
            });
        },
        confirmOrder() {
            this.okCallback(this.step);
        },
        setErrorMessage(message) {
            this.errorMessage = message;
        },
        show(model, callback) {
            this.model = model;
            this.okCallback = callback;
            this.errorMessage = '';
            this.modal.show();
        },

        hide() {
            this.modal.hide();
            this.reset();
        }
    }
}
</script>

<style scoped>

</style>
