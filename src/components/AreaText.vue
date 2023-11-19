<template>
  <div class="form-group">
    <label class="main-box__label" v-if="label">
      <span v-text="label"></span>
      <span v-if="required" class="title-required">*</span>
    </label>
    <textarea
      v-model="model"
      :readonly="!!readonly"
      @input="onInput(true)"
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
  name: "AreaText",
  props: [
    "label",
    "placeholder",
    "modelValue",
    "errors",
    "datalist",
    "readonly",
    "required",
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

<style>
.error-label {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
  font-weight: 600;
  font-size: 14px;
  color: red;
}

.error-input,
.error-input:hover,
.error-input:focus,
.error-input:active {
  border: 1px solid red !important;
  outline: 0;
  box-shadow: unset;
}
</style>
