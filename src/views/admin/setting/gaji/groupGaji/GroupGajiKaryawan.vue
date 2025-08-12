<template>
  <BasePage>
    <div class="my-5">
      <div v-if="grupGajiDetail">
        <p class="text-3xl font-semibold text-slate-800">Nama Grup: {{ grupGajiDetail.grup_gaji.grup_name }}</p>
        <p class="text-sm text-slate-500">Daftar semua karyawan yang menggunakan grup gaji ini.</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20">
      <i class="fa-solid fa-spinner animate-spin text-4xl text-gray-400"></i>
      <p class="mt-3 text-gray-500">Memuat data karyawan...</p>
    </div>

    <div v-else-if="grupGajiDetail" class="bg-white p-4 rounded-lg shadow-md">
      <DataTable :value="grupGajiDetail.list_karyawan" responsiveLayout="scroll">
        <Column field="nip" header="NIP"></Column>
        <Column field="fullname" header="Nama Karyawan"></Column>
        <Column field="jabatan" header="Jabatan"></Column>

        <template #empty>
          <div class="text-center py-5">
            <p class="text-gray-500">Belum ada karyawan yang terdaftar di grup gaji ini.</p>
          </div>
        </template>
      </DataTable>
    </div>
    <div class="mb-16"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { fetchGrupGajiUsers } from '@/services/GrupGajiService';
import { GrupGajiUser } from '@/models/GrupGajiModel';


const route = useRoute();
const loading = ref(true);
const grupGajiDetail = ref<GrupGajiUser | null>(null);

const getDetail = async () => {
  loading.value = true;
  try {
    const id = route.params.id as string;
    grupGajiDetail.value = await fetchGrupGajiUsers(id);
  } catch (error) {
    console.error("Gagal memuat data karyawan.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getDetail();
});
</script>
