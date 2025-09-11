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


            <div v-if="loading" class="text-center py-10">
                <i class="fa-solid fa-spinner animate-spin text-3xl text-slate-400"></i>
                <p class="mt-2 text-slate-500">Memuat data dasbor...</p>
            </div>

            <div v-else>

                <div v-if="attendanceToday" class="bg-white rounded-lg shadow mt-6 overflow-hidden">
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-800">Kehadiran</h3>
                        <div class="mt-2">
                            <div class="flex justify-between items-center">
                                <p class="text-gray-600 text-sm">{{ attendanceToday.today }}</p>
                                <p class="text-gray-600 text-sm"><span class="font-semibold">Shift</span>: {{
                                    attendanceToday.shift }}</p>
                            </div>
                            <div class="flex justify-between items-center mt-1">
                                <p class="font-semibold text-gray-800">Masuk: {{ formatTime(attendanceToday.time_clock_in) ||
                                    '--:--' }}</p>
                                <p class="font-semibold text-gray-800">Pulang: {{ formatTime(attendanceToday.time_clock_out) ||
                                    '--:--' }}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="flex justify-around items-center">
                        <button :disabled="isMasukDisabled" @click="catatWaktu('IN')"
                            class="py-3 w-full hover:bg-blue-50 transition text-blue-600 font-semibold disabled:bg-gray-100 disabled:text-slate-600 disabled:cursor-not-allowed">Masuk</button>
                        <div class="w-px h-8 bg-gray-200"></div>
                        <button :disabled="isPulangDisabled" @click="catatWaktu('OUT')"
                            class="py-3 w-full hover:bg-blue-50 transition text-blue-600 font-semibold disabled:bg-gray-100 disabled:text-slate-600 disabled:cursor-not-allowed">Pulang</button>
                    </div>
                </div>


                <div class="flex justify-between mt-10 bg-white rounded-lg shadow">
                    <button v-for="tab in tabs" :key="tab" class="py-3 w-full rounded-md font-medium text-sm"
                        :class="activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600'"
                        @click="activeTab = tab">
                        {{ tab }}
                    </button>
                </div>


                <div class="mt-4">
                    <div v-if="activeTab === 'Pengumuman'">
                        <div v-if="announcements.length === 0" class="text-center text-gray-500 py-5">Tidak ada
                            pengumuman baru.</div>
                        <div v-else class="space-y-3">
                            <button v-for="announcement in announcements" :key="announcement.id"
                                @click="router.push(`/menu/pengumuman/${announcement.id}`)"
                                class="w-full flex justify-between items-center text-left p-4 bg-white rounded-lg shadow-md border-l-[6px] transition-all duration-300 hover:shadow-lg hover:border-blue-600 border-blue-500">
                                <div class="flex flex-col">
                                    <p class="text-md font-semibold text-slate-800">{{ announcement.judul }}</p>
                                    <p class="text-sm text-slate-500">{{ new
                                        Date(announcement.date_created).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long', year: 'numeric'
                                        }) }}</p>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <i class="fa-solid fa-angle-right text-gray-500 text-lg"></i>
                                </div>
                            </button>
                        </div>
                        <button @click="router.push('/menu/pengumuman')"
                            class="mt-3 w-full py-2 border-2 rounded-md text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 transition font-semibold">
                            Lihat Semua Pengumuman
                        </button>
                    </div>
                    <div v-if="activeTab === 'Waiting Approval'">
                        <div v-if="approvals.length === 0" class="text-center text-gray-500 py-5">Tidak ada pengajuan
                            yang menunggu.</div>
                        <div v-else class="space-y-3">
                            <CardApproval v-for="approval in approvals" :key="approval.approval_id"
                                :approval="approval" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="mb-20"></div>
        </div>


        <ReusableModal v-model:isOpen="isModalOpen" title="Pemberitahuan" @close="isModalOpen = false">
            <p>Wajah Anda belum terdaftar di sistem.</p>
            <p>Silakan lakukan pendaftaran wajah sekarang untuk dapat melakukan absensi.</p>
            <template #footer>
                <button @click="goToFaceRegistration" class="px-4 py-2 bg-blue-500 text-white rounded">Lanjut
                    Pendaftaran</button>
            </template>
        </ReusableModal>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import BasePage from '@/layouts/user/BasePage.vue';
import ReusableModal from '@/components/ReusableModal.vue';
import CardApproval from '@/components/user/CardApproval.vue';
import { toast } from 'vue3-toastify';
import { CheckTodayAttendanceRes } from '@/models/attendanceModel';
import { Pengumuman } from '@/models/PengumumanModel';
import { ApprovalItem } from '@/models/dashboardUserModel';
import { checkAttadanceTodayApi } from '@/services/attendanceService';
import { fetchLatestPengumuman } from '@/services/pengumumanService';
import { fetchApprovalLatestUser } from '@/services/dashboardUserService';
import { checkFaceStatus } from '@/services/userService';
import { UserData } from '@/models/userModel';
import { format } from 'date-fns';

const router = useRouter();

const loading = ref(true);
const user = ref<UserData>({ fullname: '', userRole: '', username: '-' });
const attendanceToday = ref<CheckTodayAttendanceRes | null>(null);
const announcements = ref<Pengumuman[]>([]);
const approvals = ref<ApprovalItem[]>([]);
const tabs = ref(['Pengumuman', 'Waiting Approval']);
const activeTab = ref('Pengumuman');
const isModalOpen = ref(false);

const isMasukDisabled = computed(() => attendanceToday.value.required_attendance_type !== 'IN');
const isPulangDisabled = computed(() => attendanceToday.value.required_attendance_type !== 'OUT');


const loadDashboardData = async () => {
    loading.value = true;
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
        try {
            user.value = JSON.parse(userDataString);
        } catch (e) {
            console.error("Gagal parsing data pengguna dari localStorage:", e);
        }
    }
    try {

        const [attendanceRes, pengumumanRes, approvalRes, faceStatusRes] = await Promise.all([
            checkAttadanceTodayApi(),
            fetchLatestPengumuman(),
            fetchApprovalLatestUser(),
            checkFaceStatus()
        ]);

        attendanceToday.value = attendanceRes;
        announcements.value = pengumumanRes.items;
        approvals.value = approvalRes.approvals;


        if (faceStatusRes.face_registration_status === false) {
            isModalOpen.value = true;
        }

    } catch (error) {
        console.error("Gagal memuat data dasbor:", error);
        toast.error("Gagal memuat data dasbor.");
    } finally {
        loading.value = false;
    }
};

const loadUserData = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
    }
};

const goToFaceRegistration = () => {
    isModalOpen.value = false;
    router.push('/profile/face-registration');
};

const catatWaktu = (type: 'IN' | 'OUT') => {
    router.push(`/menu/absensi/pencatatan-waktu/${type.toLowerCase()}`);
};

const formatTime = (dateTimeString): string => {
  if (!dateTimeString) return '--:--';
  return format(new Date(dateTimeString), 'HH:mm');
};


onMounted(() => {
    loadUserData();
    loadDashboardData();
});
</script>
