<template>
    <BasePageNoNav>
        <TopHeader title="Detail Pengajuan Izin" />
        <div class="p-4 space-y-6">
            <!-- Info Pengajuan Izin -->
            <div class="bg-white p-4 rounded-md shadow space-y-2">
                <h2 class="text-md font-semibold">Informasi Izin</h2>
                <p><strong>Nama Pengaju:</strong> {{ izin.namaPengaju }}</p>
                <p><strong>Tanggal Izin:</strong> {{ izin.date }}</p>
                <p><strong>Jenis Izin:</strong> {{ izin.type }}</p>
                <p><strong>Durasi:</strong> {{ izin.duration }}</p>
                <p><strong>Alasan:</strong> {{ izin.reason }}</p>
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
const izin = ref({
    id: route.params.id,
    date: '2025-04-15',
    namaPengaju: 'Andi Prasetyo',
    type: 'Izin Sakit',
    duration: '1 Hari',
    reason: 'Demam dan tidak bisa bekerja',
});

const approvalNote = ref('');

const approve = () => {
    alert(`Izin disetujui.\nCatatan: ${approvalNote.value}`);
};

const reject = () => {
    if (!approvalNote.value.trim()) {
        alert('Mohon isi alasan penolakan terlebih dahulu!');
        return;
    }
    alert(`Izin ditolak dengan catatan: ${approvalNote.value}`);
};
</script>