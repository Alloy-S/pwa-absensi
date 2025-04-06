<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class=" text-3xl text-slate-800">Tambah Harga Harian Borongan</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">

                    <div class="p-3 bg-white rounded-md shadow-md">

                        <div class="mb-6">
                            <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe
                                Harga<span class="text-red-600">*</span></label>
                            <select id="type" v-model="tipeHarga"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled selected>Pilih salah satu</option>
                                <option value="harian">Harian</option>
                                <option value="borongan">Borongan</option>
                                <option value="supir">Supir</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label for="nama"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="nama"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <!-- Harian -->
                        <div v-if="tipeHarga === 'harian'" class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga<span
                                class="text-red-600">*</span></label>
                            <input type="number" v-model="harga"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <!-- Borongan -->
                        <div v-else-if="tipeHarga === 'borongan'" class="space-y-4 mb-6">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga
                                    Normal<span
                                    class="text-red-600">*</span></label>
                                <input type="number" v-model="hargaNormal"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga
                                    Lembur<span
                                    class="text-red-600">*</span></label>
                                <input type="number" v-model="hargaLembur"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jam Start
                                    Normal<span
                                    class="text-red-600">*</span></label>
                                <input type="time" v-model="jamStartNormal"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jam Start
                                    Lembur<span
                                    class="text-red-600">*</span></label>
                                <input type="time" v-model="jamStartLembur"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <!-- Supir -->
                        <div v-else-if="tipeHarga === 'supir'" class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga
                                Supir<span
                                class="text-red-600">*</span></label>
                            <input type="number" v-model="harga"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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

                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref } from 'vue'

const tipeHarga = ref<string>('') // untuk menyimpan pilihan select
const harga = ref<number | null>(null)
const hargaNormal = ref<number | null>(null)
const hargaLembur = ref<number | null>(null)
const jamStartNormal = ref<string>('')
const jamStartLembur = ref<string>('')


</script>