<template>

    <div class="w-full h-screen flex bg-slate-100">
        <div class="w-80 h-full">
            <SideBar/>
        </div>
    
        <div class="w-full h-screen sticky top-0">
           
            <slot></slot>
        </div>
    </div>

</template>

<script setup lang="ts">
import SideBar from '@/components/admin/sidebar.vue'


</script>