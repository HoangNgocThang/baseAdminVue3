<template>
  <button type="button" @click="click()" class="btn btn-primary">
    <i v-if="loading" class="fa fa-spinner fa-spin fa-fw"></i>
    <i v-else :class="fa"></i>
    {{ label }}
  </button>
</template>

<script>
export default {
  props: ['loading', 'text', 'icon'],
  name: "SaveButton",
  emits: ['click'],
  data() {
    return {
      isLoading: this.loading || false,
      label: this.text || 'Lưu lại',
      fa: this.icon || 'fa fa-check'
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
