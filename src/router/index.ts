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
    path: '/menu/absensi/pencatatan-waktu',
    name: 'Pencatatan Waktu',
    component: PencatatanWaktuView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran',
    name: 'Koreksi Kehadiran',
    component: KoreksiKehadiranView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin',
    name: 'Izin',
    component: IzinView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur',
    name: 'Lembur',
    component: LemburView,
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
