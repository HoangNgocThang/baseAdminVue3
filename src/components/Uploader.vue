<template>
  <div style="display: inline-block">
    <div class="modal uploader" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content" style="height:800px;">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ name || 'Chọn ảnh' }}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <iframe ref="frame" style="width: 100%;border: 0;height: 800px" v-show="url" :src="url"></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix">
      <button class="btn-inline1" type="button" @click="showElfinder()"><i class="fa fa-image"></i></button>
      <em class="size-explain" v-text="sizeExplain"></em>
      <em class="size-error" v-text="sizeError"></em>
    </div>

    <template v-if="!multiple">
      <div v-if="preview && imgSrc" style="margin-top:5px;">
        <a target="_blank" :href="imgSrc">
          <img :src="imgSrc" class="preview-img">
        </a>
        <a v-if="showclose" class="close" href="#" @click.prevent="remove()"><i class="fa fa-remove"></i></a>
      </div>
    </template>
    <div v-else class="clearfix">
      <div class="thumb" v-for="(img,index) in images" style="margin-top:5px;">
        <a target="_blank" :href="img.url" @click.prevent="showImages()">
          <img :src="img.url">
        </a>

        <a class="close" href="#" @click.prevent="remove(index)"><i class="fa fa-remove"></i></a>
        <div class="amove">
          <a class="aleft" href="#" @click.prevent="toLeft(index)"><i class="fa fa-arrow-left"></i></a>
          <a class="aright" href="#" @click.prevent="toRight(index)"><i class="fa fa-arrow-right"></i></a>
        </div>

      </div>
      <ul ref="imageViewer" style="display: none">
        <li v-for="img in images"><img :src="img.url"></li>
      </ul>
    </div>
  </div>
</template>

<script>
function getImageMeta(url, cb) {
  var img = new Image();
  img.addEventListener("load", function () {
    cb({width: this.naturalWidth, height: this.naturalHeight});
  });
  img.src = url;
}

let $uploadBaseUrl = window.$uploadBaseUrl;
export default {
  props: ['onselected', 'name', 'type', 'preview', 'value', 'multiple', 'width', 'height', 'showclose'],
  name: "Uploader",
  data() {
    let sizeExplain = null;
    let ratio = null;
    if (this.preview) {
      let width = parseInt(this.width);
      let height = parseInt(this.height);
      if (width && height) {
        sizeExplain = '(Tỉ lệ w/h: ' + width + '/' + height + ')';
        ratio = height / width;
      }
    }
    let type = this.type;
    let baseAlias;
    if (type === 'product') {
      baseAlias = 'product';
    } else if (type === 'banner') {
      baseAlias = 'banner';
    } else if (type === 'gifts') {
      baseAlias = 'gifts';
    } else if (type === 'pdf') {
      baseAlias = 'pdf';
    } else {
      baseAlias = 'img';
    }


    return {
      baseUrl: $uploadBaseUrl.replace('{alias}', baseAlias),
      imgSrc: this.value || '',
      images: this.value || [],
      url: '',
      sizeExplain: sizeExplain,
      sizeError: '',
      ratio: ratio,
    }
  },
  watch: {
    'value': function (newValue) {
      if (this.preview) {
        this.imgSrc = newValue;
      }
    }
  },
  methods: {
    toLeft(index) {
      if (this.images[index - 1]) {
        let tmp = this.images[index - 1];
        this.$set(this.images, index - 1, this.images[index])
        this.$set(this.images, index, tmp)
      }
    },
    toRight(index) {
      if (this.images[index + 1]) {
        let tmp = this.images[index + 1];
        this.$set(this.images, index + 1, this.images[index])
        this.$set(this.images, index, tmp)
      }
    },
    remove(index) {
      if (index === undefined) {
        this.$emit('input', null);
      } else {
        this.images.splice(index, 1);
      }
    },
    showImages() {
      let viewer = new Viewer(this.$refs.imageViewer, {
        zIndex: 10000,
        hidden: function () {
          viewer.destroy();
        },
      });
      viewer.show();
    },
    showElfinder() {
      $(this.$refs.modal).modal();
      this.url = window.$elfinderUrl + '?v=1&type=' + (this.type || 'default');

      const iframe = this.$refs.frame;
      iframe.onload = () => {

        iframe.contentWindow.elFinderFileCallback = (file) => {
          let trueUrl = this.baseUrl + '/' + file.name;
          console.log('useTrueUrl:' + trueUrl);


          if (this.onselected) {
            this.onselected(trueUrl);
          }

          if (this.multiple) {
            getImageMeta(trueUrl, (meta) => {


              this.images.push({
                width: meta.width,
                height: meta.height,
                url: trueUrl
              });
            })

            this.$emit('input', this.images);
          } else {
            if (this.preview) {
              this.imgSrc = trueUrl;
              if (this.sizeExplain) {
                getImageMeta(trueUrl, (meta) => {
                  let ratio = meta.height / meta.width;
                  console.log(this.ratio, ratio)
                  let diff = Math.abs(this.ratio - ratio);
                  if (diff > 0.002) {
                    this.sizeError = 'Ảnh đang sai tỉ lệ, kích thước hiện tại w/h: ' + meta.width + '/' + meta.height
                  } else {
                    this.sizeError = '';
                  }
                })
              }

              this.$emit('input', trueUrl);
            }
            if (this.type === 'pdf') {
              this.$emit('input', trueUrl);
            }
          }

          $(this.$refs.modal).modal('hide');
        };
      }

      //window.open(window.$elfinderUrl)
    }
  }
}
</script>

<style scoped>
.size-error {
  color: red;
  font-size: 12px;
}

.size-explain {
  font-size: 12px;
  color: blue;
}

.thumb {
  float: left;
  margin: 5px;
  position: relative;
}

.preview-img {
  width: 200px;
  height: auto;
}

.thumb .amove {
  position: absolute;
  right: 50%;
  bottom: -19px;
}

.thumb .aleft {
  color: #4099ff;
  font-size: 10px;
}

.thumb .aright {
  color: #4099ff;
  font-size: 10px;
}

.thumb .close {
  color: darkred;
  position: absolute;
  top: -20px;
  right: 11px;
}

.thumb img {
  width: 100px;
  height: 75px;
}

.modal-dialog {
  max-width: 75%;
  margin: 0 auto;
}
</style>
