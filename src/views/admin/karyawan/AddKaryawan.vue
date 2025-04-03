<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class=" text-3xl text-slate-800">Tambah Karyawan</p>
                <div class="w-1/3 flex">
                    <button type="button"
                        class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                    <button type="button"
                        class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                </div>
            </div>
            

            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg">Data User</p>
                        <div class="mb-6">
                            <label for="fullname"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="fullname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="text" id="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>

                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg">Data Pribadi</p>

                        <div class="mb-6">
                            <label for="gender"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis
                                Kelamin<span class="text-red-600">*</span></label>
                            <select id="gender"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div class="flex items-center space-x-3">
                            <div class="w-1/2 mb-6">
                                <label for="tmpt-lahir"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat
                                    Lahir<span class="text-red-600">*</span></label>
                                <input type="text" id="tmpt-lahir"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <div class="w-1/2 mb-6">
                                <label for="Tgl-lahir"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
                                    lahir<span class="text-red-600">*</span></label>
                                <input id="tgl-lahir" type="date"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                        </div>


                        <div class="mb-6">
                            <label for="status-kawin"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Kawin<span
                                    class="text-red-600">*</span></label>
                            <select id="status-kawin"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="belum kawin">Belum Kawin</option>
                                <option value="kawin">Kawin</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="agama"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agama<span
                                    class="text-red-600">*</span></label>
                            <select id="agama"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="kristen">Kristen</option>
                                <option value="katolik">Katolik</option>
                                <option value="islam">Islam</option>
                                <option value="buddha">Buddha</option>
                                <option value="konghucu">Konghucu</option>
                                <option value="hindu">Hindu</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="gol-darah"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Golongan
                                Darah</label>
                            <input type="text" id="gol-darah"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg">Data Kontak</p>
                        <div class="mb-6">
                            <label for="telepon"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Telepon<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="telepon"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="alamat"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                            <textarea id="alamat    " rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Alamat...."></textarea>
                        </div>
                        <div class="mb-6">
                            <label for="negara"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Negara<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="negara"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="provinsi"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provinsi<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="provinsi"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="mb-6">
                            <label for="kota-kab"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kota/Kabupaten<span
                                    class="text-red-600">*</span></label>
                            <input type="text" id="kota-kab"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <p class="mt-2 mb-4 text-lg">Data Karyawan</p>
                        <div class="mb-6">
                            <label for="nip"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP(Nomor Induk
                                Pegawai)</label>
                            <input type="text" id="nip"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6">
                            <div class="relative ">
                                <!-- Input -->
                                <input type="text" v-model="search" @keydown="handleKeydown" @input="filterResults"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Cari jabatan...." />

                                <!-- Dropdown -->
                                <ul v-show="filteredItems.length > 0" ref="isDropdownRef"
                                    class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                                    <li v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)"
                                        :class="{
                                            'bg-blue-500 text-white': index === selectedIndex,
                                            'hover:bg-gray-200 cursor-pointer': index !== selectedIndex
                                        }" class="p-2">
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class=" mb-6">
                            <label for="tgl-gabung"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
                                Gabung<span class="text-red-600">*</span></label>
                            <input id="tgl-gabung" type="date"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6">
                            <label for="status-kawin"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi Kerja<span
                                    class="text-red-600">*</span></label>
                            <select id="status-kawin"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="site A">Site A</option>
                                <option value="site B">Site B</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label for="status-kawin"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Pengganjian
                                Karyawan<span class="text-red-600">*</span></label>
                            <select id="status-kawin"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Pilih salah satu</option>
                                <option value="bulanan">Bulanan</option>
                                <option value="harian/borongan">Harian/Borongan</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div class="flex-[3]">
                    <div class="space-y-3">
                        <div class="p-3 bg-white rounded-md shadow-md">
                            <p class="mt-2 mb-4 text-lg">Data Kontak Darurat</p>
                            <div class="mb-6">
                                <label for="nama-kontak"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                                    Kontak</label>
                                <input type="text" id="nama-kontak"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="mb-6">
                                <label for="telepon-dar"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor
                                    Telepon</label>
                                <input type="text" id="telepon-dar"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="mb-6">
                                <label for="relasi"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relasi</label>
                                <input type="text" id="relasi"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const search = ref("");
const selectedIndex = ref(-1);
const items = ref(["Apple", "Banana", "Cherry", "Durian", "Grape", "Mango", "Orange"]);
const filteredItems = ref<string[]>([]);
const isDropdownRef = ref(null)

onClickOutside(isDropdownRef, () => {
    filteredItems.value = [];
    search.value = "";
});

const filterResults = () => {
    if (search.value) {
        filteredItems.value = items.value.filter(item =>
            item.toLowerCase().includes(search.value.toLowerCase())
        );
    } else {
        filteredItems.value = [];
    }
    selectedIndex.value = -1; // Reset index saat mengetik
};

const moveDown = () => {
    if (selectedIndex.value < filteredItems.value.length - 1) {
        selectedIndex.value++;
    }
};

const moveUp = () => {
    if (selectedIndex.value > 0) {
        selectedIndex.value--;
    }
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
        moveDown();
    } else if (event.key === "ArrowUp") {
        moveUp();
    } else if (event.key === "Enter") {
        selectItem();
    }
};

const selectItem = (item?: string) => {
    if (item) {
        search.value = item;
    } else if (selectedIndex.value !== -1) {
        search.value = filteredItems.value[selectedIndex.value];
    }
    filteredItems.value = []; // Sembunyikan dropdown setelah memilih
};
</script>