<template>
    <BasePage>
      <div class="space-y-6">
        <div class="mt-5 mb-10 flex justify-between items-center">
            <h1 class="text-3xl font-semibold text-slate-800">Manajemen Group Gaji Karyawan</h1>
        </div>
  
        <!-- Pilih Group Gaji -->
        <div class="w-full sm:w-1/2">
          <label class="block mb-2 text-sm font-medium text-gray-900">Pilih Group Gaji</label>
          <select v-model="selectedGroupId"
                  @change="fetchUsersByGroup"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option disabled value="">-- Pilih Group --</option>
            <option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.nama }}
            </option>
          </select>
        </div>
  
        <!-- Tambah User ke Group -->
        <div v-if="selectedGroupId" class="w-full sm:w-2/3 space-y-2">
          <label class="block text-sm font-medium text-gray-900">Tambah User ke Group</label>
          <div class="flex gap-2">
            <select v-model="selectedUserToAdd" class="w-full border-gray-300 rounded-lg p-2 text-sm">
              <option disabled value="">-- Pilih User --</option>
              <option
                v-for="user in allUsers.filter(u => !isUserInGroup(u.id))"
                :key="user.id"
                :value="user.id">
                {{ user.nama }} ({{ user.email }})
              </option>
            </select>
            <button @click="addUserToGroup"
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Tambah
            </button>
          </div>
        </div>
  
        <!-- Tabel User dalam Group -->
        <div v-if="users.length > 0" class="overflow-x-auto bg-white shadow rounded-lg">
          <table class="min-w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th class="px-6 py-3">Nama</th>
                <th class="px-6 py-3">Email</th>
                <th class="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="px-6 py-4">{{ user.nama }}</td>
                <td class="px-6 py-4">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <button @click="removeUserFromGroup(user.id)"
                          class="text-red-600 hover:text-red-500 text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div v-else-if="selectedGroupId" class="text-gray-500 italic">
          Tidak ada user dalam group ini.
        </div>
      </div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BasePage from '@/layouts/admin/BasePage.vue'
  
  // Dummy data groups
  const groups = ref([
    { id: 'g1', nama: 'Group Gaji A' },
    { id: 'g2', nama: 'Group Gaji B' },
    { id: 'g3', nama: 'Group Gaji C' }
  ])
  
  // Semua user yang bisa dipilih
  const allUsers = ref([
    { id: 1, nama: 'Budi Santoso', email: 'budi@example.com' },
    { id: 2, nama: 'Ani Rahmawati', email: 'ani@example.com' },
    { id: 3, nama: 'Dedi Prasetyo', email: 'dedi@example.com' },
    { id: 4, nama: 'Rina Agustin', email: 'rina@example.com' }
  ])
  
  const selectedGroupId = ref('')
  const users = ref<{ id: number, nama: string, email: string }[]>([])
  const selectedUserToAdd = ref<number | ''>('')
  
  // Simulasi ambil data user berdasarkan group
  const fetchUsersByGroup = () => {
    if (selectedGroupId.value === 'g1') {
      users.value = [allUsers.value[0], allUsers.value[1]]
    } else if (selectedGroupId.value === 'g2') {
      users.value = [allUsers.value[2]]
    } else {
      users.value = []
    }
    selectedUserToAdd.value = ''
  }
  
  const isUserInGroup = (userId: number) => {
    return users.value.some(user => user.id === userId)
  }
  
  const addUserToGroup = () => {
    if (!selectedUserToAdd.value) return
  
    const user = allUsers.value.find(u => u.id === selectedUserToAdd.value)
    if (user && !isUserInGroup(user.id)) {
      users.value.push(user)
      selectedUserToAdd.value = ''
      alert(`${user.nama} ditambahkan ke Group.`)
    }
  }
  
  const removeUserFromGroup = (userId: number) => {
    const user = users.value.find(u => u.id === userId)
    users.value = users.value.filter(user => user.id !== userId)
    alert(`${user?.nama} dihapus dari Group.`)
  }
  </script>
  