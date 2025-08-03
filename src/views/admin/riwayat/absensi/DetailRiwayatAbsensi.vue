<template>
  <BasePage>
      <div class="space-y-6">
          <div class="flex items-center justify-between">
              <div>
                  <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Absensi</h1>
                  <p v-if="absensiDetail" class="text-sm text-gray-500">Tinjau riwayat absensi untuk {{ absensiDetail.user.fullname }}</p>
              </div>
              <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke Daftar</button>
          </div>

          <div v-if="loading" class="text-center py-20">
              <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Memuat detail...</p>
          </div>

          <div v-else-if="absensiDetail" class="space-y-4">
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(absensiDetail.status)">
                      <h3 class="text-sm text-gray-500">Status Final</h3>
                      <p class="text-xl font-bold text-slate-800">{{ absensiDetail.status }}</p>
                  </div>
                  <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                      <h3 class="text-sm text-gray-500">Karyawan</h3>
                      <p class="text-xl font-semibold text-slate-800">{{ absensiDetail.user.fullname }}</p>
                      <p class="text-sm text-slate-600">{{ absensiDetail.user.jabatan }} - {{ absensiDetail.user.lokasi }}</p>
                  </div>
              </div>

              
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-4">Rincian Absensi</h3>
                  <div class="space-y-3 text-sm">
                      <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Absensi" :value="formatDate(absensiDetail.date)" />
                      <DetailItem icon="fa-solid fa-map-marker-alt" label="Lokasi" :value="absensiDetail.lokasi" />
                      <DetailItem icon="fa-solid fa-camera" label="Metode" :value="absensiDetail.metode" />
                  </div>
              </div>

              
              <div class="bg-white p-4 rounded-lg shadow-md">
                  <h3 class="font-semibold text-slate-800 mb-4">Linimasa Kehadiran</h3>
                  <div class="relative border-l-2 border-gray-200 ml-3">
                      
                      <div v-if="jamMasuk" class="mb-6 ml-6">
                          <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                              <i class="fa-solid fa-arrow-right-to-bracket text-blue-600"></i>
                          </span>
                          <h4 class="font-semibold text-gray-900">Jam Masuk</h4>
                          <p class="text-xl font-mono text-gray-800">{{ formatTime(jamMasuk.date) }}</p>
                          <p class="text-sm text-gray-500">Status: <span class="font-medium">{{ jamMasuk.status_absensi }}</span></p>
                      </div>
                      
                      <div v-if="jamPulang" class="ml-6">
                          <span class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white">
                              <i class="fa-solid fa-arrow-right-from-bracket text-red-600"></i>
                          </span>
                          <h4 class="font-semibold text-gray-900">Jam Pulang</h4>
                          <p class="text-xl font-mono text-gray-800">{{ formatTime(jamPulang.date) }}</p>
                           <p class="text-sm text-gray-500">Status: <span class="font-medium">{{ jamPulang.status_absensi }}</span></p>
                      </div>
                  </div>
              </div>
          </div>
          
          <div v-else class="text-center py-20">
               <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
              <p class="mt-3 text-gray-500">Detail riwayat absensi tidak ditemukan.</p>
          </div>
      </div>
      <div class="mb-20"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DetailItem from '@/components/user/DetailItem.vue';
import { Absensi, DetailAbsensi } from '@/models/absensiModel';
import { fetchDetailAbsensiHistory } from '@/services/absensiService';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const absensiDetail = ref<Absensi | null>(null);

const getAbsensiDetail = async () => {
  try {
      const id = route.params.id as string;
      absensiDetail.value = await fetchDetailAbsensiHistory(id);
  } catch (error) {
      console.error("Gagal memuat detail riwayat.");
  } finally {
      loading.value = false;
  }
};

const jamMasuk = computed<DetailAbsensi | undefined>(() => {
  return absensiDetail.value?.detail_absensi.find(d => d.type === 'IN');
});
const jamPulang = computed<DetailAbsensi | undefined>(() => {
  return absensiDetail.value?.detail_absensi.find(d => d.type === 'OUT');
});

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatTime = (dateTimeString?: string) => dateTimeString ? new Date(dateTimeString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--';
const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('terlambat') || s.includes('cepat')) return 'border-yellow-500';
  if (s.includes('hadir')) return 'border-green-500';
  if (s.includes('alpha')) return 'border-red-500';
  return 'border-gray-500';
};

onMounted(getAbsensiDetail);
</script>
