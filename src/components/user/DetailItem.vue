<template>
    <div class="mb-4">
      <p class="text-sm font-medium text-gray-600">{{ label }}</p>
      <p class="text-lg font-semibold">{{ value }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{ label: string; value: string }>();
  </script>
  