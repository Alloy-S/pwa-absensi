import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../../src/views/LoginView.vue';
import DashboardView from '../../src/views/DashbooardView.vue';
// import ForgotPassword from '@/views/ForgotPassword.vue';
import { useAuthStore } from '../stores/auth';
import RiwayatAbsensiView from '../views/menu/absensi/riwayat/RiwayatAbsensiView.vue';
import ProfileView from '../views/ProfileView.vue';
import MenuView from '../views/menu/MenuView.vue';
import PencatatanWaktuView from '../views/menu/absensi/pencatatan-waktu/PencatatanWaktuView.vue';
import KoreksiKehadiranView from '../views/menu/absensi/koreksi/KoreksiKehadiranView.vue';
import IzinView from '../views/menu/absensi/izin/IzinView.vue';
import LemburView from '../views/menu/absensi/lembur/LemburView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import AddKoreksiViwe from '../views/menu/absensi/koreksi/AddKoreksiViwe.vue';
import AddIzinView from '../views/menu/absensi/izin/AddIzinView.vue';
import AddLemburView from '../views/menu/absensi/lembur/AddLemburView.vue';
import DetailAbsensi from '../views/menu/absensi/DetailAbsensi.vue';
import DetailKoreksiView from '../views/menu/absensi/koreksi/DetailKoreksiView.vue';
import DetailIzinView from '../views/menu/absensi/izin/DetailIzinView.vue';
import DetailLemburView from '../views/menu/absensi/lembur/DetailLemburView.vue';
import TakePhotoView from '../views/menu/absensi/TakePhotoView.vue';
import AbsensView from '@/views/menu/absensi/pencatatan-waktu/AbsensView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/riwayat',
    name: 'Riwayat Absensi',
    component: RiwayatAbsensiView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/riwayat/:id',
    name: 'Detail Riwayat Absensi',
    component: DetailAbsensi,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin/:id',
    name: 'Detail Pengajuan Izin',
    component: DetailIzinView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur/:id',
    name: 'Detail Pengajuan Lembur',
    component: DetailLemburView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran/:id',
    name: 'Detail Koreksi Pengajuan',
    component: DetailKoreksiView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/pencatatan-waktu',
    name: 'Pencatatan Waktu',
    component: PencatatanWaktuView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/pencatatan-waktu/:type',
    name: 'Pencatatan Waktu User',
    component: AbsensView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran',
    name: 'Koreksi Kehadiran',
    component: KoreksiKehadiranView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran/add',
    name: 'Tambah Koreksi Kehadiran',
    component: AddKoreksiViwe,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin',
    name: 'Izin',
    component: IzinView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin/add',
    name: 'Tambah Izin',
    component: AddIzinView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur',
    name: 'Lembur',
    component: LemburView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur/add',
    name: 'Tambah Lembur',
    component: AddLemburView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/take-photo',
    name: 'Ambil Foto',
    component: TakePhotoView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
