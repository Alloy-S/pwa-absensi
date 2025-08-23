<template>
    <BasePage>
        <div class="p-4">
            
            <div class="flex mt-4 items-center">
                <div class="flex items-center justify-center">
                    <div
                        class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        {{ user.fullname.charAt(0) }}
                    </div>
                </div>
                <div class="ml-4">
                    <p class="text-lg font-semibold text-slate-800">{{ user.fullname }}</p>
                    <p class="font-medium text-slate-600 capitalize">{{ user.userRole }}</p>
                </div>
            </div>
        </div>
        
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
            <button class="w-full flex items-center justify-between p-4 bg-white text-slate-800 hover:bg-slate-100" @click="goToFaceRegistration">
                <div>
                    <i class="fa-regular fa-face-smile w-6 h-6 mr-3"></i>
                    <span>Pendaftaran Wajah</span>
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
import BasePage from '@/layouts/user/BasePage.vue';
import { hitLogout } from '@/services/authService';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserData } from '@/models/userModel';

const router = useRouter();
const user = ref<UserData>({ fullname: 'Pengguna', userRole: 'User', username: '-' });

onMounted(() => {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
        try {
            user.value = JSON.parse(userDataString);
        } catch (e) {
            console.error("Gagal parsing data pengguna dari localStorage:", e);
        }
    }
});

const goToDetailProfile = () => router.push('/profile/kontak');
const goToCompanyProfile = () => router.push('/perusahaan');
const goToAdmin = () => router.push('/admin');
const goToChangePassword = () => router.push('/profile/change-password');
const goToFaceRegistration = () => router.push('/profile/face-registration');
const logout = async () => {
    console.log('Logging out...');

    await hitLogout()

    localStorage.clear();
    router.replace('/login');
};
</script>

<style scoped></style>