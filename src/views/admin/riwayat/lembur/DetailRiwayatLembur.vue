<template>
  <BasePage>
      <div class="space-y-6">
          <div class="flex items-center justify-between">
              <div>
                  <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Lembur</h1>
                  <p v-if="lemburDetail" class="text-sm text-gray-500">Tinjau riwayat lembur untuk {{ lemburDetail.user.fullname }}</p>
              </div>
              <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke Daftar</button>
          </div>

          <div v-if="loading" class="text-center py-20">
              <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Memuat detail...</p>
          </div>

          <div v-else-if="lemburDetail" class="space-y-4">
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(lemburDetail.status)">
                      <h3 class="text-sm text-gray-500">Status Final</h3>
                      <p class="text-xl font-bold text-slate-800">{{ lemburDetail.status }}</p>
                  </div>
                  <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                      <h3 class="text-sm text-gray-500">Karyawan</h3>
                      <p class="text-xl font-semibold text-slate-800">{{ lemburDetail.user.fullname }}</p>
                      <p class="text-sm text-slate-600">{{ lemburDetail.user.jabatan }} - {{ lemburDetail.user.lokasi }}</p>
                  </div>
              </div>

              
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-4">Rincian Lembur</h3>
                  <div class="space-y-3 text-sm">
                      <DetailItem icon="fa-solid fa-play-circle" label="Waktu Mulai" :value="formatDateTime(lemburDetail.date_start)" />
                      <DetailItem icon="fa-solid fa-stop-circle" label="Waktu Selesai" :value="formatDateTime(lemburDetail.date_end)" />
                      <DetailItem icon="fa-solid fa-clock" label="Total Durasi" :value="calculateDuration(lemburDetail.date_start, lemburDetail.date_end)" />
                  </div>
              </div>

              
              <div v-if="lemburDetail.keterangan" class="bg-white p-4 rounded-lg shadow-md">
                   <h3 class="font-semibold text-slate-800 mb-2">Catatan dari Karyawan</h3>
                   <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ lemburDetail.keterangan }}</p>
              </div>
          </div>
          
          <div v-else class="text-center py-20">
               <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Detail riwayat lembur tidak ditemukan.</p>
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
import { toast } from 'vue3-toastify';
import { Lembur } from '@/models/lemburModel';
import { fetchDetailLemburHistory } from '@/services/lemburService';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const lemburDetail = ref<Lembur | null>(null);

const getLemburDetail = async () => {
  try {
      const id = route.params.id as string;
      lemburDetail.value = await fetchDetailLemburHistory(id);
  } catch (error) {
      toast.error("Gagal memuat detail riwayat.");
  } finally {
      loading.value = false;
  }
};

const calculateDuration = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  if (isNaN(diffMs)) return 'Durasi tidak valid';
  const diffHours = Math.floor(diffMs / 3600000);
  const diffMins = Math.floor((diffMs % 3600000) / 60000);
  return `${diffHours} jam ${diffMins} menit`;
};

const formatDateTime = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('menunggu')) return 'border-yellow-500';
  if (s.includes('disetujui')) return 'border-green-500';
  if (s.includes('ditolak')) return 'border-red-500';
  return 'border-gray-500';
};

onMounted(getLemburDetail);
</script>
