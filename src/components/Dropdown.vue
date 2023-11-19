<template>
  <div class="form-dropdown">
    <div v-click-outside="onBlur" class="container-dropdown">
      <div @click="onShow" class="container-title-dropdown">
        <div class="txt-title">
          <label>{{ getName }}</label>
          <i class="fa fa-angle-down"></i>
        </div>
      </div>

      <div v-if="isShow && data.length" class="container-content">
        <ul class="list-dropdown">
          <li v-for="option in options" :key="option.id">
            <label>
              <span>{{ option[optionKey?.label] || option.label }}</span>
              <input
                :type="type || 'checkbox'"
                :value="option"
                v-model="inputVal"
              />
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dropdown",
  props: ["title", "options", "value", "onSelected", "type", "optionKey"],
  data() {
    return {
      isShow: false,
      keyword: "",
      inputVal: [],
      tagsCopy: [],
      data: [],
    };
  },
  computed: {
    getName() {
      return (this.tagsCopy?.length ? this.tagsCopy : this.value || [])
        .map((e) => e[this.optionKey?.label] || e.label)
        .join(", ");
    },
  },
  watch: {
    inputVal(newVal) {
      this.tagsCopy = newVal;
      // this.$emit("update:input", newVal);
      this.onSelected && this.onSelected(newVal);
    },
    value(newVal) {
      if (Array.isArray(newVal)) this.inputVal = newVal;
    },
    options(newVal) {
      if (newVal?.length) this.data = newVal;
    },
  },
  mounted() {
    this.data = this.options;
  },
  methods: {
    onChangeText(e) {
      this.data = this.options.filter((e) => e.label.includes(this.keyword));
    },
    onShow() {
      this.isShow = !this.isShow;
    },
    onBlur() {
      this.isShow = false;
      this.keyword = "";
    },
    invokeDelete() {
      if (this.tagsCopy.length == 0 || !!this.keyword) return;
      const lastIndex = this.tagsCopy.length - 1;
      this.handleDeteleTags(lastIndex);
    },
    handleDeteleTags(index) {
      if (this.disabled) return;
      this.tagsCopy.splice(index, 1);
      this.onSelected && this.onSelected(this.tagsCopy);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../scss/dropdown";
</style>
