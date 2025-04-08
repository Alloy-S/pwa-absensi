<template>
    <BasePage>
        <div class="flex">
            <div class="flex-[7] space-y-5">


                <div class="mb-10 mt-5 flex justify-between items-start">
                    <h1 class="text-3xl font-semibold text-slate-800">Edit Group Gaji</h1>
                </div>

                <!-- Form Group -->
                <div class="p-3 bg-white rounded-md shadow-md space-y-4">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Kode Group<span
                                class="text-red-600">*</span></label>
                        <input v-model="group.kode" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nama Group<span
                                class="text-red-600">*</span></label>
                        <input v-model="group.nama" type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                </div>

                <!-- Komponen Gaji -->
                <div>
                    <h2 class="text-xl font-semibold text-slate-700 mb-3">Komponen Gaji</h2>
                    <div v-for="(komponen, index) in group.komponen" :key="index"
                        class="p-3 bg-white rounded-md shadow-md mb-5 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Kode Komponen</label>
                                <input v-model="komponen.kode" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Nama Komponen</label>
                                <input v-model="komponen.nama" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Cara Hitung</label>
                                <select v-model="komponen.hitung"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled value="">Pilih salah satu</option>
                                    <option value="periode">Periode</option>
                                    <option value="harian">Harian</option>
                                </select>
                            </div>
                        </div>

                        <!-- Kondisi -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-900">Kondisi</label>
                            <div class="space-y-2">
                                <label class="text-sm">
                                    <input type="checkbox" @click="handleKondisiToggle(index)"
                                        v-model="komponen.kondisi.use" class="mr-2" /> Gunakan Kondisi
                                </label>
                                <div v-if="komponen.kondisi.use" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input v-model="komponen.kondisi.dasar" type="text" placeholder="Gunakan apa"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <input v-model="komponen.kondisi.field" type="text" placeholder="Field"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <input v-model="komponen.kondisi.min" type="number" placeholder="Min Value"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <input v-model="komponen.kondisi.max" type="number" placeholder="Max Value"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <label class="text-sm col-span-2">
                                        <input type="checkbox" v-model="komponen.kondisi.nextIfNotMatch" class="mr-2" />
                                        Lanjut jika tidak
                                        match
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Rumus -->
                        <div>
                            <label class="block mb-1 text-sm font-medium text-gray-900">Rumus</label>
                            <div class="space-y-2">
                                <label class="text-sm">
                                    <input type="checkbox" @click="handleRumusToggle(index)"
                                        v-model="komponen.rumus.use" class="mr-2" /> Gunakan Rumus
                                </label>
                                <div v-if="komponen.rumus.use" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input v-model="komponen.rumus.dasar" type="text" placeholder="Gunakan apa"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    <input v-model="komponen.rumus.field" type="text" placeholder="Field"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                                </div>
                            </div>
                            <div class="flex justify-evenly items-center space-x-4 mt-2">
                                <div class="w-1/2">

                                    <label class="block mb-2 text-sm font-medium text-gray-900">Cara Hitung</label>
                                    <select v-model="komponen.operasi"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option disabled selected>Pilih salah satu</option>
                                        <option value="*">*</option>
                                        <option value="/">/</option>
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                    </select>
                                </div>
                                <div class="w-1/2">

                                    <label class="block mb-2 text-sm font-medium text-gray-900">Cara Hitung</label>
                                    <input v-model="komponen.nominal" type="number" placeholder="Nominal"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                            </div>


                        </div>

                        <!-- Hapus Komponen -->
                        <div class="flex justify-end">
                            <button @click="removeKomponen(index)" type="button"
                                class="text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">Hapus
                                Komponen</button>
                        </div>
                    </div>

                    <!-- Tambah Komponen -->
                    <div class="mt-5">
                        <button @click="addKomponen" type="button"
                            class="text-blue-500 hover:text-white border border-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">+
                            Tambah Komponen</button>
                    </div>
                </div>

                <!-- Tombol Simpan -->
                <div class="mt-5 flex justify-end">
                    <div class="w-1/3 flex">
                        <button type="button" @click="goBack"
                            class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Batal</button>
                        <button type="button"
                            class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Simpan</button>
                    </div>
                </div>

                <div class="mb-20"></div>
            </div>
            <div class="flex-[3]"></div>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const goBack = () => {
    router.back();
}


const group = ref({
    kode: '',
    nama: '',
    komponen: [] as any[]
})

const addKomponen = () => {
    group.value.komponen.push({
        kode: '',
        nama: '',
        hitung: '',
        nominal: 0,
        operasi: '*',
        kondisi: {
            use: false,
            dasar: '',
            field: '',
            min: null,
            max: null,
            nextIfNotMatch: false
        },
        rumus: {
            use: false,
            dasar: '',
            field: '',
            operasi: '*',
            nominal: null
        }
    })
}

const handleKondisiToggle = (index: number) => {
    const komponen = group.value.komponen[index]
    komponen.kondisi.use = !komponen.kondisi.use
    if (komponen.kondisi.use) {
        komponen.rumus.use = false
    }
}

const handleRumusToggle = (index: number) => {
    const komponen = group.value.komponen[index]
    komponen.rumus.use = !komponen.rumus.use
    if (komponen.rumus.use) {
        komponen.kondisi.use = false
    }
}



const removeKomponen = (index: number) => {
    group.value.komponen.splice(index, 1)
}
</script>