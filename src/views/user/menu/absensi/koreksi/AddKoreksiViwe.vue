<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" :show-back-button="true" />
        <div class="p-4">
            <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Koreksi Kehadiran</h2>
            <p class="text-sm text-slate-500 mb-6">Pilih tanggal untuk mengisi data absensi atau perbaiki data yang
                sudah ada.</p>

            <form @submit.prevent="submitKoreksi" class="space-y-5">


                <div class="relative">
                    <label for="tanggal" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Kehadiran</label>
                    <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                        <i class="fa-regular fa-calendar-days text-gray-500"></i>
                    </div>
                    <input id="tanggal" type="date" v-model="form.date" @change="checkExistingAttendance" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" />
                </div>


                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="relative">
                        <label for="waktuMasuk" class="block mb-2 text-sm font-medium text-gray-700">Waktu Masuk</label>
                        <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                            <i class="fa-regular fa-clock text-gray-500"></i>
                        </div>
                        <input id="waktuMasuk" type="datetime-local" v-model="form.time_in" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" />
                    </div>
                    <div class="relative">
                        <label for="waktuPulang" class="block mb-2 text-sm font-medium text-gray-700">Waktu
                            Pulang</label>
                        <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                            <i class="fa-regular fa-clock text-gray-500"></i>
                        </div>
                        <input id="waktuPulang" type="datetime-local" v-model="form.time_out" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" />
                    </div>
                </div>


                <div>
                    <label for="catatan" class="block mb-2 text-sm font-medium text-gray-700">Catatan Pengajuan
                        (Opsional)</label>
                    <textarea id="catatan" v-model="form.catatan_pengajuan"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                        placeholder="Contoh: Lupa melakukan absensi pulang."></textarea>
                </div>


                <button type="submit" :disabled="isSubmitting"
                    class="w-full flex justify-center items-center p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                    <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                    <span>{{ isSubmitting ? 'Mengirim...' : 'Ajukan Koreksi' }}</span>
                </button>
            </form>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { toast } from 'vue3-toastify';
import { KoreksiReq, initKoreksiReq } from '@/models/koreksiModel';
import { CreateKoreksiApi } from '@/services/koreksiService';
import { fetchAbsensiByDate } from '@/services/absensiService';

const router = useRouter();
const isSubmitting = ref(false);

const form = ref<KoreksiReq>(initKoreksiReq());

const checkExistingAttendance = async () => {
    if (!form.value.date) return;

    try {
        const params = { date: form.value.date };
        const existingData = await fetchAbsensiByDate(params);

        if (existingData) {
            toast.info("Data absensi ditemukan. Form diisi otomatis.");
            if (existingData.time_in) {
                form.value.time_in = existingData.time_in.replace(' ', 'T').substring(0, 16);
            }
            if (existingData.time_out) {
                form.value.time_out = existingData.time_out.replace(' ', 'T').substring(0, 16);
            }
            form.value.absensi_id = existingData.absensi_id;
        }
    } catch (error: any) {
        console.error("Gagal memeriksa absensi:", error);

        form.value.absensi_id = null;
        form.value.time_in = '';
        form.value.time_out = '';
    }
};

const submitKoreksi = async () => {
    if (form.value.time_in && form.value.time_out && new Date(form.value.time_out) <= new Date(form.value.time_in)) {
        toast.error("Waktu pulang harus setelah waktu masuk.");
        return;
    }

    isSubmitting.value = true;
    try {
        const payload: KoreksiReq = {
            ...form.value,
            time_in: form.value.time_in.replace('T', ' '),
            time_out: form.value.time_out.replace('T', ' '),
        };

        const response = await CreateKoreksiApi(payload);

        if (response.status === 201) {
            toast.success("Permintaan koreksi berhasil diajukan.");
            router.back();
        }
    } catch (error) {
        console.error("Gagal mengajukan koreksi:", error);
        toast.error("Gagal mengajukan koreksi. Silakan coba lagi.");
    } finally {
        isSubmitting.value = false;
    }
};
</script>
