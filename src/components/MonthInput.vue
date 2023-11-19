<template>
    <div class="row mx-sm-3 mb-2">
        <label>Năm</label>
        <select
            v-model="selectedYear"
            @change="onYearChange(selectedYear)"
            class="form-control form-select" style="min-width: 154px">
            <option :value="y" v-for="y in reportYears" :key="y.year">{{ y}}</option>
        </select>
    </div>
    <div class="row mx-sm-3 mb-2" >
        <label>Tháng</label>
        <select v-model="selectedMonth" @change="onMonthChange(selectedMonth)" style="min-width: 100px !important;"
                class="form-select form-control">
            <option v-for="m in reportMonths"  :value="m">
                Tháng {{ m }}
            </option>
        </select>
    </div>
</template>

<script>
import {range} from "../lib/collection";
import {getDefaultYearAndMonth} from "../lib/utils";
const d = new Date;
const currentYear = d.getFullYear();
const currentMonth = d.getMonth() + 1;

export default {
    name: "MonthInput",
    props: ['modelValue'],
    data() {


        const defaultValue = getDefaultYearAndMonth();
        const reportYears = defaultValue.reportYears;
        const reportMonths = defaultValue.reportMonths;
        console.log('AAA', this.modelValue)

      /*  let selectedMonth, selectedYear;
        const modelValueMonth = this.modelValue?.month;
        const modelValueYear= this.modelValue?.year;
        if (modelValueYear ){
            selectedYear = defaultValue.reportYears.find(y => y === parseInt(modelValueYear));
            if (!selectedYear) {
                selectedYear = defaultValue.reportYears
            }

            if (selectedYear === currentYear) {
                this.reportMonths = range(currentMonth -1 ,1 ,1)
            } else {
                this.reportMonths  = range(12, 1, 1);
            }
        }*/
        let selectedYear = this.modelValue?.year || defaultValue.year;
        let selectedMonth = this.modelValue?.month || defaultValue.month;
        console.log({selectedYear, selectedMonth});

        return {
            reportYears: defaultValue.reportYears,
            reportMonths: defaultValue.reportMonths,
            selectedMonth,
            selectedYear,
        }
    },
    methods: {
        onYearChange(year) {
            if (year === currentYear) {
                this.reportMonths = range(currentMonth -1 ,1 ,1)
            } else {
                this.reportMonths  = range(12, 1, 1);
            }

            this.selectedMonth = this.reportMonths[ this.reportMonths.length - 1];


            this.$emit('update:modelValue', {
                month: this.selectedMonth,
                year: year
            })
        },
        onMonthChange(month) {
            this.$emit('update:modelValue', {
                month: month,
                year: this.selectedYear
            })
        }
    }
}
</script>

<style scoped>

</style>
