<template>
  <div>
    <div class="row">
      <input @keydown="search()" class="fm-search-input" placeholder="tìm kiếm" v-model="filter.keyword">
      <Daterangepicker
        @input="doFilter()"
        default-class="fm-search-input" placeholder="chọn ngày" v-model="filter.created"/>
      <button
        @click.prevent="selectFile()"
        type="button"
        style="margin-left: 15px;" class="btn btn-primary btn-sm"><i class="fa fa-upload"></i> Tải lên
      </button>
      <button
        v-if="multiple"
        @click.prevent="fileClickedAll()"
        type="button"
        :disabled="selectDisabled" style="margin-left: 15px;" class="btn btn-primary btn-sm"><i class="fa fa-check"></i>
        Chọn
      </button>
    </div>
    <div class="row fm-table-wrapper">
      <table class="fm-table">
        <thead>
        <tr>
          <th @change="checkAll($event)" class="text-center">
            <input v-if="multiple" type="checkbox"/>
          </th>
          <th class="text-center">#</th>
          <th>
            <TableSortField @onsort="sort" name="Tên file" field="name"/>
          </th>
          <th>
            <TableSortField @onsort="sort" name="Định dạng" field="extension"/>
          </th>
          <th>
            <TableSortField @onsort="sort" name="Kích thước" field="size"/>
          </th>
          <th>
            <TableSortField @onsort="sort" name="Ngày tạo" field="created_at"/>
          </th>

          <th>
            <a @click.prevent="selectFile()" class="fm-btn-upload">
              <i class="fa fa-plus"/>
            </a>
            <input @change="fileChange()" accept="image/*" type="file" ref="uploader"
                   style="display: none;width: 1px;height: 1px"/>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(file, index) in files" class="fm-row">
          <td class="text-center">
            <input v-if="multiple" v-model="file.checked" type="checkbox"/>
            <button class="btn btn-default btn-sm" @click.prevent="fileClicked(file)" v-else>
              <i class="fa fa-check"></i>
            </button>
          </td>
          <td class="fm-preview">

            <img v-if="file.is_image" class="fm-img-preview" :src="file.url"/>
            <i :class="getIconClass(file.extension)" v-else></i>
          </td>
          <td class="fm-filename">
            <span v-if="!file.editMode" v-text="file.name"></span>
            <template v-else>
              <input
                :id="'fm-input' + file.id"
                @keydown.esc="file.editMode=false"
                @keydown.enter="save(file, model.name)" class="form-control" v-model="model.name">
              <div class="mt-2">
                <button class="btn btn-primary btn-sm" @click.prevent="save(file)">Lưu</button>
                <button class="btn btn-secondary btn-sm" @click.prevent="file.editMode=false">Hủy</button>
              </div>
            </template>
          </td>
          <td v-text="file.extension"></td>
          <td v-text="humanFileSize(file.size)"></td>
          <td v-text="d(file.updated_at)"></td>

          <td>
            <a @click.prevent="rename(file, index )" class="fm-btn-rename">
              <i class="fa fa-edit"/>
            </a>

            <a @click.prevent="remove(file, index )" class="fm-btn-remove">
              <i class="fa fa-trash"/>
            </a>
            <a :href="file.url" target="_blank">
              <i class="fa fa-download"/>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <Paginate :pagechange="onPageChange" :value="paginate"/>
    </div>
  </div>
</template>

<script>
import {$get, $post, $upload, throttle, humanFileSize} from "../lib/utils";
import Daterangepicker from "./Daterangepicker";
import TableSortField from "./TableSortField";
import Paginate from "./Paginate";
import $router from "../lib/SimpleRouter";

const fileExtensionIcons = {
  'xlsx': 'fa fa-file-excel',
  'xls': 'fa fa-file-excel',
  'docx': 'fa fa-file-word',
  'doc': 'fa fa-file-word',
  'pdf': 'fa fa-file-pdf'
};
export default {
  name: "FileManager",
  props: ['multiple'],
  components: {Daterangepicker, Paginate, TableSortField},
  data() {
    return {
      sortData: {
        direction: 'desc',
        field: 'id'
      },
      filter: {
        keyword: '',
        created: ''
      },
      model: {
        name: ''
      },
      files: [],
      paginate: {lastPage: 10, currentPage: 1},
    }
  },
  computed: {
    selectDisabled: function () {
      const len = this.files.length;
      for (let i = 0; i < len; i++) {
        if (this.files[i].checked) {
          return false;
        }
      }

      return true;
    }
  },
  methods: {
    humanFileSize,
    checkAll(ev) {
      this.files.forEach(file => {
        file.checked = ev.target.checked;
      })
    },
    search: throttle(function () {
      this.doFilter();
    }, 1000),
    getIconClass(ext) {
      return fileExtensionIcons[ext] || '';
    },
    async save(file) {
      const res = await $post('/xadmin/files/rename', {
        id: file.id,
        new_name: this.model.name
      });

      if (res.code !== 200) {
        toastr.error(res.message);
      } else {
        toastr.success(res.message);
        file.name = this.model.name;
        file.editMode = false;
      }
    },
    async rename(file) {
      this.model.name = file.name;
      file.editMode = true;
      this.$nextTick(() => {
        document.getElementById('fm-input' + file.id).focus();
      })
    },
    fileChange() {
      const files = this.$refs.uploader.files;
      this.upload(files);
    },
    async upload(files) {
      if (files[0]) {
        //console.log(files[0])
        const res = await $upload('/xadmin/files/upload', files);

        if (res.code !== 200) {
          alert(res.message);
        } else {
          res.file.editMode = false;
          res.file.checked = false;
          this.files.unshift(res.file)
        }
      }
    },
    async remove(file, index) {
      if (!confirm('Xóa file: ' + file.id)) {
        return;
      }

      const res = await $post('/xadmin/files/remove', {
        id: file.id
      });

      if (res.code !== 200) {
        toastr.error(res.message);
      } else {
        toastr.success(res.message);
        this.files.splice(index, 1);
      }
    },
    sort(field, direction) {
      this.sortData = {
        field, direction
      }
      this.load(1);
    },
    selectFile() {
      this.$refs.uploader.click();
    },
    onPageChange(page) {
      this.load(page);
    },
    doFilter() {
      this.load(1);
    },
    async load(page) {
      const res = await $get('/xadmin/files/data', {
        page,
        keyword: this.filter.keyword,
        created: this.filter.created,
        sort_direction: this.sortData.direction,
        sort_field: this.sortData.field,
        file_type: 'image'
      }, false);
      res.data.forEach(file => {
        file.editMode = false;
        file.checked = false;
      });
      this.files = res.data;
      this.paginate = res.paginate;
    },
    fileClicked(file) {
      if (this.multiple) {
        file.checked = !file.checked;
      } else {
        this.$emit('fileclick', [file]);
      }
    },
    fileClickedAll() {
      const values = this.files.filter(file => file.checked);
      this.$emit('fileclick', values);
    }
  },
  mounted() {
    this.load(1);
  }
}
</script>

<style>
.fm-table {
  width: 100%;
  border-collapse: collapse;
  position: relative;
}

.fm-preview {
  text-align: center;
}

.fm-preview i {
  font-size: 32px;
}

.fm-filename {
  word-break: break-all;
}

.fm-id {
  width: 10%;
}

.fm-btn-upload {
  color: #007bff !important;
  cursor: pointer;
}

.fm-btn-rename {
  cursor: pointer;
  color: #0b8949 !important;
}

.fm-btn-remove {
  color: #db0b0b !important;
  cursor: pointer;
}

.fm-img-preview {
  width: 64px;
  height: 64px;
}

.fm-table th, .fm-table td {
  padding: 5px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.fm-search-input {
  border: 0;
  outline: 0;
  border-bottom: 1px solid gray;
  margin-left: 15px;
}

.fm-row:hover {
  background-color: #96e0b6;
  cursor: pointer;
}

.fm-table-wrapper {
  margin-top: 15px;
  margin-bottom: 15px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
