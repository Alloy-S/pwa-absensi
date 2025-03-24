<template>
    <BasePage>
        <div class="p-4">
            <!-- Profile -->
            <div class="flex mt-4">
                <div class="flex items-center justify-center">
                    <div class="p-6 rounded-full bg-slate-500"></div>
                </div>

                <div class="ml-4">
                    <p>Alloysius Steven</p>
                    <p class="font-semibold">Staff</p>
                </div>
            </div>

            <!-- Kehadiaran -->
            <div>
                <div class="bg-white rounded-lg shadow mt-6 overflow-hidden">
                    <div class="p-4">
                        <div class="flex justify-between items-center">
                            <h3 class="font-semibold text-gray-800">Kehadiran</h3>

                        </div>
                        <div class="mt-2">
                            <div class="flex justify-between items-center">
                                <p class="text-gray-600 text-sm">Hari ini</p>
                                <p class="text-gray-600 text-sm"><span class="font-semibold">Shift</span>:
                                    Normal(08:00-16:00)</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <p class="font-semibold text-gray-800">Masuk: 08:00</p>
                                <p class="font-semibold text-gray-800">Keluar: 17:00</p>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-3">
                    <div class="flex justify-around items-center">
                        <button class="py-3 w-full hover:bg-blue-100">Masuk</button>
                        <button class="py-3 w-full  hover:bg-blue-100">Pulang</button>
                    </div>

                </div>
            </div>

            <!-- Tabs -->
            <div class="flex justify-between mt-10 bg-white rounded-lg shadow">
                <button v-for="(tab, index) in tabs" :key="index" class="py-3 w-full rounded-md font-medium"
                    :class="activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600'" @click="activeTab = tab">
                    {{ tab }}
                </button>
            </div>

            <!-- Kehadiran / Pengumuman -->
            <div class="mt-4">

                <div v-if="activeTab === 'Pengumuman'">
                    <div v-for="(announcement, index) in pengumuman" :key="index"
                        class="bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-blue-500">
                        <h3 class="font-semibold text-gray-800">{{ announcement.title }}</h3>
                        <p class="text-gray-600 text-sm">{{ announcement.content }}</p>
                    </div>
                    <button
                        class="w-full py-2 border-2 rounded-md text-blue-500 hover:text-white hover:bg-blue-500 hover:border-0">
                        Lihat Semua</button>
                </div>
                <div v-if="activeTab === 'Waiting Approval'">
                    <div v-for="(approval, index) in approvals" :key="index">
                        <CardApproval :approval="approval" />
                    </div>
                    <button
                        class="w-full py-2 border-2 rounded-md text-blue-500 hover:text-white hover:bg-blue-500 hover:border-0">
                        Lihat Semua</button>
                </div>
            </div>

            <!-- applly bottom margin -->
            <div class="mb-10"></div>
        </div>
        <div>
            <ReusableModal v-model:isOpen="isModalOpen" title="Pemberitahuan" @close="isModalOpen = false">
                <p>Wajah belum Terdaftar</p>
                <p>Lakukan Pendaftar Wajah Sekarang</p>

                <template #footer>
                    <!-- <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-300 rounded">Tutup</button> -->
                    <button @click="isModalOpen = false" class="px-4 py-2 bg-blue-500 text-white rounded">Lanjut</button>
                </template>
            </ReusableModal>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/user/BasePage.vue';
import ReusableModal from '@/components/ReusableModal.vue';
import { ref } from 'vue';
import CardApproval from '@/components/CardApproval.vue';

const tabs = ref(['Pengumuman', 'Waiting Approval']);
const activeTab = ref('Pengumuman');
const isModalOpen = ref(true);

const approvals = ref([
    { date: 'Apr 15, 2023 - Apr 18, 2023', approvedBy: 'Martin Deo', status: 'Waiting Approval', request: 'Koreksi Kehadiran' },
    { date: 'Apr 15, 2023 - Apr 18, 2023', approvedBy: 'Martin Deo', status: 'Approved', request: 'Reimburse' },
    { date: 'Apr 15, 2023 - Apr 18, 2023', approvedBy: 'Martin Deo', status: 'Declined', request: 'Lembur' }
]);

const pengumuman = ref([
    { title: 'Libur Nasional', content: 'Perusahaan akan libur pada tanggal 17 Agustus.' },
    { title: 'Update Sistem', content: 'Aplikasi akan mengalami maintenance pada jam 22:00 WIB.' },
    { title: 'Update Sistem', content: 'Aplikasi akan mengalami maintenance pada jam 22:00 WIB.' }
]);
</script>