<template>
    <div class="flex justify-between items-center text-center font-bold">
        <button class="p-4" @click="previosPage"><i class="fa-solid fa-arrow-left"></i></button>
        <p>{{ props.title }}</p>
        <div></div>
    </div>
</template>

<script setup lang="ts">

import router from '../router';
const props = defineProps<{ title:String }>();

const previosPage = () => {
    router.back();
}
</script>