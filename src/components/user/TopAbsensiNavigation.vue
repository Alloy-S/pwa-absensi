<template>
    <div class="p-4 flex justify-around space-x-5 items-start text-center font-semibold text-sm">
        <div v-for="(menu, index) in menus" :key="index">
            <button class="max-w-16" @click="$router.replace(menu.path)">
                <div>
                    <i :class="menu.icon"></i>
                </div>
                <span class="text-wrap">{{ menu.name }}</span>
                <hr v-if="$route.path === menu.path" class="mt-1 border-b-2 border-blue-500">
            </button>
        </div>
        
    </div>
    <hr class="border-b-2 border-slate-400">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menus = ref([
    { name: 'Riwayat', path: '/menu/absensi/riwayat', icon: "fa-solid fa-clock-rotate-left fa-xl" },
    { name: 'Pencatatan Waktu', path: '/menu/absensi/pencatatan-waktu', icon: "fa-solid fa-clock fa-xl"  },
    { name: 'Kehadiran', path: '/menu/absensi/koreksi-kehadiran', icon: "fa-solid fa-calendar-days fa-xl"  },
    { name: 'Izin', path: '/menu/absensi/izin', icon: "fa-solid fa-calendar-xmark fa-xl"  },
    { name: 'Lembur', path: '/menu/absensi/lembur', icon: "fa-solid fa-cloud-moon fa-xl"  },
]);
</script>