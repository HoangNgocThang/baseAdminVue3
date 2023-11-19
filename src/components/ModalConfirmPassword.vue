<template>
    <div style="margin-bottom: 5px">
        <div class="modal" tabindex="-1" ref="modal">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Vui lòng xác nhận mật khẩu</h5>
                        <button v-if="allowClose" @click="hide()"  type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times"/>
                        </button>
                    </div>
                    <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
                        <div class="form-group">
                            <label>Nhập mật khẩu</label>
                            <input type="password" :disabled="remainTime === 0" v-model="password" class="form-control" placeholder="Mật khẩu">
                            <label class="error" v-if="errorMessage" v-text="errorMessage"/>
                        </div>
                        <div class="form-group">
                            <label>Giao dịch hết hiệu lực trong vòng <strong>{{remainTime}}</strong> giây</label>
                        </div>
                    </div>
                    <div class="modal-footer flex-center">
                        <button :disabled="remainTime === 0" type="button" @click="confirmPassword()" class="btn btn-ok btn-primary">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorLabel from "@/components/ErrorLabel.vue";
let intervalId;
export default {
    name: "ModalConfirmPassword",
    components: {ErrorLabel},
    props: [],
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            backdrop: 'static',
            keyboard: false
        });
    },
    data() {
        return {
            remainTime: 0,
            errorMessage: '',
            password: '',
            title: '',
            allowClose: true,
            permissionRequired: [],
        }
    },
    methods: {
        startOtpCounter() {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                this.remainTime--;
                if (this.remainTime <= 0) {
                    this.remainTime = 0;
                    clearInterval(intervalId);
                }
            }, 1000)
        },
        confirmPassword() {
            if (this.confirmPasswordCb) {
                this.confirmPasswordCb(this.password);
            }
        },
        setErrorMessage(message) {
            this.errorMessage =  message;
        },
        show(callback) {
            this.remainTime = 120;
            this.startOtpCounter();
            this.confirmPasswordCb = callback;
            this.errorMessage = '';
            this.modal.show();
        },

        hide() {
            this.modal.hide()
        }
    }
}
</script>

<style scoped>

</style>
