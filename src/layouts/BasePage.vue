<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100">
    <div class="w-full max-w-md min-h-screen bg-slate-100 shadow-lg flex flex-col">
      <!-- Navbar -->
      <!-- <Navbar /> -->
      
      <!-- Slot untuk konten halaman -->
      <main class="flex-1 overflow-y-auto">
        <slot></slot>
      </main>
  
      <!-- Bottom Navigation -->
      <BottomNavigation />
    </div>
  </div>
</template>

<script setup lang="ts">
// import Navbar from '@/components/Navbar.vue';
import BottomNavigation from '../components/BottomNavigation.vue';
</script>
