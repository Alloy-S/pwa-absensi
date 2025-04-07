<template>
    <BasePage>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-semibold text-slate-800">Detail Izin</h1>
                    <p class="text-sm text-gray-500">Informasi pengajuan izin karyawan.</p>
                </div>
                <button @click="goBack" class="text-sm text-blue-600 hover:underline">
                    ← Kembali
                </button>
            </div>

            <div class="bg-white shadow rounded-lg p-5 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="font-medium text-slate-600">Jenis Izin:</span>
                        {{ izin.jenis_izin }}
                    </div>
                    <div>
                        <span class="font-medium text-slate-600">Tanggal Pengajuan:</span>
                        {{ izin.tgl_pengajuan }}
                    </div>
                    <div>
                        <span class="font-medium text-slate-600">Tanggal Izin:</span>
                        {{ izin.tgl_izin }}
                    </div>
                    <div>
                        <span class="font-medium text-slate-600">Status:</span>
                        <span :class="{
                            'text-green-600': izin.status === 'Disetujui',
                            'text-yellow-600': izin.status === 'Menunggu',
                            'text-red-600': izin.status === 'Ditolak',
                        }">
                            {{ izin.status }}
                        </span>
                    </div>
                    <div class="md:col-span-2">
                        <span class="font-medium text-slate-600">Keterangan:</span>
                        {{ izin.keterangan }}
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()

// Data dummy, bisa diganti dengan hasil fetch dari backend
const izin = ref({
    jenis_izin: 'Sakit',
    tgl_pengajuan: '2025-04-05',
    tgl_izin: '2025-04-06',
    keterangan: 'Demam tinggi dan istirahat di rumah',
    status: 'Disetujui'
})
</script>