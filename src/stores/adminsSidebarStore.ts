import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminSidebarStore = defineStore('global', () => {
  const isOpen = ref(false);
  const isKarywanOpen = ref(false);
  const isAbsensiOpen = ref(false);
  const isApprovalOpen = ref(false);
  const isReimburseOpen = ref(false);
  const isPengumumanOpen = ref(false);
  const isConfigOpen = ref(false);
  const isLaporanOpen = ref(false);

  const toggleIsOpen = () => {
    isOpen.value = !isOpen.value;
  };

  const toggleIsKarywanOpen = () => {
    isKarywanOpen.value = !isKarywanOpen.value;
  };

  const toggleAbsensiOpen = () => {
    isAbsensiOpen.value = !isAbsensiOpen.value;
  };

  const toggleIsApprovalOpen = () => {
    isApprovalOpen.value = !isApprovalOpen.value;
  };

  const toggleIsReimburseOpen = () => {
    isReimburseOpen.value = !isReimburseOpen.value;
  };

  const toggleIsPengumumanOpen = () => {
    isPengumumanOpen.value = !isPengumumanOpen.value;
  };

  const toggleIsConfigOpen = () => {
    isConfigOpen.value = !isConfigOpen.value;
  };

  const toggleIsLaporanOpen = () => {
    isLaporanOpen.value = !isLaporanOpen.value;
  };

  return { 
    isOpen, isKarywanOpen, isAbsensiOpen, isApprovalOpen, isReimburseOpen, 
    isPengumumanOpen, isConfigOpen, isLaporanOpen,
    toggleIsOpen, toggleIsKarywanOpen, toggleAbsensiOpen, toggleIsApprovalOpen, 
    toggleIsReimburseOpen, toggleIsPengumumanOpen, 
    toggleIsConfigOpen, toggleIsLaporanOpen
  };
});
