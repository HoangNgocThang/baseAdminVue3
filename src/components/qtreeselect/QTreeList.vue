<template>
  <ul class="q-tree-root"
      :class="{collapsed: collapsed, 'q-tree-sub': (level ||0) > 0}"
  >
    <li v-for="e in items">
      <a class="btn-expand"
         :class="{'q-tree-highlight': e.highlight}"
         @click.prevent="expand(e)" v-if="e.data_children && e.data_children.length">
        <i class="fa" :class="e.expanded ? 'fa-minus-square' : 'fa-plus-square'"></i>
      </a>

      <label>
        <input v-model="e.checked"
               @input="doCheck(e, $event)"
               type="checkbox" style="transform: none">
      </label>
      <span class="q-tree-label" @click="doCheck(e)">
                 {{ e.id + ' - ' + e.name }}
            </span>

      <template v-if="e.data_children && e.data_children.length && e.expanded">
        <q-tree-list @change="onChange"
                     :level="(level || 0) + 1"
                     :items="e.data_children"
                     :collapsed="!e.expanded"/>
      </template>
    </li>
  </ul>
</template>

<script>

import {treeFindPath, treeIterate} from "../../lib/tree";

export default {
  name: "QTreeList",
  props: ['items', 'collapsed', 'level'],
  mounted() {
  },
  methods: {
    expand(e) {
      this.$set(e, 'expanded', !e.expanded);
    },
    onChange(node) {
      this.$emit('change', node);
    },

    doCheck(node, $event) {
      if ($event) {
        $event.stopPropagation();
      }

      node.checked = !node.checked;
      treeIterate(node, (entry) => {
        entry.checked = node.checked;
        entry.highlight = node.checked;
      });

      this.$emit('change', node);
    }
  }
}
</script>

<style>
.q-tree-root {
  list-style: none;
  padding-left: 0;
  position: relative;
}

.q-tree-root > li {
  margin-top: 5px;
}

.q-tree-label {
  cursor: pointer;
}

.q-tree-sub li {
  margin: 0;
  padding: 0 1em;
  line-height: 2em;
  position: relative
}

.q-tree-sub li:last-child:before {
  background: #fff;
  height: auto;
  top: 1em;
  bottom: 0
}

.q-tree-sub li:before {
  content: "";
  display: block;
  width: 10px;
  height: 0;
  border-top: 1px solid;
  margin-top: -1px;
  position: absolute;
  top: 1em;
  left: 0
}

.q-tree-sub:before {
  content: "";
  display: block;
  width: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-left: 1px solid;
}

.q-tree-sub {
  margin-left: 25px;
}

.collapsed {
  display: none;
}

.btn-expand {
  cursor: pointer;
}

.q-tree-highlight .fa {
  color: dodgerblue;
}


</style>
