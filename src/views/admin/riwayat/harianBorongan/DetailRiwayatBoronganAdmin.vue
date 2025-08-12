<template>
    <BasePage>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Absensi Borongan</h1>
                    <p v-if="absensiDetail" class="text-sm text-gray-500">Tinjau riwayat absensi borongan yang dibuat
                        oleh {{ absensiDetail.user.fullname }}</p>
                </div>
                <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke
                    Daftar</button>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="absensiDetail" class="space-y-4">

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-l-4"
                        :class="statusColor(absensiDetail.status)">
                        <h3 class="text-sm text-gray-500">Status Final</h3>
                        <p class="text-xl font-bold text-slate-800">{{ absensiDetail.status }}</p>
                    </div>
                    <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-sm text-gray-500">Dibuat oleh (PIC)</h3>
                        <p class="text-xl font-semibold text-slate-800">{{ absensiDetail.user.fullname }}</p>
                        <p class="text-sm text-slate-600">{{ absensiDetail.user.jabatan }} - {{
                            absensiDetail.user.lokasi }}</p>
                    </div>
                </div>


                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Rincian Absensi</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Absensi"
                            :value="formatDate(absensiDetail.date)" />
                        <DetailItem icon="fa-solid fa-money-bill-wave" label="Total Biaya"
                            :value="formatCurrency(absensiDetail.total)" />
                    </div>
                </div>


                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Detail Pekerjaan Karyawan</h3>
                    <DataTable :value="absensiDetail.detail_absensi_borongan" responsiveLayout="scroll">
                        <Column field="user_name" header="Nama Karyawan"></Column>
                        <Column field="tipe" header="Tipe"></Column>
                        <Column field="harga.nama" header="Jenis Pekerjaan">
                            <template #body="slotProps">
                                {{ slotProps.data.harga.nama }}
                            </template>
                        </Column>
                        <!-- <Column field="ton_normal" header="Tonase" bodyClass="text-center"></Column> -->
                        <Column field="total" header="Subtotal" headerClass="text-right" bodyClass="text-right">
                            <template #body="slotProps">
                                <span class="font-semibold">{{ formatCurrency(slotProps.data.total) }}</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <div v-else class="text-center py-20">
                <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail riwayat absensi borongan tidak ditemukan.</p>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DetailItem from '@/components/user/DetailItem.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { fetchDetailAbsensiBoronganHistory } from '@/services/absensiBoronganService';
import { AbsensiBorongan } from '@/models/absensiBoronganModel';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const absensiDetail = ref<AbsensiBorongan | null>(null);

const getAbsensiDetail = async () => {
    try {
        const id = route.params.id as string;
        absensiDetail.value = await fetchDetailAbsensiBoronganHistory(id);
    } catch (error) {
        console.error("Gagal memuat detail riwayat.");
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);
const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

onMounted(getAbsensiDetail);
</script>
