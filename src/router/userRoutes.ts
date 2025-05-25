import DashbooardView from '@/views/user/DashbooardView.vue';
import MenuView from '@/views/user/menu/MenuView.vue';
import ProfileView from '@/views/user/ProfileView.vue';
import NotFoundView from '@/views/user/NotFoundView.vue';

export const userRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashbooardView,
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
    component: () => import('@/views/user/menu/absensi/riwayat/RiwayatAbsensiView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/riwayat/:id',
    name: 'Detail Riwayat Absensi',
    component: () => import('@/views/user/menu/absensi/riwayat/DetailAbsensi.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin/:id',
    name: 'Detail Pengajuan Izin',
    component: () => import('@/views/user/menu/absensi/izin/DetailIzinView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur/:id',
    name: 'Detail Pengajuan Lembur',
    component: () => import('@/views/user/menu/absensi/lembur/DetailLemburView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran/:id',
    name: 'Detail Koreksi Pengajuan',
    component: () => import('@/views/user/menu/absensi/koreksi/DetailKoreksiView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/pencatatan-waktu',
    name: 'Pencatatan Waktu',
    component: () => import('@/views/user/menu/absensi/pencatatan-waktu/PencatatanWaktuView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/pencatatan-waktu/:type',
    name: 'Pencatatan Waktu User',
    component: () => import('@/views/user/menu/absensi/pencatatan-waktu/AbsensView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran',
    name: 'Koreksi Kehadiran',
    component: () => import('@/views/user/menu/absensi/koreksi/KoreksiKehadiranView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/koreksi-kehadiran/add',
    name: 'Tambah Koreksi Kehadiran',
    component: () => import('@/views/user/menu/absensi/koreksi/AddKoreksiViwe.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin',
    name: 'Izin',
    component: () => import('@/views/user/menu/absensi/izin/IzinView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/izin/add',
    name: 'Tambah Izin',
    component: () => import('@/views/user/menu/absensi/izin/AddIzinView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur',
    name: 'Lembur',
    component: () => import('@/views/user/menu/absensi/lembur/LemburView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/lembur/add',
    name: 'Tambah Lembur',
    component: () => import('@/views/user/menu/absensi/lembur/AddLemburView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/take-photo',
    name: 'Ambil Foto',
    component: () => import('@/views/user/menu/absensi/TakePhotoView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/borongan',
    name: 'Riwayat Absensi Borongan',
    component: () => import('@/views/user/menu/absensiBorongan/AbsensiBoronganList.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/borongan/:id',
    name: 'Detail Absensi Borongan',
    component: () => import('@/views/user/menu/absensiBorongan/DetailAbsensiBorongan.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/borongan/create',
    name: 'Input Absensi Borongan',
    component: () => import('@/views/user/menu/absensiBorongan/InputAbsensiBorongan.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/pengumuman',
    name: 'Pengumuman',
    component: () => import('@/views/user/menu/pengumuman/ListPengumuman.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/pengumuman/:id',
    name: 'Detail Pengumuman',
    component: () => import('@/views/user/menu/pengumuman/DetailPengumuman.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse',
    name: 'Riwayat Reimburse',
    component: () => import('@/views/user/menu/reimburse/RiwayatReimburse.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse/:id',
    name: 'Detail Reimburse',
    component: () => import('@/views/user/menu/reimburse/DetailReimburse.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse/create',
    name: 'Add Reimburse',
    component: () => import('@/views/user/menu/reimburse/AddReimburse.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval',
    name: 'Approval',
    component: () => import('@/views/user/menu/approval/ApprovalView.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/koreksi/:id',
    name: 'Detail Approval koreksi',
    component: () => import('@/views/user/menu/approval/DetailApprovalKoreksi.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/izin/:id',
    name: 'Detail Approval izin',
    component: () => import('@/views/user/menu/approval/DetailApprovalIzin.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/lembur/:id',
    name: 'Detail Approval lembur',
    component: () => import('@/views/user/menu/approval/DetailApprovalLembur.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/reimburse/:id',
    name: 'Detail Approval reimburse',
    component: () => import('@/views/user/menu/approval/DetailApprovalReimburse.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/borongan/:id',
    name: 'Detail Approval Borongan',
    component: () => import('@/views/user/menu/approval/DetailApprovalBorongan.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/kontak',
    name: 'Profile Kontak',
    component: () => import('@/views/user/profile/DataKontak.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/pribadi',
    name: 'Profile Pribadi',
    component: () => import('@/views/user/profile/DataPribadi.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/karyawan',
    name: 'Profile Karyawan',
    component: () => import('@/views/user/profile/DataKaryawan.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/perusahaan',
    name: 'Profile Perusahaan',
    component: () => import('@/views/user/ProfilePerusahaan.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/change-password',
    name: 'Change Password',
    component: () => import('@/views/user/ChangePassword.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
];