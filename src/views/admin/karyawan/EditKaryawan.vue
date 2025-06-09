<template>
    <BasePage>
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
                                <input id="tgl-lahir" type="date" v-model="user.data_pribadi.tgl_lahir" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="telepon" v-model="user.data_kontak.no_telepon" required
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
                            <input id="tgl-gabung" type="date" v-model="user.data_karyawan.tgl_gabung" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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

                    </div>
                    <div class="flex justify-end">
                        <div class="w-1/3 flex">
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="submit"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                        </div>
                    </div>
                </form>
                <div class="flex-[3]">
                    <div class="space-y-3">
                    </div>
                </div>
            </div>
        </div>
        <ReusableModal v-model:isOpen="ModalMandatoryfield" title="Harap Lengkapi Data"
            @close="ModalMandatoryfield = false">

            <ul>
                <li v-for="error in errors">
                    <p>{{ error }}</p>
                </li>
            </ul>

            <template #footer>
                <!-- <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-300 rounded">Tutup</button> -->
                <button @click="ModalMandatoryfield = false"
                    class="px-4 py-2 bg-red-500 text-white rounded">Close</button>
            </template>
        </ReusableModal>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { initUser, User, validateUserField } from '@/models/userModel';
import { JabatanConvert } from '@/models/jabatanModel';
import { fetchDetailKaryawan, fetchPosiblePIC, updateKaryawan } from '@/services/userService';
import { fetchJabatanAll } from '@/services/jabatanService';
import { fetchLokasiAll } from '@/services/lokasiService';
import { fetchjadwalAll } from '@/services/jadwalKerjaService';
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelSelect } from 'vue-search-select'
import { toast } from 'vue3-toastify';

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

onMounted(() => {
    getKaryawanById();
    getJabatan();
    getLokasi();
    getJadwalKerja();
})

watch(() => user.value.data_karyawan.jabatan_id, async (_oldValue, _newValue) => {
    console.log("Fetching Posible PIC for Jabatan ID:", user.value.data_karyawan.jabatan_id);

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

const getKaryawanById = async () => {
    user.value = await fetchDetailKaryawan(route.params.id as string)

    console.log(user.value);
}

const getJabatan = async () => {
    try {

        const response = await fetchJabatanAll();

        jabatanList.value = response.items.map(item => {
            return {
                value: item.id,
                text: item.nama
            }
        });

        console.log(jabatanList.value);
    } catch (error) {
        console.error(error)
    }
}

const getLokasi = async () => {
    try {

        const response = await fetchLokasiAll();

        lokasiList.value = response.items.map(item => {
            return {
                value: item.id,
                text: item.name
            }
        });

        console.log(lokasiList.value);
    } catch (error) {
        console.error(error)
    }
}

const getJadwalKerja = async () => {
    try {

        const response = await fetchjadwalAll();

        jadwalKerjaList.value = response.items.map(item => {
            return {
                value: item.id,
                text: item.shift
            }
        });

        console.log(jadwalKerjaList.value);
    } catch (error) {
        console.error(error)
    }
}

const goBack = () => {
    router.back();
};

const submitUpdateKaryawan = async () => {
    user.value.phone = user.value.data_kontak.no_telepon;

    errors.value = validateUserField(user.value)

    console.log("validate user errors:")
    console.log(errors)
    console.log(user.value)
    if (errors.value.length == 0) {
        const response = await updateKaryawan(route.params.id as string, user.value);

        if (response.status === 200) {
            toast.success("Success Add New Karyawan")
            getKaryawanById();
        }
    } else {
        ModalMandatoryfield.value = true;
    }
}


</script>