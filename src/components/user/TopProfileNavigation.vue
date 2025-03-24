<template>
    <div class="p-4 flex justify-around space-x-5 items-start text-center font-semibold text-sm">
        <div v-for="(menu, index) in menus" :key="index">
            <button class="max-w-16" @click="$router.replace(menu.path)">
                <div>
                    <i :class="menu.icon"></i>
                </div>
                <span class="text-wrap text-sm">{{ menu.name }}</span>
                <hr v-if="$route.path === menu.path" class="mt-1 border-b-2 border-blue-500">
            </button>
        </div>
        
    </div>
    <hr class="border-b-2 border-slate-400">    
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menus = ref([
    { name: 'Data Kontak', path: '/profile/kontak', icon: "fa-solid fa-address-book fa-xl" },
    { name: 'Data Pribadi', path: '/profile/pribadi', icon: "fa-solid fa-user fa-xl"  },
    { name: 'Data Karyawan', path: '/profile/karyawan', icon: "fa-solid fa-users fa-xl"  },
]);
</script>