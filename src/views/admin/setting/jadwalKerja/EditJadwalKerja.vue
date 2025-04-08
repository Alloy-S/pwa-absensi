<template>
    <BasePage>
      <div class="space-y-3">
        <div class="mb-10 mt-5 flex justify-between items-start">
          <p class="text-3xl font-semibold text-slate-800">Edit Jadwal Kerja</p>
        </div>
  
        <div class="flex space-x-3">
          <div class="flex-[7] space-y-3">
            <div class="p-3 bg-white rounded-md shadow-md">
              <!-- Checkbox Hari -->
              <div class="mb-6">
                <p class="mb-2 text-sm font-medium text-gray-900">Hari Kerja <span class="text-red-600">*</span></p>
                <div class="grid grid-cols-4 gap-2">
                  <label v-for="day in days" :key="day.value" class="flex items-center space-x-2">
                    <input type="checkbox" v-model="selectedDays" :value="day.value" class="text-blue-600" />
                    <span>{{ day.label }}</span>
                  </label>
                </div>
              </div>
  
              <!-- Toggle Semua Jam Sama -->
              <div class="mb-4">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" v-model="sameHours" />
                  <span class="text-sm">Semua jam kerja sama</span>
                </label>
              </div>
  
              <!-- Jam Kerja -->
              <div v-if="sameHours" class="mb-6 flex space-x-2">
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
                <label for="toler-in" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Masuk (menit)</label>
                <select id="toler-in" v-model="toleranceIn"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="" disabled>Pilih salah satu</option>
                  <option v-for="val in toleranceOptions" :value="val" :key="val">{{ val }}</option>
                </select>
              </div>
  
              <div class="mb-6">
                <label for="toler-out" class="block mb-2 text-sm font-medium text-gray-900">Toleransi Pulang (menit)</label>
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
                <button type="button"
                  class="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5">
                  Simpan
                </button>
              </div>
            </div>
          </div>
  
          <div class="flex-[3]"></div>
        </div>
      </div>
      <div class="mb-20"></div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
import { reactive, ref } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const days = [
  { label: 'Senin', value: 'monday' },
  { label: 'Selasa', value: 'tuesday' },
  { label: 'Rabu', value: 'wednesday' },
  { label: 'Kamis', value: 'thursday' },
  { label: 'Jumat', value: 'friday' },
  { label: 'Sabtu', value: 'saturday' },
  { label: 'Minggu', value: 'sunday' },
]

const selectedDays = ref<string[]>([])
const sameHours = ref(true)

const globalTimeIn = ref('08:00')
const globalTimeOut = ref('17:00')

const dailyTimes = reactive<Record<string, { in: string; out: string }>>({
  monday: { in: '', out: '' },
  tuesday: { in: '', out: '' },
  wednesday: { in: '', out: '' },
  thursday: { in: '', out: '' },
  friday: { in: '', out: '' },
  saturday: { in: '', out: '' },
  sunday: { in: '', out: '' },
})

const toleranceOptions = [0, 5, 10, 15, 30, 60]
const toleranceIn = ref('')
const toleranceOut = ref('')

const getDayLabel = (value: string) => {
  const day = days.find((d) => d.value === value)
  return day?.label || value
}

const goBack = () => router.back();
</script>
