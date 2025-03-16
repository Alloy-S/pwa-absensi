// stores/usePhotoStore.js
import { defineStore } from 'pinia';

export const usePhotoStore = defineStore('photo', {
  state: () => ({
    photoBlob: null,
    photoDataUrl: null
  }),
  actions: {
    setPhoto(blob, imageDataUrl) {
      this.photoBlob = blob;
      this.photoDataUrl = imageDataUrl;
    },
    clearPhoto() {
      this.photoBlob = null;
      this.photoDataUrl = null;
    }
  }
});
