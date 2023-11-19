<template>
  <div class="q-tree" :style="{maxHeight: maxHeight + 'px'}">
    <div class="q-tree-loading" v-if="loading">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <template v-else>
      <q-tree-list @change="onChange"
                   :single="single"
                   :items="entries"
                   :collapsed="false"/>
    </template>
  </div>
</template>

<script>
import {
  treeFindChecked,
  treeFindParents,
  treeFindPath,
  treeIterate,
  treeValidate
} from "../../lib/tree";

import QTreeList from "./QTreeList";

export default {
  name: "QTreeSelect",
  components: {QTreeList},
  props: ['value', 'maxHeight', 'items', 'datasource', 'showAction', 'onCreate', 'onUpdate', 'onDelete', 'single'],
  data() {
    return {
      loading: true,
      entries: []
    }
  },
  mounted() {
    this.load();
  },
  watch: {
    value: function (newValue) {
      if (Array.isArray(newValue)) {
        treeIterate(this.entries, (node) => {
          //node.expanded = false;
          node.checked = false;
          node.highlight = false;
        });

        newValue.forEach(v => {
          this.setTreeModel(this.entries, v);
        })
      } else {
        console.error('QTreeSelect watch failed, newValue must be an array')
      }
    }
  },
  methods: {
    setHighLight(node, p) {
      if (node.checked) {
        p.highlight = true;
      } else {
        let noHighLight = true;

        treeIterate(p, (n) => {
          if (n.checked && n.id !== p.id) {
            noHighLight = false;
          }
        });

        if (noHighLight) {
          p.highlight = false;
          p.checked = false;
        }

      }
    },
    onChange(node) {

      const parents = treeFindParents(this.entries, node);
      parents.forEach(p => {
        this.setHighLight(node, p);
      });

      const checked = [];
      if (this.single) {
        treeIterate(this.entries, (n) => {
          if (n.id !== node.id) {
            n.checked = false;
            n.highlight = false;
          }
        });
      }
      treeFindChecked(this.entries, (node) => {
        if (node.checked) {
          checked.push(node.id);
        }
      });

      this.$emit('input', checked);
    },
    setTreeModel(root, value) {
      const nodes = treeFindPath(root, value);
      if (nodes.length > 0) {

        treeIterate(nodes[0], (node) => {
          node.checked = true;
        });

        nodes.forEach(node => {
          if (!this.showAction) {
            node.highlight = true;
          }
          node.expanded = true;
        });
      }
    },
    async load() {

      let items;

      if (this.items && this.items.length) {
        console.log('QTreeSelect: rendered from options props');
        items = this.items;
        this.loading = false;
      } else {
        /* this.loading = true;
         const r = await $getDataSource(this.datasource);
         this.loading = false;
         items = r.data;*/
      }

      treeValidate(items);
      treeIterate(items, (node) => {
        this.$set(node, 'expanded', false);
        this.$set(node, 'checked', false);
        this.$set(node, 'highlight', false);
      });

      if (this.value) {
        if (Array.isArray(this.value)) {
          this.value.forEach(v => {
            this.setTreeModel(items, v);
          })
        } else {
          this.setTreeModel(items, this.value);
        }
      }

      this.entries = items;
      this.$emit('loaded');

    }
  }
}
</script>

<style scoped>
.q-tree-loading {
  width: 100%;
  text-align: center;
}

.q-tree-loading .fa {
  color: #3699FF;
}

.q-tree {
  overflow-y: auto;
  width: 100%;
}

</style>
