<template>
    <div style="margin-bottom: 5px">
        <div class="modal" tabindex="-1" ref="modal">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Chọn DB thống kê</h5>
                        <button v-if="allowClose" @click="hide()"  type="button" class="btn-close modal-btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times"/>
                        </button>
                    </div>
                    <div class="modal-body" style=" max-height: 60vh;overflow-y: auto;">
                        <div class="form-group">
                            <label>Vui lòng chọn DB thống kê</label>
                            <select class="form-control" v-model="database">
                                <option :value="db.id" v-for="db in reportDatabases" v-text="db.name"></option>
                            </select>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" @click="save()" class="btn btn-primary">OK</button>
                        <button type="button" class="btn btn-cancel" data-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {KEY_CURRENT_DB, KEY_CURRENT_DB_NAME} from "../lib/querybuilder/QueryBuilder";

export default {
    name: "ModalSelectDB",
    props: [],
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            backdrop: 'static',
            keyboard: false
        });
    },
    data() {
        const reportDatabases = window.$reportDatabases;
        let database = localStorage.getItem(KEY_CURRENT_DB);

        if (database == null && reportDatabases.length > 0) {
            database = reportDatabases[0].id;
        }

        return {
            database,
            title: '',
            allowClose: false,
            permissionRequired: [],
            reportDatabases: window.$reportDatabases,
        }
    },
    methods: {
        save() {
            const db = this.reportDatabases.find(d => d.id == this.database);
            if (db) {
                localStorage.setItem(KEY_CURRENT_DB, db.id);
                localStorage.setItem(KEY_CURRENT_DB_NAME, db.name);
            } else {
                alert('Không tìm thấy db');
            }

            this.hide();
            location.reload();
        },
        show() {
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
