<template>
    <input name="time" :placeholder="placeholder"
           autocomplete="off"
           :class="className">
</template>

<script>
import moment from "moment";

const DATE_LOCALES = {
    "format": "DD/MM/YYYY HH:mm",
    "separator": " -- ",
    "applyLabel": "Chọn",
    "cancelLabel": "Hủy",
    "fromLabel": "Từ",
    "toLabel": "tới",
    "daysOfWeek": [
        "CN",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7"
    ]
};

export default {
    name: "TimeRangePicker",
    props: ['modelValue', 'placeholder', 'query', 'defaultClass', 'minDate', 'maxDate'],

    data: function () {
        return {
            className: this.defaultClass || 'form-control'
        }
    },
    watch: {
        modelValue: function () {
            if (!this.modelValue) {
                this.$el.value = '';
            }
        }
    },
    mounted: function () {

        var tmp = this.modelValue ? this.modelValue.split('_') : [];
        var startDate = tmp[0] ? moment(tmp[0]) : moment('2019-01-01');
        var endDate = tmp[1] ? moment(tmp[1]) : moment();


        let minDate = undefined;
        if (this.minDate) {
            minDate = moment(this.minDate);
        }

        let maxDate = undefined;
        if (this.maxDate) {
            maxDate = moment(this.maxDate);
        }

        $(this.$el).daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            autoUpdateInput: false,
            startDate: startDate,
            endDate: endDate,
            locale: DATE_LOCALES,
            minDate,
            maxDate,
        }, (start, end) => {
            this.$emit('update:modelValue', start.format('YYYY-MM-DD HH:mm:ss') + '_' + end.format('YYYY-MM-DD HH:mm:ss'));
            this.$emit('input', start.format('YYYY-MM-DD HH:mm') + '_' + end.format('YYYY-MM-DD HH:mm'));
            this.$el.value = start.format('DD/MM/YYYY HH:mm') + ' -- ' + end.format('DD/MM/YYYY HH:mm');
        });


        // var _query  = $router.getQuery();
        if (this.modelValue) {
            this.$el.value = startDate.format('DD/MM/YYYY HH:mm') + ' -- ' + endDate.format('DD/MM/YYYY HH:mm');
        }
    },
}
</script>

<style scoped>

</style>
