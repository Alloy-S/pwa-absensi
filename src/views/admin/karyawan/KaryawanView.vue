<template>
    <BasePage>

        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Karyawan Terdaftar</p>
            <div class="">

                <form class="flex items-center max-w-md mx-auto">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input type="text" id="simple-search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Cari Nama..." required />
                    </div>
                    <button type="submit"
                        class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </form>


            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nama Karyawan
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Lokasi
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Jabatan
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in karyawanList.items" :key="item.id"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ item.fullname }}
                        </th>
                        <td class="px-6 py-4">
                            {{ item.lokasi }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.jabatan }}
                        </td>
                        <td class="px-6 py-4">
                            Aktif
                        </td>
                        <td class="px-6 py-4 space-x-3">
                            <a @click="goToDetail(item.id)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            <a @click="submitNonActiveKaryawan(item.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Non Aktif</a>
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
import { ref, onMounted } from 'vue';
import { KaryawanPagination } from '@/models/userModel';
import { fetchKaryawanPagination, nonActiveKaryawan } from '@/services/userService';
import { toast } from 'vue3-toastify';

const router = useRouter();
const karyawanList = ref<KaryawanPagination>({ pages: 1, total: 0, items: [] });
const pages = ref(1);
const page = ref(1);
const search = ref('');

const goToDetail = (id: any) => {
    router.push(`karyawan/${id}`);
}

const changePage = (newPage: number) => {
    page.value = newPage
    getKaryawan()
}

const getKaryawan = async () => {


    const params = {
        page: page.value,
        search: search.value
    }

    const response = fetchKaryawanPagination(params)

    karyawanList.value = (await response);
    pages.value = Number((await response).pages);

    console.log(karyawanList.value);

}

const submitNonActiveKaryawan = async (id: string) => {
    const response = nonActiveKaryawan(id)

    if ((await response).status === 200) {
        toast.success('Karyawan berhasil dinonaktifkan');
        getKaryawan();
    } else {
        toast.error('Gagal menonaktifkan karyawan');
    }

}

onMounted(() => {
    getKaryawan()
})
</script>