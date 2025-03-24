<template>
    <BasePageNoNav>
        <TopHeader title="Detail Approval Absensi Borongan" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Detail Pengajuan Absensi Borongan</h1>

            <div class="bg-white p-4 space-y-2 rounded-lg shadow">
                <p><strong>Nama Pengaju:</strong> {{ approvalData.namaPengaju }}</p>
                <p><strong>Tanggal:</strong> {{ approvalData.tanggal }}</p>
                <p><strong>Status:</strong> <span :class="statusClass">{{ approvalData.status }}</span></p>
                <p><strong>Keterangan:</strong> {{ approvalData.keterangan }}</p>
            </div>

            <!-- Daftar Absensi -->
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-md font-semibold">Detail Absensi</h2>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border p-2">Karyawan</th>
                                <th class="border p-2">Barang</th>
                                <th class="border p-2">Ton Normal</th>
                                <th class="border p-2">Ton Lembur</th>
                                <th class="border p-2">Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in approvalData.absensi" :key="index">
                                <td class="border p-2">{{ entry.worker.name }}</td>
                                <td class="border p-2">{{ entry.item.name }}</td>
                                <td class="border p-2">{{ entry.tonNormal }}</td>
                                <td class="border p-2">{{ entry.tonLembur }}</td>
                                <td class="border p-2 font-semibold text-blue-500">Rp{{ (entry.hargaSatuan * (entry.tonNormal + entry.tonLembur)).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Input Catatan Approval -->
            <textarea v-model="approvalNote" class="w-full border-slate-300 p-2 rounded-md" placeholder="Tambahkan catatan..."></textarea>

            <!-- Tombol Action -->
            <div class="flex space-x-4">
                <button @click="approve" class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700">Setujui</button>
                <button @click="reject" class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700">Tolak</button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';

const approvalData = ref({
    namaPengaju: 'Budi Santoso',
    tanggal: '2025-03-15',
    status: 'Menunggu Persetujuan',
    keterangan: 'Absensi borongan untuk proyek A',
    absensi: [
        { worker: { name: 'Doni' }, item: { name: 'Ayam Hidup' }, tonNormal: 10, tonLembur: 2, hargaSatuan: 50000 },
        { worker: { name: 'Ani' }, item: { name: 'Telur' }, tonNormal: 8, tonLembur: 1, hargaSatuan: 30000 }
    ]
});

const approvalNote = ref('');

const approve = () => {
    console.log('Disetujui:', approvalNote.value);
    approvalData.value.status = 'Disetujui';
};

const reject = () => {
    console.log('Ditolak:', approvalNote.value);
    approvalData.value.status = 'Ditolak';
};
</script>
