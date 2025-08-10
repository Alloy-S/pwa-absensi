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
                <h3 class="font-semibold text-lg text-slate-700 border-b pb-2">Tambah Pekerjaan</h3>
                
               
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Tipe Pekerjaan</label>
                    <select v-model="entryForm.type" @change="resetEntryDetails" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option value="Harian">Harian</option>
                        <option value="Borongan">Borongan (Grup)</option>
                        <option value="Supir">Supir</option>
                    </select>
                </div>

                
                <div v-if="entryForm.type === 'Harian' || entryForm.type === 'Supir'" class="space-y-4 pt-4 border-t">
                    <select v-model="entryForm.user_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        <option disabled value="">-- Pilih Karyawan --</option>
                        <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.fullname }}</option>
                    </select>
                    <select v-model="entryForm.harga_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        <option disabled value="">-- Pilih Jenis Pekerjaan --</option>
                        <option v-for="harga in (entryForm.type === 'Harian' ? harianHargaList : supirHargaList)" :key="harga.id" :value="harga.id">{{ harga.nama }} ({{ formatCurrency(harga.harga_normal) }})</option>
                    </select>
                </div>

                
                <div v-if="entryForm.type === 'Borongan'" class="space-y-4 pt-4 border-t">
                    <select v-model="entryForm.harga_id" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                        <option disabled value="">-- Pilih Jenis Borongan --</option>
                        <option v-for="harga in boronganHargaList" :key="harga.id" :value="harga.id">{{ harga.nama }} ({{ formatCurrency(harga.harga_normal) }}/ton)</option>
                    </select>
                    <input type="number" v-model="entryForm.ton_total" placeholder="Total Tonase" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5">
                    
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Pilih Karyawan (Centang yang ikut)</label>
                        <div class="max-h-40 overflow-y-auto border rounded-lg p-2 space-y-1">
                            <div v-for="user in userList" :key="user.id" class="flex items-center">
                                <input :id="'user-'+user.id" type="checkbox" :value="user.id" v-model="entryForm.selected_user_ids" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                                <label :for="'user-'+user.id" class="ms-2 text-sm font-medium text-gray-900">{{ user.fullname }}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" @click="addToTable" class="w-full flex justify-center items-center p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                    <i class="fa-solid fa-plus mr-2"></i>
                    <span>Tambah ke Daftar</span>
                </button>
            </div>

            
            <div v-if="attendanceList.length > 0" class="mt-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Daftar Absensi untuk Disimpan</h3>
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <DataTable :value="attendanceList" responsiveLayout="scroll">
                        <Column field="userName" header="Karyawan"></Column>
                        <Column field="type" header="Tipe"></Column>
                        <Column field="hargaName" header="Jenis Pekerjaan"></Column>
                        <!-- <Column header="Tonase">
                            <template #body="slotProps">
                                {{ slotProps.data.ton_normal }}
                            </template>
                        </Column> -->
                        <Column header="Pendapatan">
                            <template #body="slotProps">
                               <span class="font-semibold text-blue-600">{{ formatCurrency(slotProps.data.totalHarga) }}</span>
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
                    <div class="text-right font-semibold mt-4 border-t pt-2">
                        Total Biaya: <span class="text-xl text-green-600">{{ formatCurrency(totalAmount) }}</span>
                    </div>
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
import { createApprovalBoronganApi } from '@/services/absensiBoronganService';
import { UserByPicItem } from '@/models/userModel';
import { HargaHarianBorongan } from '@/models/hargaHarianBorongan';
import { AbsensiBoronganReq, ItemBorongan } from '@/models/absensiBoronganModel';
import { fetchUserbyPic } from '@/services/userService';
import { fetchAllHarga } from '@/services/hargaHarianBorongan';

interface AttendanceEntry extends ItemBorongan {
    userName: string;
    hargaName: string;
    totalHarga: number;
}

const router = useRouter();

const formDate = ref(new Date().toISOString().split('T')[0]);
const userList = ref<UserByPicItem[]>([]);
const hargaList = ref<HargaHarianBorongan[]>([]);
const attendanceList = ref<AttendanceEntry[]>([]);
const isSubmitting = ref(false);

const initialEntryForm = {
    user_id: '',
    type: 'Harian',
    harga_id: '',
    ton_total: 0,
    selected_user_ids: [],
};
const entryForm = ref({ ...initialEntryForm });

const harianHargaList = computed(() => hargaList.value.filter(h => h.type === 'Harian'));
const boronganHargaList = computed(() => hargaList.value.filter(h => h.type === 'Borongan'));
const supirHargaList = computed(() => hargaList.value.filter(h => h.type === 'Supir'));
const totalAmount = computed(() => {
    return attendanceList.value.reduce((sum, item) => sum + (item.totalHarga || 0), 0);
});

const fetchInitialData = async () => {
    try {
        const [usersResponse, hargaResponse] = await Promise.all([fetchUserbyPic(), fetchAllHarga()]);
        userList.value = usersResponse.items;
        hargaList.value = hargaResponse.items;
    } catch (error) { toast.error("Gagal memuat data."); }
};


const formatCurrency = (value: number) => {
    if (value == null) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
};

const resetEntryDetails = () => {
    entryForm.value.user_id = '';
    entryForm.value.harga_id = '';
    entryForm.value.ton_total = 0;
    entryForm.value.selected_user_ids = [];
};

const addToTable = () => {
    const type = entryForm.value.type;

    if (type === 'Harian' || type === 'Supir') {
        if (!entryForm.value.user_id || !entryForm.value.harga_id) {
            toast.warn("Pilih karyawan dan jenis pekerjaan.");
            return;
        }
        const user = userList.value.find(u => u.id === entryForm.value.user_id);
        const harga = hargaList.value.find(h => h.id === entryForm.value.harga_id);
        attendanceList.value.push({
            user_id: user.id, userName: user.fullname, type: type,
            harga_id: harga.id, hargaName: harga.nama,
            ton_normal: 1, ton_lembur: 0,
            totalHarga: harga.harga_normal,
        });
    } else if (type === 'Borongan') {
        if (!entryForm.value.harga_id || entryForm.value.ton_total <= 0 || entryForm.value.selected_user_ids.length === 0) {
            toast.warn("Pilih jenis borongan, isi total tonase, dan centang minimal satu karyawan.");
            return;
        }
        const harga = hargaList.value.find(h => h.id === entryForm.value.harga_id);
        const userCount = entryForm.value.selected_user_ids.length;
        const totalGroupPrice = (harga.harga_normal * entryForm.value.ton_total);
        const pricePerUser = totalGroupPrice / userCount;
        const tonPerUser = parseFloat((entryForm.value.ton_total / userCount).toFixed(2));

        entryForm.value.selected_user_ids.forEach(userId => {
            const user = userList.value.find(u => u.id === userId);
            attendanceList.value.push({
                user_id: user.id, userName: user.fullname, type: 'Borongan',
                harga_id: harga.id, hargaName: harga.nama,
                ton_normal: tonPerUser, ton_lembur: 0,
                totalHarga: pricePerUser,
            });
        });
    }
    resetEntryDetails();
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
            details: attendanceList.value.map(item => ({
                user_id: item.user_id, type: item.type, harga_id: item.harga_id,
                ton_normal: Number(item.ton_normal) || 0,
                ton_lembur: Number(item.ton_lembur) || 0,
            }))
        };
        await createApprovalBoronganApi(payload);
        toast.success("Absensi berhasil disimpan.");
        router.back();
    } catch (error) {
        toast.error("Gagal menyimpan absensi.");
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(fetchInitialData);
</script>
