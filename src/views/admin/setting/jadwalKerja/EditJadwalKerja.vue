<template>
  <BasePage>
    <div class="space-y-3">
      <div class="mb-10 mt-5 flex justify-between items-start">
        <p class="text-3xl font-semibold text-slate-800">Edit Jadwal Kerja</p>
      </div>

      <div class="flex space-x-3">
        <div class="flex-[7] space-y-3">
          <form @submit.prevent="submitEditJadwalKerja">
            <div class="p-3 bg-white rounded-md shadow-md">
              <div class="mb-6">
                <label for="kode" class="block mb-2 text-sm font-medium text-gray-900">Nama
                  Kode<span class="text-red-600">*</span></label>
                <input type="text" id="kode" v-model="jadwalKerja.kode" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              </div>
              <div class="mb-6">
                <label for="shift" class="block mb-2 text-sm font-medium text-gray-900">Nama
                  Shift<span class="text-red-600">*</span></label>
                <input type="text" id="shift" v-model="jadwalKerja.shift" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              </div>
            </div>
            <div class="p-3 bg-white rounded-md shadow-md">
              <div class="space-y-4 mb-6">
                <p class="mb-2 text-sm font-medium text-gray-900">Hari dan Jam Kerja <span class="text-red-600">*</span>
                </p>
                <div v-if="Object.keys(dailyTimes).length > 0" v-for="day in days" :key="day.value"
                  class="p-3 border rounded-lg">
                  <label class="flex items-center space-x-3 font-medium">
                    <input type="checkbox" v-model="dailyTimes[day.value].active"
                      class="text-blue-600 h-5 w-5 rounded" />
                    <span>{{ day.label }}</span>
                  </label>
                  <div v-if="dailyTimes[day.value].active" class="mt-3 flex space-x-2 pl-8">
                    <div class="w-1/2">
                      <label class="block text-xs font-medium text-gray-600">Jam Masuk</label>
                      <input type="time" v-model="dailyTimes[day.value].in"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div class="w-1/2">
                      <label class="block text-xs font-medium text-gray-600">Jam Pulang</label>
                      <input type="time" v-model="dailyTimes[day.value].out"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              
              <div class="grid grid-cols-2 gap-6">
                <div class="mb-6">
                  <label for="toler-in" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Masuk
                    (menit)</label>
                  <select id="toler-in" v-model="toleranceIn"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                  </select>
                </div>
                <div class="mb-6">
                  <label for="toler-out" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Pulang
                    (menit)</label>
                  <select id="toler-out" v-model="toleranceOut"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mt-5 flex justify-end">
              <div class="w-1/3 flex space-x-2">
                <button type="button" @click="goBack"
                  class="w-full text-red-500 border border-red-600 hover:bg-red-500 hover:text-white rounded-lg px-5 py-2.5">
                  Batal
                </button>
                <button type="submit" class="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="flex-[3]"></div>
      </div>
    </div>
    <div class="mb-20"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter, useRoute } from 'vue-router'
import { initJadwalKerja, JadwalKerja, DetailJadwalKerja } from '@/models/jadwalModel';
import { fetchjadwalById, updatejadwal } from '@/services/jadwalKerjaService';
import { toast } from 'vue3-toastify';

const router = useRouter();
const route = useRoute();

const days = [
  { label: 'Senin', value: 'SENIN' },
  { label: 'Selasa', value: 'SELASA' },
  { label: 'Rabu', value: 'RABU' },
  { label: 'Kamis', value: 'KAMIS' },
  { label: 'Jumat', value: 'JUMAT' },
  { label: 'Sabtu', value: 'SABTU' },
  { label: 'Minggu', value: 'MINGGU' },
];

const jadwalKerja = ref<JadwalKerja>(initJadwalKerja());

const dailyTimes = ref<Record<string, { in: string; out: string; active: boolean }>>({});

const toleranceOptions = [0, 5, 10, 15, 30, 60];
const toleranceIn = ref<number>(0);
const toleranceOut = ref<number>(0);


const initializeDailyTimes = () => {
  const newTimes: Record<string, { in: string; out: string; active: boolean }> = {};
  days.forEach(day => {
    newTimes[day.value] = { in: '08:00', out: '17:00', active: false };
  });
  dailyTimes.value = newTimes;
};

const formatTime = (timeStr: string) => {
  if (!timeStr || typeof timeStr !== 'string') return '';
  return timeStr.substring(0, 5);
};

const getjadwalById = async () => {

  const response = await fetchjadwalById(route.params.id as string);
  jadwalKerja.value = { ...response, detail_jadwal_kerja: [] }; 

  if (response.detail_jadwal_kerja && response.detail_jadwal_kerja.length > 0) {
    response.detail_jadwal_kerja.forEach(detail => {
      const dayKey = detail.hari.toUpperCase();
      if (dailyTimes.value[dayKey]) {
        dailyTimes.value[dayKey] = {
          in: formatTime(detail.time_in),
          out: formatTime(detail.time_out),
          active: detail.is_active
        };
      }
    });


    const firstDetail = response.detail_jadwal_kerja[0];
    toleranceIn.value = firstDetail.toler_in;
    toleranceOut.value = firstDetail.toler_out;
  }

};

const goBack = () => router.back();

const submitEditJadwalKerja = async () => {
  const detailPayload: DetailJadwalKerja[] = [];
  let hasActiveDay = false;

  for (const day of days) {
    const dayData = dailyTimes.value[day.value];

    if (dayData.active) {
      hasActiveDay = true;
      if (!dayData.in || !dayData.out) {
        toast.error(`Harap isi jam masuk dan pulang untuk hari ${day.label}`);
        return;
      }
    }

    detailPayload.push({
      id: '', 
      hari: day.value,
      time_in: dayData.in || '00:00',
      time_out: dayData.out || '00:00',
      toler_in: toleranceIn.value,
      toler_out: toleranceOut.value,
      is_active: dayData.active
    });
  }

  if (!hasActiveDay) {
    toast.error('Silakan pilih dan aktifkan setidaknya satu hari kerja.');
    return;
  }

  // Buat payload akhir
  const finalPayload: JadwalKerja = {
    ...jadwalKerja.value,
    detail_jadwal_kerja: detailPayload
  };

  try {
    const response = await updatejadwal(route.params.id as string, finalPayload);
    if (response.status === 200) {
      toast.success("Sukses Edit Jadwal Kerja");
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  } catch (error: any) {
    console.error(error);
  }
};

onMounted(() => {
  initializeDailyTimes(); 
  getjadwalById(); 
});
</script>
