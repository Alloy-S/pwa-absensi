<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class=" text-3xl text-slate-800">Tambah Lokasi</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="lokasi"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lokasi<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="lokasi"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="flex space-x-2 justify-between">
                            <div class="w-1/2 mb-6">
                                <label for="latitude"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude<span
                                        class="text-red-600">*</span></label>
                                <input type="number" id="latitude" v-model="latitude"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="w-1/2 mb-6">
                                <label for="longitude"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude<span
                                        class="text-red-600">*</span></label>
                                <input type="number" id="longitude" v-model="longitude"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>

                        <div class="mb-6">
                            <label for="toler"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Toleransi
                                Jarak(Meter)<span class="text-red-600">*</span></label>
                            <select id="toler"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="0">0</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                            </select>
                        </div>

                    </div>
                    <div class="mt-5 flex justify-end">

                        <div class="w-1/3 flex">
                            <button type="button"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="button"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                        </div>
                    </div>
                </div>
                <div class="flex-[3]">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="font-semibold">Previev Lokasi</p>
                        <div class="mt-2">
                            <iframe v-if="latitude && longitude"
                                :src="`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`"
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
import { ref, onMounted } from 'vue'

const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)

const getCurrentLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung browser ini.')
        return
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            latitude.value = position.coords.latitude
            longitude.value = position.coords.longitude
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

onMounted(() => {
    getCurrentLocation();
})



</script>