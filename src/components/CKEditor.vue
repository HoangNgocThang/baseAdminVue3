<template>
  <div :id="name"></div>
</template>

<script>
export default {
  name: "CKEditor",
  props: {
    name: {
      type: String,
      default: 'editor'
    }
  },
  mounted() {
    let ckeditor = document.getElementById(this.name);
    CKEDITOR.replace(ckeditor);
  }
}
</script>

<style scoped>

</style>
