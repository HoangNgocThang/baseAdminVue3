<template>
    <div class="form-group">
        <label class="main-box__label" v-if="label">
            <span v-text="label"></span>
            <span v-if="required" class="title-required">*</span>
        </label>
        <input
            ref="input"
            maxlength="12"
            :readonly="!!readonly"
            :disabled="disabled"
            @input="updateValue($event)"
            :class="errors && errors.length ? 'error-input' : ''"
            class="form-control"
            :placeholder="placeholder || label"
        />
        <ul class="error-label" v-if="errors && errors.length">
            <li v-for="error in errors" :key="error" v-text="error"></li>
        </ul>
    </div>
</template>

<script>
import {numberFormat, parseIntEx} from "../lib/utils";

export default {
    name: "InputNumber",
    props: ['modelValue', 'placeholder',
        'min', "label",
        "placeholder",
        "errors",
        "readonly",
        "required",
        "disabled"],
    mounted() {
        this.timeID = null;
        this.$refs.input.value = numberFormat(parseIntEx(this.modelValue))
    },
      watch: {
           'modelValue': function (newValue) {
               this.$refs.input.value = numberFormat(newValue)
           }
       },
    methods: {
        updateValue: function ($event) {

            let type = this.type || 'int';

            if ($event.target.value === '-') {
                return;
            }

            let numVal, n = 0;
            if (type === 'float') {
                n = 2;
            }

            let self = this;

            if (this.timeID) {
                clearTimeout(this.timeID);
            }

            this.timeID = setTimeout(function () {
                let val = $event.target.value.replace(/,/g, '');

                numVal = Number(val) || 0.0;
                if (self.min !== undefined) {
                    if (numVal < self.min) {
                        numVal = self.min;
                    }
                }
                const f = numberFormat(numVal, n);
                $event.target.value = f;
                self.$emit('update:modelValue', numVal)
            }, 200)
        }
    }
}
</script>

<style scoped>

</style>
