<template>
  <img v-if="src" class="q-image" @click="showImage()" ref="img" :src="src" :alt="alt" :class="this.class"
       :style="styles">
</template>

<script>
import {showPhoto} from "../lib/utils";

export default {
  name: "QImage",
  props: ['src', 'alt', 'class', 'styles'],
  methods: {
    showImage() {
      showPhoto(this.src);
    }
  },
  mounted() {
    // View an image.
    /*const viewer = new Viewer(this.$refs.img, {
        inline: true,
        viewed() {
            viewer.zoomTo(1);
        },
    });*/
  }
}
</script>

<style>
.q-image {
  cursor: pointer;
}
</style>
