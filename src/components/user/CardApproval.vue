<template>
    <button @click="goToDetail"
        class="w-full grid-rows-2 bg-white p-4 rounded-lg shadow mb-3 border-l-4 text-left transition hover:shadow-md"
        :class="statusColor">
        <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">{{ props.approval.tipe_approval }}</h3>
            <span class="px-2 py-1 text-xs font-medium rounded-full" :class="statusBadgeColor">
                {{ props.approval.status }}
            </span>
        </div>
        <div class="flex justify-between items-center mt-2">
            <div>
                <p class="text-gray-600 text-sm">{{ formatDate(props.approval.tanggal_pengajuan) }}</p>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { ApprovalItem } from '@/models/dashboardUserModel';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{ approval: ApprovalItem }>();
const router = useRouter();

const statusColor = computed(() => {
    const status = props.approval.status.toLowerCase();
    if (status.includes('menunggu')) return 'border-yellow-500';
    if (status.includes('disetujui')) return 'border-green-500';
    if (status.includes('ditolak')) return 'border-red-500';
    return 'border-gray-400';
});

const statusBadgeColor = computed(() => {
    const status = props.approval.status.toLowerCase();
    if (status.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (status.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
});

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const goToDetail = () => {
    let path = '';
    const type = props.approval.tipe_approval.toLowerCase();

    if (type.includes('izin')) {
        path = `/menu/absensi/izin`;
    } else if (type.includes('lembur')) {
        path = `/menu/absensi/lembur`;
    } else if (type.includes('koreksi')) {
        path = `/menu/absensi/koreksi-kehadiran`;
    } else if (type.includes('reimburse')) {
        path = `/menu/reimburse`;
    } else if (type.includes('absensi borongan')) {
        path = `/menu/absensi/borongan`;
    }
    
    router.push(path);
};
</script>
