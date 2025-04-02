<template>
    <!-- component -->
    <div class="flex flex-col top-0 left-0 w-full bg-white h-full border-r">
        <div class="flex items-center justify-center h-14 border-b">
            <div class="py-3">Absensi Management</div>
        </div>
        <div class="sidebar overflow-y-auto overflow-x-hidden flex-grow">
            <ul class="flex flex-col py-4 space-y-1">
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Menu</div>
                    </div>
                </li>
                <li>
                    <RouterLink to="/admin"
                        class="relative flex flex-row items-center h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                </path>
                            </svg>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                    </RouterLink>

                </li>
                <!-- karyawan menu -->
                <li>
                    <button @click="dropdownKarywan()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="fa-solid fa-users"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Karyawan</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isKarywanOpen, 'rotate-0': !sidebarStore.isKarywanOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isKarywanOpen" class=" py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Karyawan Terdaftar</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Tambah Karywan</RouterLink>
                        </li>
                    </ul>
                </li>
                <!-- absensi menu -->
                <li>
                    <button @click="dropdownAbsensi()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="fa-solid fa-clock-rotate-left"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Riwayat</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isAbsensiOpen, 'rotate-0': !sidebarStore.isAbsensiOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isAbsensiOpen" class=" py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Riwayat Absensi</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Riwayat Izin</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Riwayat Lembur</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Riwayat Absensi Borongan</RouterLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <button @click="dropdownReimburse()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="fa-solid fa-money-bill-wave"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Reimburse</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isReimburseOpen, 'rotate-0': !sidebarStore.isReimburseOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isReimburseOpen" class=" py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                List Reimburse</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Tambah Reimburse</RouterLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <button @click="dropdownPengumuman()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <i class="fa-solid fa-rss"></i>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Pengumuman</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isPengumumanOpen, 'rotate-0': !sidebarStore.isPengumumanOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isPengumumanOpen" class=" py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Daftar Pengumuman</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Tambah Pengumuman</RouterLink>
                        </li>
                    </ul>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Approval</div>
                    </div>
                </li>
                <li>
                    <button @click="dropdownApproval()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Approval</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isApprovalOpen, 'rotate-0': !sidebarStore.isApprovalOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isApprovalOpen" class="py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Koreksi Absensi</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Absensi Borongan Harian</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Izin</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Lembur</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Reimburse</RouterLink>
                        </li>
                    </ul>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-gray-500">Settings</div>
                    </div>
                </li>
                <li>
                    <button @click="dropdownConfig()"
                        class="relative flex items-center justify-between w-full h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <div class="flex items-center">
                            <span class="inline-flex justify-center items-center ml-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </span>
                            <span class="ml-2 text-sm tracking-wide truncate">Pengaturan</span>
                        </div>
                        <svg sidebar-toggle-item
                            :class="{ 'rotate-180': sidebarStore.isConfigOpen, 'rotate-0': !sidebarStore.isConfigOpen }"
                            class="w-6 h-6 transition duration-150" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <ul id="dropdown-reimburse" v-show="sidebarStore.isConfigOpen" class="py-2 space-y-2">
                        <li >
                            <RouterLink to="/admin/reimburse/all"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75  group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Jadwal Kerja</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Lokasi</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Grup</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Harga Harian Borongan</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Kategori Gaji</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Kuota Cuti</RouterLink>
                        </li>
                        <li >
                            <RouterLink to="/reimburse/claim"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-600 transition duration-75 group hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-600 pl-14">
                                Hari Libur/Cuti Bersama</RouterLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <RouterLink to="/"
                        class="relative flex flex-row items-center h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <i class="fa-regular fa-building"></i>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">Profil Perusahaan</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/"
                        class="relative flex flex-row items-center h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">Menuju Aplikasi Absensi</span>
                    </RouterLink>
                </li>
                <li>
                    <a href="#"
                        class="relative flex flex-row items-center h-11 transition duration-150 ease-in-out focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-600 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
                    </a>
                </li>

            </ul>
            <div class="mb-32"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAdminSidebarStore } from '@/stores/adminsSidebarStore';

const sidebarStore = useAdminSidebarStore();

const dropdownKarywan = () => {
    sidebarStore.toggleIsKarywanOpen();
}

const dropdownAbsensi = () => {
    sidebarStore.toggleAbsensiOpen();
}

const dropdownApproval = () => {
    sidebarStore.toggleIsApprovalOpen();
}

const dropdownReimburse = () => {
    sidebarStore.toggleIsReimburseOpen();
}

const dropdownPengumuman = () => {
    sidebarStore.toggleIsPengumumanOpen();
}

const dropdownConfig = () => {
    sidebarStore.toggleIsConfigOpen();
}

// const dropdownLaporan = () => {
//     sidebarStore.toggleIsLaporanOpen();
// }
</script>

<style scoped>
.sidebar {
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

.sidebar::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}
</style>