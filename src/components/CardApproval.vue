<template>
    <div v-if="props.approval.status === 'Approved'" class="grid-row-2 bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-green-500">
        <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">{{ props.approval.date }}</h3>
            <StatusApproval :status="props.approval.status" />
        </div>
        <div class="flex justify-between items-center mt-2">
            <div class="">
                <p></p>
                <p class="text-gray-600 text-sm">{{ props.approval.request }}</p>
            </div>
            <div class="text-center">
                <p class="text-gray-600 font-semibold text-sm">Approved By:</p>
                <p class="text-gray-600 text-sm">{{ props.approval.approvedBy }}</p>
            </div>
        </div>
    </div>

    <div v-if="props.approval.status === 'Waiting Approval'" class="grid-row-2 bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-blue-500">
        <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">{{ props.approval.date }}</h3>
            <StatusApproval :status="props.approval.status" />
        </div>
        <div class="flex justify-between items-center mt-2">
            <div class="">
                <p></p>
                <p class="text-gray-600 text-sm">{{ props.approval.request }}</p>
            </div>
            <div class="text-center">
                <p class="text-gray-600 font-semibold text-sm">Approved By:</p>
                <p class="text-gray-600 text-sm">{{ props.approval.approvedBy }}</p>
            </div>
        </div>
    </div>

    <div v-if="props.approval.status === 'Declined'" class="grid-row-2 bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-red-500">
        <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-800">{{ props.approval.date }}</h3>
            <StatusApproval :status="props.approval.status" />
        </div>
        <div class="flex justify-between items-center mt-2">
            <div class="">
                <p></p>
                <p class="text-gray-600 text-sm">{{ props.approval.request }}</p>
            </div>
            <div class="text-center">
                <p class="text-gray-600 font-semibold text-sm">Approved By:</p>
                <p class="text-gray-600 text-sm">{{ props.approval.approvedBy }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StatusApproval from '../components/StatusApproval.vue';
const props = defineProps<{ approval: { date: String, approvedBy: String, status: String, request: String } }>();
</script>