<template>
    <div class="row mx-sm-3 mb-2">
        <label>Năm</label>
        <select
            v-model="selectedYear"
            @change="onYearChange(selectedYear)"
            class="form-control form-select" style="min-width: 154px">
            <option :value="y" v-for="y in years" :key="y.year">{{ y.year }}</option>
        </select>
    </div>
    <div class="row mx-sm-3 mb-2"
         v-bind:class="{'d-none': !showQuarter }">
        <label>Tính đến quý</label>
        <select v-model="selectedQuarter" @change="onQuarterChange(selectedQuarter)" style="min-width: 100px !important;"
                class="form-select form-control">
            <option v-for="q in selectedYear.quarters"  :value="q">
                Quý {{ q}}
            </option>
        </select>
    </div>
</template>

<script>
import {getReportYearAndQuarter} from "../lib/utils";

export default {
    name: "QuarterInput",
    props: ['showQuarter', 'modelValue'],
    data() {
        const years = getReportYearAndQuarter();

        let selectedYear, selectedQuarter;

        try {
            selectedYear = years.find(y => y.year === parseInt(this.modelValue.year));
            if (!selectedYear) {
                selectedYear = years[years.length-1];
            }
        } catch (err) {
            selectedYear = years[years.length-1];
        }

        if (this.modelValue.quarter) {
            selectedQuarter = this.modelValue.quarter;
        } else {
            selectedQuarter = selectedYear.quarters[selectedYear.quarters.length - 1];
        }


        return {
            selectedYear: selectedYear,
            selectedQuarter: selectedQuarter,
            years: years
        }
    },

    methods: {
        setQuarter(value) {
            this.selectedQuarter = value.quarter;
            this.selectedYear = value.year;
        },
        onYearChange(year) {
            this.selectedQuarter = year.quarters[year.quarters.length - 1];
            this.$emit('update:modelValue', {
                year: year.year,
                quarter: this.selectedQuarter
            })
        },
        onQuarterChange(value) {
            this.$emit('update:modelValue', {
                year: this.selectedYear.year,
                quarter:value
            })
        }
    }
}
</script>

<style scoped>

</style>
