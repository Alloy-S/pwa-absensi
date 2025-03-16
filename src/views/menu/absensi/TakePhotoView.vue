<template>
  <WebCamUI :fullscreenState="true" @photoTaken="photoTaken" />
</template>

<script setup>
import WebCamUI from '@/components/WebCamUI.vue';
import { useRouter } from 'vue-router';
import {useAbsenceStore} from '@/stores/absenceStore';

const router = useRouter();
const absenceStore = useAbsenceStore();
const fullscreenState = true;

const photoTaken = (data) => {
  console.log('image blob: ', data.blob);
  // console.log('image data url', data.image_data_url);

  // Simpan ke Pinia
  absenceStore.setPhoto(data.image_data_url);

  setTimeout(() => {
      router.back();
  }, 750);
};
</script>
