<template>
    <BasePageNoNav>
        <TopHeader title="Pencatatan Waktu" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <p class="text-lg font-semibold text-gray-700">{{ formattedDate }}</p>
                <p class="text-sm text-gray-500">Shift: {{ shiftKerja }}</p>
            </div>

            <div class="mt-4 bg-white p-4 rounded-lg shadow flex flex-col items-center">
                <p class="text-lg font-semibold text-gray-700">Status Kehadiran</p>
                <p class="text-6xl">{{ lamaKerja || "-" }}</p>
                <p>Waktu Lama Kerja</p>
                <div class="w-full mt-6 flex justify-evenly gap-2">
                    <div class="w-full text-center">
                        <p class="text-sm text-gray-600">Jam Masuk</p>
                        <p>{{ jamMasuk || "-" }}</p>
                        <button @click="catatMasuk" :disabled="isMasuk"
                            class="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 disabled:bg-gray-300">
                            Masuk
                        </button>
                    </div>
                    <div class="w-full text-center">
                        <p class="text-sm text-gray-600">Jam Pulang</p>
                        <p>{{ jamPulang || "-" }}</p>
                        <button @click="catatPulang" :disabled="!isMasuk || isPulang"
                            class="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 disabled:bg-gray-300">
                            Pulang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { useRouter } from 'vue-router';

const route = useRouter();

const shiftKerja = ref("Normal (08:00 - 16:00)");
const jamMasuk = ref<string | null>(null);
const jamPulang = ref<string | null>(null);
const lamaKerja = ref<string | null>("--:--:--");
const isMasuk = ref<boolean>(false);
const isPulang = ref<boolean>(false);

const formattedDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const catatMasuk = () => {
    // jamMasuk.value = formatDateTime(new Date());
    // isMasuk.value = true;
    route.push('/menu/absensi/pencatatan-waktu/masuk');
};

const catatPulang = () => {
    route.push('/menu/absensi/pencatatan-waktu/masuk');
    // jamPulang.value = formatDateTime(new Date());
    // isPulang.value = true;
    // hitungLamaKerja();
};

</script>
