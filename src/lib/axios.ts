// src/lib/axios.ts
import axios from 'axios'
import router from '@/router'
import { toast } from 'vue3-toastify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercept request → Tambahkan Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercept response → Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401) {
        // Auto logout if unauthorized
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
      } else if (status === 400) {
        toast.error(error.response.data.message);
      } else if (status === 500) {
        toast.error("Terjadi kesalahan pada server")
      }
    } else {
      toast.error("Tidak dapat terhubung ke server")
    }

    return Promise.reject(error)
  }
)

export default api
