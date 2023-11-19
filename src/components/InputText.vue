<template>
    <div class="form-group">
        <label class="main-box__label" v-if="label">
            <span v-text="label"></span>
            <span v-if="required" class="title-required">*</span>
        </label>
        <input
            v-model="model"
            @input="onInput(true)"
            :readonly="!!readonly"
            :disabled="disabled"
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
export default {
    name: "InputText",
    props: [
        "label",
        "placeholder",
        "modelValue",
        "errors",
        "datalist",
        "readonly",
        "required",
        "disabled",
    ],
    data() {
        return {
            model: this.modelValue,
        };
    },
    watch: {
        modelValue: function (newValue) {
            this.model = newValue;
        },
    },
    methods: {
        onInput() {
            this.$emit("update:modelValue", this.model);
            this.$nextTick(() => {
                this.$emit("input", this.model);
            });
        },
    },
};
</script>

