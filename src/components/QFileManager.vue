<template>
  <div class="row">
    <div class="col-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div>
              <h5 class="mb-0">Quản lý asset</h5>
            </div>
            <div class="ms-auto q-btn-group">
              <button type="button" class="btn btn-sm btn-primary mr-1" @click="addFolder()">
                <i class="fa fa-folder"/>
                Thêm thư mục
              </button>
              <button type="button" class="btn btn-sm btn-primary ml-2" @click="addFile()">
                <i class="fa fa-file"/>
                Thêm file
              </button>
              <input @change="upload()" type="file" ref="file" style="display: none">
            </div>
          </div>
          <div class="table-responsive mt-3 file-table">
            <div>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item " aria-current="page">
                    <a href="" @click.prevent="load(null)">
                      Root
                    </a>
                  </li>

                  <li class="breadcrumb-item active" aria-current="page" v-for="path in paths"
                      :key="path.id">
                    <a href="" @click.prevent="load(path)" v-text="path.name">
                    </a>
                  </li>
                </ol>
              </nav>

            </div>
            <div style="margin-bottom: 5px">
              <button type="button" @click="selectFiles()" class="btn btn-sm btn-primary">
                Lựa chọn
              </button>
              <button type="button" @click="showMoveModal()" class="btn btn-sm btn-primary" style="margin-left: 5px">
                Di chuyển
              </button>
              <button type="button" @click="removeFiles()" class="btn btn-sm btn-primary" style="margin-left: 5px">Xóa
              </button>
              <button type="button" @click="showPhotos()" class="btn btn-sm btn-primary" style="margin-left: 5px">Xem
                ảnh
              </button>
            </div>
            <div style="height: 450px; overflow-y: auto">
              <table class="table table-striped table-hover table-sm mb-0">
                <thead>
                <tr>
                  <th style="width: 20px">
                    <input type="checkbox" v-model="fileCheckedAll" @change="onCheckAll(fileCheckedAll)">
                  </th>
                  <th>Name <i class="bx bx-up-arrow-alt ms-2"></i>
                  </th>
                  <th>Owner</th>
                  <th>Type</th>
                  <th>Modified</th>
                  <th>Size</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in files" :key="file.id">
                  <td>
                    <input type="checkbox" v-if="file.name !== '..'" v-model="file.checked">
                  </td>
                  <td :title="file.name">
                    <div class="d-flex align-items-center" v-if="!file.is_folder">
                      <div style="margin-right: 3px">
                        <QImage class="img-preview-sm" alt="preview-image" v-if="file.is_image" :src="file.url"/>
                        <a v-else target="_blank" :href="file.url">
                          <i class="  me-2 font-24 "
                             :class="extMap[file.extension] || 'bx bxs-file text-primary'"
                          />
                        </a>

                      </div>
                      <div class="font-weight-bold text-danger">
                        <a v-if="!file.is_image" target="_blank" :href="file.url">
                          {{ t(file.name) }}
                        </a>
                        <a href="#" v-else @click.prevent="showPhoto(file)"> {{ t(file.name) }}</a>

                      </div>
                    </div>
                    <div v-else class="d-flex align-items-center CommonPrefixes is-folder" @click="load(file)">
                      <div><i class="bx bxs-folder me-2 font-24 folder-color "></i>
                      </div>
                      <div class="font-weight-bold text-success">{{ t(file.name) }}</div>
                    </div>
                  </td>
                  <td>{{ file.User?.name }}</td>
                  <td>{{ file.extension }}</td>
                  <td>{{ d(file.updated_at) }}</td>
                  <td>
                     <span v-if="!file.is_folder">
                       {{ hds(file.size) }}
                     </span>
                  </td>
                  <td>
                    <div class="dropdown" v-if="file.name !== '..'">
                      <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                              aria-expanded="false">
                        <i class="fa fa-ellipsis-h font-24"></i>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click.prevent="removeFile(file)" href="#">Xóa file</a></li>
                        <li><a class="dropdown-item" @click.prevent="rename(file)" href="#">Đổi tên</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="modalMoveFile" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Di chuyển tới</h5>
            <button type="button" @click="closeMoveModal" class="modal-btn-close" data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Di chuyển đến</label>
              <select class="form-control" v-model="targetMoveFileId">
                <option value="">Chọn thư mục</option>
                <template v-for="file in files" :key="file.id">
                  <option
                    :value="file.id"
                    v-if="file.is_folder && !checkedIds[file.id]" v-text="file.name"></option>
                </template>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" @click="processMoveFile(targetMoveFileId)" class="btn btn-primary">Di chuyển</button>
            <button @click="closeMoveModal" type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {$alert, $get, $post, $upload, humanFileSize, uploadObjectUsingPresignedURL} from "../lib/utils";
import moment from "moment";
import draggable from 'vuedraggable'
import QImage from "./QImage";
import {showPhotos, parseHashQuery, inIframe} from "../lib/utils";

let moveFileModal;

import {Q_FILE_ACTION} from '../lib/utils'

export default {
  name: "S3FileManager",
  mounted() {
    toastr.options.positionClass = 'toast-top-center';
    moveFileModal = new bootstrap.Modal(this.$refs.modalMoveFile, {
      keyboard: false,
      backdrop: 'static'
    });

    const hashQuery = parseHashQuery();
    let limit = Math.max(1, hashQuery.limit)
    if (!limit) {
      limit = 1
    }

    this.limit = limit;
    if (hashQuery.id) {
      this.currentParentId = hashQuery.id;
      this.load({
        id: this.currentParentId
      });
    } else {
      this.load();
    }
  },
  data() {
    let currentPrefix = decodeURIComponent(location.hash.substr(1))
    if (currentPrefix === '/') {
      currentPrefix = '';
    }

    return {
      limit: 1,
      inIframe: inIframe(),
      targetMoveFileId: '',
      fileCheckedAll: false,
      currentParentId: null,
      checkedIds: {},
      currentParentFolder: null,
      paths: [],
      baseUrl: '',
      extMap: {
        'zip': 'bx bxs-file-archive text-warning',
        'rar': 'bx bxs-file-archive text-warning',
        'pdf': 'bx bxs-file-pdf text-danger',
        'png': 'bx bxs-image text-primary',
        'jpg': 'bx bxs-image text-primary',
        'jpeg': 'bx bxs-image text-primary',
        'bmp': 'bx bxs-image text-primary',
        'gift': 'bx bxs-file-gift text-primary',
        'doc': 'bx bxs-file-doc text-primary',
        'docx': 'bx bxs-file-doc text-primary',
        'mp3': 'bx bxs-music text-info',
        'xls': 'fa fa-file-excel-o color-excel',
        'xlsx': 'fa fa-file-excel-o color-excel',
      },
      files: [],
    }
  },
  methods: {
    showPhoto(currentFile) {
      const images = [];
      let startIndex = 0;
      let i = 0;
      this.files.forEach((file) => {
        if (file.is_image) {
          images.push(file.url);
          if (currentFile.id === file.id) {
            startIndex = i;
          }
          i++;
        }
      });

      if (this.inIframe) {
        this.postMessage(Q_FILE_ACTION.SHOW_PHOTO, {
          images,
          startIndex
        })
      } else {
        showPhotos(images, startIndex)
      }
    },
    async removeFiles() {
      const ids = this.files.filter(f => f.checked).map(f => f.id);
      if (ids.length === 0) {
        alert('Vui lòng chọn file');
        return;
      }

      if (!confirm('Xóa file đã chọn?')) {
        return;
      }

      const res = await $post('/xadmin/files/remove', {
        ids: ids,
      });

      $alert(res);
      if (res.code === 200) {
        this.load(this.currentParentFolder);
      }
    },
    showPhotos() {
      const images = [];
      this.files.forEach(file => {
        if (file.checked && file.is_image) {
          images.push(file.url);
        }
      });
      if (images.length === 0) {
        alert('Vui lòng chọn ảnh để xem');
        return;
      }

      if (this.inIframe) {
        this.postMessage(Q_FILE_ACTION.SHOW_PHOTO, {
          images,
          startIndex: 0
        })
      } else {
        showPhotos(images)
      }
    },
    onCheckAll(fileCheckedAll) {
      this.files.forEach(file => {
        file.checked = fileCheckedAll;
      })
    },
    getUrl(file) {
      console.log(file)
      return this.baseUrl + '/' + file.Key;
    },
    getPaths() {
      if (!this.currentPrefix) {
        return ['/']
      }

      const paths = this.currentPrefix.replace(/\/$/g, '').split('/');
      paths[0] = '/' + paths[0]

      return paths;
    },
    closeMoveModal() {
      moveFileModal.hide();
    },
    selectFiles() {
      const checkedFiles = []
      this.files.forEach(file => {
        if (file.checked && !file.is_folder) {
          checkedFiles.push(file)
        }
      });
      if (checkedFiles.length === 0) {
        alert('Vui lòng chọn file')
        return
      }

      this.postMessage(Q_FILE_ACTION.SELECT_FILE, checkedFiles)
    },
    showMoveModal() {
      this.checkedIds = {};
      this.files.forEach(file => {
        if (file.checked) {
          this.checkedIds[file.id] = true;
        }
      });
      if (Object.keys(this.checkedIds).length === 0) {
        alert('Vui lòng chọn file');
        return;
      }
      moveFileModal.show();
    },
    async processMoveFile(targetMoveFileId) {
      const ids = this.files.filter(f => f.checked).map(f => f.id);
      if (ids.length === 0) {
        alert('Vui lòng chọn file');
        return;
      }

      const res = await $post('/xadmin/files/move', {
        ids: ids,
        parent_id: targetMoveFileId
      });
      $alert(res);
      if (res.code === 200) {
        moveFileModal.hide();
        this.load(this.currentParentFolder)
      }
    },
    async addFolder() {
      const name = prompt('Nhập tên thư mục');
      if (name) {
        const res = await $post('/xadmin/files/addFolder', {
          parent_id: this.currentParentId,
          name: name
        });
        $alert(res);

        if (res.code === 200) {
          this.load(this.currentParentFolder);
          this.postMessage(Q_FILE_ACTION.ADD_FOLDER, res)
        }
      }
    },
    t(str, n = 30) {
      return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    },
    d(d) {
      const m = moment(d);
      return m.format('DD/MM/YYYY HH:mm')
    },
    hds(byte) {
      return humanFileSize(byte);
    },
    addFile() {
      const file = this.$refs.file;
      file.click();
    },
    async rename(file) {

      let newName = prompt('Nhập tên file mới', file.name);
      if (newName == null) {
        return;
      }

      if (!newName) {
        alert('Vui lòng nhập tên file');
        return;
      }

      const res = await $post('/xadmin/files/rename', {
        id: file.id,
        name: newName
      });

      $alert(res);

      if (res.code === 200) {
        this.load(this.currentParentFolder);
      }
    },
    async removeFile(file) {
      if (!confirm('Xóa file: ' + file.name + '?')) {
        return;
      }

      const res = await $post('/xadmin/files/remove', {
        ids: [file.id],
      });

      $alert(res);
      if (res.code === 200) {
        this.load(this.currentParentFolder);
      }
    },
    async upload() {
      const input = this.$refs.file;
      if (input.files.length === 0) {
        alert('Vui lòng chọn file');
        return;
      }

      const query = {};
      if (this.currentParentId) {
        query.parent_id = this.currentParentId;
      }
      const res = await $upload('/xadmin/files/upload', input.files, query);
      if (res.code === 200) {
        this.load(this.currentParentFolder);
      }

    },
    async load(folder = null) {
      const query = {};

      if (folder) {
        this.currentParentFolder = folder;
        this.currentParentId = folder.id;
        query.parent_id = folder.id;

      } else {
        this.currentParentFolder = null;
        this.currentParentId = null;
      }

      const res = await $get('/xadmin/files/data', query);

      if (res.code === 200) {
        this.postMessage(Q_FILE_ACTION.LOAD, res);
        if (this.currentParentId) {
          location.hash = 'id=' + this.currentParentId;
        } else {
          location.hash = '';
        }

      }
      this.files = res.data.files;
      this.paths = res.data.paths.reverse();
      this.currentParentFolder = res.data.parent;

    },
    postMessage(action, payload) {
      if (window.parent) {
        window.parent.postMessage(JSON.stringify({
          action,
          payload
        }), '*')
      }
    }
  },
  components: {
    QImage,
    draggable
  }
}
</script>

<style scoped>
body {
  margin-top: 20px;
  background-color: #f7f7ff;
  overflow-y: hidden;
  overflow-x: hidden;
}

.q-btn-group button {
  margin-left: 5px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0px solid rgba(0, 0, 0, 0);
  border-radius: .25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.fm-file-box {
  font-size: 25px;
  background: #e9ecef;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .25rem;
}

.ms-2 {
  margin-left: .5rem !important;
}

.fm-menu .list-group a {
  font-size: 16px;
  color: #5f5f5f;
  display: flex;
  align-items: center;
}

.list-group-flush > .list-group-item {
  border-width: 0 0 1px;
}

.list-group-item + .list-group-item {
  border-top-width: 0;
}

.py-1 {
  padding-top: .25rem !important;
  padding-bottom: .25rem !important;
}

.list-group-item {
  position: relative;
  display: block;
  padding: .5rem 1rem;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .125);
}

.radius-15 {
  border-radius: 15px;
}

.fm-icon-box {
  font-size: 32px;
  background: #ffffff;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .25rem;
}

.font-24 {
  font-size: 20px !important;
}

.ms-auto {
  margin-left: auto !important;
}

.font-30 {
  font-size: 30px;
}

.user-groups img {
  margin-left: -14px;
  border: 1px solid #e4e4e4;
  padding: 2px;
  cursor: pointer;
}

.rounded-circle {
  border-radius: 50% !important;
}


.folder-color {
  color: #e5c65f;
}

.color-excel {
  color: #217346;
}

.file-table {
  min-height: 600px;
}

.img-preview-sm {
  width: 32px;
  height: 32px;
  object-fit: contain
}

.is-folder {
  cursor: pointer;
}
</style>
