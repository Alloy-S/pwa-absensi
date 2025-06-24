<template>
    <BasePage>

        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Kuota Cuti</p>
        </div>

        <div class="p-3 bg-white rounded-md shadow-md">

            <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" @page="onPage"
                :totalRecords="100" tableStyle="min-width: 50rem">
                <Column field="name" header="Name" style="width: 25%"></Column>
                <Column field="tahun" header="Tahun" style="width: 25%"></Column>
                <Column field="used_cuti" header="Cuti Terpakai" style="width: 25%"></Column>
                <Column header="options">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="detailItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                        </div>
                    </template>
                </Column>


            </DataTable>


        </div>


    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue';

const onPage = (event: any) => {
    console.log('Page changed:', event);
};

const detailItem = (id: string) => {
    console.log('Detail item with ID:', id);
};

const customers = ref([
    {
        id: 1000,
        name: 'Bamboo Watch',
        used_cuti: "12/20",
        tahun: '2025',
    }, {
        id: 1000,
        name: 'Bamboo Watch',
        used_cuti: "12/20",
        tahun: '2025',
    }, {
        id: 1000,
        name: 'Bamboo Watch',
        used_cuti: "12/20",
        tahun: '2025',
    },

]);

</script>