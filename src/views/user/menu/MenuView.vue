<template>
    <BasePage>
        <p class="pt-6 text-center font-semibold">Menu</p>
        <div class="mt-4">
            <div class="p-4 grid-cols-2 grid gap-4 text-center">
                <button v-for="(button, index) in buttons" :key="index"
                    class="py-10 shadow-md rounded-md bg-white hover:bg-blue-100" @click="navigate(button.path)">
                    <p>{{ button.text }}</p>
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
    { text: 'Absensi', path: '/menu/absensi/pencatatan-waktu' },
    { text: 'Input Absensi Borongan/Harian', path: '/menu/absensi/borongan' },
    { text: 'Pengumuman', path: '/menu/pengumuman' },
    { text: 'Reimburse', path: '/menu/reimburse' },
    { text: 'Approval', path: '/menu/approval' },
]);

const navigate = (path: string) => {
    router.push(path);
};
</script>