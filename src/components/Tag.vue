<template>
  <treeselect v-model="value"
              :multiple="true"
              :async="true"
              :defaultOptions="tags"
              :load-options="loadOptions"
              :options="tags"

  />
</template>

<script>
import Treeselect, {ASYNC_SEARCH} from '@riophae/vue-treeselect'
import {$get} from "../lib/utils";

export default {
  props: ['tags', 'value'],

  methods: {
    loadOptions({action, searchQuery, callback}) {

      $get('/xadmin/tags/search', {q: searchQuery}, false).then(tags => {
        callback(null, tags);
      })
    },
  },
  watch: {
    value: function () {
      this.$emit('input', this.value)
    }
  },
  components: {
    Treeselect
  },
  mounted() {

  },
  name: "Tag",
}
</script>

<style scoped>

</style>
