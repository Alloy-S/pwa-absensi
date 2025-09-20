<template>
    <BasePageNoNav>
        <WebCamUI :fullscreenState="true" v-if="isCameraOpen" @photoTaken="photoTaken" @close="isCameraOpen = false" />

        <div v-show="!isCameraOpen">
            <TopHeader :title="'Absensi ' + (isCheckIn ? 'Masuk' : 'Keluar')" />
            <div class="p-4 space-y-4">
                <h1 class="text-lg font-semibold">Absensi {{ isCheckIn ? 'Masuk' : 'Keluar' }}</h1>

                <div class="relative w-40 h-40 mx-auto">
                    <div v-if="isCompressing"
                        class="w-full h-full flex items-center justify-center rounded-full bg-gray-100">
                        <i class="fa-solid fa-spinner fa-spin text-3xl text-gray-500"></i>
                    </div>
                    <div v-else class="w-full h-full">
                        <img v-if="photo" :src="photo"
                            class="w-full h-full rounded-full border border-gray-300 object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center rounded-full">
                            <img src="@/assets/person.svg" class="border-2 border-slate-500 rounded-full" />
                        </div>
                    </div>

                    <button @click="openCamera"
                        class="absolute bottom-0 left-3/4 transform -translate-x-1/2 bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500">
                        <img src="@/assets/camera.svg" alt="Ambil Foto" />
                    </button>
                </div>

                <textarea v-model="note" class="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Tambahkan catatan (opsional)"></textarea>

                <div class="p-2 border rounded-md bg-gray-100">
                    <p><strong>Lokasi:</strong> {{ location.status }}</p>
                    <p v-if="location.coords">📍 {{ location.coords.latitude }}, {{ location.coords.longitude }}</p>
                    <div class="flex justify-center items-center mt-2">
                        <a @click="openMapModal" class="text-blue-500 hover:cursor-pointer text-center">Lihat Lokasi</a>
                    </div>
                </div>


                <button @click="submitAttendance" :disabled="!photo || loading"
                    class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    <span v-if="loading">Mengirim...</span>
                    <span v-else>Submit Absensi</span>
                </button>
            </div>
        </div>
        <Dialog header="Preview Lokasi" v-model:visible="isMapModal" modal
            :style="{ width: '90vw', maxWidth: '600px' }">
            <iframe v-if="location.coords"
                :src="`https://maps.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}&z=15&output=embed`"
                width="100%" height="450" style="border:0;" loading="lazy">
            </iframe>
        </Dialog>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import WebCamUI from '@/components/user/WebCamUI.vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { submitAttendanceApi } from '@/services/attendanceService';
import Dialog from 'primevue/dialog';

const router = useRouter();
const route = useRoute();

const isCheckIn = computed(() => route.params.type === 'in');
const photo = ref<string | null>(null);
const note = ref('');
const location = ref<{ status: string; coords: { latitude: number; longitude: number } | null }>({ status: 'Mengambil lokasi...', coords: null });
const isCameraOpen = ref(false);
const isCompressing = ref(false);
const loading = ref(false);
const failedAttempts = ref(0);

const isMapModal = ref(false);

const openMapModal = () => {
    if (location.value.coords) {
        isMapModal.value = true;
    } else {
        toast.error("Lokasi belum ditemukan untuk ditampilkan di peta.");
    }
}

const getLocation = () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                location.value = {
                    status: 'Lokasi ditemukan',
                    coords: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                };
            },
            () => {
                location.value.status = 'Gagal mengambil lokasi';
                toast.error("Gagal mendapatkan lokasi. Pastikan GPS aktif dan Anda memberikan izin.");
            },
            options
        );
    } else {
        location.value.status = 'Geolocation tidak didukung';
    }
};

const openCamera = () => {
    isCameraOpen.value = true;
};

const compressImage = (base64Str: string, maxSizeKB: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error("Gagal mendapatkan konteks canvas"));
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            let quality = 0.9;
            let compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            const getByteSize = (str: string) => new Blob([str]).size;
            while (getByteSize(compressedBase64) / 1024 > maxSizeKB && quality > 0.1) {
                quality -= 0.1;
                compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            }
            resolve(compressedBase64);
        };
        img.onerror = (error) => reject(error);
    });
};

const photoTaken = async (data: { image_data_url: string }) => {
    isCameraOpen.value = false;
    isCompressing.value = true;
    photo.value = null;
    try {
        const compressed = await compressImage(data.image_data_url, 500);
        photo.value = compressed;
    } catch (error) {
        toast.error("Gagal mengompres gambar.");
        console.error("Error saat kompresi:", error);
    } finally {
        isCompressing.value = false;
    }
};

const submitAttendance = async () => {
    if (!photo.value || !location.value.coords) {
        toast.error("Foto dan lokasi wajib diisi.");
        return;
    }
    const toastId = toast.loading("Loading...");
    loading.value = true;
    try {
        const payload = {
            type: isCheckIn.value ? 'IN' : 'OUT',
            image: photo.value,
            description: note.value,
            latitude: location.value.coords.latitude,
            longitude: location.value.coords.longitude
        };
        const response = await submitAttendanceApi(payload);
        if (response.status === 200) {
            toast.success("Absensi berhasil dicatat!");
            router.back();
        }
    } catch (error) {
        console.error('Gagal submit absensi:', error);
        failedAttempts.value += 1;
    } finally {
        toast.remove(toastId);
        loading.value = false;
        if (failedAttempts.value >= 3) {
            toast.error(`Gagal melakukan absensi. Silahkan ajukan koreksi absensi atau coba kembali.`);
        }
    }
};

onMounted(() => {
    getLocation();
});
</script>
