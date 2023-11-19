<template>
  <div class="qselect" ref="wrapper">
    <div class="qselect-input-box" ref="input" @click="openDropdown()" :class="{active: showDropDown}">
      <span class="qslelect-tag" v-for="(v,i) in values">
        {{ v.label }}
        <span class="close-btn" @click="remove(v, i)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.333">
            <path
              d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"></path></svg>
        </span>
      </span>
      <input class="qselect-input"
             @keyup="onSearch(keyword, $event)" v-model="keyword" :placeholder="placeholder||'Tìm kiếm...'">
      <span class="dropdown-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292.362 292.362"><path
          d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"></path></svg>
      </span>
    </div>
    <button title="Thêm Nhanh" v-if="quickadd" class="qselect-add" type="button" @click="add()"><i
      class="fas fa-plus"></i></button>
    <div class="qselect-dropdown" ref="dropdown" :style="{display: this.showDropDown ? 'block' : 'none'}">
      <ul ref="dropDownUl" v-if="options.length">
        <li @click="select(o)"
            v-for="(o,index) in options"
            @mouseover="onMouseOver(index)"
        >
          <div class="qselect-item" :class="{active: focusIndex===index, last: index === options.length - 1}"
               v-if="o?.show">
            <input v-if="isMultiple"
                   @change="checkBoxCheck(o)"
                   v-model="o.checked" class="qselect-checkbox" type="checkbox">
            <span>{{ o.label }}</span>
          </div>
        </li>
      </ul>
      <p v-else class="notfound">
        <em>Không tìm thấy kết quả</em>
      </p>
    </div>
  </div>
</template>

<script>
import {$get, clone, pluck, removeVietnameseTones, debounce, $post, $alert, arr} from "../lib/utils";

const searchIgnore = {
  'ArrowDown': true,
  'ArrowUp': true,
  'Enter': true,
};

function convertOption(o) {
  o.checked = false;
  o.show = true;
  o.label = o.label || o.name || '';
  o.keyword = removeVietnameseTones(o.label.toLowerCase());
  return o;
}

export default {
  props: ['modelValue', 'multiple', 'defaultOptions', 'datasource', 'search',
    'placeholder', 'quickadd', 'quickaddhandler', 'optionchanged', 'field'],
  methods: {
    checkBoxCheck(option) {
      if (option.checked) {
        this.select(option);
      } else {
        const vIndex = this.values.findIndex(o => {
          return o.id.toString() === option.id.toString();
        });
        this.remove(option, vIndex);
      }
    },
    async onSearch(keyword, $event) {
      if (searchIgnore[$event.key]) {
        console.log('nothing happen');
        return;
      }

      this.focusIndex = -1;
      if (!this.isAsync) {
        this.options.forEach(o => {
          o.show = o.keyword.indexOf(keyword) >= 0;
        });
      } else {
        this.handleSearch(keyword);
      }
    },
    async selfQuickAddHandler() {
      const name = prompt('Thêm nhanh giá Trị:', '');
      if (name) {
        const res = await $post('/xadmin/data-source/save', {
          datasource: this.field.datasource,
          field: this.field.field,
          name: name
        });
        $alert(res);
        if (res.code === 200) {
          this.options = res.data.map(convertOption);
        }
      }
    },
    async add() {
      if (!this.quickaddhandler) {
        this.selfQuickAddHandler();
        return;
      }

      let retData = await this.quickaddhandler();
      if (!retData) {
        return;
      }

      if (!Array.isArray(retData)) {
        alert('quickadd not return an Array');
        return;
      }

      let options = retData.map(convertOption);
      const map = pluck(options);
      this.values.forEach(v => {
        if (map[v.id]) {
          map[v.id].checked = true;
          v.label = map[v.id].label;
        }
      });

      this.options = options;
      if (this.optionchanged) {
        this.optionchanged(options);
      }
    },
    handleSearch: async function (keyword, defaultValues) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(async () => {
        const params = {query: keyword};
        if (defaultValues) {
          params.values = defaultValues.map(v => v.id).join(',');
        }

        let retData;
        let options;

        if (this.search) {
          retData = await this.search(this.datasource, params, defaultValues);
          if (!Array.isArray(retData)) {
            console.error('QSelect Error: search function not return a valid Array}');
            retData = [];
          }
          options = retData.map(convertOption);
          options.forEach(o => {
            o.show = o.keyword.indexOf(keyword) >= 0;
          })
        } else {
          const res = await $get(this.dataSourceUrl, params, false);
          retData = res.data;
          options = retData.map(convertOption);
        }

        const map = pluck(options);
        this.values.forEach(v => {
          if (map[v.id]) {
            map[v.id].checked = true;
            v.label = map[v.id].label;
          }
        })

        this.options = options;
      }, 500);
    },
    onMouseOver(i) {
      this.focusIndex = i;
    },
    onKeyDown(ev) {
      if (!this.showDropDown) {
        return;
      }

      const maxIndex = this.options.length - 1;
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        let indexCount = 0;
        for (let i = 0; i <= maxIndex; i++) {
          if (this.options[i].show) {
            indexCount++;
            if (this.focusIndex < i) {
              this.focusIndex = i;
              break;
            }
          }
        }

        this.$refs.dropDownUl.scrollTop = (indexCount - 8) * 27;
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        if (this.focusIndex > 0) {
          let indexCount = 0;
          let f = 0;
          for (let i = 0; i <= maxIndex; i++) {
            if (this.options[i].show) {
              if (this.focusIndex <= i) {
                break;
              }
              f = i;
              indexCount++;
            }
          }
          this.focusIndex = f;

          this.$refs.dropDownUl.scrollTop = (indexCount - 8) * 27;
        }
      } else if (ev.key === 'Enter') {
        ev.preventDefault();
        const o = this.options[this.focusIndex];
        if (o) {
          if (o.checked) {
            this.remove(this.options[this.focusIndex]);
          } else {
            this.select(this.options[this.focusIndex]);
          }
        }
      } else if (ev.key === 'Escape') {
        ev.preventDefault();
        this.showDropDown = false;
      }
    },
    onChange() {
      this.model = this.values.map(v => v.id);

      if (this.isMultiple) {
        this.$emit('update:modelValue', this.model);
        this.$emit('onselected', clone(this.values));
      } else {
        this.$emit('update:modelValue', this.model[0] || null)
        this.$emit('onselected', clone(this.values[0] || null));
      }

      this.$nextTick(() => {
        this.resizeHandler();
      });
    },
    remove(option, vIndex) {
      const index = this.options.findIndex(o => option.id.toString() === o.id.toString());
      this.values.splice(vIndex, 1);
      if (index > -1) {
        this.options[index].checked = false;
      }

      this.onChange();
    },
    select(option) {
      if (this.isMultiple) {
        if (!option.checked) {
          option.checked = true;
          this.values.push(clone(option));
          this.onChange();
        }
      } else {
        this.$emit('selectName', option.id);
        this.options.forEach(o => {
          o.checked = (o.id === option.id);
        });
        this.showDropDown = false;
        this.values = [clone(option)];
        this.onChange();
      }
    },
    openDropdown() {
      this.showDropDown = true;
      this.resizeHandler();
    },
    resizeHandler() {
      const offset = this.input.position();
      this.dropDown.css({
        top: offset.top + this.input.height() + 9,
        left: offset.left,
        width: this.input.width() + 8
      })
    },
    clickHandler(ev) {
      if (!this.wrapper.find(ev.target).length) {
        this.showDropDown = false;
      }
    }
  },
  watch: {
    value: function (newValue) {
      const optionMap = pluck(this.options);
      let value = newValue;

      const values = [];
      let valueCheckedCount = 0;
      let valueLength = 0;

      this.options.forEach(o => {
        o.checked = false;
      });

      if (this.multiple) {
        arr(value).forEach(v => {
          valueLength++;
          const o = optionMap[v] ? optionMap[v] : null;
          if (o) {
            o.checked = true;
            values.push(clone(o));
            valueCheckedCount++;
          } else {
            values.push({id: v, label: v + '...'});
          }
        });
      } else {
        valueLength = 1;
        const o = optionMap[value] ? optionMap[value] : null;
        if (o) {
          o.checked = true;
          values.push(clone(o));
          valueCheckedCount++;
        } else if (value) {
          //o.checked = false;
          values.push({id: value, label: value + '...'});
        }
      }

      this.values = values;
      if (this.isAsync) {
        if (valueLength > valueCheckedCount) {
          console.log('QSELECT: Missing local value. Perform a remote fetch')
          this.handleSearch('', arr(newValue).map(v => {
            return {id: v}
          }));
        } else {
          console.log('QSELECT: Local Value FullFill')
        }
      }
    }
  },
  data() {
    const isMultiple = this.multiple || false;
    let value = this.modelValue;
    const isAsync = !!this.datasource;
    let options;

    if (Array.isArray(this.defaultOptions)) {
      options = clone(this.defaultOptions).map(convertOption);
    } else {
      options = [];
    }

    const optionMap = pluck(options);
    const values = [];

    if (isMultiple) {
      if (!Array.isArray(this.modelValue)) {
        console.error('QSelect ERROR: Attribute multiple=true but v-model value is not an Array');
        value = [];
      }

      value.forEach(v => {
        const o = optionMap[v] ? optionMap[v] : null;
        if (o) {
          o.checked = true;
          values.push(clone(o));
        } else {
          values.push({id: v, label: v + '...'});
        }
      });
    } else {
      if (Array.isArray(this.modelValue)) {
        console.error('QSelect ERROR: Attribute multiple=false but v-model value IS an Array');
        value = this.modelValue.length ? this.modelValue[0] : null;
      }

      const o = optionMap[value] ? optionMap[value] : null;
      if (o) {
        o.checked = true;
        values.push(clone(o));
      } else if (value) {
        values.push({id: value, label: value + '...'});
      }
    }

    let dataSourceUrl = this.datasource;

    if (this.datasource) {
      if (!(this.datasource.startsWith('http://') || this.datasource.startsWith('https://'))) {
        dataSourceUrl = '/xadmin/data-source/index?datasource=' + this.datasource;
      }
    }
    console.log('options', options);

    return {
      keyword: '',
      timeoutId: 0,
      isMultiple,
      options: options,
      focusIndex: -1,
      showDropDown: false,
      isAsync,
      model: value,
      values: values,
      dataSourceUrl
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('click', this.clickHandler);
    window.removeEventListener('keydown', this.onKeyDown);
  },
  mounted() {
    this.dropDown = $(this.$refs.dropdown);
    this.input = $(this.$refs.input);
    this.wrapper = $(this.$refs.wrapper);

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('click', this.clickHandler);

    this.resizeHandler();
    if (this.isAsync && this.options.length === 0) {
      this.handleSearch('', this.values);
    }
  },
  name: "QSelect"
}
</script>

<style scoped>
.qselect {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.qselect-add {
  width: 40px;
  background-color: white;
  border-radius: 8px;
}

.qselect-input-box.active {
  border: 1px solid gray;
}

.dropdown-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}

.dropdown-btn svg {
  width: 9px;
  height: 9px;
  fill: #ccc
}

.close-btn svg:hover {
  fill: red;
}

.close-btn svg {
  width: 6px;
  height: 6px;
  cursor: pointer;
  fill: white;

}

.notfound {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  font-size: 12px;
}

.close-btn {
  color: #039be5;
  padding-left: 5px;
  border-left: 1px solid #fff;
  line-height: 0;
}

.qslelect-tag {
  display: inline-block;
  padding: 4px;
  color: white;
  margin: 1px;
  border-radius: .2rem;
  background-color: #007bff;
  font-size: 12px;
}

.qselect-input-box {
  position: relative;
  display: block;
  width: 100%;
  min-height: calc(1.5em + 1.3rem + 2px);
  padding: 3px;
  font-size: .9rem;
  font-weight: 400;
  color: #6c757d;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #E4E6EF;
  border-radius: 0.42rem;
  -webkit-transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
  transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out;
}

.qselect-input {
  margin: 3px;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: content-box;
  box-shadow: none;
  background: none rgba(0, 0, 0, 0);
  line-height: 1;
  vertical-align: middle;
  height: 25px;
  padding-left: 10px;
}

.qselect-input:focus {

}

.qselect-dropdown {
  position: absolute;
  background-color: #fff;
  z-index: 9999;
  border: 1px solid #ccc;
  border-top: 0;
}

.qselect-dropdown ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
  max-height: 250px;
  overflow-y: auto;
}

.qselect-item.last {
  border-bottom: 0;
}

.qselect-item.active {
  background-color: #2196f3;
  color: white;
  cursor: pointer;
}

.qselect-item {
  border-bottom: 1px solid #ccc;
  /* padding-top: 3px; */
  /* margin-top: 3px; */
  padding-left: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
}

.qselect-checkbox {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  cursor: pointer;
  margin-right: 5px;
}
</style>
