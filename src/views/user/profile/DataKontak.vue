<template>
    <BasePageNoNav>
        <TopHeader title="Profile" />
        <TopProfileNavigation />

        <div class="p-4 space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Informasi Kontak</h2>

                <button @click="enterEditMode" v-if="!isEditing"
                    class="flex items-center space-x-2 text-sm text-slate-700">
                    <i class="fa-solid fa-pencil"></i>
                    <span>Edit</span>
                </button>
            </div>

            <div v-if="!isEditing">
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Alamat</label>
                        <p class="text-gray-700">{{ contact.alamat || '-' }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label class="block text-sm font-medium">No. Telepon</label>
                            <p class="text-gray-700">{{ contact.no_telepon || '-' }}</p>
                        </div>
                    </div>
                </div>

                <h2 class="text-lg font-semibold mt-6">Kontak Darurat</h2>
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Nama Darurat</label>
                        <p class="text-gray-700">{{ contact.nama_darurat || '-' }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">No. Telepon Darurat</label>
                            <p class="text-gray-700">{{ contact.no_telepon_darurat || '-' }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Relasi</label>
                            <p class="text-gray-700">{{ contact.relasi_darurat || '-' }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <form @submit.prevent="saveChanges" v-else>
                <div class="bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Alamat</label>
                        <input type="text" v-model="editableContact.alamat"
                            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">No. Telepon</label>
                            <input type="tel" v-model="editableContact.no_telepon"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>

                <h2 class="text-lg font-semibold mt-6">Kontak Darurat</h2>
                <div class="bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Nama Darurat</label>
                        <input type="text" v-model="editableContact.nama_darurat"
                            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">No. Telepon Darurat</label>
                            <input type="tel" v-model="editableContact.no_telepon_darurat"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Relasi</label>
                            <select v-model="editableContact.relasi_darurat"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option disabled value="">Pilih relasi</option>
                                <option v-for="option in relationOptions" :key="option" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex flex-col space-y-3">
                    <button type="button" @click="cancelEdit"
                        class="px-4 py-2 border border-slate-300 text-gray-800 rounded-md hover:bg-gray-300">
                        Batal
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import TopProfileNavigation from '@/components/user/TopProfileNavigation.vue';
import { DataKontak, initDataKontak } from '@/models/userModel';
import { fetchDataKontak, updateDataKontak } from '@/services/userService';
import { toast } from 'vue3-toastify';

const contact = ref<DataKontak>(initDataKontak());
const isEditing = ref(false);
const editableContact = ref<DataKontak>(initDataKontak());
const relationOptions = ref([
    'Orang Tua',
    'Pasangan',
    'Anak',
    'Saudara Kandung',
    'Kerabat Lainnya'
]);

const getKontak = async () => {
    contact.value = await fetchDataKontak();
};

const enterEditMode = () => {
    editableContact.value = { ...contact.value };
    isEditing.value = true;
};


const cancelEdit = () => {
    isEditing.value = false;
};


const saveChanges = async () => {
    const updatedData = await updateDataKontak(editableContact.value);

    if (updatedData.status === 200) {
        contact.value = { ...editableContact.value};

        isEditing.value = false;

        toast.success("Informasi kontak berhasil diperbarui!");
    }

};

onMounted(() => {
    getKontak();
});

</script>
