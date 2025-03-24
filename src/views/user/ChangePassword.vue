<template>
    <BasePageNoNav>
        <TopHeader title="Ubah Password" />

        <div class="p-4 space-y-4">

            <h2 class="text-lg font-semibold mb-4">Ganti Password</h2>
            <form @submit.prevent="changePassword">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Password Lama</label>
                    <input v-model="oldPassword" type="password" class="w-full mt-1 p-2 border rounded-lg" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Password Baru</label>
                    <input v-model="newPassword" type="password" class="w-full mt-1 p-2 border rounded-lg" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Konfirmasi Password Baru</label>
                    <input v-model="confirmPassword" type="password" class="w-full mt-1 p-2 border rounded-lg"
                        required />
                </div>
                <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Simpan</button>
            </form>

        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const changePassword = () => {
    if (newPassword.value !== confirmPassword.value) {
        alert("Password baru dan konfirmasi tidak cocok!");
        return;
    }

    // Kirim permintaan perubahan password ke server
    console.log("Password berhasil diubah!");
};
</script>

<style scoped>
input,
textarea {
    border: 1px solid #ddd;
}
</style>