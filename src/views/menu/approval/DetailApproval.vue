<template>
    <BasePageNoNav>
        <TopHeader title="Detail Approval" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Detail Pengajuan</h1>

            <div class="bg-white p-4 space-y-2 rounded-lg shadow">
                <p><strong>Nama Pengaju:</strong> {{ approvalData.namaPengaju }}</p>
                <p><strong>Jenis Pengajuan:</strong> {{ approvalData.jenisPengajuan }}</p>
                <p><strong>Tanggal:</strong> {{ approvalData.tanggal }}</p>
                <p><strong>Jumlah:</strong> Rp{{ approvalData.jumlah.toLocaleString() }}</p>
                <p><strong>Status:</strong> <span :class="statusClass">{{ approvalData.status }}</span></p>
                <p><strong>Keterangan:</strong> {{ approvalData.keterangan }}</p>
            </div>

            <!-- Jika ada lampiran -->
            <div v-if="approvalData.lampiran" class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-md font-semibold">Lampiran</h2>
                <img :src="approvalData.lampiran" alt="Lampiran" class="w-full h-40 object-contain border rounded-lg mt-2">
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
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const approvalData = ref({
    namaPengaju: 'Budi Santoso',
    jenisPengajuan: 'Reimburse',
    tanggal: '2025-03-15',
    jumlah: 250000,
    status: 'Menunggu Persetujuan',
    keterangan: 'Pembelian alat kerja',
    lampiran: 'https://via.placeholder.com/150', // Contoh gambar lampiran
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
