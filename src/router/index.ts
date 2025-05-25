import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
// import ForgotPassword from '@/views/ForgotPassword.vue';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

// const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@/views/LoginView.vue')
//   },
//   {
//     path: '/',
//     name: 'Dashboard',
//     component: DashbooardView,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu',
//     name: 'Menu',
//     component: MenuView,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/riwayat',
//     name: 'Riwayat Absensi',
//     component: () => import('@/views/user/menu/absensi/riwayat/RiwayatAbsensiView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/riwayat/:id',
//     name: 'Detail Riwayat Absensi',
//     component: () => import('@/views/user/menu/absensi/riwayat/DetailAbsensi.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/izin/:id',
//     name: 'Detail Pengajuan Izin',
//     component: () => import('@/views/user/menu/absensi/izin/DetailIzinView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/lembur/:id',
//     name: 'Detail Pengajuan Lembur',
//     component: () => import('@/views/user/menu/absensi/lembur/DetailLemburView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/koreksi-kehadiran/:id',
//     name: 'Detail Koreksi Pengajuan',
//     component: () => import('@/views/user/menu/absensi/koreksi/DetailKoreksiView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/pencatatan-waktu',
//     name: 'Pencatatan Waktu',
//     component: () => import('@/views/user/menu/absensi/pencatatan-waktu/PencatatanWaktuView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/pencatatan-waktu/:type',
//     name: 'Pencatatan Waktu User',
//     component: () => import('@/views/user/menu/absensi/pencatatan-waktu/AbsensView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/koreksi-kehadiran',
//     name: 'Koreksi Kehadiran',
//     component: () => import('@/views/user/menu/absensi/koreksi/KoreksiKehadiranView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/koreksi-kehadiran/add',
//     name: 'Tambah Koreksi Kehadiran',
//     component: () => import('@/views/user/menu/absensi/koreksi/AddKoreksiViwe.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/izin',
//     name: 'Izin',
//     component: () => import('@/views/user/menu/absensi/izin/IzinView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/izin/add',
//     name: 'Tambah Izin',
//     component: () => import('@/views/user/menu/absensi/izin/AddIzinView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/lembur',
//     name: 'Lembur',
//     component: () => import('@/views/user/menu/absensi/lembur/LemburView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/lembur/add',
//     name: 'Tambah Lembur',
//     component: () => import('@/views/user/menu/absensi/lembur/AddLemburView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/take-photo',
//     name: 'Ambil Foto',
//     component: () => import('@/views/user/menu/absensi/TakePhotoView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/borongan',
//     name: 'Riwayat Absensi Borongan',
//     component: () => import('@/views/user/menu/absensiBorongan/AbsensiBoronganList.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/borongan/:id',
//     name: 'Detail Absensi Borongan',
//     component: () => import('@/views/user/menu/absensiBorongan/DetailAbsensiBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/absensi/borongan/create',
//     name: 'Input Absensi Borongan',
//     component: () => import('@/views/user/menu/absensiBorongan/InputAbsensiBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/pengumuman',
//     name: 'Pengumuman',
//     component: () => import('@/views/user/menu/pengumuman/ListPengumuman.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/pengumuman/:id',
//     name: 'Detail Pengumuman',
//     component: () => import('@/views/user/menu/pengumuman/DetailPengumuman.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/reimburse',
//     name: 'Riwayat Reimburse',
//     component: () => import('@/views/user/menu/reimburse/RiwayatReimburse.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/reimburse/:id',
//     name: 'Detail Reimburse',
//     component: () => import('@/views/user/menu/reimburse/DetailReimburse.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/reimburse/create',
//     name: 'Add Reimburse',
//     component: () => import('@/views/user/menu/reimburse/AddReimburse.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval',
//     name: 'Approval',
//     component: () => import('@/views/user/menu/approval/ApprovalView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval/koreksi/:id',
//     name: 'Detail Approval koreksi',
//     component: () => import('@/views/user/menu/approval/DetailApprovalKoreksi.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval/izin/:id',
//     name: 'Detail Approval izin',
//     component: () => import('@/views/user/menu/approval/DetailApprovalIzin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval/lembur/:id',
//     name: 'Detail Approval lembur',
//     component: () => import('@/views/user/menu/approval/DetailApprovalLembur.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval/reimburse/:id',
//     name: 'Detail Approval reimburse',
//     component: () => import('@/views/user/menu/approval/DetailApprovalReimburse.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/menu/approval/borongan/:id',
//     name: 'Detail Approval Borongan',
//     component: () => import('@/views/user/menu/approval/DetailApprovalBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/profile',
//     name: 'Profile',
//     component: ProfileView,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/profile/kontak',
//     name: 'Profile Kontak',
//     component: () => import('@/views/user/profile/DataKontak.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/profile/pribadi',
//     name: 'Profile Pribadi',
//     component: () => import('@/views/user/profile/DataPribadi.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/profile/karyawan',
//     name: 'Profile Karyawan',
//     component: () => import('@/views/user/profile/DataKaryawan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/perusahaan',
//     name: 'Profile Perusahaan',
//     component: () => import('@/views/user/ProfilePerusahaan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/profile/change-password',
//     name: 'Change Password',
//     component: () => import('@/views/user/ChangePassword.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     component: NotFoundView
//   }
// ];

// const adminRoutes = [
//   {
//     path: '/admin',
//     name: 'Admin Dashboard',
//     component: () => import('@/views/admin/Dasboard.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/karyawan',
//     name: 'List Karyawan',
//     component: () => import('@/views/admin/karyawan/KaryawanView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/karyawan/add',
//     name: 'Add Karyawan',
//     component: () => import('@/views/admin/karyawan/AddKaryawan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/karyawan/:id',
//     name: 'Edit Karyawan',
//     component: () => import('@/views/admin/karyawan/EditKaryawan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/absensi',
//     name: 'riwayat absensi admin',
//     component: () => import('@/views/admin/riwayat/absensi/RiwayatAbsensiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/absensi/:id',
//     name: 'detail riwayat absensi admin',
//     component: () => import('@/views/admin/riwayat/absensi/DetailRiwayatAbsensi.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/izin',
//     name: 'riwayat izin admin',
//     component: () => import('@/views/admin/riwayat/izin/RiwayatIzinAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/izin/:id',
//     name: 'detail riwayat izin admin',
//     component: () => import('@/views/admin/riwayat/izin/DetailRiwayatIzin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/lembur',
//     name: 'riwayat lembur admin',
//     component: () => import('@/views/admin/riwayat/lembur/RiwayatLemburAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/lembur/:id',
//     name: 'detail riwayat lembur admin',
//     component: () => import('@/views/admin/riwayat/lembur/DetailRiwayatLembur.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/harian-borongan',
//     name: 'riwayat harian borongan admin',
//     component: () => import('@/views/admin/riwayat/harianBorongan/RiwayatBoronganAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/riwayat/harian-borongan/:id',
//     name: 'detail riwayat harian borongan admin',
//     component: () => import('@/views/admin/riwayat/harianBorongan/DetailRiwayatBoronganAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/absensi',
//     name: 'approval absensi admin',
//     component: () => import('@/views/admin/approval/absensi/ApprovalAbsensiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/absensi/:id',
//     name: 'approval detail absensi admin',
//     component: () => import('@/views/admin/approval/absensi/ApprovalDetailAbsensiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/harian-borongan',
//     name: 'approval harian borongan admin',
//     component: () => import('@/views/admin/approval/harianBorongan/ApprovalHarianBoronganAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/harian-borongan/:id',
//     name: 'approval detail harian borongan admin',
//     component: () => import('@/views/admin/approval/harianBorongan/ApprovalDetailHarianBoronganAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/izin',
//     name: 'approval izin admin',
//     component: () => import('@/views/admin/approval/izin/ApprovalIzinAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/izin/:id',
//     name: 'approval detail izin admin',
//     component: () => import('@/views/admin/approval/izin/ApprovalDetailIzinAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/lembur',
//     name: 'approval lembur admin',
//     component: () => import('@/views/admin/approval/lembur/ApprovalLemburAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/lembur/:id',
//     name: 'approval detail lembur admin',
//     component: () => import('@/views/admin/approval/lembur/ApprovalDetailLemburAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengumuman',
//     name: 'pengumuman admin',
//     component: () => import('@/views/admin/pengumuman/PengumumanAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengumuman/add',
//     name: 'tambah pengumuman admin',
//     component: () => import('@/views/admin/pengumuman/TambahPengumumanAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengumuman/:id',
//     name: 'edit pengumuman admin',
//     component: () => import('@/views/admin/pengumuman/EditPengumumanAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/reimburse',
//     name: 'reimburse admin',
//     component: () => import('@/views/admin/reimburse/ReimburseView.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/reimburse/:id',
//     name: 'reimburse admin detail',
//     component: () => import('@/views/admin/reimburse/DetailReimburseAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/reimburse',
//     name: 'approval reimburse admin',
//     component: () => import('@/views/admin/approval/reimburse/ApprovalReimbruseAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/approval/reimburse/:id',
//     name: 'detail approval reimburse admin',
//     component: () => import('@/views/admin/approval/reimburse/ApprovalDetailReimburse.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jadwal-kerja',
//     name: 'pengaturan jadwal kerja',
//     component: () => import('@/views/admin/setting/jadwalKerja/JadwalKerjaAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jadwal-kerja/add',
//     name: 'pengaturan tambah jadwal kerja',
//     component: () => import('@/views/admin/setting/jadwalKerja/TambahJadwalKerja.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jadwal-kerja/:id',
//     name: 'pengaturan edit jadwal kerja',
//     component: () => import('@/views/admin/setting/jadwalKerja/EditJadwalKerja.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/lokasi',
//     name: 'pengaturan lokasi',
//     component: () => import('@/views/admin/setting/lokasi/LokasiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/lokasi/add',
//     name: 'pengaturan tambah lokasi',
//     component: () => import('@/views/admin/setting/lokasi/TambahLokasi.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/lokasi/:id',
//     name: 'pengaturan edit lokasi',
//     component: () => import('@/views/admin/setting/lokasi/EditLokasiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/harga-harian-borongan',
//     name: 'pengaturan harian borobangan',
//     component: () => import('@/views/admin/setting/hargaHarianBorongan/HargaHarianBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/harga-harian-borongan/add',
//     name: 'pengaturan tambah  harian borobangan',
//     component: () => import('@/views/admin/setting/hargaHarianBorongan/TambahHarianBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/harga-harian-borongan/:id',
//     name: 'pengaturan edit  harian borobangan',
//     component: () => import('@/views/admin/setting/hargaHarianBorongan/EditHarianBorongan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jabatan',
//     name: 'pengaturan jabatan',
//     component: () => import('@/views/admin/setting/jabatan/jabatanAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jabatan/add',
//     name: 'pengaturan tambah jabatan',
//     component: () => import('@/views/admin/setting/jabatan/TambahJabatan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/jabatan/:id',
//     name: 'pengaturan edit jabatan',
//     component: () => import('@/views/admin/setting/jabatan/EditJabatan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/kuota-cuti',
//     name: 'pengaturan kuota cuti',
//     component: () => import('@/views/admin/setting/kuotaCuti/KuotaCutiAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/hari-libur',
//     name: 'pengaturan hari libur',
//     component: () => import('@/views/admin/setting/hariLibur/HariLiburAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/hari-libur/add',
//     name: 'pengaturan tambah hari libur',
//     component: () => import('@/views/admin/setting/hariLibur/TambahHariLibur.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/hari-libur/:id',
//     name: 'pengaturan edit hari libur',
//     component: () => import('@/views/admin/setting/hariLibur/EditHariLibur.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/komponen-gaji',
//     name: 'pengaturan komponen gaji',
//     component: () => import('@/views/admin/setting/gaji/komponenGaji/KomponenGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/komponen-gaji/add',
//     name: 'pengaturan tambah komponen gaji',
//     component:  () => import('@/views/admin/setting/gaji/komponenGaji/TambahKomponenGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/komponen-gaji/:id',
//     name: 'pengaturan edit komponen gaji',
//     component:  () => import('@/views/admin/setting/gaji/komponenGaji/EditKomponenGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/group-gaji',
//     name: 'pengaturan group gaji',
//     component:  () => import('@/views/admin/setting/gaji/groupGaji/GroupGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/group-gaji/add',
//     name: 'pengaturan tambah group gaji',
//     component:  () => import('@/views/admin/setting/gaji/groupGaji/TambahGroupGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/group-gaji/:id',
//     name: 'pengaturan edit group gaji',
//     component:  () => import('@/views/admin/setting/gaji/groupGaji/EditGroupGaji.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/gaji/group-gaji-karyawan',
//     name: 'pengaturan group gaji karyawan',
//     component:  () => import('@/views/admin/setting/gaji/groupGaji/GroupGajiKaryawan.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/pengaturan/profile-perusahaan',
//     name: 'pengaturan profile perusahaan admin',
//     component:  () => import('@/views/admin/setting/profilePerusahaan/ProfilePerusahaanAdmin.vue'),
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/laporan/rekap-periode',
//     name: 'laporan rekap periode',
//     component:  RekapPeriode,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/laporan/datang-terlambat',
//     name: 'laporan datang terlambat',
//     component:  DatangTerlambat,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/laporan/cuti-pribadi',
//     name: 'laporan cuti pribadi',
//     component:  CutiPribadi,
//     // meta: { requiresAuth: true }
//   },
//   {
//     path: '/admin/:pathMatch(.*)*',
//     component: NotFound
//   }
// ];

const router = createRouter({
  history: createWebHistory(),
  routes: [...userRoutes, ...adminRoutes]
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
