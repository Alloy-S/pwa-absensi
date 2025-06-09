<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Tambah Hari Libur</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                                Event<span class="text-red-600">*</span></label>
                            <input type="text" id="nama"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6">
                            <label for="date"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal<span
                                    class="text-red-600">*</span></label>
                            <input type="date" id="date"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6">
                            <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe
                                Libur<span class="text-red-600">*</span></label>
                            <select id="type"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled selected>Pilih salah satu</option>
                                <option value="true">Libur nasional</option>
                                <option value="false">Cuti bersama</option>
                            </select>
                        </div>
                    </div>


                    <div class="mt-5 flex justify-end">

                        <div class="w-1/3 flex">
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="button"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                        </div>
                    </div>


                </div>
                <div class="flex-[3]">

                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const goBack = () => {
    router.back();
}




</script>