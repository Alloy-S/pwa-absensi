import NotFound from "@/views/admin/NotFound.vue";
import RekapPeriode from "@/views/admin/laporan/RekapPeriode.vue";
import DatangTerlambat from "@/views/admin/laporan/DatangTerlambat.vue";
import CutiPribadi from "@/views/admin/laporan/CutiPribadi.vue";
import UpahBorongan from "@/views/admin/laporan/UpahBorongan.vue";

const adminRoles = ["Admin", "HRD"];

export const adminRoutes = [
  {
    path: "/admin",
    name: "Admin Dashboard",
    component: () => import("@/views/admin/Dasboard.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/karyawan",
    name: "List Karyawan",
    component: () => import("@/views/admin/karyawan/KaryawanView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/karyawan/add",
    name: "Add Karyawan",
    component: () => import("@/views/admin/karyawan/AddKaryawan.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/karyawan/:id",
    name: "Edit Karyawan",
    component: () => import("@/views/admin/karyawan/EditKaryawan.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/absensi",
    name: "riwayat absensi admin",
    component: () =>
      import("@/views/admin/riwayat/absensi/RiwayatAbsensiAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/absensi/:id",
    name: "detail riwayat absensi admin",
    component: () =>
      import("@/views/admin/riwayat/absensi/DetailRiwayatAbsensi.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/izin",
    name: "riwayat izin admin",
    component: () => import("@/views/admin/riwayat/izin/RiwayatIzinAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/izin/:id",
    name: "detail riwayat izin admin",
    component: () => import("@/views/admin/riwayat/izin/DetailRiwayatIzin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/lembur",
    name: "riwayat lembur admin",
    component: () =>
      import("@/views/admin/riwayat/lembur/RiwayatLemburAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/lembur/:id",
    name: "detail riwayat lembur admin",
    component: () =>
      import("@/views/admin/riwayat/lembur/DetailRiwayatLembur.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/harian-borongan",
    name: "riwayat harian borongan admin",
    component: () =>
      import("@/views/admin/riwayat/harianBorongan/RiwayatBoronganAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/riwayat/harian-borongan/:id",
    name: "detail riwayat harian borongan admin",
    component: () =>
      import(
        "@/views/admin/riwayat/harianBorongan/DetailRiwayatBoronganAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/koreksi-kehadiran",
    name: "approval koreksi admin",
    component: () =>
      import(
        "@/views/admin/approval/koreksi/ApprovalKoreksiKehadiranAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/koreksi-kehadiran/:id",
    name: "approval detail koreksi admin",
    component: () =>
      import(
        "@/views/admin/approval/koreksi/ApprovalDetailKoreksiKehadiranAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/harian-borongan",
    name: "approval harian borongan admin",
    component: () =>
      import(
        "@/views/admin/approval/harianBorongan/ApprovalHarianBoronganAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/harian-borongan/:id",
    name: "approval detail harian borongan admin",
    component: () =>
      import(
        "@/views/admin/approval/harianBorongan/ApprovalDetailHarianBoronganAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/izin",
    name: "approval izin admin",
    component: () =>
      import("@/views/admin/approval/izin/ApprovalIzinAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/izin/:id",
    name: "approval detail izin admin",
    component: () =>
      import("@/views/admin/approval/izin/ApprovalDetailIzinAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/lembur",
    name: "approval lembur admin",
    component: () =>
      import("@/views/admin/approval/lembur/ApprovalLemburAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/lembur/:id",
    name: "approval detail lembur admin",
    component: () =>
      import("@/views/admin/approval/lembur/ApprovalDetailLemburAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengumuman",
    name: "pengumuman admin",
    component: () => import("@/views/admin/pengumuman/PengumumanAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengumuman/add",
    name: "tambah pengumuman admin",
    component: () =>
      import("@/views/admin/pengumuman/TambahPengumumanAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengumuman/:id",
    name: "edit pengumuman admin",
    component: () => import("@/views/admin/pengumuman/EditPengumumanAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/reimburse",
    name: "reimburse admin",
    component: () => import("@/views/admin/reimburse/ReimburseView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/reimburse/:id",
    name: "reimburse admin detail",
    component: () => import("@/views/admin/reimburse/DetailReimburseAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/reimburse",
    name: "approval reimburse admin",
    component: () =>
      import("@/views/admin/approval/reimburse/ApprovalReimbruseAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/approval/reimburse/:id",
    name: "detail approval reimburse admin",
    component: () =>
      import("@/views/admin/approval/reimburse/ApprovalDetailReimburse.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jadwal-kerja",
    name: "pengaturan jadwal kerja",
    component: () =>
      import("@/views/admin/setting/jadwalKerja/JadwalKerjaAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jadwal-kerja/add",
    name: "pengaturan tambah jadwal kerja",
    component: () =>
      import("@/views/admin/setting/jadwalKerja/TambahJadwalKerja.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jadwal-kerja/:id",
    name: "pengaturan view jadwal kerja",
    component: () =>
      import("@/views/admin/setting/jadwalKerja/ViewJadwalKerja.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jadwal-kerja/edit/:id",
    name: "pengaturan edit jadwal kerja",
    component: () =>
      import("@/views/admin/setting/jadwalKerja/EditJadwalKerja.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/lokasi",
    name: "pengaturan lokasi",
    component: () => import("@/views/admin/setting/lokasi/LokasiAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/lokasi/add",
    name: "pengaturan tambah lokasi",
    component: () => import("@/views/admin/setting/lokasi/TambahLokasi.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/lokasi/:id",
    name: "pengaturan edit lokasi",
    component: () => import("@/views/admin/setting/lokasi/EditLokasiAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/harga-harian-borongan",
    name: "pengaturan harian borobangan",
    component: () =>
      import(
        "@/views/admin/setting/hargaHarianBorongan/HargaHarianBorongan.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/harga-harian-borongan/add",
    name: "pengaturan tambah  harian borobangan",
    component: () =>
      import(
        "@/views/admin/setting/hargaHarianBorongan/TambahHarianBorongan.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/harga-harian-borongan/:id",
    name: "pengaturan edit  harian borobangan",
    component: () =>
      import(
        "@/views/admin/setting/hargaHarianBorongan/EditHarianBorongan.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jabatan",
    name: "pengaturan jabatan",
    component: () => import("@/views/admin/setting/jabatan/jabatanAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jabatan/add",
    name: "pengaturan tambah jabatan",
    component: () => import("@/views/admin/setting/jabatan/TambahJabatan.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jabatan/:id",
    name: "pengaturan edit jabatan",
    component: () => import("@/views/admin/setting/jabatan/EditJabatan.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jenis-izin",
    name: "pengaturan jenis cuti",
    component: () =>
      import("@/views/admin/setting/jenisIzin/JenisIzinView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jenis-izin/add",
    name: "pengaturan Tambah jenis cuti",
    component: () =>
      import("@/views/admin/setting/jenisIzin/AddJenisIzinView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/jenis-izin/:id",
    name: "pengaturan Edit jenis cuti",
    component: () =>
      import("@/views/admin/setting/jenisIzin/EditJenisIzinView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/kuota-cuti",
    name: "pengaturan kuota cuti",
    component: () =>
      import("@/views/admin/setting/kuotaIzin/KuotaCutiView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/kuota-cuti/:id",
    name: "pengaturan kuota cuti detail user",
    component: () =>
      import("@/views/admin/setting/kuotaIzin/DetailKuotaCutiView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/kuota-cuti/:id/add",
    name: "pengaturan add kuota cuti detail user",
    component: () =>
      import("@/views/admin/setting/kuotaIzin/AddKuotaCutiView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/kuota-cuti/:id/:kuota_id/edit",
    name: "pengaturan edit kuota cuti detail user",
    component: () =>
      import("@/views/admin/setting/kuotaIzin/EditKuotaCutiView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/hari-libur",
    name: "pengaturan hari libur",
    component: () =>
      import("@/views/admin/setting/hariLibur/HariLiburAdmin.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/hari-libur/add",
    name: "pengaturan tambah hari libur",
    component: () =>
      import("@/views/admin/setting/hariLibur/TambahHariLibur.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/hari-libur/:id",
    name: "pengaturan edit hari libur",
    component: () =>
      import("@/views/admin/setting/hariLibur/EditHariLibur.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/komponen-gaji",
    name: "pengaturan komponen gaji",
    component: () =>
      import("@/views/admin/setting/gaji/komponenGaji/KomponenGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/komponen-gaji/add",
    name: "pengaturan tambah komponen gaji",
    component: () =>
      import("@/views/admin/setting/gaji/komponenGaji/TambahKomponenGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/komponen-gaji/:id",
    name: "pengaturan edit komponen gaji",
    component: () =>
      import("@/views/admin/setting/gaji/komponenGaji/EditKomponenGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/grup-gaji",
    name: "pengaturan group gaji",
    component: () =>
      import("@/views/admin/setting/gaji/groupGaji/GroupGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/grup-gaji/add",
    name: "pengaturan tambah group gaji",
    component: () =>
      import("@/views/admin/setting/gaji/groupGaji/TambahGroupGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/grup-gaji/:id",
    name: "pengaturan edit group gaji",
    component: () =>
      import("@/views/admin/setting/gaji/groupGaji/EditGroupGaji.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/gaji/grup-gaji/:id/list-karyawan",
    name: "pengaturan group gaji view list karyawan",
    component: () =>
      import("@/views/admin/setting/gaji/groupGaji/GroupGajiKaryawan.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/pengaturan/profile-perusahaan",
    name: "pengaturan profile perusahaan admin",
    component: () =>
      import(
        "@/views/admin/setting/profilePerusahaan/ProfilePerusahaanAdmin.vue"
      ),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/laporan/rekap-periode",
    name: "laporan rekap periode",
    component: RekapPeriode,
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/laporan/datang-terlambat",
    name: "laporan datang terlambat",
    component: DatangTerlambat,
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/laporan/cuti-pribadi",
    name: "laporan cuti pribadi",
    component: CutiPribadi,
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/laporan/upah-borongan",
    name: "laporan upah borongan",
    component: UpahBorongan,
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/role-management",
    name: "Role Management",
    component: () =>
      import("@/views/admin/roleMagement/RoleManagementView.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/penggajian/olah",
    name: "Penggajian Olah Data",
    component: () => import("@/views/admin/pengajian/OlahPengajian.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/penggajian/riwayat",
    name: "Riwayat Penggajian",
    component: () => import("@/views/admin/pengajian/RiwayatPenggajian.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/penggajian/riwayat/:id",
    name: "Riwayat Penggajian Detail",
    component: () => import("@/views/admin/pengajian/RiwayatPenggajianDetail.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/backup",
    name: "backup data",
    component: () => import("@/views/admin/backup/BackupData.vue"),
    meta: { requiresAuth: true, roles: adminRoles },
  },
  {
    path: "/admin/:pathMatch(.*)*",
    name: "Not Found Admin",
    component: NotFound,
  },
];
