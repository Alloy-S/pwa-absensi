<template>
    <BasePage>

        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Jadwal Kerja</p>
        </div>

        <div class="flex justify-between mb-5">

            <div class="flex items-center max-w-md">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full mr-3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text" id="simple-search" v-model="search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Cari..." required />
                </div>
            </div>

            <div>
                <button type="button" @click="addShift"
                    class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-plus"></i>
                    <span class="">Tambah</span>
                </button>
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Kode
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" class="w-1/4 px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in jadwalList.items" :key="item.id"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.kode }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.shift }}
                        </td>
                        <td class="px-6 py-4 space-x-3">
                            <a @click="editItem(item.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            <a @click="deletejad(item.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>



        </div>
        <div class="mb-16 flex justify-end mt-4">


            <nav aria-label="Page navigation example" v-if="pages > 1">
                <ul class="inline-flex -space-x-px text-sm">

                    <li>
                        <button @click="changePage(page - 1)" :disabled="page === 1"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                        </button>
                    </li>

                    <li v-for="n in pages" :key="n">

                        <button @click="changePage(n)" :class="[
                            'flex items-center justify-center px-3 h-8 leading-tight border border-gray-300',
                            n === page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        ]">
                            {{ n }}
                        </button>
                    </li>

                    <li>
                        <button @click="changePage(page + 1)" :disabled="page === pages"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    </li>

                </ul>
            </nav>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { ref, onMounted, watch } from 'vue'
import { JadwalKerjaPagination } from '@/models/jadwalModel'
import { deletejadwal, fetchjadwalPagination } from '@/services/jadwalKerjaService'

const router = useRouter()
const jadwalList = ref<JadwalKerjaPagination>({ pages:1, total: 0, items: [] });
const pages = ref(1);
const page = ref(1);
const search = ref('');
let debounceTimer: any = null;

const addShift = () => {
    router.push('jadwal-kerja/add');
}

const editItem = (id: any) => {
    router.push('jadwal-kerja/' + id);
}

const changePage = (newPage: number) => {
    page.value = newPage
    getJadwal()
}

const getJadwal = async () => {
    try {

        const params = {
            page: page.value,
            search: search.value
        }

        const response = fetchjadwalPagination(params)

        jadwalList.value = (await response);
        pages.value = Number((await response).pages);

        console.log(jadwalList.value);
    } catch (error) {
        console.error(error)
    }
}

const deletejad = async (id: string) => {
    try {
        // Perform the delete logic here
        console.log('Delete item with id:', id);

        const response = await deletejadwal(id);

        if (response.status === 200) {
            toast.success("Success Delete Jadwal Kerja")
            getJadwal()
        }
    } catch (error) {
        console.error(error)
        toast.error(error.response.data.message);
    }
}

watch(search, (_newVal, _oldVal) => {
    
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        page.value = 1 
        getJadwal()
        console.log('search', search.value)

    }, 1000); 
})

onMounted(() => {
    getJadwal()
})
</script>