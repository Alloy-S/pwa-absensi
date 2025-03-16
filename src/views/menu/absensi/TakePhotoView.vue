<template>
  <WebCamUI :fullscreenState="true" @photoTaken="photoTaken" />
</template>

<script setup>
import WebCamUI from '@/components/WebCamUI.vue';
import { useRouter } from 'vue-router';
import { usePhotoStore } from '@/stores/UsePhotoStore';

const router = useRouter();
const photoStore = usePhotoStore();

const photoTaken = (data) => {
  console.log('image blob: ', data.blob);
  console.log('image data url', data.image_data_url);

  // Simpan ke Pinia
  photoStore.setPhoto(data.blob, data.image_data_url);

  setTimeout(() => {
      router.back();
  }, 750);
};
</script>
