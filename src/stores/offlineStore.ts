import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/services/dbService";
import { v4 as uuidv4 } from "uuid";
import { toast } from "vue3-toastify";
import { KoreksiReq } from "@/models/koreksiModel";
import { CreateKoreksiApi, syncKoreksiApi } from "@/services/koreksiService";

export const useOfflineStore = defineStore("offline", () => {
  const isOnline = ref(navigator.onLine);

  const setupOnlineStatusListeners = () => {
    window.addEventListener("online", () => {
      isOnline.value = true;
      toast.success("Koneksi internet kembali pulih. Menyinkronkan data...");
      syncQueue();
    });
    window.addEventListener("offline", () => {
      isOnline.value = false;
      toast.warn("Anda sedang offline. Data akan disimpan secara lokal.");
    });
  };

  const submitKoreksi = async (formData: KoreksiReq) => {
    if (isOnline.value) {
      try {
        await CreateKoreksiApi(formData);
        toast.success("Pengajuan koreksi berhasil dikirim.");
      } catch (error) {
        console.error("API call failed, saving to queue:", error);
        await saveToQueue(formData);
      }
    } else {
      await saveToQueue(formData);
    }
  };

  const saveToQueue = async (formData: any) => {
    try {
      await db.koreksiQueue.add({
        pengajuan_id: uuidv4(),
        data: formData,
        timestamp: Date.now(),
      });
      toast.info("Pengajuan disimpan dan akan dikirim saat kembali online.");
    } catch (error) {
      console.error("Gagal menyimpan ke database lokal:", error);
      toast.error("Gagal menyimpan data pengajuan secara lokal.");
    }
  };

  const syncQueue = async () => {
    if (!isOnline.value) return;

    const queueItems = await db.koreksiQueue.toArray();
    if (queueItems.length === 0) return;

    const dataToSync = queueItems.map((item) => ({
      ...item.data,
      pengajuan_id: item.pengajuan_id,
      timestamp: item.timestamp,
    }));

    try {
      const payload = { pengajuan: dataToSync };
      await syncKoreksiApi(payload);

      const syncedIds = queueItems.map((item) => item.id!);
      await db.koreksiQueue.bulkDelete(syncedIds);

      toast.success(`${queueItems.length} pengajuan berhasil disinkronkan.`);
    } catch (error) {
      console.error("Gagal melakukan sinkronisasi:", error);
      toast.error("Gagal menyinkronkan data. Akan dicoba lagi nanti.");
    }
  };

  const cancelLocalKoreksi = async (submissionId: string) => {
    try {
      const deletedCount = await db.koreksiQueue
        .where("pengajuan_id")
        .equals(submissionId)
        .delete();

      if (deletedCount > 0) {
        toast.success("Pengajuan offline berhasil dibatalkan.");
        return true;
      } else {
        toast.error("Gagal menemukan pengajuan offline untuk dibatalkan.");
        return false;
      }
    } catch (error) {
      console.error("Gagal membatalkan pengajuan lokal:", error);
      toast.error("Terjadi kesalahan saat membatalkan pengajuan lokal.");
      return false;
    }
  };

  return {
    isOnline,
    setupOnlineStatusListeners,
    submitKoreksi,
    syncQueue,
    cancelLocalKoreksi,
  };
});
