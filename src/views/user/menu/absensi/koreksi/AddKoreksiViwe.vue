<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" />
        <div class="p-4">
            <h2 class="text-xl font-semibold mb-4 text-slate-800">Ajukan Koreksi Kehadiran</h2>

            <form @submit.prevent="submitKoreksi" class="bg-white p-4 rounded-lg shadow-md space-y-4">
                
                <div class="mb-4">
                    <label for="tanggal" class="block text-sm font-medium text-gray-700">Tanggal Kehadiran<span class="text-red-600">*</span></label>
                    <input id="tanggal" type="date" v-model="form.date" @change="checkExistingAttendance" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </div>

                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="waktuMasuk" class="block text-sm font-medium text-gray-700">Waktu Masuk<span class="text-red-600">*</span></label>
                        <input id="waktuMasuk" type="datetime-local" v-model="form.time_in" required
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label for="waktuPulang" class="block text-sm font-medium text-gray-700">Waktu Pulang<span class="text-red-600">*</span></label>
                        <input id="waktuPulang" type="datetime-local" v-model="form.time_out" required
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                
                <div class="mb-4">
                    <label for="catatan" class="block text-sm font-medium text-gray-700">Catatan Pengajuan</label>
                    <textarea id="catatan" v-model="form.catatan_pengajuan" class="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                        placeholder="Masukkan catatan jika diperlukan"></textarea>
                </div>

                
                <div class="flex justify-end space-x-3">
                    <button type="button" @click="router.back()"
                        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Batal
                    </button>
                    <button type="submit" :disabled="loading"
                        class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300">
                        <span v-if="loading">Mengirim...</span>
                        <span v-else>Ajukan Koreksi</span>
                    </button>
                </div>
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
const loading = ref(false);

const form = ref<KoreksiReq>(initKoreksiReq());


const checkExistingAttendance = async () => {
    if (!form.value.date) return;
    
    try {
        const params = { date: form.value.date };
        const existingData = await fetchAbsensiByDate(params);
        
        
        if (existingData) {
            toast.info("Data absensi ditemukan untuk tanggal ini. Form akan diisi otomatis.");
            
            if (existingData.time_in) {
                form.value.time_in = existingData.time_in.replace(' ', 'T').substring(0, 16);
            }
            if (existingData.time_out) {
                form.value.time_out = existingData.time_out.replace(' ', 'T').substring(0, 16);
            }
            form.value.absensi_id = existingData.absensi_id;
        }
    } catch (error: any) {
        
        if (error.response && error.response.status === 404) {
            
            toast.info("Tidak ada data absensi untuk tanggal ini.");
            form.value.absensi_id = null;
            form.value.time_in = '';
            form.value.time_out = '';
        } else {
            
            console.error("Gagal memeriksa absensi yang ada:", error);
            form.value.absensi_id = null;
            form.value.time_in = '';
            form.value.time_out = '';
        }
    }
};

const submitKoreksi = async () => {
    
    if (!form.value.date || !form.value.time_in || !form.value.time_out) {
        toast.error("Tanggal, waktu masuk, dan waktu pulang wajib diisi.");
        return;
    }
    
    loading.value = true;
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
    } finally {
        loading.value = false;
    }
};
</script>
