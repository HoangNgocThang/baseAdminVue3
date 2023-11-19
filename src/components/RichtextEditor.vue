<template>
  <div>
    <Uploader :onselected="onSelected" v-if="upload" name="Chèn ảnh"/>
    <div v-if="!simple">
      <button ref="emojiBtn" @click="showEmoji($event)" class="btn-inline1 _emojibtn"><i
        class="fa fa-smile-o _emojibtn"></i></button>
      <button :title="box.title" v-for="box in boxStyles"
              :style="box.buttonStyle"
              @click="addBlock(box)" class="btn-inline1">a
      </button>
    </div>
    <textarea ref="textarea" :id="id">{{value}}</textarea>
  </div>
</template>

<script>
const boxStyles = [
  {
    title: 'Khung noi dung tom tat', style: `background: #47c7e4;
    padding: 10px 10px;
    margin-bottom: 20px;
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    -ms-border-radius: 7px;
    -o-border-radius: 7px;
    position: relative;
    border: 1px dashed gray;
    font-weight: bold;
    font-style: Italic;
    font-size: 13px;`, buttonStyle: `border:1px dashed gray;background: #47c7e4;font-weight:bold`
  },
  {
    title: 'Nền trằng, viêm chấm',
    style: `border: 1px dashed #47c7e4;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;-ms-border-radius: 5px;-o-border-radius: 5px;position: relative;padding: 10px;margin: 20px 0px;`
    , buttonStyle: `border:1px dashed #47c7e4;background:white `
  },
  {
    title: 'Noi dung chinh', style: `background: #47c7e4;
    padding: 10px 20px 20px;
    border: 1px dotted #cdd4cd;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    line-height: 1.6;
    margin-top: 30px;
    margin-bottom: 10px;`, buttonStyle: `    background: #47c7e4;
    border: 1px dotted #cdd4cd;`
  },
  {
    title: 'Khung xanh duong dut', style: `    border: 2px dashed #47c7e4;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    position: relative;
    padding: 10px;
    margin: 5px 0px 28px 0px;
`, buttonStyle: `border: 2px dashed #47c7e4;
    border-radius: 1px;
    background-color: white;`
  }
];

import Uploader from "./Uploader";

let editor;
export default {
  name: "RichtextEditor",
  data() {
    return {
      boxStyles: boxStyles,
      hasEmoji: false,
      style: {position: 'absolute', zIndex: 99}
    }
  },
  methods: {
    showEmoji(box) {

      this.hasEmoji = !this.hasEmoji;

      /*           const offset = $(e.target).offset();
                 this.style.bottom = offset.top;
                 this.style.left = offset.left;
                 console.log(e.target)*/
    },
    addBlock(box) {
      editor.insertHtml(`<div  style="${box.style}">Nội dung</div>`)
    },
    addEmoji(e) {
      if (editor) {
        editor.insertHtml(e.native)
      }
    },
    onSelected(fileUrl) {
      if (editor) {
        const html = `<p class="image"><img src="${fileUrl}" alt=""  /></p>`;
        editor.insertHtml(html)
      }
    }
  },
  components: {
    Uploader
  },
  watch: {
    'default': function (newValue) {
      editor.setData(newValue);
    }
  },
  props: ['id', 'value', 'upload', 'height', 'default', 'simple'],
  destroyed() {
  },
  mounted: function () {
    //  console.log('aa',{a:this.upload})
    const self = this;
    $(document).on('click', function (e) {
      const $e = $(e.target);
      if ($e.hasClass('_emojibtn')) {
        return;
      }

      if (!$('#_emojibtn').find(e.target).length) {
        self.hasEmoji = false;
      }
    })
    CKEDITOR.config.height = this.height || 700;
    //       this.$el.checked = (this.value > 0);
    editor = CKEDITOR.replace(this.$refs.textarea, {
      language: 'vi'
    });

    editor.on('change', function (e) {

      self.hasEmoji = false;
      const data = e.editor.getData();
      self.$emit('input', data);
      self.$emit('change');

    });

    /* editor.addCommand("mySimpleCommand", { // create named command
         exec: function(edt) {
             self.hasEmoji = true;
             console.log('ok');
         }
     });

     editor.ui.addButton('SuperButton', { // add new button and bind our command
         label: "Click me",
         command: 'mySimpleCommand',
         toolbar: 'insert',
         icon: 'https://ssl.gstatic.com/dynamite/emoji/png/128/emoji_u1f60e.png'
     });*/
  },
}
</script>

<style scoped>

</style>
