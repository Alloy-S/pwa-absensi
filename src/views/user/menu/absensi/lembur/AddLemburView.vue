<template>
    <BasePageNoNav>
        <TopHeader title="Input Lembur" />
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Tambah Lembur</h2>

            <!-- Pilih Tanggal -->
            <div class="mb-4">
                <label for="tanggal-mulai" class="block text-sm font-medium">Tanggal Mulai Lembur</label>
                <input id="tanggal-mulai" type="date" v-model="form.tanggal" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Waktu Mulai Lembur -->
            <div class="mb-4">
                <label for="waktuMulai" class="block text-sm font-medium">Waktu Mulai</label>
                <input id="waktuMulai" type="time" v-model="form.waktuMulai" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Pilih Tanggal -->
            <div class="mb-4">
                <label for="tanggal-selesai" class="block text-sm font-medium">Tanggal Selesai Lembur</label>
                <input id="tanggal-selesai" type="date" v-model="form.tanggal" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Waktu Selesai Lembur -->
            <div class="mb-4">
                <label for="waktuSelesai" class="block text-sm font-medium">Waktu Selesai</label>
                <input id="waktuSelesai" type="time" v-model="form.waktuSelesai" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Catatan (Opsional) -->
            <div class="mb-4">
                <label for="catatan" class="block text-sm font-medium">Catatan (Opsional)</label>
                <textarea id="catatan" v-model="form.catatan" class="w-full min-h-[150px] p-2 border rounded-md"
                    placeholder="Masukkan catatan jika diperlukan"></textarea>
            </div>

            <!-- Tombol Submit -->
            <button class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg" @click="submitLembur">
                Submit Lembur
            </button>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';

const form = ref({
    tanggal: '',
    waktuMulai: '',
    waktuSelesai: '',
    catatan: ''
});

const submitLembur = () => {
    console.log("Mengirim data lembur:", form.value);
    // Tambahkan logika untuk mengirim data ke backend di sini
};
</script>

<style scoped>
input,
textarea {
    border: 1px solid #ddd;
}
</style>
