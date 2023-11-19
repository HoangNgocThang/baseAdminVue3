<template>
  <div @click="onSort()" class="table-sort-field">
    <i :class="className"></i> {{ name }}
  </div>
</template>

<script>
const refs = [];
export default {
  props: ['name', 'field', 'defaultDirection', 'current'],
  data() {
    let className = 'fa fa-sort';

    if (!this.defaultDirection) {
      className = 'fa fa-sort';
    }

    if (this.current === this.field) {
      className = this.defaultDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }

    return {
      className,
      direction: this.defaultDirection
    }
  },
  methods: {
    reset() {
      this.className = 'fa fa-sort';
      this.direction = 'none';
    },
    onSort() {
      refs.forEach(ref => {
        if (ref !== this) {
          ref.reset()
        }
      });

      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
      this.className = this.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
      this.$emit('onsort', this.field, this.direction);
    }
  },
  components: {},
  mounted() {
    refs.push(this);
  },
  name: "TableSortField",
}
</script>

<style scoped>
.table-sort-field {
  cursor: pointer;
}
</style>
