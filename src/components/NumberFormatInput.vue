<template>
  <input maxlength="20" type="text" :placeholder="placeholder"
         v-model="model"
         @input="updateValue($event)"
         @keydown="onKeyDown($event)"
         class="form-control">
</template>

<script>
import {numberFormat, parseIntEx, flip} from "../lib/utils";

const allowed = flip([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '-',
  'Backspace', 'ArrowLeft', 'ArrowRight', 'F5', 'Tab'], true);

export default {
  name: "NumberFormatInput",
  props: ['value', 'placeholder'],
  data() {
    const model = numberFormat(parseIntEx(this.value));

    return {
      model
    }
  },
  mounted() {

  },
  watch: {
    value: function (v) {
      this.model = numberFormat(parseIntEx(v));
    }
  },
  methods: {
    onKeyDown($event) {
      if (!allowed[$event.key]) {
        $event.preventDefault();
      }
    },
    updateValue: function () {

      let v = parseIntEx(this.model);
      this.$emit('input', v);
    }
  }
}
</script>

<style scoped>

</style>
