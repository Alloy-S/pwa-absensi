<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Edit Karyawan</p>
            </div>


            <div class="flex space-x-3">

                <form class="mb-10 flex-[7] space-y-3" @submit.prevent="submitUpdateKaryawan">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg font-semibold">Data User</p>
                        <div class="mb-6">
                            <label for="fullname"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="fullname" v-model="user.fullname" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>

                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg font-semibold">Data Pribadi</p>

                        <div class="mb-6">
                            <label for="gender"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis
                                Kelamin<span class="text-red-600">*</span></label>
                            <select id="gender" v-model="user.data_pribadi.gender" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Pilih salah satu</option>
                                <option value="Laki-Laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div class="flex items-center space-x-3">
                            <div class="w-1/2 mb-6">
                                <label for="tmpt-lahir"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat
                                    Lahir<span class="text-red-600">*</span></label>
                                <input type="text" id="tmpt-lahir" v-model="user.data_pribadi.tmpt_lahir" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <div class="w-1/2 mb-6">
                                <label for="Tgl-lahir"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
                                    lahir<span class="text-red-600">*</span></label>
                                <DatePicker v-model="(user.data_pribadi.tgl_lahir as any)" dateFormat="dd/mm/yy"
                                    class="w-full" />
                            </div>

                        </div>


                        <div class="mb-6">
                            <label for="status-kawin"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Kawin<span
                                    class="text-red-600">*</span></label>
                            <select id="status-kawin" v-model="user.data_pribadi.status_kawin" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="Belum Kawin">Belum Kawin</option>
                                <option value="Kawin">Kawin</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="agama"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agama<span
                                    class="text-red-600">*</span></label>
                            <select id="agama" v-model="user.data_pribadi.agama" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Islam">Islam</option>
                                <option value="Buddha">Buddha</option>
                                <option value="Konghucu">Konghucu</option>
                                <option value="Hindu">Hindu</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="gol-darah"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Golongan
                                Darah</label>
                            <input type="text" id="gol-darah" v-model="user.data_pribadi.gol_darah"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg font-semibold">Data Kontak</p>
                        <div class="mb-6">
                            <label for="telepon"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon <span class="text-red-500">(wajib untuk tipe karyawan bulanan)</span></label>
                            <input type="text" id="telepon" v-model="user.data_kontak.no_telepon"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="alamat"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat<span
                                    class="text-red-600">*</span></label>
                            <textarea id="alamat" rows="4" v-model="user.data_kontak.alamat" required
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Alamat...."></textarea>
                        </div>
                        <p class="mt-2 mb-4 text-lg font-semibold">Data Kontak Darurat</p>
                        <div class="mb-6">
                            <label for="nama-kontak"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                                Kontak</label>
                            <input type="text" id="nama-kontak" v-model="user.data_kontak.nama_darurat"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="telepon-dar"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor
                                Telepon</label>
                            <input type="text" id="telepon-dar" v-model="user.data_kontak.no_telepon_darurat"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="relasi"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relasi</label>
                            <input type="text" id="relasi" v-model="user.data_kontak.relasi_darurat"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg font-semibold">Data Karyawan</p>
                        <div class="mb-6">
                            <label for="jabatan"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan<span
                                    class="text-red-600">*</span></label>
                            <ModelSelect id="jabatan" :options="jabatanList" v-model="user.data_karyawan.jabatan_id"
                                placeholder="Pilih Jabatan" />
                        </div>

                        <div class="mb-6">
                            <label for="pic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIC
                                Karyawan<span class="text-red-600">*</span></label>
                            <ModelSelect id="pic" :options="userPosiblePIC" v-model="user.data_karyawan.user_pic_id"
                                placeholder="Pilih PIC" :isDisabled="isSelectPIC" />
                        </div>

                        <div class=" mb-6">
                            <label for="tgl-gabung"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
                                Gabung<span class="text-red-600">*</span></label>
                            <DatePicker v-model="(user.data_karyawan.tgl_gabung as any)" dateFormat="dd/mm/yy"
                                class="w-full" />
                        </div>

                        <div class="mb-6">
                            <label for="lokasi"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi Kerja<span
                                    class="text-red-600">*</span></label>
                            <ModelSelect id="lokasi" :options="lokasiList" v-model="user.data_karyawan.lokasi_id"
                                placeholder="Pilih Lokasi" />
                        </div>

                        <div class="mb-6">
                            <label for="jadwal-kerja"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jadwal Kerja<span
                                    class="text-red-600">*</span></label>
                            <ModelSelect id="jadwal-kerja" :options="jadwalKerjaList"
                                v-model="user.data_karyawan.jadwal_kerja_id" placeholder="Pilih Shift Kerja" />
                        </div>

                        <div class="mb-6">
                            <label for="tipe-karyawan"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Pengganjian
                                Karyawan<span class="text-red-600">*</span></label>
                            <select id="tipe-karyawan" v-model="user.data_karyawan.tipe_karyawan" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="bulanan">Bulanan</option>
                                <option value="harian/borongan">Harian/Borongan</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label for="grup-gaji" class="block mb-2 text-sm font-medium text-gray-900">Grup
                                Gaji</label>
                            <ModelSelect id="grup-gaji" :options="grupGajiList"
                                v-model="user.data_karyawan.grup_gaji_id" placeholder="Pilih Grup Gaji" />
                        </div>

                        <div class="mb-6">
                            <label for="gaji-pokok" class="block mb-2 text-sm font-medium text-gray-900">Gaji
                                Pokok</label>
                            <input type="number" id="gaji-pokok" v-model="user.data_karyawan.gaji_pokok"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>

                        <div class="mb-6">
                            <label for="tipe-karyawan"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode Pengenalan Wajah<span class="text-red-600">*</span></label>
                            <select id="tipe-karyawan" v-model="user.data_karyawan.face_recognition_mode" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="NORMAL">Normal</option>
                                <option value="RENDAH">Rendah</option>
                                <option value="MATI">Mati</option>
                            </select>
                        </div>

                    </div>
                    <div class="flex justify-end">
                        <div class="w-1/3 flex">
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="submit" :disabled="loading"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><i v-if="loading" class="fa-solid fa-spinner animate-spin mr-2"></i> Simpan</button>
                        </div>
                    </div>
                </form>
                <div class="flex-[3]">
                    <div class="space-y-3">
                        <div class="bg-white p-3 rounded-md shadow-md">
                            <p class="mt-2 mb-4 text-lg font-semibold">Resend Data Login</p>
                            <p class="mb-4 text-sm">Noted: <i class="text-red-600">Password akan diperbarui secara
                                    otomatis dan password lama tidak dapat digunakan</i></p>
                            <button type="button" @click="confirmResendLogin(user.id)"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Resend</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="ModalMandatoryfield" modal header="Harap Lengkapi Data" :style="{ width: '30rem' }">

            <ul>
                <li v-for="(error, index) in errors" :key="index" class="mb-2">
                    <span class="p-error">{{ index + 1 }}. {{ error }}</span>
                </li>
            </ul>

            <template #footer>
                <Button label="Close" icon="pi pi-times" @click="ModalMandatoryfield = false" autofocus
                    class="p-button-danger" />
            </template>
        </Dialog>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { initUser, User, validateUserField } from '@/models/userModel';
import { JabatanConvert } from '@/models/jabatanModel';
import { fetchDetailKaryawan, fetchPosiblePIC, updateKaryawan, resendLoginData } from '@/services/userService';
import { fetchJabatanAll } from '@/services/jabatanService';
import { fetchLokasiAll } from '@/services/lokasiService';
import { fetchjadwalAll } from '@/services/jadwalKerjaService';
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelSelect } from 'vue-search-select'
import { toast } from 'vue3-toastify';
import { format } from 'date-fns';
import 'vue3-toastify/dist/index.css';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { fetchAllGrupGaji } from '@/services/GrupGajiService';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';

const router = useRouter();
const route = useRoute();
const user = ref<User>(initUser())
const ModalMandatoryfield = ref(false);
const errors = ref<String[]>([])
const jabatanList = ref<JabatanConvert[]>([])
const lokasiList = ref([])
const jadwalKerjaList = ref([])
const userPosiblePIC = ref([]);
const isSelectPIC = ref(true)
const grupGajiList = ref<{ value: string, text: string }[]>([])
const confirm = useConfirm();
const loading = ref(false);

onMounted(() => {
    fetchInitialData();
    getKaryawanById();
})

watch(() => user.value.data_karyawan.jabatan_id, async (_oldValue, _newValue) => {

    const repsonse = await fetchPosiblePIC(user.value.data_karyawan.jabatan_id);

    userPosiblePIC.value = repsonse.map(item => {
        return {
            value: item.id,
            text: `${item.fullname} (${item.jabatan})`
        }
    });

    if (userPosiblePIC.value.length > 0) {
        isSelectPIC.value = false
    } else {
        isSelectPIC.value = true
    }
});

const fetchInitialData = async () => {
    const [jabatanRes, lokasiRes, jadwalRes, grupGajiRes] = await Promise.all([
        fetchJabatanAll(),
        fetchLokasiAll(),
        fetchjadwalAll(),
        fetchAllGrupGaji()
    ]);

    jabatanList.value = jabatanRes.items.map(item => {
        return {
            value: item.id,
            text: item.nama
        }
    });

    lokasiList.value = lokasiRes.items.map(item => {
        return {
            value: item.id,
            text: item.name
        }
    });

    jadwalKerjaList.value = jadwalRes.items.map(item => {
        return {
            value: item.id,
            text: item.shift
        }
    });

    grupGajiList.value = grupGajiRes.map(item => {
        return {
            value: item.id,
            text: item.grup_name
        }
    })


}

const hitResendLoginData = async (id: string) => {
    const toastId = toast.loading("Resend Login Data...");
    const response = await resendLoginData(id);

    if (response.status === 200) {
        toast.update(toastId, {
            render: "Sukses Resend Login Data!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
        });
    }
}

const confirmResendLogin = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin mengirim ulang data login karyawan ini?',
        header: 'Konfirmasi Kirim Ulang Data Login',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Kirim Ulang',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => hitResendLoginData(id),
    });
};

const getKaryawanById = async () => {
    user.value = await fetchDetailKaryawan(route.params.id as string)

    console.log(user.value);
}

const goBack = () => {
    router.back();
};

const submitUpdateKaryawan = async () => {
    loading.value = true;
    user.value.phone = user.value.data_kontak.no_telepon;

    errors.value = validateUserField(user.value)

    console.log(errors)
    console.log(user.value)
    if (errors.value.length == 0) {
        user.value.data_pribadi.tgl_lahir = format(user.value.data_pribadi.tgl_lahir, 'yyyy-MM-dd')
        user.value.data_karyawan.tgl_gabung = format(user.value.data_karyawan.tgl_gabung, 'yyyy-MM-dd')
        const response = await updateKaryawan(route.params.id as string, user.value);

        if (response.status === 200) {
            loading.value = false;
            toast.success("Success Edit Karyawan")
            getKaryawanById();
        }
    } else {
        ModalMandatoryfield.value = true;
    }
}


</script>