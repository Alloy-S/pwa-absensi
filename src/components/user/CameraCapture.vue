<template>
    <div class="camera-container">
      <video ref="video" autoplay class="camera-feed"></video>
      <canvas ref="canvas" class="hidden"></canvas>
      <button @click="capturePhoto" class="capture-btn">Ambil Foto</button>
  
      <div v-if="photo" class="photo-preview">
        <img :src="photo" alt="Captured Photo" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const video = ref<HTMLVideoElement | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const photo = ref<string | null>(null);
  let stream: MediaStream | null = null;
  
  const startCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (video.value) video.value.srcObject = stream;
    } catch (error) {
      console.error("Gagal mengakses kamera:", error);
    }
  };
  
  const capturePhoto = () => {
    if (!video.value || !canvas.value) return;
    
    const context = canvas.value.getContext('2d');
    if (!context) return;
  
    // Set canvas size sama dengan video
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    
    // Gambar frame dari video ke canvas
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    
    // Konversi ke data URL
    photo.value = canvas.value.toDataURL('image/jpeg');
  };
  
  onMounted(() => startCamera());
  onUnmounted(() => stream?.getTracks().forEach(track => track.stop()));
  
  </script>
  
  <style scoped>
  .camera-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .camera-feed {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
  
  .capture-btn {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .photo-preview img {
    margin-top: 10px;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
  
  .hidden {
    display: none;
  }
  </style>
  