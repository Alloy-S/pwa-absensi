<template>
  <BasePage>
    <div class="space-y-6">

      <div class="mt-4">
        <h1 class="text-3xl font-semibold text-slate-800">Dashboard Admin</h1>
        <p class="text-slate-600 text-sm mt-1">Selamat datang kembali 👋 Data diperbarui otomatis setiap menit.</p>
      </div>


      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Status Masuk Hari ini</p>
          <h2 class="text-2xl font-bold" :class="attendanceSummary.libur ? 'text-red-600' : 'text-green-600'">{{
            attendanceSummary.libur ? 'Libur' :'Masuk' }}</h2>
        </div>

        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Total Karyawan Bulanan</p>
          <h2 class="text-2xl font-bold text-slate-800">{{ totalUsers.user_bulanan }}</h2>
        </div>

        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Total Karyawan Harian</p>
          <h2 class="text-2xl font-bold text-slate-800">{{ totalUsers.user_harian }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Hadir Hari Ini</p>
          <h2 class="text-2xl font-bold text-green-600">{{ attendanceSummary.hadir }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Terlambat Hari Ini</p>
          <h2 class="text-2xl font-bold text-amber-500">{{ attendanceSummary.datang_terlambat }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Pulang Cepat Hari Ini</p>
          <h2 class="text-2xl font-bold text-blue-500">{{ attendanceSummary.pulang_cepat }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Terlambat & Pulang Cepat</p>
          <h2 class="text-2xl font-bold text-orange-500">{{ attendanceSummary.datang_terlambat_pulang_cepat }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Izin / Sakit Hari Ini</p>
          <h2 class="text-2xl font-bold text-slate-500">{{ attendanceSummary.izin }}</h2>
        </div>


        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Alpha Hari Ini</p>
          <h2 class="text-2xl font-bold text-red-600">{{ attendanceSummary.alpha }}</h2>
        </div>
      </div>


      <div class="grid grid-cols-2">
        <div class="bg-white p-6 rounded-xl shadow border mt-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Chart Kehadiran Hari Ini</h3>
          <div class="flex justify-center items-center">
            <Chart class="w-full" type="pie" :data="chartData" :options="chartOptions" />

          </div>
        </div>
      </div>


    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Chart from 'primevue/chart';
import { fetchTodayAttendaceSummary, fetchTotalUsers } from '@/services/dashboardAdminService';
import type { TodayAttendaceSummary, TotalUsers } from '@/models/dashboardAdminModel';

const attendanceSummary = ref<TodayAttendaceSummary>({
  libur: false,
  hadir: 0, datang_terlambat: 0, pulang_cepat: 0,
  datang_terlambat_pulang_cepat: 0, izin: 0, alpha: 0,
});

const totalUsers = ref<TotalUsers>({
  user_bulanan: 0,
  user_harian: 0,
});

let intervalId: number | undefined;

const loadAttendanceSummary = async () => {
  try {
    attendanceSummary.value = await fetchTodayAttendaceSummary();
  } catch (error) {
    console.error("Gagal mengambil data ringkasan kehadiran:", error);
  }
};

const chartData = computed(() => {
  const labels = [
    'Hadir', 'Terlambat', 'Pulang Cepat',
    'Terlambat & Pulang Cepat', 'Izin', 'Alpha'
  ];
  const data = [
    attendanceSummary.value.hadir,
    attendanceSummary.value.datang_terlambat,
    attendanceSummary.value.pulang_cepat,
    attendanceSummary.value.datang_terlambat_pulang_cepat,
    attendanceSummary.value.izin,
    attendanceSummary.value.alpha,
  ];

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#16A34A',
          '#F59E0B',
          '#3B82F6',
          '#F97316',
          '#64748B',
          '#DC2626',
        ],
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    }
  }
});

onMounted(async () => {
  try {
    totalUsers.value = await fetchTotalUsers();
  } catch (error) {
    console.error("Gagal mengambil data total user:", error);
  }

  await loadAttendanceSummary();

  intervalId = window.setInterval(loadAttendanceSummary, 60000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
