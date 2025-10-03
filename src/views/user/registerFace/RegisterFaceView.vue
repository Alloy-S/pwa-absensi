<template>
    <BasePageNoNav>
        <WebCamUI :fullscreenState="true" v-if="showCamera" @photoTaken="photoTaken" @close="showCamera = false" />

        <div v-show="!showCamera">
            <TopHeader title="Pendaftaran Wajah" />

            <div class="p-4 space-y-4">
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 class="text-lg font-semibold mb-4">Status Pendaftaran Wajah</h2>


                    <div v-if="loading" class="flex flex-col items-center justify-center text-gray-500">
                        <i class="fa-solid fa-spinner fa-spin text-3xl mb-2"></i>
                        <p>Memeriksa status...</p>
                    </div>


                    <div v-else-if="isFaceRegistered" class="flex flex-col items-center justify-center text-green-600">
                        <div class="relative w-24 h-24">
                            <i class="fa-solid fa-face-smile text-8xl"></i>
                            <i
                                class="fa-solid fa-check-circle absolute bottom-0 right-0 text-3xl bg-white rounded-full"></i>
                        </div>
                        <p class="mt-4 font-medium">Wajah Anda Sudah Terdaftar</p>
                        <p class="text-sm text-gray-500">Anda dapat menggunakan wajah untuk absensi.</p>
                    </div>


                    <div v-else class="flex flex-col items-center justify-center text-red-600">
                        <div class="relative w-24 h-24">
                            <i class="fa-solid fa-face-frown text-8xl"></i>
                            <i
                                class="fa-solid fa-times-circle absolute bottom-0 right-0 text-3xl bg-white rounded-full"></i>
                        </div>
                        <p class="mt-4 font-medium">Wajah Anda Belum Terdaftar</p>
                        <p class="text-sm text-gray-500">Silakan ambil gambar untuk mendaftarkan wajah.</p>
                    </div>
                </div>


                <div class="bg-white p-6 rounded-lg shadow-md text-center">

                    <div
                        class="bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg mb-4 p-3 text-left flex items-start space-x-3">
                        <i class="fa-solid fa-circle-info mt-1"></i>
                        <div>
                            <p class="font-semibold">Petunjuk Pengambilan Foto:</p>
                            <ul class="list-disc list-inside mt-1">
                                <li>Pastikan wajah Anda terlihat jelas.</li>
                                <li>Lepaskan masker dan kacamata.</li>
                                <li>Pastikan pencahayaan cukup terang.</li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="!capturedImage && !isCompressing">
                        <button @click="openCamera"
                            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2">
                            <i class="fa-solid fa-camera"></i>
                            <span>Daftarkan Wajah</span>
                        </button>
                    </div>


                    <div v-if="isCompressing" class="flex flex-col items-center justify-center text-gray-500 py-10">
                        <i class="fa-solid fa-spinner fa-spin text-3xl mb-2"></i>
                    </div>


                    <div v-if="capturedImage && !isCompressing" class="space-y-4">
                        <p class="font-medium">Pratinjau Gambar:</p>
                        <img :src="capturedImage" alt="Pratinjau Wajah" class="w-full rounded-lg shadow-inner" />
                        <div class="flex space-x-3">
                            <button @click="retakeImage"
                                class="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold">
                                Ambil Ulang
                            </button>
                            <button @click="registerFace"
                                class="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                                Daftarkan Wajah
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import WebCamUI from '@/components/user/WebCamUI.vue';
import { toast } from 'vue3-toastify';
import { checkFaceStatus, registerFaceApi } from '@/services/userService';


const isFaceRegistered = ref(false);
const loading = ref(true);


const showCamera = ref(false);
const capturedImage = ref<string | null>(null);
const isCompressing = ref(false);


const getFaceStatus = async () => {
    try {
        const response = await checkFaceStatus();
        isFaceRegistered.value = response.face_registration_status;
    } catch (error) {
        isFaceRegistered.value = false;
    } finally {
        loading.value = false;
    }
};

const openCamera = () => {
    showCamera.value = true;
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

const photoTaken = async (data: { image_data_url: string, blob: Blob }) => {
    showCamera.value = false;
    isCompressing.value = true;
    capturedImage.value = null;

    try {
        const compressed = await compressImage(data.image_data_url, 500);
        capturedImage.value = compressed;
    } catch (error) {
        toast.error("Gagal mengompres gambar.");
        console.error("Error saat kompresi:", error);
    } finally {
        isCompressing.value = false;
    }
};

const retakeImage = () => {
    capturedImage.value = null;
    openCamera();
};


const registerFace = async () => {
    if (!capturedImage.value) return;

    const toastId = toast.loading("Mendaftarkan wajah...");
    try {
        const response = await registerFaceApi({ image: capturedImage.value });
        if (response.status === 200) {
            toast.update(toastId, {
                render: "Wajah berhasil didaftarkan!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            isFaceRegistered.value = true;
            capturedImage.value = null;
        }
    } catch (error) {
        toast.remove(toastId);
        console.error("Error saat mendaftarkan wajah:", error);
    }
};

onMounted(() => {
    getFaceStatus();
});
</script>
