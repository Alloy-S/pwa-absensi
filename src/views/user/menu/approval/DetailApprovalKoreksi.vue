<template>
    <BasePageNoNav>
        <TopHeader title="Approval Koreksi Kehadiran" />
        <div class="p-4 space-y-6">
            <!-- Informasi Koreksi -->
            <div class="bg-white shadow rounded-md p-4 space-y-2">
                <h1 class="text-lg font-semibold">Detail Koreksi Kehadiran</h1>
                <p><strong>Nama Pengaju:</strong> {{ koreksi.namaPengaju }}</p>
                <p><strong>Tanggal:</strong> {{ koreksi.date }}</p>
                <p><strong>Jenis Koreksi:</strong> {{ koreksi.type }}</p>
                <p><strong>Jam Sebelumnya:</strong> {{ koreksi.oldTime }}</p>
                <p><strong>Jam Koreksi:</strong> {{ koreksi.correctedTime }}</p>
                <p><strong>Catatan:</strong> {{ koreksi.note }}</p>
                <p><strong>Status Saat Ini:</strong> {{ koreksi.status }}</p>
            </div>

            <!-- Tindakan Approval -->
            <textarea v-model="approvalNote" class="w-full border-slate-300 p-2 rounded-md"
                placeholder="Tambahkan catatan..."></textarea>

            <!-- Approval Actions -->
            <div class="flex space-x-4">
                <button @click="approve"
                    class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700">Setujui</button>
                <button @click="reject"
                    class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700">Tolak</button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';

const route = useRoute();

const koreksi = ref({
    id: route.params.id,
    date: '2025-04-10',
    namaPengaju: 'Andi Prasetyo',
    type: 'Datang Terlambat',
    oldTime: '08:45',
    correctedTime: '07:55',
    note: 'Datang lebih pagi, fingerprint gagal terbaca.',
    image: 'https://via.placeholder.com/400x300?text=Bukti+Koreksi', // opsional
    status: 'Pending',
});

const approvalNote = ref('');

const approve = () => {
    // contoh logika
    alert(`Disetujui dengan catatan: ${approvalNote.value}`);
    // bisa tambahkan request ke API
};

const reject = () => {
    if (!approvalNote.value.trim()) {
        alert('Mohon isi alasan penolakan terlebih dahulu!');
        return;
    }
    alert(`Ditolak dengan catatan: ${approvalNote.value}`);
    // bisa tambahkan request ke API
};
</script>