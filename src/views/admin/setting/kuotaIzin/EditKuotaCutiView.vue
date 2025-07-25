<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Edit Kuota Cuti</p>
            </div>

            <div class="flex space-x-3">
                <div class="flex-[7] space-y-3">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div class="p-6 bg-white rounded-lg shadow-md col-span-1 md:col-span-2">
                            <h3 class="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">Informasi Kuota Cuti</h3>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p class="text-slate-500">Nama Jenis Izin</p>
                                    <p class="font-medium text-slate-800">{{ kuotaCuti.jenis_izin.nama }}</p>
                                </div>
                                <div>
                                    <p class="text-slate-500">periode</p>
                                    <p class="font-medium text-slate-800">{{ kuotaCuti.periode || '-' }}</p>
                                </div>
                                
                            </div>
                        </div>

                    </div>
                    <form @submit.prevent="saveData" class="p-4 bg-white rounded-md shadow-md space-y-4">
                        <div>
                            <label for="kuota_default" class="block mb-2 text-sm font-medium text-gray-900">Kuota Cuti
                                (Hari)<span class="text-red-600">*</span></label>
                            <input type="number" id="kuota_default" v-model="request.kuota_awal" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        <div>
                            <label for="kuota_default" class="block mb-2 text-sm font-medium text-gray-900">Kuota
                                Terpakai (Hari)<span class="text-red-600">*</span></label>
                            <input type="number" id="kuota_default" v-model="request.kuota_terpakai" required
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
import { initKuotaCuti, KuotaCuti, KuotaCutiUpdateReq } from '@/models/kuotaCutiModel';
import { updateKuotaCuti, fetchDetailKuota } from '@/services/kuotaCutiService';

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const kuotaCuti = ref<KuotaCuti>(initKuotaCuti())
const request = ref<KuotaCutiUpdateReq>({
    kuota_awal: 0,
    kuota_terpakai: 0,
});

const goBack = () => {
    router.back();
};

const getKuotaCuti = async () => {
    try {
        const response = await fetchDetailKuota(route.params.kuota_id as string);
        kuotaCuti.value = response;

        request.value.kuota_awal = kuotaCuti.value.kuota_awal;
        request.value.kuota_terpakai = kuotaCuti.value.kuota_terpakai;

    } catch (error) {
        console.error("Error fetching kuota cuti:", error);
    }
}

const saveData = async () => {
    loading.value = true;
    try {
        const response = await updateKuotaCuti(route.params.kuota_id as string, request.value as KuotaCutiUpdateReq);
        if (response.status === 200) {
            toast.success("Kuota Cuti Bersasil diperbarui.");
            router.back();
        }
    } catch (error) {
        console.error("Gagal update Kuota Cuti:", error);

    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getKuotaCuti();
});
</script>
