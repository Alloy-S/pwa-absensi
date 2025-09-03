<template>
    <BasePageNoNav>
        <TopHeader title="Pengajuan Lembur" :show-back-button="true" />
        <div class="p-4">
            <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Pengajuan Lembur</h2>
            <p class="text-sm text-slate-500 mb-6">Silakan isi detail waktu dan keterangan untuk mengajukan lembur.</p>

            <form @submit.prevent="submitLembur" class="space-y-5">
                
                
                <div class="relative">
                    <label for="date-start" class="block mb-2 text-sm font-medium text-gray-700">Waktu Lembur Mulai<span class="text-red-600">*</span></label>
                    <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                        <i class="fa-regular fa-clock text-gray-500"></i>
                    </div>
                    <input id="date-start" type="datetime-local" v-model="form.date_start" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                         />
                </div>

                
                <div class="relative">
                    <label for="date-end" class="block mb-2 text-sm font-medium text-gray-700">Waktu Lembur Selesai<span class="text-red-600">*</span></label>
                     <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                        <i class="fa-regular fa-clock text-gray-500"></i>
                    </div>
                    <input id="date-end" type="datetime-local" v-model="form.date_end" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                         />
                </div>
                
                
                <div>
                    <label for="keterangan" class="block mb-2 text-sm font-medium text-gray-700">Keterangan / Alasan Lembur<span class="text-red-600">*</span></label>
                    <textarea id="keterangan" v-model="form.keterangan" required
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                        placeholder="Contoh: Menyelesaikan laporan bulanan."
                        ></textarea>
                </div>

                
                <button type="submit" :disabled="isSubmitting"
                    class="w-full flex justify-center items-center p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                    <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                    <span>{{ isSubmitting ? 'Mengirim...' : 'Ajukan Lembur' }}</span>
                </button>
            </form>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { LemburReq } from '@/models/lemburModel';
import { createLemburApi } from '@/services/lemburService';

const router = useRouter();

const form = ref<LemburReq>({
    date_start: '',
    date_end: '',
    keterangan: ''
});

const isSubmitting = ref(false);

const submitLembur = async () => {
    if (form.value.date_start && form.value.date_end && new Date(form.value.date_end) <= new Date(form.value.date_start)) {
        toast.error("Waktu selesai harus setelah waktu mulai.");
        return;
    }

    isSubmitting.value = true;
    try {
        const payload: LemburReq = {
            ...form.value,
            date_start: form.value.date_start.replace('T', ' ') + ':00',
            date_end: form.value.date_end.replace('T', ' ') + ':00',
        };

        await createLemburApi(payload);
        toast.success("Pengajuan lembur berhasil dikirim.");
        router.back();
    } catch (error) {
        console.error("Gagal mengirim pengajuan lembur:", error);
        toast.error("Gagal mengirim pengajuan lembur. Silakan coba lagi.");
    } finally {
        isSubmitting.value = false;
    }
};
</script>
