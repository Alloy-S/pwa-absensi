<template>
    <BasePageNoNav>
        <TopHeader title="Daftar Pengajuan" :show-back-button="true" />
        <div class="p-4 space-y-4">
            <h1 class="text-xl font-bold text-slate-800">Daftar Pengajuan untuk Disetujui</h1>

            
            <div class="bg-white p-4 rounded-lg shadow-md space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Filter Kategori:</label>
                    <select v-model="selectedCategory" class="w-full border-slate-300 p-2 rounded-md">
                        <option value="all">Semua Kategori</option>
                        <option value="Koreksi Kehadiran">Koreksi Kehadiran</option>
                        <option value="Izin">Izin</option>
                        <option value="Lembur">Lembur</option>
                        <option value="Reimburse">Reimburse</option>
                        <option value="Absensi Borongan">Absensi Borongan</option>
                    </select>
                </div>
            </div>

            
            <div class="mt-3">
                <DataView :value="approvalList" :layout="'list'" :paginator="true" :rows="lazyParams.rows"
                    :totalRecords="totalRecords" :lazy="true" @page="onPage" :loading="loading">
                    <template #list="slotProps">
                        <div class="grid grid-cols-1 gap-3">
                            <div v-for="item in slotProps.items" :key="item.approval_id">
                                <button @click="goToDetail(item)"
                                    class="w-full flex justify-between items-center text-left bg-white p-4 rounded-lg shadow mb-3 border-l-4 transition hover:shadow-md"
                                    :class="statusBorderClass(item.status)">
                                    <div class="flex flex-col justify-center text-sm text-slate-800">
                                        <p class="text-lg font-semibold">{{ item.tipe_approval }}</p>
                                        <p class="font-medium">{{ item.user }}</p>
                                        <p class="text-xs text-slate-500">{{ formatDate(item.tanggal_pengajuan) }}</p>
                                    </div>
                                    <div class="flex flex-col items-end space-y-2">
                                         <span class="px-2 py-1 text-xs font-medium rounded-full" :class="statusBadgeClass(item.status)">
                                            {{ item.status }}
                                        </span>
                                        <i class="fa-solid fa-angle-right text-slate-500"></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center text-gray-500 py-5">
                            Tidak ada data pengajuan.
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DataView from 'primevue/dataview';
import { toast } from 'vue3-toastify';
import { AllApprovalParams, ApprovalPICItem } from '@/models/userModel';
import { fetchAllApprovalWaitingStatus } from '@/services/userService';


const router = useRouter();

const approvalList = ref<ApprovalPICItem[]>([]);
const loading = ref(true);
const totalRecords = ref(0);

const selectedCategory = ref('all');

const lazyParams = ref({
    page: 1,
    rows: 10,
});

const getApprovals = async () => {
    loading.value = true;
    try {
        const params: AllApprovalParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            "filter-tipe-approval": selectedCategory.value,
        };
        const response = await fetchAllApprovalWaitingStatus(params);
        approvalList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat daftar pengajuan.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    getApprovals();
};

watch(selectedCategory, () => {
    lazyParams.value.page = 1;
    getApprovals();
});

const statusBorderClass = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-400';
};

const statusBadgeClass = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('disetujui')) return 'bg-green-100 text-green-800';
    if (s.includes('ditolak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const goToDetail = (request: ApprovalPICItem) => {
    const type = request.tipe_approval.toLowerCase();
    const id = request.approval_id;

    if (type.includes('borongan')) {
        router.push(`/menu/approval/absensi-borongan/${id}`);
    } else if (type.includes('reimburse')) {
        router.push(`/menu/approval/reimburse/${id}`);
    } else if (type.includes('koreksi')) {
        router.push(`/menu/approval/koreksi/${id}`);
    } else if (type.includes('izin')) {
        router.push(`/menu/approval/izin/${id}`);
    } else if (type.includes('lembur')) {
        router.push(`/menu/approval/lembur/${id}`);
    }
};

onMounted(getApprovals);
</script>

<style scoped>

:deep(.p-paginator) {
    @apply bg-transparent mt-4 justify-center;
}

:deep(.p-dataview-content) {
    @apply bg-transparent;
}
</style>