<template>
    <select v-model="quarterSelected" style="min-width: 80px !important;" @change="click()"
            class="form-select form-control">
        <option v-for="it in quarter_filter"  :class="{'color-disable': it.check_disable}" :value="it.value"
                :disabled="it.check_disable">
            {{ it.name }}
        </option>
    </select>
</template>

<script>
import moment from "moment";

export default {
    props: ['loading', 'text', 'icon', 'year'],
    name: "SelectQuarter",
    emits: ['selectOneQuarter'],
    data() {

        const urlParams = new URLSearchParams(window.location.hash);
        return {
            isLoading: this.loading || false,
            label: this.text || 'Lưu lại',
            fa: this.icon || 'fa fa-check',
            quarter_filter: [
                {name: '1', value: 1, check_disable: false},
                {name: '2', value: 2, check_disable: false},
                {name: '3', value: 3, check_disable: false},
                {name: '4', value: 4, check_disable: false}
            ],
            quarterSelected: parseInt(urlParams.get('filterQuarter')) || parseInt(moment().subtract(1, 'Q').format('Q'))
        }
    },
    mounted() {
        this.checkDisableQuarter()
    },
    methods: {
        click() {
            this.$emit('selectOneQuarter', this.quarterSelected)
        },
        checkDisableQuarter() {
           this.quarter_filter.forEach(it => {
                if (this.year == moment().year() && it.value > parseInt(moment().subtract(1, 'Q').format('Q'))) {
                    it.check_disable = true
                } else {
                    it.check_disable = false
                }
            });
        },
    },
    watch: {
        year :function (newVal) {
            if (newVal) {
                this.$emit('input', this.year)
                this.checkDisableQuarter()
                if(newVal != moment().year()) {
                    this. quarterSelected = 4
                    this.$emit('selectOneQuarter', this.quarterSelected)
                } else {
                    this. quarterSelected = parseInt(moment().subtract(1, 'Q').format('Q'))
                    this.$emit('selectOneQuarter', this.quarterSelected)
                }
            }
        }
    }
}


</script>

<style scoped>
.color-disable {
    opacity: 0.1;
    cursor: not-allowed;
    color: #d7d1cf;
}
</style>
