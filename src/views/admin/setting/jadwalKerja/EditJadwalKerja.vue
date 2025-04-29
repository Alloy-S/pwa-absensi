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
                <label for="nama-kontak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                  Kode<span class="text-red-600">*</span></label>
                <input type="text" id="nama-kontak" v-model="jadwalKerja.kode" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div class="mb-6">
                <label for="telepon-dar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor
                  Shift<span class="text-red-600">*</span></label>
                <input type="text" id="telepon-dar" v-model="jadwalKerja.shift" required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </div>
            <div class="p-3 bg-white rounded-md shadow-md">
              <!-- Checkbox Hari -->
              <div class="mb-6">
                <p class="mb-2 text-sm font-medium text-gray-900">Hari Kerja <span class="text-red-600">*</span></p>
                <div class="grid grid-cols-4 gap-2">
                  <label v-for="day in days" :key="day.value" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="selectedDays" :value="day.value" class="text-blue-600"
                      :disabled="jadwalKerja.is_same_hour" />
                    <span>{{ day.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Toggle Semua Jam Sama -->
              <div class="mb-4">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" v-model="jadwalKerja.is_same_hour" />
                  <span class="text-sm">Semua jam kerja sama</span>
                </label>
              </div>

              <!-- Jam Kerja -->
              <div v-if="jadwalKerja.is_same_hour" class="mb-6 flex space-x-2">
                <div class="w-1/2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Jam Masuk</label>
                  <input type="time" v-model="globalTimeIn"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="w-1/2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">Jam Pulang</label>
                  <input type="time" v-model="globalTimeOut"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
              </div>

              <!-- Jam Kerja per Hari -->
              <div v-else class="space-y-4 mb-6">
                <div v-for="day in selectedDays" :key="day" class="flex space-x-2">
                  <div class="w-1/2">
                    <label class="block text-sm font-medium">{{ getDayLabel(day) }} - Jam Masuk</label>
                    <input type="time" v-model="dailyTimes[day].in"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div class="w-1/2">
                    <label class="block text-sm font-medium">{{ getDayLabel(day) }} - Jam Pulang</label>
                    <input type="time" v-model="dailyTimes[day].out"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>

              <!-- Toleransi -->
              <div class="mb-6">
                <label for="toler-in" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Masuk
                  (menit)</label>
                <select id="toler-in" v-model="toleranceIn"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="" disabled>Pilih salah satu</option>
                  <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                </select>
              </div>

              <div class="mb-6">
                <label for="toler-out" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Pulang
                  (menit)</label>
                <select id="toler-out" v-model="toleranceOut"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="" disabled>Pilih salah satu</option>
                  <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                </select>
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
import { watch, ref, onMounted } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter, useRoute } from 'vue-router'
import { initJadwalKerja, JadwalKerja } from '@/models/jadwalModel';
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
]
const selectedDays = ref<string[]>([])
const jadwalKerja = ref<JadwalKerja>(initJadwalKerja());

const globalTimeIn = ref('08:00')
const globalTimeOut = ref('17:00')

const dailyTimes = ref<Record<string, { in: string; out: string }>>({
  SENIN: { in: '', out: '' },
  SELASA: { in: '', out: '' },
  RABU: { in: '', out: '' },
  KAMIS: { in: '', out: '' },
  JUMAT: { in: '', out: '' },
  SABTU: { in: '', out: '' },
  MINGGU: { in: '', out: '' },
})

const toleranceOptions = [0, 5, 10, 15, 30, 60]
const toleranceIn = ref<number>(0)
const toleranceOut = ref<number>(0)

const getDayLabel = (value: string) => {
  const day = days.find((d) => d.value === value)
  return day?.label || value
}

const getjadwalById = async () => {
  try {
    jadwalKerja.value = await fetchjadwalById(route.params.id as string)
    console.log(jadwalKerja.value)
    globalTimeIn.value = jadwalKerja.value.detail_jadwal_kerja[0].time_in
    globalTimeOut.value = jadwalKerja.value.detail_jadwal_kerja[0].time_out
    toleranceIn.value = jadwalKerja.value.detail_jadwal_kerja[0].toler_in
    toleranceOut.value = jadwalKerja.value.detail_jadwal_kerja[0].toler_out

    const detailJadwal = jadwalKerja.value.detail_jadwal_kerja.reduce((acc, day, index) => {
      acc[days[index].value] = {
        in: day.time_in,
        out: day.time_out
      };
      return acc;
    }, {});

    
    dailyTimes.value = detailJadwal;
    selectedDays.value = jadwalKerja.value.detail_jadwal_kerja.map((item) => item.hari.toUpperCase());
    console.log(dailyTimes.value)
    console.log(selectedDays.value)
  } catch (error) {
    console.error(error)
  }
}

watch(() => jadwalKerja.value.is_same_hour, (newVal) => {
  if (newVal) {
    selectedDays.value = days.map(day => day.value)
  } else {
    selectedDays.value = []
  }
})

watch(selectedDays, (newDays) => {
  newDays.forEach((day) => {
    if (!dailyTimes.value[day]) {
      dailyTimes.value[day] = { in: '', out: '' };
    }
  });

  // Jika hari di-uncheck, hapus dari dailyTimes (optional, jika ingin bersih)
  Object.keys(dailyTimes.value).forEach((day) => {
    if (!newDays.includes(day)) {
      delete dailyTimes.value[day];
    }
  });
});

const goBack = () => router.back();

const submitEditJadwalKerja = async () => {
  // jadwalKerja

  if (!jadwalKerja.value.is_same_hour && selectedDays.value.length === 0) {
    toast.error('Silakan pilih hari kerja')
    return
  }

  jadwalKerja.value.detail_jadwal_kerja = []

  if (jadwalKerja.value.is_same_hour) {
    Object.entries(dailyTimes.value).forEach(([day, _times]) => {
      jadwalKerja.value.detail_jadwal_kerja.push({
        id: "",
        hari: day,
        time_in: globalTimeIn.value,
        time_out: globalTimeOut.value,
        toler_in: toleranceIn.value,
        toler_out: toleranceOut.value,
      })
    })
  } else {
    Object.entries(dailyTimes.value).forEach(([day, times]) => {
      jadwalKerja.value.detail_jadwal_kerja.push({
        id: "",
        hari: day,
        time_in: times.in,
        time_out: times.out,
        toler_in: toleranceIn.value,
        toler_out: toleranceOut.value,
      })
    })
  }

  try {
    console.log(jadwalKerja.value)

    const response = await updatejadwal(route.params.id as string, jadwalKerja.value);

    if (response.status === 200) {
      toast.success("Success Edit Jabatan")
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  } catch (error) {
    console.error(error)
    toast.error(error.response.data.message);
  }
}

onMounted(() => {
  getjadwalById()
})
</script>
