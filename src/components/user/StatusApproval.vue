<template>
    <div v-if="props.status === 'Approved'" class="py-2 px-4 bg-green-100 text-green-800 rounded-md text-xs font-semibold">
        <p class="">{{ props.status }}</p>
    </div>
    <div v-if="props.status === 'Waiting Approval'" class="py-2 px-4 bg-blue-100 text-blue-800 rounded-md text-xs font-semibold">
        <p class="">{{ props.status }}</p>
    </div>
    <div v-if="props.status === 'Declined'" class="py-2 px-4 bg-red-100 text-red-800 rounded-md text-xs font-semibold">
        <p class="">{{ props.status }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{ status: String }>();

</script>