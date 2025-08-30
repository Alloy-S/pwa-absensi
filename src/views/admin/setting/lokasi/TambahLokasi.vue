<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Tambah Lokasi</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="lokasi"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lokasi<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="lokasi" v-model="lokasi.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="flex space-x-2 justify-between">
                            <div class="w-1/2 mb-6">
                                <label for="latitude"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude<span
                                        class="text-red-600">*</span></label>
                                <input type="number" id="latitude" v-model="lokasi.latitude"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="w-1/2 mb-6">
                                <label for="longitude"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude<span
                                        class="text-red-600">*</span></label>
                                <input type="number" id="longitude" v-model="lokasi.longitude"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>

                        <div class="mb-6">
                            <label for="toler"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Toleransi
                                Jarak(Meter)<span class="text-red-600">*</span></label>
                            <select id="toler" v-model="lokasi.toleransi"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="0">0</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="30">50</option>
                                <option value="30">100</option>
                                <option value="30">150</option>
                            </select>
                        </div>

                    </div>
                    <div class="mt-5 flex justify-end">

                        <div class="w-1/3 flex">
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="button" @click="createLokasi" :disabled="loading"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i v-if="loading" class="fa-solid fa-spinner animate-spin mr-2"></i> Simpan</button>
                        </div>
                    </div>
                </div>
                <div class="flex-[3]">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="font-semibold">Previev Lokasi</p>
                        <div class="mt-2">
                            <iframe v-if="lokasi.latitude && lokasi.longitude"
                                :src="`https://maps.google.com/maps?q=${lokasi.latitude},${lokasi.longitude}&z=15&output=embed`"
                                width="100%" height="300" style="border:0;" allowfullscreen loading="lazy">
                            </iframe>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { initLokasi, Lokasi } from '@/models/lokasiModel';
import { addLokasi } from '@/services/lokasiService';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter();
const lokasi = ref<Lokasi>(initLokasi())
const loading = ref(false);

const goBack = () => {
    router.back();
}

const getCurrentLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung browser ini.')
        return
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            lokasi.value.latitude = position.coords.latitude
            lokasi.value.longitude = position.coords.longitude
        },
        (error) => {
            alert('Gagal mengambil lokasi: ' + error.message)
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    )
}

const createLokasi = async () => {
    loading.value = true;
    try {
        const request = {
            name: lokasi.value.name,
            latitude: lokasi.value.latitude,
            longitude: lokasi.value.longitude,
            toleransi: lokasi.value.toleransi
        }

        const response = await addLokasi(request);

        if (response.status === 201) {
            toast.success("Success Add New Lokasi")
            setTimeout(() => {
                loading.value = false;
                router.back();
            }, 1000);
        }
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    getCurrentLocation();
})



</script>