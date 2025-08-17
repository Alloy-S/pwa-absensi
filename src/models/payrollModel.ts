export interface RincianPerhitungan {
  komponen: string;
  tipe: string;
  jumlah: number;
  nilai_a: number;
  nilai_b: number;
  operasi: string;
}

export interface HasilPenggajian {
  user_id: string;
  nama_karyawan: string;
  total_tunjangan: number;
  total_potongan: number;
  gaji: number;
  rincian: RincianPerhitungan[];
}

export interface ProsesPenggajian {
  riwayat_id: string;
  data: HasilPenggajian[];
}

export interface PenggajianReq {
  grup_gaji_id: string;
  periode_start: string;
  periode_end: string;
}
