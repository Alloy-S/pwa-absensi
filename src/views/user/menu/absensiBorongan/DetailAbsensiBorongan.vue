<template>
    <BasePageNoNav>
        <TopHeader title="Detail Absensi Borongan" />
        <div class="p-4 space-y-6">
            <div class="bg-white shadow-md rounded-lg p-6">
                <h1 class="text-xl font-semibold text-gray-800">Detail Absensi Borongan</h1>
                <p class="text-gray-600 mt-1"><strong>Tanggal:</strong> {{ absence.date }}</p>
                <p class="text-gray-600"><strong>Dibuat oleh:</strong> {{ absence.createdBy }}</p>
            </div>

            <!-- Tabel Karyawan -->
            <div class="overflow-x-auto bg-white shadow-md rounded-lg">
                <table class="w-full border-collapse">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="border p-3 text-left">Nama</th>
                            <th class="border p-3 text-left">Tipe</th>
                            <th class="border px-4 py-2">Jenis Borongan</th>
                            <th class="border p-3 text-right">Ton Normal</th>
                            <th class="border p-3 text-right">Ton Lembur</th>
                            <th class="border p-3 text-right">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="worker in absence.workers" :key="worker.name" class="hover:bg-gray-50">
                            <td class="border p-3">{{ worker.name }}</td>
                            <td class="border p-3 capitalize">{{ worker.type }}</td>
                            <td class="border p-3 text-right">{{ worker.type === 'borongan' ? worker.jobType : '-' }}</td>
                            <td class="border p-3 text-right">{{ worker.type === 'borongan' ? worker.tonNormal : '-' }}</td>
                            <td class="border p-3 text-right">{{ worker.type === 'borongan' ? worker.tonLembur : '-' }}</td>
                            <td class="border p-3 text-right font-semibold text-blue-600">Rp{{ worker.totalPrice.toLocaleString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { ref } from 'vue';

const absence = ref({
    id: 1,
    date: '2025-03-12',
    createdBy: 'Admin',
    workers: [
        { name: 'Budi', type: 'borongan', jobType: 'Angkut Pakan', tonNormal: 5, tonLembur: 2, totalPrice: 350000 },
        { name: 'Ani', type: 'harian', jobType: '-', tonNormal: 0, tonLembur: 0, totalPrice: 100000 },
        { name: 'Doni', type: 'borongan', jobType: 'Panen Telur', tonNormal: 6, tonLembur: 3, totalPrice: 450000 },
    ],
});
</script>
