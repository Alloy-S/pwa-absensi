<template>
    <BasePageNoNav>
        <TopHeader :title="'Absensi ' + (isCheckIn ? 'Masuk' : 'Keluar')" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Absensi {{ isCheckIn ? 'Masuk' : 'Keluar' }}</h1>

            <!-- Foto Placeholder -->
            <div class="relative w-40 h-40 mx-auto">
                <img 
                    v-if="photo" 
                    :src="photo" 
                    class="w-full h-full rounded-full border border-gray-300 object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center rounded-full">
                    <img src="@/assets/person.svg" class="border-2 border-slate-500 rounded-full" />
                </div>

                <!-- Tombol Ambil Foto -->
                <button 
                    @click="openCamera"
                    class="absolute bottom-0 left-3/4 transform -translate-x-1/2 bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"
                >
                    <img src="@/assets/camera.svg" alt="" />
                </button>
            </div>

            <!-- Catatan -->
            <textarea
                v-model="note"
                class="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Tambahkan catatan (opsional)"
            ></textarea>

            <!-- Status Lokasi -->
            <div class="p-2 border rounded-md bg-gray-100">
                <p><strong>Lokasi:</strong> {{ location.status }}</p>
                <p v-if="location.coords">📍 {{ location.coords }}</p>
            </div>

            <!-- Tombol Submit -->
            <button
                @click="submitAttendance"
                :disabled="!photo"
                class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
            >
                Submit Absensi
            </button>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { useRouter, useRoute } from 'vue-router';
import { useAbsenceStore } from '@/stores/absenceStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
const absenceStore = useAbsenceStore();

console.log(route.params.type);

const isCheckIn = ref(route.params.type === 'masuk');
const photo =  computed(() => absenceStore.photo);
const note = ref('');
const location = ref({ status: 'Mengambil lokasi...', coords: null });
const isCameraOpen = ref(false);

// Ambil lokasi pengguna
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                location.value = {
                    status: 'Lokasi ditemukan',
                    coords: `${pos.coords.latitude}, ${pos.coords.longitude}`
                };
            },
            () => {
                location.value.status = 'Gagal mengambil lokasi';
            }
        );
    } else {
        location.value.status = 'Geolocation tidak didukung';
    }
};

// Buka kamera
const openCamera = () => {
    router.push('/menu/absensi/take-photo');
};

// Submit data absensi
const submitAttendance = () => {
    const data = {
        type: isCheckIn.value ? 'masuk' : 'keluar',
        photo: photo.value,
        note: note.value,
        location: location.value.coords
    };

    console.log('Data Absensi:', data);
    absenceStore.setAttendance(data);
    router.push('/success');
};

// Inisialisasi lokasi saat komponen dimount
onMounted(() => {
    getLocation();
    
});

</script>
