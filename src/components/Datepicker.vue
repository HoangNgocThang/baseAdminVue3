<template>
    <input :id="id" name="time"
           @change="onChange()"
           :placeholder="placeholder"
           autocomplete="off"
           class="form-control daterange1">
</template>

<script>
import moment from "moment";

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
    name: "Datepicker",
    props: ['modelValue', 'placeholder', 'timepicker', 'minDate', 'id', 'format'],
    emits: ['input'],

    data: function () {
        return {
            dateTime: ''
        }
    },
    methods: {
        onChange() {
            if (!this.$el.value) {
                this.$emit('update:modelValue', this.$el.value);
            }
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

        const format = this.format ? this.format : 'DD/MM/YYYY HH:mm';
        const value = this.modelValue ? moment(this.modelValue, 'YYYY-MM-DD') : moment();
        let minDate = undefined;
        if (this.minDate === 'now') {
            minDate = moment();
        } else if (this.minDate) {
            minDate = moment(this.minDate, format);
        }

        $(this.$el).daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            startDate: value,
            endDate: value,
            locale: DATE_LOCALES,
            timePicker: this.timepicker || false,
            timePicker24Hour: true,
            minDate,
            maxDate: moment()
        }, (start, end) => {
            this.$emit('update:modelValue', start.format('YYYY-MM-DD'));
            this.$el.value = start.format(format);
        });

        if (this.modelValue) {
            this.$el.value = value.format(format);
        }
    },
}
</script>

<style scoped>

</style>
