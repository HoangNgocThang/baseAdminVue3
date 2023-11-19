<template>
    <input name="time" :placeholder="placeholder"
           autocomplete="off"
           :class="className">
</template>

<script>
import {getTimeRangeAll} from "@/lib/utils";

const DATE_LOCALES = {
    "format": "DD/MM/YYYY",
    "separator": " -- ",
    "applyLabel": "Chọn",
    "cancelLabel": "Hủy",
    "fromLabel": "Từ",
    "toLabel": "tới",
    "customRangeLabel": "Tùy chọn",
    "daysOfWeek": [
        "CN",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
    ],
    "monthNames": [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
    ],
    "firstDay": 1
};

export default {
    name: "Daterangepicker",
    props: ['modelValue', 'placeholder', 'query', 'defaultClass'],

    data: function () {
        return {
            className: this.defaultClass || 'form-control'
        }
    },
    watch: {
        value: function () {
            if (!this.value) {
                this.$el.value = '';
            }
        }
    },
    mounted: function () {
        const ranges = {
            'Hôm nay': [moment(), moment()],
            'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '3 ngày trước': [moment().subtract(2, 'days'), moment()],
            '7 ngày trước': [moment().subtract(6, 'days'), moment()],
            '30 ngày trước': [moment().subtract(29, 'days'), moment()],
            'Tháng này': [moment().startOf('month'), moment().endOf('month')],
            'Tất cả': [moment('2021-01-01'), moment()]
        };

        const tr = getTimeRangeAll();
        const tmp = this.modelValue ? this.modelValue.split('_') : tr.split('_');

        const startDate = tmp[0] ? moment(tmp[0]) : moment('2019-01-01');
        const endDate = tmp[1] ? moment(tmp[1]) : moment();


        $(this.$el).daterangepicker({
            autoUpdateInput: false,
            startDate: startDate,
            endDate: endDate,
            locale: DATE_LOCALES,
            ranges: ranges

        }, (start, end) => {
            this.$emit('update:modelValue', start.format('YYYY-MM-DD') + '_' + end.format('YYYY-MM-DD'));
            this.$el.value = start.format('DD/MM/YYYY') + ' -- ' + end.format('DD/MM/YYYY');
        });


        // var _query  = $router.getQuery();
        if (this.modelValue) {
            this.$el.value = startDate.format('DD/MM/YYYY') + ' -- ' + endDate.format('DD/MM/YYYY');
        }
    },
}
</script>

<style scoped>

</style>
