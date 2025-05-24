<template>
    <BasePage>
        <div class="space-y-3">
            <div class="mb-10 mt-5 flex justify-between items-start">
                <p class="text-3xl font-semibold text-slate-800">Tambah Jadwal Kerja</p>

            </div>


            <div class="flex space-x-3">

                <div class="flex-[7] space-y-3">
                    <div class="p-3 bg-white rounded-md shadow-md">
                        <div class="mb-6">
                            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                                Jabatan<span class="text-red-600">*</span></label>
                            <input type="text" id="nama" v-model="nama"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>

                        <div class="mb-6">
                            <label for="jabatan"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">jabatan
                                Diatasnya</label>
                            <ModelSelect :options="options" v-model="selected" placeholder="Pilih Jabatan" />
                        </div>
                    </div>
                    <div class="mt-5 flex justify-end">

                        <div class="w-1/3 flex">
                            <button type="button" @click="goBack"
                                class="w-full text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-600">Batal</button>
                            <button type="button" @click="createJabatan"
                                class="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                        </div>
                    </div>
                </div>
                <div class="flex-[3]">

                </div>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'
import "vue-search-select/dist/VueSearchSelect.css"
import { ModelSelect } from 'vue-search-select'
import { onMounted, ref } from 'vue'
import { addJabatan, fetchJabatanAll } from '@/services/jabatanService'
import { JabatanAll } from '@/models/jabatanModel'
import { toast } from 'vue3-toastify'

const selected = ref<string>(null)
const jabatanList = ref<JabatanAll>({ items: [] })
const options = ref([])
const nama = ref<string>('');

const router = useRouter();

const goBack = () => {
    router.back();
}

const getAllJabatan = async () => {
    try {
        jabatanList.value = await fetchJabatanAll()

        options.value = jabatanList.value.items.map((item) => ({
            value: item.id,
            text: item.nama,
        }))
    } catch (error) {
        console.error(error)
    }
}

const createJabatan = async () => {

    const request = {
        parent_id: selected.value,
        nama: nama.value,
    }

    const response = await addJabatan(request);

    if (response.status === 201) {
        toast.success("Success Add New Jabatan")
        setTimeout(() => {
            router.back();
        }, 1500);
    }

    console.log('Jabatan added:', selected.value);

}

onMounted(() => {
    // Initialize any required data or perform actions on component mount
    getAllJabatan();
});



</script>