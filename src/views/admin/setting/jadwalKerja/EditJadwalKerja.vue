<template>
  <BasePage>
    <ConfirmDialog></ConfirmDialog>
    <div class="space-y-3">
      <div class="mb-10 mt-5 flex justify-between items-start">
        <p class="text-3xl font-semibold text-slate-800">Edit Jadwal Kerja</p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <i class="fa-solid fa-spinner animate-spin text-4xl text-gray-400"></i>
        <p class="mt-3 text-gray-500">Memuat data jadwal...</p>
      </div>

      <form v-else @submit.prevent="submitEditJadwalKerja" class="flex flex-col lg:flex-row lg:space-x-5">
        <div class="flex-[7] space-y-3">
          <div class="p-5 bg-white rounded-md shadow-md">
            <div class="mb-6">
              <label for="kode" class="block mb-2 text-sm font-medium text-gray-900">Nama Kode<span
                  class="text-red-600">*</span></label>
              <input type="text" id="kode" v-model="form.kode" required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
            <div class="mb-6">
              <label for="shift" class="block mb-2 text-sm font-medium text-gray-900">Nama Shift<span
                  class="text-red-600">*</span></label>
              <input type="text" id="shift" v-model="form.shift" required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
          </div>
          <div class="p-5 bg-white rounded-md shadow-md">
            <div class="space-y-4 mb-6">
              <p class="mb-2 text-sm font-medium text-gray-900">Hari dan Jam Kerja <span class="text-red-600">*</span>
              </p>
              <div v-for="day in days" :key="day.value" class="p-3 border rounded-lg">
                <label class="flex items-center space-x-3 font-medium">
                  <Checkbox v-model="dailyTimes[day.value].active" :binary="true" />
                  <span>{{ day.label }}</span>
                </label>
                <div v-if="dailyTimes[day.value].active" class="mt-3 grid grid-cols-2 gap-4 pl-8">
                  <div>
                    <label class="block text-xs font-medium text-gray-600">Jam Masuk</label>
                    <input type="time" v-model="dailyTimes[day.value].in"
                      class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600">Jam Pulang</label>
                    <input type="time" v-model="dailyTimes[day.value].out"
                      class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label for="toler-in" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Masuk
                  (menit)</label>
                <select id="toler-in" v-model="toleranceIn"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                </select>
              </div>
              <div>
                <label for="toler-out" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Pulang
                  (menit)</label>
                <select id="toler-out" v-model="toleranceOut"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-[3] space-y-3 mt-3 lg:mt-0">
          <div class="bg-white p-5 rounded-md shadow-md">
            <h3 class="font-semibold text-slate-700 mb-3">Aksi</h3>
            <div class="flex flex-col space-y-2">
              <button type="submit" :disabled="isSubmitting"
                class="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 flex items-center justify-center disabled:bg-blue-300">
                <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                <span>Simpan sebagai Versi Baru</span>
              </button>
              <button type="button" @click="goBack"
                class="w-full text-red-500 border border-red-600 hover:bg-red-500 hover:text-white rounded-lg px-5 py-2.5">
                Batal
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="mb-20"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter, useRoute } from 'vue-router'
import { DetailJadwalKerja, JadwalKerja } from '@/models/jadwalModel';
import { fetchjadwalById, createCopyJadwal } from '@/services/jadwalKerjaService';
import { toast } from 'vue3-toastify';
import Checkbox from 'primevue/checkbox';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const route = useRoute();
const confirm = useConfirm();
const loading = ref(true);
const isSubmitting = ref(false);

const days = [
  { label: 'Senin', value: 'SENIN' }, { label: 'Selasa', value: 'SELASA' },
  { label: 'Rabu', value: 'RABU' }, { label: 'Kamis', value: 'KAMIS' },
  { label: 'Jumat', value: 'JUMAT' }, { label: 'Sabtu', value: 'SABTU' },
  { label: 'Minggu', value: 'MINGGU' },
];

const form = ref({ kode: '', shift: '' });
const dailyTimes = ref<Record<string, { in: string; out: string; active: boolean }>>({});
const toleranceOptions = [0, 5, 10, 15, 30, 60];
const toleranceIn = ref<number>(0);
const toleranceOut = ref<number>(0);

const initializeDailyTimes = () => {
  days.forEach(day => {
    dailyTimes.value[day.value] = { in: '08:00', out: '17:00', active: false };
  });
};

const getjadwalById = async () => {
  loading.value = true;
  try {
    const response = await fetchjadwalById(route.params.id as string);
    form.value.kode = response.kode;
    form.value.shift = response.shift;
    

    if (response.detail_jadwal_kerja?.length > 0) {
      response.detail_jadwal_kerja.forEach(detail => {
        const dayKey = detail.hari.toUpperCase();
        if (dailyTimes.value[dayKey]) {
          dailyTimes.value[dayKey] = {
            in: detail.time_in.substring(0, 5),
            out: detail.time_out.substring(0, 5),
            active: detail.is_active
          };
        }
      });
      const firstDetail = response.detail_jadwal_kerja[0];
      toleranceIn.value = firstDetail.toler_in;
      toleranceOut.value = firstDetail.toler_out;
    }
  } catch (error) {
    toast.error("Gagal memuat data jadwal.");
  } finally {
    loading.value = false;
  }
};

const goBack = () => router.back();

const submitEditJadwalKerja = () => {
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

  confirmMigration(detailPayload);
};

const confirmMigration = (detailPayload: DetailJadwalKerja[]) => {
  confirm.require({
    message: 'Apakah Anda ingin memindahkan semua karyawan dari jadwal lama ke jadwal baru ini?',
    header: 'Konfirmasi Migrasi Karyawan',
    icon: 'fa-solid fa-users-gear',
    acceptLabel: 'Ya, Migrasikan',
    rejectLabel: 'Tidak, Simpan Saja',
    accept: () => executeSave(detailPayload, true),
    reject: () => executeSave(detailPayload, false),
  });
};

const executeSave = async (detailPayload: DetailJadwalKerja[], migrate: boolean) => {
  const finalPayload: JadwalKerja = {
    id: '',
    kode: form.value.kode,
    shift: form.value.shift,
    detail_jadwal_kerja: detailPayload,
    is_active: true,
    migrate_data: migrate
  };

  isSubmitting.value = true;
  try {
    await createCopyJadwal(route.params.id as string, finalPayload);
    toast.success("Versi baru jadwal kerja berhasil dibuat.");
    router.back();
  } catch (error: any) {
    toast.error("Gagal menyimpan jadwal kerja baru.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  initializeDailyTimes();
  getjadwalById();
});
</script>
