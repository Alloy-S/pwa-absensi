<template>
    <BasePageNoNav>
        <TopHeader title="Ubah Password" />

        <div class="p-4 space-y-4">

            <h2 class="text-lg font-semibold mb-4">Ganti Password</h2>
            <form @submit.prevent="hitChangePassword" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password Lama</label>
                    <input v-model="oldPassword" type="text"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Password Baru</label>
                    <input v-model="newPassword" type="text"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                    <input v-model="confirmPassword" type="text"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div class="pt-4">
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Reset Password</button>
                </div>
            </form>

        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { toast } from 'vue3-toastify';
import { changePassword } from '@/services/userService';

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const hitChangePassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        toast.error("Password baru dan konfirmasi tidak cocok!");
        return;
    }

    const response = await changePassword({
        old_pass: oldPassword.value,
        new_pass: newPassword.value,
        verify_pass: confirmPassword.value
    });

    if (response.status === 200) {
        toast.success("Password berhasil diubah!");
        oldPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
    }
};
</script>