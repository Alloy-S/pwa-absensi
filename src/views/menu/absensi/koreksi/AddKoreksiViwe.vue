<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" />
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Tambah Koreksi Kehadiran</h2>

            <!-- Pilih Tanggal -->
            <div class="mb-4">
                <label for="tanggal" class="block text-sm font-medium">Tanggal Kehadiran</label>
                <input id="tanggal" type="date" v-model="form.tanggal" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Waktu Masuk -->
            <div class="mb-4">
                <label for="waktuMasuk" class="block text-sm font-medium">Waktu Masuk</label>
                <input id="waktuMasuk" type="time" v-model="form.waktuMasuk" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Waktu Pulang -->
            <div class="mb-4">
                <label for="waktuPulang" class="block text-sm font-medium">Waktu Pulang</label>
                <input id="waktuPulang" type="time" v-model="form.waktuPulang" class="w-full p-2 border rounded-md" />
            </div>

            <!-- Catatan (Opsional) -->
            <div class="mb-4">
                <label for="catatan" class="block text-sm font-medium">Catatan (Opsional)</label>
                <textarea id="catatan" v-model="form.catatan" class="w-full min-h-[150px] p-2 border rounded-md"
                    placeholder="Masukkan catatan jika diperlukan"></textarea>
            </div>

            <!-- Tombol Submit -->
            <button class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg" @click="submitKoreksi">
                Submit Koreksi
            </button>
        </div>

        
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
import { useRouter } from 'vue-router';



const form = ref({
    tanggal: '',
    waktuMasuk: '',
    waktuPulang: '',
    catatan: ''
});

const submitKoreksi = () => {
    console.log("Mengirim koreksi kehadiran:", form.value);
    // Tambahkan logika untuk mengirim data ke backend di sini
};
</script>

<style scoped>
input,
textarea {
    border: 1px solid #ddd;
}
</style>