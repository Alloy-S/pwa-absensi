<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Tambah Jenis Izin</p>
            </div>

            <div class="flex space-x-3">
                <div class="flex-[7] space-y-3">
                    <form @submit.prevent="saveData" class="p-4 bg-white rounded-md shadow-md space-y-4">
                        
                        <div>
                            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900">Nama Izin<span class="text-red-600">*</span></label>
                            <input type="text" id="nama" v-model="request.nama" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        
                        <div>
                            <label for="kuota_default" class="block mb-2 text-sm font-medium text-gray-900">Kuota Default (Hari)<span class="text-red-600">*</span></label>
                            <input type="number" id="kuota_default" v-model="request.kuota_default" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        
                        <div>
                            <label for="periode_reset" class="block mb-2 text-sm font-medium text-gray-900">Periode Reset<span class="text-red-600">*</span></label>
                            <select id="periode_reset" v-model="request.periode_reset" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option disabled value="">Pilih salah satu</option>
                                <option v-for="option in periodeOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        
                        <div>
                            <label for="berlaku_setelahbulan" class="block mb-2 text-sm font-medium text-gray-900">Berlaku Setelah (Bulan)<span class="text-red-600">*</span></label>
                            <input type="number" id="berlaku_setelahbulan" v-model="request.berlaku_setelah_bulan" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <p class="text-xs text-gray-500 mt-1">Masukkan 0 jika berlaku sejak hari pertama bergabung.</p>
                        </div>

                        
                        <div class="mt-5 flex justify-end pt-4 border-t">
                            <div class="w-1/3 flex space-x-2">
                                <button type="button" @click="goBack"
                                    class="w-full text-red-500 border border-red-600 hover:bg-red-500 hover:text-white rounded-lg px-5 py-2.5">
                                    Batal
                                </button>
                                <button type="submit" :disabled="loading"
                                    class="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 disabled:bg-blue-300">
                                    <span v-if="loading">Menyimpan...</span>
                                    <span v-else>Simpan</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import { toast } from 'vue3-toastify';
import { JenisIzin } from '@/models/jenisIzinModel';
import { addJenisIzin } from '@/services/jenisIzinService';

const router = useRouter();
const loading = ref(false);


const request = ref<Partial<JenisIzin>>({
    nama: '',
    kuota_default: 0,
    periode_reset: '',
    berlaku_setelah_bulan: 0
});


const periodeOptions = [
    { value: 'TAHUNAN', label: 'Setiap Tahun' },
    { value: 'SEKALI_SEUMUR_HIDUP', label: 'Sekali Seumur Hidup' },
    { value: 'TIDAK_ADA', label: 'Tidak Ada Reset (Tidak Terbatas)' }
];

const goBack = () => {
    router.back();
};

const saveData = async () => {
    loading.value = true;
    try {
        const response = await addJenisIzin(request.value as JenisIzin);
        if (response.status === 201) {
            toast.success("Jenis izin baru berhasil ditambahkan.");
            router.push('/admin/pengaturan/jenis-izin');
        }
    } catch (error) {
        console.error("Gagal menyimpan jenis izin:", error);
        
    } finally {
        loading.value = false;
    }
};
</script>
