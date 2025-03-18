<template>
    <BasePageNoNav>
        <TopHeader title="Pengajuan Reimburse" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Form Pengajuan Reimburse</h1>

            <!-- Input Keterangan -->
            <div class="mb-4">
                <label for="keterangan" class="block text-sm font-medium">Keterangan</label>
                <input id="keterangan" type="text" v-model="description" class="w-full p-2 rounded-md" />
            </div>

            <!-- Input Jumlah -->
            <div class="mb-4">
                <label for="amount" class="block text-sm font-medium">Jumlah Reimburse</label>
                <input id="amount" type="number" v-model="amount" class="w-full p-2 rounded-md" />
            </div>

            <!-- Upload Bukti Foto -->
            <label class="block">Upload Bukti:</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full border p-2 rounded-md">
            
            <div v-if="previewImage" class="mt-2">
                <p class="text-sm text-gray-600">Preview Bukti:</p>
                <img :src="previewImage" alt="Preview" class="w-32 h-32 object-cover rounded-md border">
            </div>

            <!-- Tombol Simpan -->
            <button @click="submitReimburse" class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700">
                Ajukan Reimburse
            </button>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const description = ref('');
const amount = ref(null);
const file = ref(null);
const previewImage = ref(null);

const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        file.value = selectedFile;
        previewImage.value = URL.createObjectURL(selectedFile);
    }
};

const submitReimburse = () => {
    console.log({
        description: description.value,
        amount: amount.value,
        file: file.value,
    });
    alert("Reimburse berhasil diajukan!");
};
</script>

<style scoped>
input,
textarea {
    border: 1px solid #ddd;
}
</style>
