<template>
  <div>
    <div>
      <button class="btn btn-primary" type="button" @click="openModal()">Chọn file</button>

      <div>
        <ul class="q-selected-files">
          <li v-for="(file, index) in selectedFiles" :key="file.id">
            <a target="_blank" :href="file.url">
              <span v-text="file.name + '(' + humanFileSize(file.size) + ')' "></span>
            </a>
            <a class="q-selected-files__remove-btn" href="" @click.prevent="removeFile(file, index)">
              <i class="fa fa-trash"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="modal" tabindex="-1" ref="modal">
      <div class="modal-dialog" style="max-width: 80vw">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chọn file</h5>
            <button type="button" @click="closeModal()" class="modal-btn-close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <iframe v-if="iframeSrc" scrolling="no" class="modal-iframe" :src="iframeSrc" :key="iframeSrc"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Q_FILE_ACTION, humanFileSize, buildQuery, showPhotos} from '../lib/utils'
import QImage from "./QImage";

const storageKey = 'QFileManagerInput.parentId'
export default {
  name: "QFileManagerInput",
  components: {QImage},
  props: ['limit', 'modelValue'],
  data() {
    let selectedFiles = [];
    if (Array.isArray(this.modelValue)) {
      selectedFiles = this.modelValue
    } else {
      console.error('QFileManagerInput:', 'modelValue must be an Array')
    }

    return {
      iframeSrc: '',
      selectedFiles: selectedFiles
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
    window.addEventListener('message', this.onIframeMessage)
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onIframeMessage)
  },
  methods: {
    humanFileSize,
    onIframeMessage(message) {
      if (typeof message.data != 'string') return;
      const raw = JSON.parse(message.data);

      const handler = {
        [Q_FILE_ACTION.SELECT_FILE]: (payload) => {
          this.modal.hide()
          this.onFileSelect(payload)
        },
        [Q_FILE_ACTION.LOAD]: (payload) => {
          if (payload.code === 200) {
            localStorage.setItem(storageKey, payload.data.parent?.id)
          }
        },
        [Q_FILE_ACTION.SHOW_PHOTO](payload) {

          showPhotos(payload.images, payload.startIndex)
        }
      }

      if (handler[raw.action]) {
        handler[raw.action](raw.payload)
      } else {
        console.warn('Warning', `${raw.action} has no handler`)
      }

    },
    onFileSelect(files) {
      const limit = Math.max(1, this.limit ? this.limit : 1)
      if (limit < files.length) {
        alert(`Bạn được chọn tối đa ${limit} file. Các file thừa sẽ được bỏ qua`)
      }

      const selectedFiles = [];
      for (let i = 0; i < limit; i++) {
        if (files[i]) {
          selectedFiles.push(files[i])
        }
      }
      this.selectedFiles = selectedFiles;
      this.$emit('update:modelValue', selectedFiles)
    },
    closeModal() {
      this.modal.hide()
    },
    removeFile(file, index) {
      this.selectedFiles.splice(index, 1)
    },
    openModal() {
      const limit = Math.max(1, this.limit ? this.limit : 1)
      const parentId = localStorage.getItem(storageKey)
      if (parentId) {
        const queryStr = buildQuery({
          id: parentId,
          limit: limit
        })
        this.iframeSrc = '/xadmin/files/index#' + queryStr
      } else {
        const queryStr = buildQuery({
          limit: limit
        })
        this.iframeSrc = '/xadmin/files/index#' + queryStr
      }

      this.modal.show()
    }
  }
}
</script>

<style scoped>
.q-selected-files {
  margin-top: 10px
}

.q-selected-files__remove-btn {
  margin-left: 5px;
}

.q-selected-files__remove-btn i {
  color: darkred;
}

.modal-iframe {
  overflow: hidden;
  border: 0;
  width: 100%;
  min-height: 600px;

}
</style>
