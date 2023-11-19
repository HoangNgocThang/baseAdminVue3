<template>
  <div class="q-tree-input-wrapper" ref="root">
    <div class="q-tree-input"
         :class="{'q-tree-input-empty': this.tags.length === 0}"
         @click="toggleMenu()">
      <div class="q-tree-loading" v-if="loading">
        <i class="fa fa-spinner fa-spin"></i>
      </div>
      <template v-else>
        <div class="q-tree-label" v-if="tags.length === 0">Vui lòng chọn</div>
        <template v-else>
          <span v-for="tag in tags" class="q-tree-tag" v-text="tag"></span>
        </template>
        <span class="q-dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292.362 292.362"><path
          d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"></path></svg></span>

      </template>

    </div>
    <div class="q-tree-input-menu" ref="menu" style="display: none">
      <q-tree-select v-model="items" @input="onInput" ref="tree"
                     :items="qOptions"
                     :single="single"
                     :datasource="datasource"
                     @loaded="onLoaded"/>
    </div>
  </div>
</template>

<script>
import QTreeSelect from "./QTreeSelect";
import {$get, clone, treeFindNode, treeFindPath, treeIterate} from "../../lib/utils";

export default {
  name: "QTreeSelectInput",
  props: ['value', 'lazy', 'options', 'datasource', 'single'],
  data() {
    const items = [];
    if (Array.isArray(this.value)) {
      this.value.forEach(v => {
        items.push(v);
      });
    } else {
      items.push(this.value);
    }

    return {
      loading: true,
      qOptions: clone(this.options),
      menuShown: false,
      items,
      tags: []
    }
  },
  components: {QTreeSelect},
  watch: {
    value: function (newValue) {
      const items = [];
      if (Array.isArray(newValue)) {
        newValue.forEach(v => {
          items.push(v);
        });
      } else {
        items.push(newValue);
      }

      this.items = items;
      this.onInput(false);
    }
  },
  mounted() {
    document.addEventListener('click', this.documentClicked);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClicked);
  },
  methods: {
    onLoaded() {

      this.onInput();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    onInput(emit = true) {
      const root = this.$refs.tree.entries;
      this.tags = [];
      if (this.single) {
        const itemId = this.items[0];
        if (itemId) {
          const paths = treeFindPath(root, itemId).reverse();
          this.tags.push(paths.map(p => p.name).join(' -> '));
        }
      } else {
        this.items.forEach(itemId => {
          const node = treeFindNode(root, itemId);
          if (node) {
            this.tags.push(node.name);
          }
        });
      }


      if (emit) {
        this.$emit('input', this.items);
      }
    },
    documentClicked(ev) {
      if ($(this.$refs.root).find(ev.target).length === 0) {
        this.showDropDown(false)
      } else {
        this.showDropDown(true);
      }

    },
    toggleMenu() {
      this.menuShown = !this.menuShown;
      this.showDropDown(this.menuShown);
    },
    showDropDown(value) {
      if (value) {
        this.$refs.menu.style.display = 'block';
      } else {
        this.$refs.menu.style.display = 'none';
      }
    }
  }
}
</script>

<style scoped>
.q-tree-input-empty {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
}

.q-tree-label {
  margin-left: 5px;
}

.q-tree-loading {
  margin-top: 5px;
  margin-left: 10px;
}

.q-dropdown-icon {
  position: absolute;
  right: 10px;
  top: 7px;
}

.q-dropdown-icon svg {
  width: 9px;
  height: 9px;
  fill: #ccc;
}

.q-tree-tag {
  display: inline-block;
  padding: 4px 10px;
  color: white;
  margin: 1px;
  border-radius: 5px;
  background-color: #007bff;
  font-size: 12px;
}

.q-tree-input-wrapper {
  position: relative;
}

.q-tree-input label {
  cursor: pointer;
  color: gray;
}

.q-tree-input {
  cursor: pointer;
  position: relative;
  display: block;
  width: 100%;
  min-height: 36px;
  padding: 3px;
  font-size: .9rem;
  font-weight: 400;
  color: #6c757d;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .42rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.q-tree-input-menu {
  width: 100%;
  position: absolute;
  z-index: 999;
  background-color: white;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px 5px 5px;
}


</style>
