<template>
    <div class="action-bar">
        <div class="action-bar__container">
            <div class="action-bar__button">
                <a v-if="backUrl" :href="backUrl" class="btn btn-default">
                    Quay lại
                </a>

                <button v-if="showResetButton" class="btn btn-default" type="button" @click="reset()">
                    <i class="fa fa-reload"/>
                    Hủy thay đổi
                </button>

                <template v-if="buttons && buttons.length">
                    <template v-for="(btn,btnIndex) in buttons" :key="btnIndex">
                        <template v-if="(btn.showIf === undefined || btn.showIf === true)">
                            <a v-if="btn.href" :href="btn.href" :class="btn.class || 'btn btn-default'">
                                <i :class="btn.icon" v-if="btn.icon"/>
                                {{ btn.label }}
                            </a>
                            <button
                                v-else
                                @click="btn.action"
                                :class="btn.class || 'btn btn-default'"
                            >
                                <i :class="btn.icon" v-if="btn.icon"/>
                                {{ btn.label }}
                            </button>
                        </template>
                    </template>
                </template>

                <button v-if="!hideButtonSave" class="btn btn-primary" type="button" @click="action()">
                    <i :class="btnIcon"/>
                    {{btnLabel}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActionBar",
    props: [
        'backUrl',
        'icon',
        'label',
        'type',
        'showResetButton',
        'buttons',
        'hideButtonSave'
    ],
    data() {
        return {
            btnIcon: this.icon || 'fa fa-save',
            btnLabel: this.label || 'Lưu lại',
            hideButton: this.hideButtonSave || false
        }

    },
    mounted() {
    },
    methods: {
        reset() {
            this.$emit('reset');
        },
        onBack() {

        },
        action() {
            this.$emit('action');
        }
    }
}
</script>

<style>
.action-bar {
    background: #fff;
    bottom: 0;
    box-shadow: 0 -5px 5px -5px #999;
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    z-index: 100;
}

.action-bar__container {
    height: 69px;
    display: flex;
    width: 100%;
    align-items: center;
}

.action-bar__button {
    margin-left: auto;
    padding: 20px 100px;
}

.action-bar__button .btn {
    margin-left: 5px;
}
</style>
