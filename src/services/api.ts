import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('eps_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('eps_token');
      localStorage.removeItem('eps_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// ── Admin ─────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params?: { role?: string; page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
};

// ── Students ──────────────────────────────────────────────────────────
export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id: string) => api.get(`/students/${id}`),
  getGrades: (id: string) => api.get(`/students/${id}/grades`),
  addGrade: (id: string, data: object) => api.post(`/students/${id}/grades`, data),
  getFees: (id: string) => api.get(`/students/${id}/fees`),
};

// ── Teachers ──────────────────────────────────────────────────────────
export const teacherAPI = {
  getAll: () => api.get('/teachers'),
  getClasses: (id: string) => api.get(`/teachers/${id}/classes`),
  getGrades: (id: string) => api.get(`/teachers/${id}/grades`),
  getAttendance: (id: string) => api.get(`/teachers/${id}/attendance`),
};

// ── Attendance ────────────────────────────────────────────────────────
export const attendanceAPI = {
  mark: (data: object) => api.post('/attendance/mark', data),
  getClassAttendance: (classId: string, params?: object) =>
    api.get(`/attendance/class/${classId}`, { params }),
  getStudentAttendance: (studentId: string) =>
    api.get(`/attendance/student/${studentId}`),
};

// ── Fees ──────────────────────────────────────────────────────────────
export const feesAPI = {
  create: (data: object) => api.post('/fees', data),
  pay: (id: string, data: object) => api.patch(`/fees/${id}/pay`, data),
  getSummary: () => api.get('/fees/summary'),
};

export default api;
