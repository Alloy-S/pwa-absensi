<template>
    <BasePageNoNav>
        <TopHeader title="Input Absensi Borongan" :show-back-button="true" />
        <div class="p-4">
            <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Absensi Borongan</h2>
            <p class="text-sm text-slate-500 mb-6">Input absensi untuk beberapa karyawan sekaligus dalam satu tanggal.</p>

            
            <div class="mb-5">
                <label for="main-date" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Absensi</label>
                <input id="main-date" type="date" v-model="formDate" required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            
            <div class="bg-white p-4 rounded-lg shadow-md space-y-4 border border-gray-200">
                <h3 class="font-semibold text-lg text-slate-700 border-b pb-2">Tambah Pekerjaan Karyawan</h3>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Pilih Karyawan</label>
                    <select v-model="entryForm.user_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option disabled value="">-- Pilih Karyawan --</option>
                        <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.fullname }}</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Tipe Absensi</label>
                    <select v-model="entryForm.type" @change="resetEntryDetails" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option v-for="type in attendanceTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                </div>

                
                <div class="space-y-4 pt-4 border-t">
                    
                    <div v-if="entryForm.type === 'Harian' || entryForm.type === '1/2 Hari'">
                         <label class="block mb-2 text-sm font-medium text-gray-700">Jenis Pekerjaan Harian</label>
                         <select v-model="entryForm.harga_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                             <option disabled value="">-- Pilih Pekerjaan --</option>
                             <option v-for="harga in harianHargaList" :key="harga.id" :value="harga.id">{{ harga.nama }}</option>
                         </select>
                    </div>

                    
                     <div v-if="entryForm.type === 'Supir'">
                         <label class="block mb-2 text-sm font-medium text-gray-700">Jenis Pekerjaan Supir</label>
                         <select v-model="entryForm.harga_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                             <option disabled value="">-- Pilih Pekerjaan --</option>
                             <option v-for="harga in supirHargaList" :key="harga.id" :value="harga.id">{{ harga.nama }}</option>
                         </select>
                    </div>

                    
                    <div v-if="entryForm.type === 'Borongan'" class="space-y-4">
                        <label class="block text-sm font-medium text-gray-700">Detail Borongan</label>
                        <select v-model="entryForm.harga_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                            <option disabled value="">-- Pilih Jenis Borongan --</option>
                            <option v-for="harga in boronganHargaList" :key="harga.id" :value="harga.id">{{ harga.nama }}</option>
                        </select>
                        <input type="number" v-model="entryForm.ton_normal" placeholder="Ton Normal" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        <input type="number" v-model="entryForm.ton_lembur" placeholder="Ton Lembur" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                    </div>
                </div>

                <button type="button" @click="addToTable" class="w-full flex justify-center items-center p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                    <i class="fa-solid fa-plus mr-2"></i>
                    <span>Tambah ke Daftar</span>
                </button>
            </div>


            <div v-if="attendanceList.length > 0" class="mt-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Daftar Karyawan untuk Disimpan</h3>
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <DataTable :value="attendanceList" responsiveLayout="scroll">
                        <Column field="userName" header="Karyawan"></Column>
                        <Column field="type" header="Tipe"></Column>
                        <Column field="hargaName" header="Jenis Pekerjaan"></Column>
                        <Column header="Tonase (N/L)">
                            <template #body="slotProps">
                                {{ slotProps.data.ton_normal }} / {{ slotProps.data.ton_lembur }}
                            </template>
                        </Column>
                        <Column header="Aksi">
                            <template #body="slotProps">
                                <button @click="removeEntry(slotProps.index)" class="p-2 text-red-500 hover:text-red-700">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            
            <div class="mt-6">
                 <button @click="saveData" :disabled="attendanceList.length === 0 || isSubmitting"
                    class="w-full flex justify-center items-center p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400">
                    <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                    <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Absensi' }}</span>
                </button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { AbsensiBoronganReq, ItemBorongan } from '@/models/absensiBoronganModel';
import { UserByPicItem } from '@/models/userModel';
import { HargaHarianBorongan } from '@/models/hargaHarianBorongan';
import { fetchUserbyPic } from '@/services/userService';
import { fetchAllHarga } from '@/services/hargaHarianBorongan';
import { createApprovalBoronganApi } from '@/services/absensiBoronganService';

interface AttendanceEntry extends ItemBorongan {
    userName: string;
    hargaName: string;
}

const router = useRouter();


const formDate = ref(new Date().toISOString().split('T')[0]);
const userList = ref<UserByPicItem[]>([]);
const hargaList = ref<HargaHarianBorongan[]>([]);
const attendanceList = ref<AttendanceEntry[]>([]);
const isSubmitting = ref(false);
const attendanceTypes = ['Harian', '1/2 Hari', 'Borongan', 'Supir'];

const initialEntryForm = {
    user_id: '',
    type: 'Harian',
    harga_id: '',
    ton_normal: 0,
    ton_lembur: 0,
};
const entryForm = ref({ ...initialEntryForm });


const harianHargaList = computed(() => hargaList.value.filter(h => h.type === 'Harian'));
const boronganHargaList = computed(() => hargaList.value.filter(h => h.type === 'Borongan'));
const supirHargaList = computed(() => hargaList.value.filter(h => h.type === 'Supir'));


const fetchInitialData = async () => {
    try {
        const [usersResponse, hargaResponse] = await Promise.all([fetchUserbyPic(), fetchAllHarga()]);
        userList.value = usersResponse.items;
        hargaList.value = hargaResponse.items;
    } catch (error) {
        toast.error("Gagal memuat data karyawan atau harga.");
    }
};


const resetEntryDetails = () => {
    entryForm.value.harga_id = '';
    entryForm.value.ton_normal = 0;
    entryForm.value.ton_lembur = 0;
};

const addToTable = () => {
    if (!entryForm.value.user_id) {
        toast.warn("Silakan pilih karyawan terlebih dahulu.");
        return;
    }
    const selectedUser = userList.value.find(u => u.id === entryForm.value.user_id);
    const type = entryForm.value.type;

    if (type === 'Harian' || type === '1/2 Hari' || type === 'Supir') {
        if (!entryForm.value.harga_id) {
            toast.warn(`Pilih jenis pekerjaan ${type}.`);
            return;
        }
        const hargaItem = hargaList.value.find(h => h.id === entryForm.value.harga_id);
        
        let tonNormalValue = 1;
        if (type === '1/2 Hari') {
            tonNormalValue = 0.5;
        }

        attendanceList.value.push({
            user_id: selectedUser.id,
            userName: selectedUser.fullname,
            type: type,
            harga_id: entryForm.value.harga_id,
            hargaName: hargaItem?.nama || '-',
            ton_normal: tonNormalValue,
            ton_lembur: 0,
        });
    } else if (type === 'Borongan') {
        if (!entryForm.value.harga_id) {
            toast.warn("Pilih jenis borongan.");
            return;
        }
        const hargaItem = hargaList.value.find(h => h.id === entryForm.value.harga_id);
        attendanceList.value.push({
            user_id: selectedUser.id,
            userName: selectedUser.fullname,
            type: 'Borongan',
            harga_id: entryForm.value.harga_id,
            hargaName: hargaItem?.nama || '-',
            ton_normal: Number(entryForm.value.ton_normal) || 0,
            ton_lembur: Number(entryForm.value.ton_lembur) || 0,
        });
    }
    
    
    const currentUserId = entryForm.value.user_id;
    entryForm.value = { ...initialEntryForm, user_id: currentUserId };
};

const removeEntry = (index: number) => {
    attendanceList.value.splice(index, 1);
};

const saveData = async () => {
    if (attendanceList.value.length === 0 || !formDate.value) {
        toast.error("Tanggal dan daftar absensi harus diisi.");
        return;
    }
    isSubmitting.value = true;
    try {
        const payload: AbsensiBoronganReq = {
            date: formDate.value,
            details: attendanceList.value.map(item => {
                
                let backendType = item.type;
                if (item.type === '1/2 Hari') {
                    backendType = 'Harian';
                }
                
                return {
                    user_id: item.user_id,
                    type: backendType,
                    harga_id: item.harga_id,
                    ton_normal: Number(item.ton_normal) || 0,
                    ton_lembur: Number(item.ton_lembur) || 0,
                };
            })
        };
        await createApprovalBoronganApi(payload);
        toast.success("Absensi berhasil disimpan dan diajukan.");
        router.back();
    } catch (error) {
        console.error("Gagal menyimpan absensi:", error);
        toast.error("Gagal menyimpan absensi. Silakan coba lagi.");
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(fetchInitialData);
</script>
