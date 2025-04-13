<template>
    <BasePageNoNav>
        <TopHeader title="Detail Pengajuan Lembur" />
        <div class="p-4 space-y-6">
            <!-- Info Lembur -->
            <div class="bg-white p-4 rounded-md shadow space-y-2">
                <h2 class="text-md font-semibold">Informasi Lembur</h2>
                <p><strong>Nama Pengaju:</strong> {{ lembur.namaPengaju }}</p>
                <p><strong>Tanggal:</strong> {{ lembur.date }}</p>
                <p><strong>Jam Mulai:</strong> {{ lembur.startTime }}</p>
                <p><strong>Jam Selesai:</strong> {{ lembur.endTime }}</p>
                <p><strong>Durasi:</strong> {{ lembur.duration }}</p>
                <p><strong>Alasan:</strong> {{ lembur.reason }}</p>
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
const lembur = ref({
    id: route.params.id,
    date: '2025-04-10',
    namaPengaju: 'Andi Prasetyo',
    startTime: '18:00',
    endTime: '21:00',
    duration: '3 Jam',
    reason: 'Penyelesaian laporan akhir bulan',
});

const approvalNote = ref('');

const approve = () => {
    alert(`Lembur disetujui.\nCatatan: ${approvalNote.value}`);
};

const reject = () => {
    if (!approvalNote.value.trim()) {
        alert('Mohon isi alasan penolakan terlebih dahulu!');
        return;
    }
    alert(`Lembur ditolak dengan catatan: ${approvalNote.value}`);
};
</script>