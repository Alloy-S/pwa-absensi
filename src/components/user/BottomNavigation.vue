<template>
  <nav class="w-full max-w-md fixed bottom-0 bg-white shadow-md py-2">
    <div class="flex justify-around">
      <button v-for="(item, index) in navItems" :key="index" class="flex flex-col items-center"
        :class="{ 'text-blue-500': $route.path === item.path, 'text-slate-500': $route.path !== item.path }" @click="navigate(item.path)" >
        <i :class="item.icon" class="text-xl"></i>
        <span class="text-xs">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = [
  { label: 'Home', path: '/', icon: 'fas fa-home' },
  { label: 'Menu', path: '/menu', icon: 'fas fa-border-all' },
  { label: 'Profile', path: '/profile', icon: 'fas fa-user' },
];

const navigate = (path: string) => {
  router.replace(path);
};
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>