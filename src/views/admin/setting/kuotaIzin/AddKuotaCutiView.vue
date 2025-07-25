<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Tambah Kuota Cuti</p>
            </div>

            <div class="flex space-x-3">
                <div class="flex-[7] space-y-3">
                    <form @submit.prevent="saveData" class="p-4 bg-white rounded-md shadow-md space-y-4">
                        
                        <div>
                            <label for="periode_reset" class="block mb-2 text-sm font-medium text-gray-900">Jenis Izin<span class="text-red-600">*</span></label>
                            <select id="periode_reset" v-model="request.jenis_izin_id" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option disabled value="">Pilih salah satu</option>
                                <option v-for="option in jenisIzinOption" :key="option.id" :value="option.id">
                                    {{ option.nama + ` (default:${option.kuota_default})` }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label for="periode" class="block mb-2 text-sm font-medium text-gray-900">Periode (tahun)<span class="text-red-600">*</span></label>
                            <input type="number" id="periode" v-model="request.periode" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        
                        <div>
                            <label for="kuota_default" class="block mb-2 text-sm font-medium text-gray-900">Kuota Default (Hari)<span class="text-red-600">*</span></label>
                            <input type="number" id="kuota_default" v-model="request.kuota_awal" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import { toast } from 'vue3-toastify';
import { JenisIzin } from '@/models/jenisIzinModel';
import { fetchJenisAll } from '@/services/jenisIzinService';
import { KuotaCutiReq } from '@/models/kuotaCutiModel';
import { addKuotaCuti } from '@/services/kuotaCutiService';

const router = useRouter();
const route = useRoute();
const loading = ref(false);


const request = ref<KuotaCutiReq>({
    jenis_izin_id: '',
    periode: 0,
    kuota_awal: 0
});
const jenisIzinOption = ref<JenisIzin[]>([]);

const goBack = () => {
    router.back();
};

const getjenisIzin = async () => {
    try {
        const response = await fetchJenisAll();
        jenisIzinOption.value = response.items;
    } catch (error) {
        console.error("Gagal mengambil data jenis izin:", error);
    }
}

const saveData = async () => {
    loading.value = true;
    try {
        const response = await addKuotaCuti(route.params.id as string, request.value as KuotaCutiReq);
        if (response.status === 201) {
            toast.success("Kuota Cuti baru berhasil ditambahkan.");
            router.back();
        }
    } catch (error) {
        console.error("Gagal menyimpan Kuota Cuti:", error);
        
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getjenisIzin();
});
</script>
