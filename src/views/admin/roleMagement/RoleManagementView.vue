<template>
    <BasePage>
        <div class="my-5">
            <p class="text-3xl font-semibold text-slate-800">Manajemen Peran Karyawan</p>
            <p class="text-sm text-slate-500">Cari karyawan untuk melihat dan mengubah peran yang mereka miliki.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
                <h3 class="font-semibold text-slate-700 mb-3">Cari Karyawan</h3>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                    </span>
                    <input v-model="searchQuery" type="text" placeholder="Ketik nama atau NIP..."
                        class="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div v-if="isLoadingSearch" class="text-center py-5 text-gray-500">
                    <i class="fa-solid fa-spinner animate-spin"></i> Mencari...
                </div>
                <ul v-else-if="userList.length > 0" class="mt-4 space-y-2 max-h-96 overflow-y-auto">
                    <li v-for="user in userList" :key="user.id">
                        <button @click="selectUser(user)"
                            class="w-full text-left p-3 rounded-md transition"
                            :class="selectedUser?.id === user.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'">
                            <p class="font-semibold">{{ user.fullname }}</p>
                            <p class="text-sm">{{ user.jabatan }}</p>
                        </button>
                    </li>
                </ul>
                <div v-else-if="searchQuery" class="text-center py-5 text-gray-500 text-sm">
                    Tidak ada karyawan yang cocok.
                </div>
            </div>

            
            <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                <div v-if="isLoadingDetails" class="text-center py-20 text-gray-500">
                     <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
                     <p>Memuat detail peran...</p>
                </div>
                <div v-else-if="selectedUser" class="space-y-4">
                    <h3 class="text-xl font-semibold text-slate-800">Atur Peran untuk: <span class="text-blue-600">{{ selectedUser.fullname }}</span></h3>
                    <div class="space-y-3 pt-4 border-t">
                        <div v-for="role in allRoles" :key="role.id" class="flex items-center">
                            <Checkbox v-model="selectedUserRoles" :inputId="String(role.id)" :name="role.name" :value="role.id" />
                            <label :for="String(role.id)" class="ml-2 text-sm font-medium text-gray-900">{{ role.name }}</label>
                        </div>
                    </div>
                    <div class="flex justify-end pt-4">
                        <button @click="saveRoles" :disabled="isSaving"
                            class="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-300 flex items-center">
                            <i v-if="isSaving" class="fa-solid fa-spinner animate-spin mr-2"></i>
                            <span>Simpan Perubahan</span>
                        </button>
                    </div>
                </div>
                <div v-else class="flex items-center justify-center h-full text-center text-gray-500">
                    <div>
                        <i class="fa-solid fa-arrow-left text-3xl mb-2"></i>
                        <p>Pilih seorang karyawan dari daftar di sebelah kiri untuk mengatur perannya.</p>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Checkbox from 'primevue/checkbox';
import { toast } from 'vue3-toastify';
import { fetchAllRole, fetchDetailUserRole, updateUserRole } from '@/services/roleManagementService';
import { fetchfindUser } from '@/services/userService';
import { Role, UserRoleReq } from '@/models/roleManagementModel';
import { Karyawan } from '@/models/userModel';

const searchQuery = ref('');
const userList = ref<Karyawan[]>([]);
const selectedUser = ref<Karyawan | null>(null);
const allRoles = ref<Role[]>([]);
const selectedUserRoles = ref<number[]>([]);

const isLoadingSearch = ref(false);
const isLoadingDetails = ref(false);
const isSaving = ref(false);
let debounceTimer: any = null;

onMounted(async () => {
    try {
        allRoles.value = await fetchAllRole();
    } catch (error) {
        toast.error("Gagal memuat daftar peran.");
    }
});

watch(searchQuery, (newValue) => {
    clearTimeout(debounceTimer);
    if (newValue && newValue.length >= 3) {
        isLoadingSearch.value = true;
        debounceTimer = setTimeout(async () => {
            try {
                const response = await fetchfindUser({ search: newValue });
                userList.value = response;
            } catch (error) {
                toast.error("Gagal mencari pengguna.");
            } finally {
                isLoadingSearch.value = false;
            }
        }, 500);
    } else {
        userList.value = [];
    }
});

const selectUser = async (user: Karyawan) => {
    selectedUser.value = user;
    isLoadingDetails.value = true;
    try {
        const userRoles = await fetchDetailUserRole(user.id);
        selectedUserRoles.value = userRoles.map(role => role.role_id);
    } catch (error) {
        toast.error("Gagal memuat detail peran pengguna.");
    } finally {
        isLoadingDetails.value = false;
    }
};

const saveRoles = async () => {
    if (!selectedUser.value) return;

    isSaving.value = true;
    try {
        const payload: UserRoleReq = {
            role_ids: selectedUserRoles.value
        };
        await updateUserRole(selectedUser.value.id, payload);
        toast.success(`Peran untuk ${selectedUser.value.fullname} berhasil diperbarui.`);
        
        await selectUser(selectedUser.value);

    } catch (error) {
        toast.error("Gagal menyimpan perubahan peran.");
    } finally {
        isSaving.value = false;
    }
};
</script>
