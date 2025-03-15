<template>
    <BasePage>
        <div class="p-4">
            <!-- Profile Header -->
            <div class="flex mt-4">
                <div class="flex items-center justify-center">
                    <div class="p-6 rounded-full bg-slate-500"></div>
                </div>
                <div class="ml-4">
                    <p class="text-lg font-semibold">Alloysius Steven</p>
                    <p class="text-gray-600">Staff</p>
                </div>
            </div>
        </div>
        <!-- Profile Menu -->
        <div class="mt-6">
            <button class="w-full flex items-center justify-between p-4 text-slate-800 bg-white hover:bg-slate-100" @click="goToDetailProfile">
                <div>
                    <i class="fas fa-user w-6 h-6 mr-3"></i>
                    <span>Detail Profile</span>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </button>

            <button class="w-full flex items-center justify-between p-4 bg-white text-slate-800 hover:bg-slate-100" @click="goToCompanyProfile">
                <div>
                    <i class="fas fa-building w-6 h-6 mr-3"></i>
                    <span>Profile Perusahaan</span>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </button>

            <button class="w-full flex items-center justify-between p-4 bg-white text-slate-800 hover:bg-slate-100 "
                @click="goToAdmin">
                <div>
                    <i class="fas fa-cogs w-6 h-6 mr-3"></i>
                    <span>Menuju ke Admin</span>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </button>

            <button class="w-full flex items-center justify-between p-4 bg-white text-slate-800 hover:bg-slate-100" @click="goToChangePassword">
                <div>
                    <i class="fas fa-key w-6 h-6 mr-3"></i>
                    <span>Change Password</span>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </button>

            <button class="w-full flex items-center justify-between p-4 bg-red-500 text-white hover:bg-white hover:text-slate-800" @click="logout">
                <div>
                    <i class="fas fa-sign-out-alt w-6 h-6 mr-3"></i>
                    <span>Logout</span>
                </div>
                <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>

    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '../layouts/BasePage.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDetailProfile = () => router.push('/profile/detail');
const goToCompanyProfile = () => router.push('/profile/company');
const goToAdmin = () => router.push('/admin');
const goToChangePassword = () => router.push('/change-password');
const logout = () => {
    console.log('Logging out...');
    router.push('/login');
};
</script>

<style scoped></style>