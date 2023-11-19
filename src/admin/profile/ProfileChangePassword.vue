<template>
    <div class="main-content app-content"> <!-- container -->
        <div class="main-container container-fluid"> <!-- breadcrumb -->
            <div class="breadcrumb-header justify-content-between">
                <div class="left-content"><span class="main-content-title mg-b-0 mg-b-lg-1">Profile</span></div>
                <div class="justify-content-center mt-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item tx-15"><a href="javascript:void(0);">TRANG CHỦ</a></li>
                        <li class="breadcrumb-item tx-15 active" aria-current="page">Đổi mật khẩu</li>
                    </ol>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="d-flex justify-content-between">
                                <h4 class="card-title mg-b-0">ĐỔI MẬT KHẨU</h4></div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <input v-model="entry.id" type="hidden" name="id">
                                    <div class="alert alert-info" v-if="flashMessage" v-text="flashMessage"></div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input readonly id="f_key" v-model="entry.email" name="name" class="form-control"
                                               placeholder="key">

                                    </div>
                                    <div class="form-group">
                                        <label>Tên</label>
                                        <input readonly id="f_name" v-model="entry.name" name="name" class="form-control"
                                               placeholder="name">

                                    </div>
                                    <div class="form-group">
                                        <label>Mật khẩu hiện tại</label>
                                        <input type="password" id="f_value" v-model="model.currentPassword" name="name" class="form-control"
                                               placeholder="Mật khẩu hiện tại">
                                        <error-label for="f_value" :errors="errors.currentPassword"></error-label>
                                    </div>
                                    <div class="form-group">
                                        <label>Mật khẩu mới</label>
                                        <input type="password" id="f_value" v-model="model.newPassword" name="name" class="form-control"
                                               placeholder="Mật khẩu mới">
                                        <error-label for="f_value" :errors="errors.newPassword"></error-label>
                                    </div>
                                    <div class="form-group">
                                        <label>Nhập lại mật khẩu mới</label>
                                        <input id="f_value" type="password" v-model="model.newPasswordConfirm" name="name" class="form-control"
                                               placeholder="Nhập lại mật khẩu mới">
                                        <error-label for="f_value" :errors="errors.newPasswordConfirm"></error-label>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" @click="save()" class="btn btn-primary">Thay đổi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>



</template>

<script>
import {$post, isStringNullOrWhiteSpace} from "../../lib/utils";

export default {
    name: "ProfileChangePassword",
    components: {},
    data() {
        return {
            model: {currentPassword: '', newPassword: '', newPasswordConfirm: ''},
            entry: $json.currentUser || {},
            flashMessage: $json.flashMessage || false,
            continueUrl: $json.continueUrl || false,
            isLoading: false,
            errors: {}
        }
    },
    methods: {
        async save() {
            this.errors = {};

            const model = this.model;
            if (isStringNullOrWhiteSpace(model.currentPassword)) {
                this.errors.currentPassword = ['Vui lòng nhập mật khẩu hiện tại'];
            }

            if (isStringNullOrWhiteSpace(model.newPassword)) {
                this.errors.newPassword = ['Vui lòng nhập mật khẩu mới'];
            }

            if (model.newPassword !== model.newPasswordConfirm) {
                this.errors.newPasswordConfirm = ['Mật khẩu xác nhận chưa chính xác'];
            }

            if (Object.keys(this.errors).length > 0) {
                toastr.error('Vui lòng kiểm tra dữ liệu');
                return;
            }

            this.isLoading = true;
            const res = await $post('/xadmin/profile/saveNewPassword',this.model, false);
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
                this.model = {};
                if (this.continueUrl) {
                    location.replace(this.continueUrl)
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
