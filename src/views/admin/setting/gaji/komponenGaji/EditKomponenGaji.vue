<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Edit Komponen Gaji</p>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner animate-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat data komponen...</p>
            </div>

            <div v-else class="flex space-x-3">
                <div class="flex-[7] space-y-3">
                    <form @submit.prevent="simpan">
                        <div class="p-5 bg-white rounded-md shadow-md space-y-4">
                            <div>
                                <label for="kom_kode" class="block mb-2 text-sm font-medium text-gray-900">Kode
                                    Komponen<span class="text-red-600">*</span></label>
                                <input v-model="form.kom_kode" type="text" id="kom_kode" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            </div>

                            <div>
                                <label for="kom_name" class="block mb-2 text-sm font-medium text-gray-900">Nama
                                    Komponen<span class="text-red-600">*</span></label>
                                <input v-model="form.kom_name" type="text" id="kom_name" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            </div>

                            <div>
                                <label for="no_urut" class="block mb-2 text-sm font-medium text-gray-900">Nomor
                                    Urut<span class="text-red-600">*</span></label>
                                <input v-model.number="form.no_urut" type="number" id="no_urut" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            </div>

                            <div>
                                <label for="tipe" class="block mb-2 text-sm font-medium text-gray-900">Tipe
                                    Komponen<span class="text-red-600">*</span></label>
                                <select v-model="form.tipe" id="tipe" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled value="">Pilih salah satu</option>
                                    <option value="TUNJANGAN">Tunjangan (Pemasukan)</option>
                                    <option value="POTONGAN">Potongan</option>
                                </select>
                            </div>

                            <div>
                                <label for="hitung" class="block mb-2 text-sm font-medium text-gray-900">Cara
                                    Hitung<span class="text-red-600">*</span></label>
                                <select v-model="form.hitung" id="hitung" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled value="">Pilih salah satu</option>
                                    <option value="PERIODE">Periode</option>
                                    <option value="HARIAN">Harian</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-5 flex justify-end space-x-2">
                            <button type="button" @click="goBack"
                                class="text-red-500 border border-red-600 hover:bg-red-500 hover:text-white rounded-lg px-5 py-2.5">
                                Batal
                            </button>
                            <button type="submit" :disabled="isSubmitting"
                                class="text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 flex items-center disabled:bg-blue-300">
                                <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                                <span>Simpan Perubahan</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="flex-[3]"></div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { KomponenGaji } from '@/models/komponenGajiModel';
import { fetchKomGajiById, updateKomGaji } from '@/services/komponenGajiService';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const isSubmitting = ref(false);

const form = ref<KomponenGaji>({
    id:'',
    kom_kode: '',
    kom_name: '',
    no_urut: 0,
    tipe: '',
    hitung: '',
});

const getKomponenDetail = async (id: string) => {
    loading.value = true;
    try {
        const response = await fetchKomGajiById(id);
        form.value = response;
    } catch (error) {
        console.error("Gagal memuat detail komponen gaji.");
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.back();
};

const simpan = async () => {
    if (!form.value.kom_kode || !form.value.kom_name || !form.value.tipe || !form.value.hitung) {
        toast.error("Semua field yang ditandai (*) wajib diisi.");
        return;
    }

    isSubmitting.value = true;
    try {
        const id = route.params.id as string;
        await updateKomGaji(id, form.value);
        toast.success("Komponen gaji berhasil diperbarui.");
        router.push('/admin/pengaturan/gaji/komponen-gaji');
    } catch (error) {
        console.error("Gagal memperbarui komponen gaji:", error);
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    const id = route.params.id as string;
    getKomponenDetail(id);
    loading.value = false;
});
</script>
