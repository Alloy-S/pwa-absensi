<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">{{ !request.is_deleted? 'Edit': 'View' }} Harga Harian Borongan</p>
            </div>

            <div class="flex space-x-3">
                <div class="flex-[7] space-y-3">
                    <form @submit.prevent="editHarga" class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="type" class="block mb-2 text-sm font-medium text-gray-900">Tipe Harga<span
                                    class="text-red-600">*</span></label>
                            <select id="type" v-model="tipeHarga" required :disabled="request.is_deleted"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option disabled value="">Pilih salah satu</option>
                                <option value="Harian">Harian</option>
                                <option value="Borongan">Borongan</option>
                                <option value="Supir">Supir</option>
                            </select>

                            <label for="nama" class="block my-2 text-sm font-medium text-gray-900">Nama
                                    Pekerjaan<span class="text-red-600">*</span></label>
                                <input type="text" id="nama" v-model="request.nama" required :readonly="request.is_deleted"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        </div>

                        
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Harga {{ tipeHarga == 'Borongan'? '(per tonase)':'' }}<span
                                    class="text-red-600">*</span></label>
                            <input type="number" v-model="request.harga_normal" required :readonly="request.is_deleted"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>        

                        <div v-if="!request.is_deleted" class="mt-5 flex justify-end">
                            <div class="w-1/3 flex">
                                <button type="button" @click="goBack"
                                    class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Batal</button>
                                <button type="submit" :disabled="loading"
                                    class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-blue-300 disabled:cursor-not-allowed">
                                    <i v-if="loading" class="fa-solid fa-spinner animate-spin mr-2"></i> Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="flex-[3]">
                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { HargaHarianBorongan, initHargaHarianBorongan } from '@/models/hargaHarianBorongan';
import { fetchHargaById, updateHarga } from '@/services/hargaHarianBorongan';

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const tipeHarga = ref<string>('');

const request = ref<Partial<HargaHarianBorongan>>(initHargaHarianBorongan());

const goBack = () => {
    router.back();
}

onMounted(() => {
    getHargaData()
})


const getHargaData = async () => {
    try {
        request.value = await fetchHargaById(route.params.id as string)

        tipeHarga.value = request.value.type

    } catch (error) {
        console.error(error)
    }
}

const editHarga = async () => {
    loading.value = true;
    try {
        const payload = {
            nama: request.value.nama,
            harga_normal: request.value.harga_normal || 0,
            type: tipeHarga.value
        };

        const response = await updateHarga(route.params.id as string, payload);

        if (response.status === 200) {
            toast.success("Data harga berhasil Diperbarui");
            router.replace('/admin/pengaturan/harga-harian-borongan/'+ response.data.id);
        }
    } catch (error: any) {
        console.error("Gagal menyimpan data:", error);
    } finally {
        loading.value = false;
    }
}
</script>
