<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class=" text-3xl text-slate-800">Tambah Jadwal Kerja</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="fullname"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Shift<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="fullname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6 flex space-x-2">
                            <div class="w-1/2">
                                <label for="time"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jam
                                    Masuk<span class="text-red-600">*</span></label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="time" id="time"
                                        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        min="09:00" max="18:00" value="00:00" required />
                                </div>
                            </div>
                            <div class="w-1/2">
                                <label for="time"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jam
                                    Pulang<span class="text-red-600">*</span></label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd"
                                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="time" id="time"
                                        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        min="09:00" max="18:00" value="00:00" required />
                                </div>
                            </div>
                        </div>

                        <div class="mb-6">
                            <label for="toler-in"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Toleransi
                                Masuk(menit)<span class="text-red-600">*</span></label>
                            <select id="toler-in"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="60">60</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label for="toler-out"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Toleransi
                                Pulang(menit)<span class="text-red-600">*</span></label>
                            <select id="toler-out"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="60">60</option>
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

                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'





</script>