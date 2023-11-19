<template>
    <div style="margin-bottom: 5px">
        <div class="modal" tabindex="-1" ref="modal">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{title}}</h5>
                        <button v-if="allowClose" @click="hide()"  type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times"/>
                        </button>
                    </div>
                    <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
                        <div style="height: 247px;
    width: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(/images/401.png);">
                        </div>
                        <div class="form-group">
                            <label>Bạn cần quyền sau để xem trang này</label>
                            <ul>
                                <li v-for="p in permissionRequired">
                                    <span v-text="p.id + ': ' + p.module + '.' + p.name"></span>
                                    <span v-if="p.display_name">({{p.display_name}})</span>
                                </li>
                            </ul>

                            <p>
                                <strong>Vui lòng liên hệ admin để bổ sung thêm quyền</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalPermissionError",
    props: [],
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            backdrop: 'static',
            keyboard: false
        });
    },
    data() {
        return {
            title: '',
            allowClose: false,
            permissionRequired: [],
        }
    },
    methods: {
        show(title, permissionRequired, allowClose) {
            this.title = title;
            this.allowClose = allowClose;
            this.permissionRequired = permissionRequired;
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
