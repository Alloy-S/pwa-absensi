<template>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <!-- Header -->
            <div class="flex justify-between items-center border-b pb-2">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                <font-awesome-icon icon="times" />
              </button>
            </div>
  
            <!-- Content -->
            <div class="mt-4">
              <slot></slot>
            </div>
  
            <!-- Footer -->
            <div v-if="$slots.footer" class="mt-4 flex justify-end space-x-2">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    title: String
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  