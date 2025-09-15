<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" :show-back-button="true" />
        <div class="p-4">
            <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Koreksi Kehadiran</h2>
            <p class="text-sm text-slate-500 mb-6">Pilih tanggal untuk mengisi data absensi atau perbaiki data yang
                sudah ada.</p>

            <form @submit.prevent="submitKoreksi" class="space-y-5">


                <div class="relative">
                    <label for="tanggal" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Kehadiran<span
                            class="text-red-600">*</span></label>
                    <DatePicker v-model="(form.date as any)" model-type="yyyy-mm-dd" :enable-time-picker="false"
                        dateFormat="dd/mm/yy" class="w-full" @update:model-value="checkExistingAttendance" />
                </div>


                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="relative">
                        <label for="waktuMasuk" class="block mb-2 text-sm font-medium text-gray-700">Waktu Masuk<span
                                class="text-red-600">*</span></label>
                        <DatePicker v-model="timeInPicker" timeOnly id="waktuMasuk" hourFormat="24"
                            class="w-full" placeholder="HH:mm" :disabled="!form.date" />
                    </div>
                    <div class="relative">
                        <label for="waktuPulang" class="block mb-2 text-sm font-medium text-gray-700">Waktu
                            Pulang<span class="text-red-600">*</span></label>
                        <DatePicker v-model="timeOutPicker" timeOnly id="waktuKeluar" hourFormat="24"
                            class="w-full" placeholder="HH:mm" :disabled="!form.date" />
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
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns';
import { fetchAbsensiByDate } from '@/services/absensiService';
import { useOfflineStore } from '@/stores/offlineStore';

const router = useRouter();
const isSubmitting = ref(false);
const offlineStore = useOfflineStore();

const form = ref<KoreksiReq>(initKoreksiReq());
const timeInPicker = ref<Date | null>(null);
const timeOutPicker = ref<Date | null>(null);



const checkExistingAttendance = async () => {
    if (!form.value.date) return;

    if (!offlineStore.isOnline) {
        toast.info("Anda sedang offline, data absensi sebelumnya tidak dapat dimuat.");
        timeInPicker.value = null;
        timeOutPicker.value = null;
        return;
    }

    try {
        const params = { date: format(form.value.date, 'yyyy-MM-dd') };

        const existingData = await fetchAbsensiByDate(params);

        if (existingData) {
            toast.info("Data absensi ditemukan. Form diisi otomatis.");

            timeInPicker.value = null;
            timeOutPicker.value = null;

            form.value.absensi_id = existingData.absensi_id;

            if (existingData.time_in) {
                timeInPicker.value = new Date(existingData.time_in);
            }

            if (existingData.time_out) {
                timeOutPicker.value = new Date(existingData.time_out);
            }
            
        }
    } catch (error: any) {
        console.error("Gagal memeriksa absensi:", error);

        form.value.absensi_id = null;
        timeInPicker.value = null;
        timeOutPicker.value = null;
    }
};

const submitKoreksi = async () => {
    if (!form.value.date) {
        toast.error("Tanggal kehadiran harus diisi.");
        return;
    }

    if (timeInPicker.value && timeOutPicker.value && timeOutPicker.value <= timeInPicker.value) {
        toast.error("Waktu pulang harus setelah waktu masuk.");
        return;
    }

    if (!timeInPicker.value || !timeOutPicker.value) {
        toast.error("Waktu masuk dan waktu pulang wajib diisi.");
        return;
    }

    isSubmitting.value = true;
    try {
        
        const dateString = format(form.value.date, 'yyyy-MM-dd');

        const payload: KoreksiReq = {
            ...form.value,
            date: dateString,
            time_in: dateString + " " + format(timeInPicker.value, 'HH:mm'),
            time_out: dateString + " " + format(timeOutPicker.value, 'HH:mm'),
        };

        console.log(payload);

        await offlineStore.submitKoreksi(payload);

        router.back();
    } catch (error) {
        console.error("Gagal mengajukan koreksi:", error);
        toast.error("Gagal mengajukan koreksi. Silakan coba lagi.");
    } finally {
        isSubmitting.value = false;
    }
};
</script>
