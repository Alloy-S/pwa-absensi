<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-100">
      <div class="w-full max-w-md min-h-screen bg-slate-100 shadow-lg flex flex-col">
        
        <!-- Slot untuk konten halaman -->
        <main class="flex-1 overflow-y-auto">
          <slot></slot>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">


  </script>
  