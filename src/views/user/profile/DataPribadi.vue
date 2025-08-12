<template>
    <BasePageNoNav>
        <TopHeader title="Profile" />
        <TopProfileNavigation />

        <div class="p-4 space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Informasi Pribadi</h2>
                <button @click="enterEditMode" v-if="!isEditing"
                    class="flex items-center space-x-2 text-sm text-slate-700">
                    <i class="fa-solid fa-pencil"></i>
                    <span>Edit</span>
                </button>
            </div>

            <div v-if="!isEditing" class="bg-white p-4 rounded-lg shadow-md space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Gender</label>
                        <p class="text-gray-700">{{ dataPribadi.gender || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Tanggal Lahir</label>
                        <p class="text-gray-700">{{ dataPribadi.tgl_lahir || '-' }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Tempat Lahir</label>
                        <p class="text-gray-700">{{ dataPribadi.tmpt_lahir || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Status Kawin</label>
                        <p class="text-gray-700">{{ dataPribadi.status_kawin || '-' }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Agama</label>
                        <p class="text-gray-700">{{ dataPribadi.agama || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Golongan Darah</label>
                        <p class="text-gray-700">{{ dataPribadi.gol_darah || '-' }}</p>
                    </div>
                </div>
            </div>

            <form @submit.prevent="saveChanges" v-else>
                <div class="bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">Gender</label>
                            <select v-model="editableDataPribadi.gender"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option disabled value="">Pilih Gender</option>
                                <option v-for="option in genderOptions" :key="option" :value="option">{{ option }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Tanggal Lahir</label>
                            <DatePicker v-model="(editableDataPribadi.tgl_lahir as any)" dateFormat="dd/mm/yy"
                                class="w-full" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">Tempat Lahir</label>
                            <input type="text" v-model="editableDataPribadi.tmpt_lahir"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Status Kawin</label>
                            <select v-model="editableDataPribadi.status_kawin"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option disabled value="">Pilih Status</option>
                                <option v-for="option in marriageOptions" :key="option" :value="option">{{ option }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium">Agama</label>
                            <select v-model="editableDataPribadi.agama"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option disabled value="">Pilih Agama</option>
                                <option v-for="option in religionOptions" :key="option" :value="option">{{ option }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium">Golongan Darah</label>
                            <select v-model="editableDataPribadi.gol_darah"
                                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                                <option disabled value="">Pilih Gol. Darah</option>
                                <option v-for="option in bloodTypeOptions" :key="option" :value="option">{{ option }}
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
import { DataPribadi, initDataPribadi } from '@/models/userModel';
import { fetchDataPribadi, updateDataPribadi } from '@/services/userService';
import { toast } from 'vue3-toastify';
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns';

const dataPribadi = ref<DataPribadi>(initDataPribadi());
const isEditing = ref(false);
const editableDataPribadi = ref<DataPribadi>(initDataPribadi());

const genderOptions = ref(['Laki-Laki', 'Perempuan']);
const marriageOptions = ref(['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']);
const religionOptions = ref(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Khonghucu']);
const bloodTypeOptions = ref(['A', 'B', 'AB', 'O', 'Tidak Tahu']);

const getDataPribadi = async () => {
    dataPribadi.value = await fetchDataPribadi();
};

const enterEditMode = () => {
    editableDataPribadi.value = { ...dataPribadi.value };
    isEditing.value = true;
};

const cancelEdit = () => {
    isEditing.value = false;
};

const saveChanges = async () => {

    editableDataPribadi.value.tgl_lahir = format(editableDataPribadi.value.tgl_lahir, 'yyyy-MM-dd')

    const response = await updateDataPribadi(editableDataPribadi.value);
    if (response.status === 200) {
        dataPribadi.value = { ...editableDataPribadi.value };
        isEditing.value = false;
        toast.success("Informasi pribadi berhasil diperbarui!");

    };

}

onMounted(() => {
    getDataPribadi();
});
</script>
