<template>
    <BasePageNoNav>
        <TopHeader title="Pengajuan Izin" />
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Tambah Pengajuan Izin</h2>

            <!-- Pilih Tanggal -->
            <div class="mb-4">
                <label for="tanggal" class="block text-sm font-medium">Tanggal Izin</label>
                <input id="tanggal" type="date" v-model="form.tanggal" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Jenis Izin -->
            <div class="mb-4">
                <label for="jenisIzin" class="block text-sm font-medium">Jenis Izin</label>
                <select id="jenisIzin" v-model="form.jenisIzin" class="w-full p-2 border rounded-md">
                    <option value="sakit">Sakit</option>
                    <option value="cuti">Cuti</option>
                    <option value="lainnya">Lainnya</option>
                </select>
            </div>

            <!-- Catatan (Opsional) -->
            <div class="mb-4">
                <label for="catatan" class="block text-sm font-medium">Catatan (Opsional)</label>
                <textarea id="catatan" v-model="form.catatan" class="w-full min-h-[150px] p-2 border rounded-md"
                    placeholder="Masukkan alasan izin"></textarea>
            </div>

            <!-- Tombol Submit -->
            <button class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg" @click="submitIzin">
                Ajukan Izin
            </button>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
// import { useRouter } from 'vue-router';

const form = ref({
    tanggal: '',
    jenisIzin: 'sakit',
    catatan: ''
});

const submitIzin = () => {
    console.log("Mengirim pengajuan izin:", form.value);
    // Tambahkan logika untuk mengirim data ke backend di sini
};
</script>

<style scoped>
input,
textarea,
select {
    border: 1px solid #ddd;
}
</style>
