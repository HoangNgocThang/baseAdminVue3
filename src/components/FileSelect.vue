<template>
  <div class="row">
    <div class="col-lg-7 col-sm-6 col-md-8">
      <input
        id="f_price"
        :value="url"
        name="name"
        :disabled="!editable"
        class="form-control"
        :placeholder="placeholder"
      />
    </div>
    <div class="row btn-handle-file ml-2">
      <SelectFileAssets
        :limit="limit"
        :disabled="disabled"
        v-model="fileAssets"
        :name="name"
      />
      <label class="file-select ml-2">
        <div :disabled="disabled" class="btn btn-primary" type="button">
          Upload
        </div>
        <input
          type="file"
          :accept="accept"
          :disabled="disabled"
          :key="reloadKey"
          multiple
          @change="handleFileChange"
        />
      </label>
      <div class="ml-2">
        <button
          @click="onClear"
          :disabled="disabled"
          class="btn btn-success"
          type="button"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectFileAssets from "./SelectFileAssets";

export default {
  components: {SelectFileAssets},
  name: "FileSelect",
  props: [
    "placeholder",
    "modelValue",
    "disabled",
    "editable",
    "accept",
    "name",
    "limit",
  ],
  data() {
    return {
      reloadKey: 0,
      fileAssets: [],
      url: "",
    };
  },
  watch: {
    fileAssets: {
      handler(newVal) {
        let data = newVal.map((e) => e.url).join(",");
        this.$emit("update:modelValue", newVal.map((e) => e.url).join(","));

        this.url = data;
      },
    },
    modelValue: {
      handler(newVal) {
        this.url =
          typeof newVal == "string"
            ? newVal
            : newVal?.map((e) => e.name).join(",");
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleFileChange(e) {
      const fileListAsArray = Array.from(e.target.files);

      this.url = fileListAsArray.map((e) => e.name).join(",");
      console.log("this.url: ", this.url);
      this.$emit("update:modelValue", fileListAsArray);
    },
    onClear() {
      this.reloadKey++;
      this.$emit("update:modelValue", null);
      this.url = "";
    },
  },
};
</script>

<style scoped>
.form-group .file-select .disabled {
  background-color: #999;
  cursor: not-allowed;
}

.form-group .file-select .color-choose {
  background-color: #ffc20a;
}

.form-group .file-select .color-upload {
  background-color: #11c969;
}

.form-group .file-select .color-clear {
  background-color: #f7484a;
}

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

.file-select > .select-button {
  color: white;
  background-color: #2ea169;
  height: calc(1.5em + 1.3rem + 2px);
  border-radius: 0.3rem;
  text-align: center;
  font-weight: bold;
  display: block;
  width: 100%;
  height: calc(1.5em + 1.3rem + 2px);
  padding: 0.65rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #fff;
  cursor: pointer;
}

.file-select {
  margin-bottom: 0;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>
