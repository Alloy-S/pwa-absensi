<template>
    <BasePage>
        <div class="w-3/4">
            <div class="mb-4 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Mulai</label>
                    <input type="date" v-model="startDate" class="input input-bordered w-full md:w-48" />
                </div>
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Selesai</label>
                    <input type="date" v-model="endDate" class="input input-bordered w-full md:w-48" />
                </div>
                <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium mb-1">Cari Nama / NIP</label>
                    <input type="text" v-model="search" placeholder="Cari nama atau NIP"
                        class="input input-bordered w-full" />
                </div>
                <button type="submit"
                    class="flex items-center gap-2 p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="">Proses</span>
                </button>
            </div>

            <div class="relative overflow-x-auto bg-white shadow-md sm:rounded-lg">
                <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        class="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center text-nowrap">
                        <tr>
                            <th class="px-4 py-2 border" rowspan="2">NIP</th>
                            <th class="px-4 py-2 border" rowspan="2">Nama</th>
                            <th class="px-4 py-2 border" rowspan="2">Jabatan</th>
                            <th class="px-4 py-2 border" rowspan="2">Lokasi</th>
                            <th class="px-4 py-2 border" rowspan="2">Izin/Libur</th>
                            <th class="px-4 py-2 border" colspan="2">Kehadiran</th>

                            <th class="px-4 py-2 border" colspan="2">Terlambat</th>

                            <th class="px-4 py-2 border" colspan="2">Pulang Awal</th>

                            <th class="px-4 py-2 border" colspan="2">Lembur</th>
                            <th class="px-4 py-2 border" rowspan="2">Tidak Hadir</th>
                            <th class="px-4 py-2 border" colspan="4">Izin</th>
                        </tr>
                        <tr>
                            <th class="px-4 py-2 border">Kehadiran</th>
                            <th class="px-4 py-2 border">Total Jam Kehadiran</th>
                            <th class="px-4 py-2 border">Datang Terlambat</th>
                            <th class="px-4 py-2 border">Jam Terlambat</th>
                            <th class="px-4 py-2 border">Pulang Awal</th>
                            <th class="px-4 py-2 border">Jam Pulang Awal</th>
                            <th class="px-4 py-2 border">Jam</th>
                            <th class="px-4 py-2 border">Menit</th>
                            <th class="px-4 py-2 border">Izin A</th>
                            <th class="px-4 py-2 border">Izin B</th>
                            <th class="px-4 py-2 border">Izin C</th>
                            <th class="px-4 py-2 border">Izin D</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in laporanData" :key="item.nip" class="hover:bg-gray-50">
                            <td class="px-4 py-2 border">{{ item.nip }}</td>
                            <td class="px-4 py-2 border">{{ item.nama }}</td>
                            <td class="px-4 py-2 border">{{ item.jabatan }}</td>
                            <td class="px-4 py-2 border">{{ item.lokasi }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_izin_libur }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_kehadiran }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_jam_kehadiran }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_terlambat }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jam_terlambat }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_pulang_awal }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jam_pulang_awal }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_lembur }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jml_tidak_hadir }}</td>
                            <td class="px-4 py-2 border">
                                {{ item.tidak_hadir }}
                            </td>
                            <td class="px-4 py-2 border">
                                {{ item.tidak_hadir }}
                            </td>
                            <td class="px-4 py-2 border">
                                {{ item.tidak_hadir }}
                            </td>
                            <td class="px-4 py-2 border">
                                {{ item.tidak_hadir }}
                            </td>
                            <td class="px-4 py-2 border">
                                {{ item.tidak_hadir }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mb-16 flex justify-end mt-4">


                <nav aria-label="Page navigation example">
                    <ul class="inline-flex -space-x-px text-sm">
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page"
                                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref } from 'vue'

const search = ref('')
const startDate = ref('')
const endDate = ref('')

const laporanData = ref([
    {
        nip: '12345678',
        nama: 'Ahmad Santoso',
        jabatan: 'Staff Gudang',
        lokasi: 'Kandang A',
        jml_izin_libur: 2,
        jml_kehadiran: 20,
        total_jam_kehadiran: '160 jam',
        jml_terlambat: 3,
        jam_terlambat: '45 menit',
        jml_pulang_awal: 1,
        jam_pulang_awal: '20 menit',
        jml_lembur: '5 jam',
        jml_tidak_hadir: 1,
        tidak_hadir: 4,
    },
    {
        nip: '12345678',
        nama: 'Ahmad Santoso',
        jabatan: 'Staff Gudang',
        lokasi: 'Kandang A',
        jml_izin_libur: 2,
        jml_kehadiran: 20,
        total_jam_kehadiran: '160 jam',
        jml_terlambat: 3,
        jam_terlambat: '45 menit',
        jml_pulang_awal: 1,
        jam_pulang_awal: '20 menit',
        jml_lembur: '5 jam',
        jml_tidak_hadir: 1,
        tidak_hadir: 4,
    },
    // Data dummy lain jika perlu
])
</script>

<style scoped>
.input {
    @apply border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
