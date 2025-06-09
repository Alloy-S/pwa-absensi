<template>
    <BasePage>
        <p class="pt-6 text-center font-semibold">Menu</p>
        <div class="mt-4">
            <div class="p-4 grid-cols-2 grid gap-4 text-center">
                <button v-for="(button, index) in buttons" :key="index"
                    class="py-10 shadow-md rounded-md bg-white hover:bg-blue-100" @click="navigate(button.path)">
                    <i class="fa-2xl" :class="button.icon"></i>
                    <p class="mt-5">{{ button.text }}</p>
                </button>
            </div>

        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/user/BasePage.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const buttons = ref([
    { text: 'Absensi', path: '/menu/absensi/pencatatan-waktu', icon: 'fa-regular fa-clock' },
    { text: 'Input Absensi Borongan/Harian', path: '/menu/absensi/borongan', icon: 'fa-solid fa-users' },
    { text: 'Pengumuman', path: '/menu/pengumuman', icon: 'fa-solid fa-newspaper' },
    { text: 'Reimburse', path: '/menu/reimburse', icon: 'fa-solid fa-money-bill' },
    { text: 'Approval', path: '/menu/approval', icon: 'fa-solid fa-person-circle-check' },
]);

const navigate = (path: string) => {
    router.push(path);
};
</script>