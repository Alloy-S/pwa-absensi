import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LoginView from '@/views/user/LoginView.vue';
import DashboardView from '@/views/user/DashbooardView.vue';
// import ForgotPassword from '@/views/ForgotPassword.vue';
import RiwayatAbsensiView from '@/views/user/menu/absensi/riwayat/RiwayatAbsensiView.vue';
import ProfileView from '@/views/user/ProfileView.vue';
import MenuView from '@/views/user/menu/MenuView.vue';
import PencatatanWaktuView from '@/views/user/menu/absensi/pencatatan-waktu/PencatatanWaktuView.vue';
import KoreksiKehadiranView from '@/views/user/menu/absensi/koreksi/KoreksiKehadiranView.vue';
import IzinView from '@/views/user/menu/absensi/izin/IzinView.vue';
import LemburView from '@/views/user/menu/absensi/lembur/LemburView.vue';
import NotFoundView from '@/views/user/NotFoundView.vue';
import AddKoreksiViwe from '@/views/user/menu/absensi/koreksi/AddKoreksiViwe.vue';
import AddIzinView from '@/views/user/menu/absensi/izin/AddIzinView.vue';
import AddLemburView from '@/views/user/menu/absensi/lembur/AddLemburView.vue';
import DetailAbsensi from '@/views/user/menu/absensi/riwayat/DetailAbsensi.vue';
import DetailKoreksiView from '@/views/user/menu/absensi/koreksi/DetailKoreksiView.vue';
import DetailIzinView from '@/views/user/menu/absensi/izin/DetailIzinView.vue';
import DetailLemburView from '@/views/user/menu/absensi/lembur/DetailLemburView.vue';
import TakePhotoView from '@/views/user/menu/absensi/TakePhotoView.vue';
import AbsensView from '@/views/user/menu/absensi/pencatatan-waktu/AbsensView.vue';
import AbsensiBoronganList from '@/views/user/menu/absensiBorongan/AbsensiBoronganList.vue';
import DetailAbsensiBorongan from '@/views/user/menu/absensiBorongan/DetailAbsensiBorongan.vue';
import InputAbsensiBorongan from '@/views/user/menu/absensiBorongan/InputAbsensiBorongan.vue';
import ListPengumuman from '@/views/user/menu/pengumuman/ListPengumuman.vue';
import DetailPengumuman from '@/views/user/menu/pengumuman/DetailPengumuman.vue';
import RiwayatReimburse from '@/views/user/menu/reimburse/RiwayatReimburse.vue';
import DetailReimburse from '@/views/user/menu/reimburse/DetailReimburse.vue';
import AddReimburse from '@/views/user/menu/reimburse/AddReimburse.vue';
import ApprovalView from '@/views/user/menu/approval/ApprovalView.vue';
import DetailApproval from '@/views/user/menu/approval/DetailApproval.vue';
import DataKontak from '@/views/user/profile/DataKontak.vue';
import DataPribadi from '@/views/user/profile/DataPribadi.vue';
import DataKaryawan from '@/views/user/profile/DataKaryawan.vue';
import ProfilePerusahaan from '@/views/user/ProfilePerusahaan.vue';
import ChangePassword from '@/views/user/ChangePassword.vue';
import DetailApprovalBorongan from '@/views/user/menu/approval/DetailApprovalBorongan.vue';
import NotFound from '@/views/admin/NotFound.vue';
import Dasboard from '@/views/admin/Dasboard.vue';
import KaryawanView from '@/views/admin/karyawan/KaryawanView.vue';
import AddKaryawan from '@/views/admin/karyawan/AddKaryawan.vue';
import RiwayatAbsensiAdmin from '@/views/admin/riwayat/RiwayatAbsensiAdmin.vue';
import RiwayatIzinAdmin from '@/views/admin/riwayat/RiwayatIzinAdmin.vue';
import RiwayatLemburAdmin from '@/views/admin/riwayat/RiwayatLemburAdmin.vue';
import RiwayatBoronganAdmin from '@/views/admin/riwayat/RiwayatBoronganAdmin.vue';
import ApprovalAbsensiAdmin from '@/views/admin/approval/ApprovalAbsensiAdmin.vue';
import ApprovalHarianBoronganAdmin from '@/views/admin/approval/ApprovalHarianBoronganAdmin.vue';
import ApprovalIzinAdmin from '@/views/admin/approval/ApprovalIzinAdmin.vue';
import ApprovalLemburAdmin from '@/views/admin/approval/ApprovalLemburAdmin.vue';
import ApprovalReimbruseAdmin from '@/views/admin/approval/ApprovalReimbruseAdmin.vue';
import JadwalKerjaAdmin from '@/views/admin/setting/jadwalKerja/JadwalKerjaAdmin.vue';
import TambahJadwalKerja from '@/views/admin/setting/jadwalKerja/TambahJadwalKerja.vue';
import LokasiAdmin from '@/views/admin/setting/lokasi/LokasiAdmin.vue';
import TambahLokasi from '@/views/admin/setting/lokasi/TambahLokasi.vue';
import HargaHarianBorongan from '@/views/admin/setting/hargaHarianBorongan/HargaHarianBorongan.vue';
import TambahHarianBorongan from '@/views/admin/setting/hargaHarianBorongan/TambahHarianBorongan.vue';
import JabatanAdmin from '@/views/admin/setting/jabatan/jabatanAdmin.vue';
import TambahJabatan from '@/views/admin/setting/jabatan/TambahJabatan.vue';
import KuotaCutiAdmin from '@/views/admin/setting/kuotaCuti/KuotaCutiAdmin.vue';
import HariLiburAdmin from '@/views/admin/setting/hariLibur/HariLiburAdmin.vue';
import TambahHariLibur from '@/views/admin/setting/hariLibur/TambahHariLibur.vue';
import KomponenGaji from '@/views/admin/setting/gaji/komponenGaji/KomponenGaji.vue';
import TambahKomponenGaji from '@/views/admin/setting/gaji/komponenGaji/TambahKomponenGaji.vue';
import GroupGaji from '@/views/admin/setting/gaji/groupGaji/GroupGaji.vue';
import TambahGroupGaji from '@/views/admin/setting/gaji/groupGaji/TambahGroupGaji.vue';

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
    path: '/menu/absensi/borongan',
    name: 'Riwayat Absensi Borongan',
    component: AbsensiBoronganList,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/borongan/:id',
    name: 'Detail Absensi Borongan',
    component: DetailAbsensiBorongan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/absensi/borongan/create',
    name: 'Input Absensi Borongan',
    component: InputAbsensiBorongan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/pengumuman',
    name: 'Pengumuman',
    component: ListPengumuman,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/pengumuman/:id',
    name: 'Detail Pengumuman',
    component: DetailPengumuman,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse',
    name: 'Riwayat Reimburse',
    component: RiwayatReimburse,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse/:id',
    name: 'Detail Reimburse',
    component: DetailReimburse,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/reimburse/create',
    name: 'Add Reimburse',
    component: AddReimburse,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval',
    name: 'Approval',
    component: ApprovalView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/:id',
    name: 'Detail Approval',
    component: DetailApproval,
    // meta: { requiresAuth: true }
  },
  {
    path: '/menu/approval/borongan/:id',
    name: 'Detail Approval Borongan',
    component: DetailApprovalBorongan,
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
    component: DataKontak,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/pribadi',
    name: 'Profile Pribadi',
    component: DataPribadi,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/karyawan',
    name: 'Profile Karyawan',
    component: DataKaryawan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/perusahaan',
    name: 'Profile Perusahaan',
    component: ProfilePerusahaan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/profile/change-password',
    name: 'Change Password',
    component: ChangePassword,
    // meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
];

const adminRoutes = [
  {
    path: '/admin',
    name: 'Admin Dashboard',
    component: Dasboard,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/karyawan',
    name: 'List Karyawan',
    component: KaryawanView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/karyawan/add',
    name: 'Add Karyawan',
    component: AddKaryawan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/riwayat/absensi',
    name: 'riwayat absensi admin',
    component: RiwayatAbsensiAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/riwayat/izin',
    name: 'riwayat izin admin',
    component: RiwayatIzinAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/riwayat/lembur',
    name: 'riwayat lembur admin',
    component: RiwayatLemburAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/riwayat/harian-borongan',
    name: 'riwayat harian borongan admin',
    component: RiwayatBoronganAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/approval/absensi',
    name: 'approval absensi admin',
    component: ApprovalAbsensiAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/approval/harian-borongan',
    name: 'approval harian borongan admin',
    component: ApprovalHarianBoronganAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/approval/izin',
    name: 'approval izin admin',
    component: ApprovalIzinAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/approval/lembur',
    name: 'approval lembur admin',
    component: ApprovalLemburAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/approval/reimburse',
    name: 'approval reimburse admin',
    component: ApprovalReimbruseAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/jadwal-kerja',
    name: 'pengaturan jadwal kerja',
    component: JadwalKerjaAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/jadwal-kerja/add',
    name: 'pengaturan tambah jadwal kerja',
    component: TambahJadwalKerja,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/lokasi',
    name: 'pengaturan lokasi',
    component: LokasiAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/lokasi/add',
    name: 'pengaturan tambah lokasi',
    component: TambahLokasi,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/harga-harian-borongan',
    name: 'pengaturan harian borobangan',
    component: HargaHarianBorongan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/harga-harian-borongan/add',
    name: 'pengaturan tambah  harian borobangan',
    component: TambahHarianBorongan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/jabatan',
    name: 'pengaturan jabatan',
    component: JabatanAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/jabatan/add',
    name: 'pengaturan tambah jabatan',
    component: TambahJabatan,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/kuota-cuti',
    name: 'pengaturan kuota cuti',
    component: KuotaCutiAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/hari-libur',
    name: 'pengaturan hari libur',
    component: HariLiburAdmin,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/hari-libur/add',
    name: 'pengaturan tambah hari libur',
    component: TambahHariLibur,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/gaji/komponen-gaji',
    name: 'pengaturan komponen gaji',
    component: KomponenGaji,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/gaji/komponen-gaji/add',
    name: 'pengaturan tambah komponen gaji',
    component: TambahKomponenGaji,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/gaji/group-gaji',
    name: 'pengaturan group gaji',
    component: GroupGaji,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/pengaturan/gaji/group-gaji/add',
    name: 'pengaturan tambah group gaji',
    component: TambahGroupGaji,
    // meta: { requiresAuth: true }
  },
  {
    path: '/admin/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...adminRoutes]
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
