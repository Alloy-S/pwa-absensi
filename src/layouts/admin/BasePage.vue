<template>
    <div class="w-screen h-screen flex bg-slate-100 overflow-hidden">
        <!-- Sidebar -->
        <div class="min-w-72 h-screen sticky top-0 bg-white shadow-lg">
            <KeepAlive>
                <SideBar />
            </KeepAlive>
        </div>

        <!-- Wrapper konten -->
        <div class="flex flex-col flex-1 h-screen">
            <!-- Navbar -->
            <nav class="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 shadow-md">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" @click="toggleDropdown"
                            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button">
                            <img class="w-8 h-8 rounded-full" src="@/assets/profile.jpg" alt="user photo" />
                        </button>
                        <!-- Dropdown -->
                        <div v-show="isDropdownOpen" ref="isDropdownRef"
                            class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-10 mt-2"
                            id="user-dropdown">
                            <div class="px-4 py-3">
                                <span class="block text-sm text-gray-900 dark:text-white">Admin</span>
                                <span
                                    class="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul class="py-2">
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                        out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex-1 overflow-y-auto p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import SideBar from '@/components/admin/sidebar.vue'
import { ref } from 'vue'
import { onClickOutside } from "@vueuse/core";

const isDropdownOpen = ref(false)
const isDropdownRef = ref(null)

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

onClickOutside(isDropdownRef, () => {
    isDropdownOpen.value = false
    console.log("clicked outside")
});
</script>

<style scoped>
/* Pastikan dropdown tidak tertutup oleh elemen lain */
#user-dropdown {
    min-width: 160px;
}
</style>