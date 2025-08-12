<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Edit Grup Gaji</p>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner animate-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat data grup gaji...</p>
            </div>

            <form v-else @submit.prevent="simpan" class="flex flex-col lg:flex-row lg:space-x-5">

                <div class="flex-[7] space-y-5">

                    <div class="p-5 bg-white rounded-md shadow-md space-y-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Kode Grup<span
                                    class="text-red-600">*</span></label>
                            <input v-model="form.grup_kode" type="text" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900">Nama Grup<span
                                    class="text-red-600">*</span></label>
                            <input v-model="form.grup_name" type="text" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>


                    <div>
                        <h2 class="text-xl font-semibold text-slate-700 mb-3">Komponen Gaji</h2>
                        <div v-if="form.komponen.length === 0"
                            class="text-center text-sm text-gray-500 p-6 border-2 border-dashed rounded-lg">
                            Belum ada komponen ditambahkan. Klik "Tambah Komponen" untuk memulai.
                        </div>
                        <div v-for="(komponen, index) in form.komponen" :key="index"
                            class="p-4 bg-white rounded-md shadow-md mb-5 space-y-4 border relative">

                            <button @click="removeKomponen(index)" type="button"
                                class="absolute -top-3 -right-3 bg-red-500 text-white rounded-full h-7 w-7 flex items-center justify-center hover:bg-red-600">
                                <i class="fa-solid fa-times"></i>
                            </button>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Pilih Komponen</label>
                                    <select v-model="komponen.kom_id" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option disabled value="">-- Pilih --</option>
                                        <option v-for="item in masterKomponen" :key="item.id" :value="item.id">{{
                                            item.kom_name }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Cara Hitung</label>
                                    <select v-model="komponen.hitung" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option disabled value="">-- Pilih --</option>
                                        <option value="PERIODE">Periode</option>
                                        <option value="HARIAN">Harian</option>
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                    <Checkbox v-model="komponen.use_kondisi" :binary="true"
                                        @change="handleKondisiToggle(index)" />
                                    <span>Gunakan Kondisi (Syarat)</span>
                                </label>
                                <div v-if="komponen.use_kondisi"
                                    class="mt-2 p-3 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select v-model="komponen.kode_kondisi"
                                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                        <option disabled value="">-- Pilih Dasar Kondisi --</option>
                                        <option v-for="field in calculationFields" :key="field.kode"
                                            :value="field.kode">{{ field.name }}</option>
                                    </select>
                                    <input v-model.number="komponen.min_kondisi" type="number"
                                        placeholder="Nilai Minimal"
                                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                    <input v-model.number="komponen.max_kondisi" type="number"
                                        placeholder="Nilai Maksimal"
                                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                </div>
                            </div>


                            <div>
                                <label class="flex items-center space-x-2 text-sm font-medium text-gray-900">
                                    <Checkbox v-model="komponen.use_formula" :binary="true"
                                        @change="handleRumusToggle(index)" />
                                    <span>Gunakan Rumus (Dasar Pengali)</span>
                                </label>
                                <div v-if="komponen.use_formula" class="mt-2 p-3 bg-gray-50 rounded-lg">
                                    <select v-model="komponen.kode_formula"
                                        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                        <option disabled value="">-- Pilih Dasar Rumus --</option>
                                        <option v-for="field in calculationFields" :key="field.kode"
                                            :value="field.kode">{{ field.name }}</option>
                                    </select>
                                </div>
                            </div>


                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Operasi Matematika<span
                                            class="text-red-600">*</span></label>
                                    <select v-model="komponen.operation_sum" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="*">*</option>
                                        <option value="/">/</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Nilai Uang<span
                                            class="text-red-600">*</span></label>
                                    <input v-model.number="komponen.nilai_uang" type="number" required
                                        placeholder="Nilai Uang"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                </div>
                            </div>
                        </div>
                        <button @click="addKomponen" type="button"
                            class="w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition">
                            <i class="fa-solid fa-plus mr-2"></i>Tambah Komponen
                        </button>
                    </div>
                </div>


                <div class="flex-[3] space-y-3 mt-5 lg:mt-0">
                    <div class="bg-white p-5 rounded-md shadow-md">
                        <h3 class="font-semibold text-slate-700 mb-3">Aksi</h3>
                        <div class="flex flex-col space-y-2">
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-5 py-2.5 flex items-center justify-center disabled:bg-blue-300">
                                <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                                <span>Simpan Perubahan</span>
                            </button>
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 border border-red-600 hover:bg-red-500 hover:text-white rounded-lg px-5 py-2.5">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import Checkbox from 'primevue/checkbox';
import { KomponenGaji } from '@/models/komponenGajiModel';
import { GrupGaji, KodePerhitungan } from '@/models/GrupGajiModel';
import { fetchAllKomponen } from '@/services/komponenGajiService';
import { fetchAllKodePerhitungan, fetchGrupGajiById, updateGrupGaji } from '@/services/GrupGajiService';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const isSubmitting = ref(false);
const masterKomponen = ref<KomponenGaji[]>([]);
const calculationFields = ref<KodePerhitungan[]>([]);

const form = ref<GrupGaji>({
    id: '',
    grup_kode: '',
    grup_name: '',
    komponen: [],
});

const fetchInitialData = async () => {
    loading.value = true;
    try {
        const id = route.params.id as string;
        const [komponenRes, kodeRes, grupGajiRes] = await Promise.all([
            fetchAllKomponen(),
            fetchAllKodePerhitungan(),
            fetchGrupGajiById(id)
        ]);
        masterKomponen.value = komponenRes;
        calculationFields.value = kodeRes;

        form.value.grup_kode = grupGajiRes.grup_kode;
        form.value.grup_name = grupGajiRes.grup_name;
        form.value.komponen = grupGajiRes.komponen;

    } catch (error) {
        toast.error("Gagal memuat data untuk formulir.");
    } finally {
        loading.value = false;
    }
};

const addKomponen = () => {
    form.value.komponen.push({
        kom_id: '',
        use_kondisi: false,
        kode_kondisi: '',
        min_kondisi: 0,
        max_kondisi: 0,
        use_formula: false,
        kode_formula: '',
        operation_sum: '*',
        nilai_uang: 0,
        hitung: 'PERIODE',
    });
};

const removeKomponen = (index: number) => {
    form.value.komponen.splice(index, 1);
};

const handleKondisiToggle = (index: number) => {
    if (form.value.komponen[index].use_kondisi) {
        form.value.komponen[index].use_formula = false;
    }
};

const handleRumusToggle = (index: number) => {
    if (form.value.komponen[index].use_formula) {
        form.value.komponen[index].use_kondisi = false;
    }
};

const goBack = () => {
    router.back();
};

const simpan = async () => {
    if (!form.value.grup_kode || !form.value.grup_name) {
        toast.error("Kode dan Nama Grup wajib diisi.");
        return;
    }

    for (const [index, komponen] of form.value.komponen.entries()) {
        if (!komponen.kom_id || !komponen.hitung || !komponen.operation_sum) {
            toast.error(`Harap lengkapi semua field wajib di Komponen #${index + 1}.`);
            return;
        }
        if (komponen.use_kondisi && !komponen.kode_kondisi) {
            toast.error(`Pilih dasar kondisi untuk Komponen #${index + 1}.`);
            return;
        }
        if (komponen.use_formula && !komponen.kode_formula) {
            toast.error(`Pilih dasar rumus untuk Komponen #${index + 1}.`);
            return;
        }
    }

    isSubmitting.value = true;
    try {
        const id = route.params.id as string;
        await updateGrupGaji(id, form.value);
        toast.success("Grup gaji berhasil diperbarui.");
        router.push('/admin/pengaturan/gaji/grup-gaji');
    } catch (error) {
        toast.error("Gagal menyimpan perubahan.");
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    fetchInitialData();
});
</script>
