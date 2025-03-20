<template>
    <BasePageNoNav>
        <TopHeader title="Input Absensi Borongan" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold text-gray-700">Input Absensi Borongan</h1>

            <!-- Pilih Karyawan -->
            <div>
                <label class="block font-medium text-gray-600">Pilih Karyawan:</label>
                <select v-model="selectedWorker" class="w-full border-slate-300 p-2 rounded-md">
                    <option v-for="worker in workers" :key="worker.id" :value="worker">{{ worker.name }}</option>
                </select>
            </div>

            <!-- Pilih Tipe -->
            <div>
                <label class="block font-medium text-gray-600">Tipe:</label>
                <select v-model="selectedType" class="w-full border-slate-300 p-2 rounded-md">
                    <option value="harian">Harian</option>
                    <option value="borongan">Borongan</option>
                    <option value="harian borongan">1/2 Hari & Borongan</option>
                </select>
            </div>

            <!-- Input Borongan -->
            <div v-if="selectedType === 'borongan' || selectedType === 'harian borongan'" class="bg-gray-50 p-4 rounded-md">
                <label class="block font-medium text-gray-600">Barang yang dikerjakan:</label>
                <select v-model="selectedItem" class="w-full border p-2 rounded-md">
                    <option v-for="item in items" :key="item.id" :value="item">{{ item.name }}</option>
                </select>

                <label class="block font-medium text-gray-600 mt-2">Ton Normal:</label>
                <input type="number" v-model="tonNormal" class="w-full border p-2 rounded-md">

                <label class="block font-medium text-gray-600 mt-2">Ton Lembur:</label>
                <input type="number" v-model="tonLembur" class="w-full border p-2 rounded-md">
            </div>

            <!-- Tombol Tambah ke Tabel -->
            <button @click="addToTable"
                class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition">
                + Tambah ke Daftar
            </button>

            <!-- Tabel Data Input -->
            <div v-if="attendanceList.length > 0" class="mt-4">
                <h2 class="text-lg font-semibold text-gray-700">Daftar Absensi</h2>
                <div class="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table class="w-full border-collapse">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border p-2 text-left">Karyawan</th>
                                <th class="border p-2 text-left">Tipe</th>
                                <th class="border p-2 text-left">Barang</th>
                                <th class="border p-2 text-left">Ton Normal</th>
                                <th class="border p-2 text-left">Ton Lembur</th>
                                <th class="border p-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in attendanceList" :key="index">
                                <td class="border p-2">{{ entry.worker.name }}</td>
                                <td class="border p-2 capitalize">{{ entry.type }}</td>
                                <td class="border p-2">{{ entry.type === 'borongan' ? entry.item.name : '-' }}</td>
                                <td class="border p-2">{{ entry.type === 'borongan' ? entry.tonNormal : '-' }}</td>
                                <td class="border p-2">{{ entry.type === 'borongan' ? entry.tonLembur : '-' }}</td>
                                <td class="border p-2">
                                    <button @click="removeEntry(index)"
                                        class="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-700 transition">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tombol Simpan -->
            <button @click="saveData" class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700 transition">
                Simpan Absensi
            </button>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const workers = [
    { id: 1, name: 'Budi' },
    { id: 2, name: 'Ani' },
    { id: 3, name: 'Doni' },
];

const items = [
    { id: 1, name: 'Ayam Hidup' },
    { id: 2, name: 'Pakan Ayam' },
    { id: 3, name: 'Telur' },
];

const selectedWorker = ref(null);
const selectedType = ref('harian');
const selectedItem = ref(null);
const tonNormal = ref(0);
const tonLembur = ref(0);
const attendanceList = ref([]);

// Tambahkan ke daftar sementara
const addToTable = () => {
    if (!selectedWorker.value) {
        alert("Pilih karyawan terlebih dahulu!");
        return;
    }

    if (selectedType.value === 'borongan' && !selectedItem.value) {
        alert("Pilih barang yang dikerjakan!");
        return;
    }

    attendanceList.value.push({
        worker: selectedWorker.value,
        type: selectedType.value,
        item: selectedType.value === 'borongan' ? selectedItem.value : null,
        tonNormal: selectedType.value === 'borongan' ? tonNormal.value : 0,
        tonLembur: selectedType.value === 'borongan' ? tonLembur.value : 0,
    });

    // Reset input
    selectedWorker.value = null;
    selectedType.value = 'harian';
    selectedItem.value = null;
    tonNormal.value = 0;
    tonLembur.value = 0;
};

// Hapus entri dari tabel
const removeEntry = (index) => {
    attendanceList.value.splice(index, 1);
};

// Simpan data
const saveData = () => {
    console.log("Data yang disimpan:", attendanceList.value);
    alert("Data absensi berhasil disimpan!");
    attendanceList.value = []; // Reset daftar setelah disimpan
};
</script>
