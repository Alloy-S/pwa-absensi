<template>
    <BasePageNoNav>
        <TopHeader title="Detail Reimburse" />
        <div class="p-4 space-y-6">
            <!-- Informasi Reimburse -->
            <div class="space-y-2 rounded-md shadow-sm p-4 bg-white">
                <h1 class="text-lg font-semibold">Detail Pengajuan Reimburse</h1>
                <p><strong>Tanggal:</strong> {{ reimburse.date }}</p>
                <p><strong>Jumlah:</strong> Rp{{ reimburse.amount.toLocaleString() }}</p>
                <p><strong>Keterangan:</strong> {{ reimburse.description }}</p>
                <p><strong>Status:</strong> <span>{{ reimburse.status }}</span></p>
            </div>

            <!-- Tabel Detail Barang -->
            <div class="rounded-md shadow-sm bg-white p-4">
                <h2 class="text-md font-semibold mb-4">Detail Barang</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full border border-gray-200 text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="border px-4 py-2 text-left">Nama Barang</th>
                                <th class="border px-4 py-2 text-center">Jumlah</th>
                                <th class="border px-4 py-2 text-right">Harga</th>
                                <th class="border px-4 py-2 text-right">Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in reimburse.items" :key="index">
                                <td class="border px-4 py-2">{{ item.name }}</td>
                                <td class="border px-4 py-2 text-center">{{ item.qty }}</td>
                                <td class="border px-4 py-2 text-right">Rp{{ item.price.toLocaleString() }}</td>
                                <td class="border px-4 py-2 text-right">Rp{{ (item.price * item.qty).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Gambar Bukti Reimburse -->
            <div class="rounded-md shadow-sm bg-white p-4 space-y-2">
                <h2 class="text-md font-semibold">Bukti Reimburse</h2>
                <img
                    :src="reimburse.image"
                    alt="Bukti Reimburse"
                    class="w-full max-w-sm mx-auto rounded-md shadow"
                />
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';

const route = useRoute();

const reimburse = ref({
    id: route.params.id,
    date: '2025-03-12',
    amount: 500000,
    description: 'Pembelian alat kerja',
    status: 'Pending',
    image: 'https://via.placeholder.com/400x300?text=Bukti+Reimburse', // Gambar bukti
    items: [
        {
            name: 'Obeng Set',
            qty: 1,
            price: 150000,
        },
        {
            name: 'Sarung Tangan',
            qty: 2,
            price: 100000,
        },
        {
            name: 'Masker',
            qty: 5,
            price: 50000,
        },
    ],
});
</script>
