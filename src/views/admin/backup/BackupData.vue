<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="my-5">
            <p class="text-3xl font-semibold text-slate-800">Manajemen Backup Data</p>
        </div>


        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <p class="text-lg font-semibold text-slate-700 mb-1">Backup & Hapus Data Periodik</p>
            <p class="text-sm text-slate-500 mb-4">
                Fitur ini akan mengarsipkan data transaksional dalam rentang tanggal yang dipilih, kemudian menghapus
                data tersebut secara permanen dari aplikasi. Gunakan dengan hati-hati.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div class="md:col-span-1">
                    <label for="periode-start" class="block mb-2 text-sm font-medium text-gray-700">Tanggal
                        Mulai</label>
                        <DatePicker v-model="(form.start_date as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="md:col-span-1">
                    <label for="periode-end" class="block mb-2 text-sm font-medium text-gray-700">Tanggal Akhir</label>
                    <DatePicker v-model="(form.end_date as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="md:col-span-1">
                    <button @click="confirmBackup"
                        class="flex w-full justify-center items-center gap-2 p-2.5 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 disabled:opacity-50"
                        :disabled="loading">
                        <i v-if="!loading" class="fa-solid fa-trash-can"></i>
                        <i v-else class="fa-solid fa-spinner animate-spin"></i>
                        <span>Mulai Proses Backup & Hapus</span>
                    </button>
                </div>
            </div>
        </div>


        <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="text-lg font-semibold text-slate-700 mb-4">Riwayat Backup</p>
            <DataTable :value="backupLogs" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[10, 25, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

               

                <Column field="date_created" header="Tanggal Dibuat" style="width: 20%">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.date_created) }}
                    </template>
                </Column>
                <Column header="Periode Backup" style="width: 25%">
                    <template #body="slotProps">
                        {{ slotProps.data.start_date }} - {{ slotProps.data.end_date }}
                    </template>
                </Column>
                <Column field="status" header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span class="inline-flex items-center gap-2 font-semibold" :class="getStatusClass(slotProps.data.status)">
                            <i class="fa-solid fa-circle text-xs"></i>
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column field="filename" header="File Backup" style="width: 25%">
                    <template #body="slotProps">
                        {{ slotProps.data.filename || '-' }}
                    </template>
                </Column>
                <Column header="Aksi" style="width: 15%" bodyClass="text-center">
                    <template #body="slotProps">
                        <span v-if="slotProps.data.status === 'IN PROGRESS' || slotProps.data.status === 'PENDING'"
                            class="text-gray-400 italic text-xs">
                            (Proses berjalan...)
                        </span>
                        <div v-else class="flex justify-center items-center gap-4">
                            <button v-if="slotProps.data.status === 'READY TO DOWNLOAD'" @click="downloadAndFinalize(slotProps.data)"
                                title="Unduh & Finalisasi" class="text-blue-600 hover:text-blue-800 text-lg">
                                <i class="fa-solid fa-download"></i>
                            </button>
                            <button v-if="slotProps.data.status === 'FAILED'" @click="showError(slotProps.data)" title="Lihat Error"
                                class="text-yellow-600 hover:text-yellow-800 text-lg">
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center py-5">
                        <p class="text-gray-500">Tidak ada data riwayat backup yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import {
    createBackupJob,
    fetchBackupPagiantion,
    downloadFileBackup,
    finalisasiBackupLog,
} from '@/services/backupService';
import { BackupJobReq, BackupLogs } from '@/models/backupModel';
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns';

const backupLogs = ref<BackupLogs[]>([]);
const confirm = useConfirm();
const loading = ref(false);
const totalRecords = ref(0);

const form = reactive<BackupJobReq>({
    start_date: '',
    end_date: '',
});

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const getBackupLogs = async () => {
    loading.value = true;
    try {
        const response = await fetchBackupPagiantion({
            page: lazyParams.value.page,
            size: lazyParams.value.rows
        });
        backupLogs.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat riwayat backup.");
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const triggerBackup = async () => {
    loading.value = true;
    try {
        form.start_date = format(form.start_date, 'yyyy-MM-dd');
        form.end_date = format(form.end_date, 'yyyy-MM-dd');    
        
        await createBackupJob(form);
        toast.success("Proses backup telah dimulai.");
        await getBackupLogs();
    } catch (error) {
        toast.error("Gagal memulai proses backup.");
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const downloadAndFinalize = async (log: BackupLogs) => {
    const toastId = toast.loading(`Mengunduh file ${log.filename}...`);
    try {
        const response = await downloadFileBackup(log.id);

        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', log.filename || 'backup.zip');
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
        toast.update(toastId, { render: "Unduhan berhasil! Memfinalisasi...", type: "success", isLoading: true, autoClose: false });

        await finalisasiBackupLog(log.id);

        toast.update(toastId, { render: "Backup telah difinalisasi!", type: "success", isLoading: false, autoClose: 3000 });
        await getBackupLogs();

    } catch (error) {
        console.error("Download/Finalize error:", error);
        toast.remove(toastId);
    }
};

onMounted(() => {
    getBackupLogs();
});

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getBackupLogs();
};

const confirmBackup = () => {
    if (!form.start_date || !form.end_date) {
        toast.warn("Silakan pilih Tanggal Mulai dan Tanggal Akhir.");
        return;
    }
    confirm.require({
        message: `Anda akan menghapus semua data transaksional dari ${format(form.start_date, 'yyyy-MM-dd')} hingga ${format(form.end_date, 'yyyy-MM-dd')}. Tindakan ini tidak bisa dibatalkan. Yakin ingin melanjutkan?`,
        header: 'Konfirmasi Aksi Berbahaya',
        icon: 'fa-solid fa-triangle-exclamation text-red-500',
        acceptLabel: 'Ya, Saya Mengerti',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: triggerBackup,
    });
};

const showError = (log: BackupLogs) => {
    confirm.require({
        message: log.error_message || 'Tidak ada detail error yang tersedia.',
        header: 'Detail Error',
        icon: 'fa-solid fa-circle-info',
        acceptLabel: 'Tutup',
        rejectClass: 'hidden',
    });
};


const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const getStatusClass = (status: BackupLogs['status']) => {
    switch (status) {
        case 'READY TO DOWNLOAD': return 'text-blue-600';
        case 'COMPLETED': return 'text-green-600';
        case 'IN PROGRESS': return 'text-orange-500';
        case 'FAILED': return 'text-red-600';
        case 'PENDING': return 'text-gray-500';
        default: return 'text-gray-500';
    }
};
</script>