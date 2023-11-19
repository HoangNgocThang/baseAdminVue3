<template>
<select class="form-select form-control" style="width: 142px" v-model="monthSelected" @change="click()">
 <option v-for="obj in month" :class="{'color-disable': obj.check_disable}"
         :disabled="obj.check_disable" :value="obj.monthName"  :key="obj">{{obj.monthName}}</option>
</select>
</template>

<script>
import moment from "moment";

export default {
    props: ['loading', 'text', 'icon', 'year'],
    name: "SelectMonth",
    emits: ['selectOneMonth'],
    data() {
        const urlParams = new URLSearchParams(window.location.hash);
        return {
            isLoading: this.loading || false,
            label: this.text || 'Lưu lại',
            fa: this.icon || 'fa fa-check',
            month: [
                {monthName: 1, checkDisable: false},
                {monthName: 2, checkDisable: false},
                {monthName: 3, checkDisable: false},
                {monthName: 4, checkDisable: false},
                {monthName: 5, checkDisable: false},
                {monthName: 6, checkDisable: false},
                {monthName: 7, checkDisable: false},
                {monthName: 8, checkDisable: false},
                {monthName: 9, checkDisable: false},
                {monthName: 10, checkDisable: false},
                {monthName: 11, checkDisable: false},
                {monthName: 12, checkDisable: false},
            ],
            monthSelected: parseInt(urlParams.get('filterMonth')) || parseInt(moment().format('M'))
        }
    },
    mounted() {
        this.checkDisableMonth()
    },
    methods: {
        click() {
            this.$emit('selectOneMonth', this.monthSelected)
        },
        checkDisableMonth() {
            this.month.forEach(it => {
                if (this.year == moment().year() && it.monthName > moment().format('M')) {
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
                this.checkDisableMonth()
                if(newVal != moment().year()) {
                    this.monthSelected = 12
                    this.$emit('selectOneMonth', this.monthSelected)
                } else {
                    this. monthSelected =  parseInt(moment().format('M'))
                    this.$emit('selectOneMonth', this.monthSelected)
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
