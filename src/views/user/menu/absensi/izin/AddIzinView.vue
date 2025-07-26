<template>
    <BasePageNoNav>
        <TopHeader title="Pengajuan Izin" :show-back-button="true" />
        <div class="p-4">
            <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Pengajuan Izin</h2>
            <p class="text-sm text-slate-500 mb-6">Silakan isi detail di bawah ini untuk mengajukan izin.</p>

            <form @submit.prevent="submitIzin" class="space-y-5">
                
                <div class="relative">
                    <label for="tanggal-mulai" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Izin Mulai</label>
                    <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                        <i class="fa-regular fa-calendar-days text-gray-500"></i>
                    </div>
                    <input id="tanggal-mulai" type="date" v-model="form.tgl_izin_start" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                         />
                </div>

                
                <div class="relative">
                    <label for="tanggal-selesai" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Izin Selesai</label>
                     <div class="absolute inset-y-0 start-0 top-8 flex items-center ps-3.5 pointer-events-none">
                        <i class="fa-regular fa-calendar-days text-gray-500"></i>
                    </div>
                    <input id="tanggal-selesai" type="date" v-model="form.tgl_izin_end" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                         />
                </div>

                
                <div>
                    <label for="jenisIzin" class="block mb-2 text-sm font-medium text-gray-700">Jenis Izin</label>
                    <select id="jenisIzin" v-model="form.jenis_izin_id" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                        <option disabled value="">Pilih jenis izin</option>
                        <option v-for="jenis in jenisIzinList" :key="jenis.id" :value="jenis.id">
                            {{ jenis.nama }}
                        </option>
                    </select>
                    
                </div>

                
                <div>
                    <label for="catatan" class="block mb-2 text-sm font-medium text-gray-700">Keterangan / Alasan</label>
                    <textarea id="catatan" v-model="form.keterangan"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                        placeholder="Contoh: Keperluan keluarga mendadak."
                        ></textarea>
                </div>

                
                <button type="submit" :disabled="isSubmitting"
                    class="w-full flex justify-center items-center p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                    <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                    <span>{{ isSubmitting ? 'Mengirim...' : 'Ajukan Izin' }}</span>
                </button>
            </form>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { CreateIzinApi } from '@/services/izinService';
import { IzinReq } from '@/models/izinModel';
import { JenisIzin } from '@/models/jenisIzinModel';
import { fetchJenisAll } from '@/services/jenisIzinService';

const router = useRouter();

const form = ref<IzinReq>({
    tgl_izin_start: '',
    tgl_izin_end: '',
    jenis_izin_id: '',
    keterangan: ''
});

const jenisIzinList = ref<JenisIzin[]>([]);
const isSubmitting = ref(false);

const getJenisIzin = async () => {
    try {
        const response = await fetchJenisAll();
        jenisIzinList.value = response.items;
    } catch (error) {
        toast.error("Gagal memuat daftar jenis izin.");
    }
};

const submitIzin = async () => {
    if (!form.value.tgl_izin_start && !form.value.tgl_izin_end) return;

    isSubmitting.value = true;
    try {
        await CreateIzinApi(form.value);
        toast.success("Pengajuan izin berhasil dikirim.");
        router.back();
    } catch (error) {
        console.error("Gagal mengirim pengajuan izin:", error);
        toast.error("Gagal mengirim pengajuan izin. Silakan coba lagi.");
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    getJenisIzin();
});
</script>
