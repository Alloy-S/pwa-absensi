<template>
    <div class="sticky top-0 z-50 flex justify-between items-center text-center font-bold shadow-sm">
        <button class="p-4" @click="previousPage"><i class="fa-solid fa-arrow-left"></i></button>
        <p>{{ props.title }}</p>
        <div></div>
    </div>
</template>

<script setup lang="ts">

import router from '../../router';
const props = defineProps<{ title:String }>();

const previousPage = () => {
    router.back();
}
</script>