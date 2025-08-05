<template>
    <BasePage>
        <p class="pt-6 text-center font-semibold">Menu</p>
        <div class="mt-4">
            <div class="p-4 grid-cols-2 grid gap-4 text-center">
                <button v-for="(button, index) in visibleButtons" :key="index"
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const allButtons = ref([
    { text: 'Absensi', path: '/menu/absensi/pencatatan-waktu', icon: 'fa-regular fa-clock' },
    { text: 'Input Absensi Borongan/Harian', path: '/menu/absensi/borongan', icon: 'fa-solid fa-users' },
    { text: 'Pengumuman', path: '/menu/pengumuman', icon: 'fa-solid fa-newspaper' },
    { text: 'Reimburse', path: '/menu/reimburse', icon: 'fa-solid fa-money-bill' },
    { text: 'Approval', path: '/menu/approval', icon: 'fa-solid fa-person-circle-check', requiredRole: true },
]);

const userRoles = ref<string[]>([]);

onMounted(() => {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
        const userData = JSON.parse(userDataString);

        userRoles.value = userData.userRole.split(',').map((r: string) => r.trim());
    }
});

const visibleButtons = computed(() => {
    const canApprove = userRoles.value.some(role => ['Admin', 'HRD'].includes(role));

    return allButtons.value.filter(button => {
        if (!button.requiredRole) {
            return true;
        }

        return button.requiredRole && canApprove;
    });
});

const navigate = (path: string) => {
    router.push(path);
};
</script>