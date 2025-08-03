<template>
  <BasePage>
      <div class="space-y-6">
          <div class="flex items-center justify-between">
              <div>
                  <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Reimburse</h1>
                  <p v-if="reimburseDetail" class="text-sm text-gray-500">Tinjau riwayat reimburse</p>
              </div>
              <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke Daftar</button>
          </div>

          <div v-if="loading" class="text-center py-20">
              <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Memuat detail...</p>
          </div>

          <div v-else-if="reimburseDetail" class="space-y-4">
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(reimburseDetail.status)">
                      <h3 class="text-sm text-gray-500">Status Final</h3>
                      <p class="text-xl font-bold text-slate-800">{{ reimburseDetail.status }}</p>
                  </div>
                  <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                      <h3 class="text-sm text-gray-500">Karyawan</h3>
                      <p class="text-xl font-semibold text-slate-800">{{ reimburseDetail.user.fullname }}</p>
                      <p class="text-sm text-slate-600">{{ reimburseDetail.user.jabatan }} - {{ reimburseDetail.user.lokasi }}</p>
                  </div>
              </div>

              
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-4">Rincian</h3>
                  <div class="space-y-3 text-sm">
                      <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Pengajuan" :value="formatDateTime(reimburseDetail.date)" />
                      <DetailItem icon="fa-solid fa-money-bill-wave" label="Total Nominal" :value="formatCurrency(reimburseDetail.total)" />
                  </div>
              </div>

              
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-3">Detail Barang</h3>
                  <DataTable :value="reimburseDetail.detail_reimburse" responsiveLayout="scroll">
                      <Column field="nama" header="Nama Barang"></Column>
                      <Column field="jumlah" header="Jumlah" headerClass="text-center" bodyClass="text-center"></Column>
                      <Column field="harga" header="Harga Satuan" headerClass="text-right" bodyClass="text-right">
                          <template #body="slotProps">
                              {{ formatCurrency(slotProps.data.harga) }}
                          </template>
                      </Column>
                      <Column header="Subtotal" headerClass="text-right" bodyClass="text-right">
                          <template #body="slotProps">
                              <span class="font-semibold">{{ formatCurrency(slotProps.data.harga * Number(slotProps.data.jumlah)) }}</span>
                          </template>
                      </Column>
                  </DataTable>
              </div>

               
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-3">Bukti Foto</h3>
                  <img v-if="reimburseDetail.photo" :src="reimburseDetail.photo.image" alt="Bukti Reimburse" class="w-full max-w-md mx-auto rounded-lg shadow" />
                  <p v-else class="text-sm text-gray-500">Tidak ada bukti foto yang dilampirkan.</p>
              </div>
          </div>
          
          <div v-else class="text-center py-20">
               <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Detail riwayat reimburse tidak ditemukan.</p>
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
import { Reimburse } from '@/models/reimburseModel';
import { fetchDetailReimburseHistory } from '@/services/reimburseService';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const reimburseDetail = ref<Reimburse | null>(null);

const getReimburseDetail = async () => {
  try {
      const id = route.params.id as string;
      reimburseDetail.value = await fetchDetailReimburseHistory(id);
  } catch (error) {
      console.error("Gagal memuat detail riwayat.");
  } finally {
      loading.value = false;
  }
};

const formatDateTime = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'});
const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);
const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('menunggu')) return 'border-yellow-500';
  if (s.includes('disetujui')) return 'border-green-500';
  if (s.includes('ditolak')) return 'border-red-500';
  return 'border-gray-500';
};

onMounted(getReimburseDetail);
</script>
