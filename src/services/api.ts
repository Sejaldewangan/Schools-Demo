import axios, { type AxiosAdapter } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- MOCK ADAPTER FOR DEMO ---
const mockAdapter: AxiosAdapter = async (config) => {
  const url = config.url || '';
  const data = config.data ? JSON.parse(config.data) : {};

  // Delay simulation
  await new Promise(resolve => setTimeout(resolve, 600));

  const respond = (status: number, responseData: any) => ({
    data: responseData,
    status,
    statusText: 'OK',
    headers: {},
    config,
    request: {}
  });

  // Auth endpoints
  if (url.includes('/auth/login')) {
    const { email } = data;
    let role = 'student';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('teacher')) role = 'teacher';

    return respond(200, {
      success: true,
      token: 'mock-jwt-token-123',
      user: { id: 'mock-id-1', name: role.charAt(0).toUpperCase() + role.slice(1) + ' User', email, role }
    });
  }
  
  if (url.includes('/auth/me')) {
    return respond(200, {
      success: true,
      user: { id: 'mock-id-1', name: 'Mock User', email: 'mock@eps.school', role: 'admin' }
    });
  }

  // Admin endpoints
  if (url.includes('/admin/stats')) {
    return respond(200, {
      success: true,
      data: {
        overview: { totalStudents: 2540, totalTeachers: 145 },
        revenue: { totalCollected: 15400000 },
        attendance: { overall: 95 },
        enrollment: [
          { month: 'Jan', students: 2400 },
          { month: 'Feb', students: 2450 },
          { month: 'Mar', students: 2500 },
          { month: 'Apr', students: 2540 },
        ],
        recentStudents: [
          { _id: '1', name: 'Sarah Connor', createdAt: new Date().toISOString() },
          { _id: '2', name: 'John Smith', createdAt: new Date().toISOString() },
          { _id: '3', name: 'Emma Watson', createdAt: new Date().toISOString() }
        ]
      }
    });
  }

  // Teacher endpoints
  if (url.includes('/teachers') && url.includes('/classes')) {
    return respond(200, {
      success: true,
      data: [
        { _id: '1', grade: '10', section: 'A', name: 'Mathematics', academicYear: '2024-25', capacity: 30 },
        { _id: '2', grade: '10', section: 'B', name: 'Physics', academicYear: '2024-25', capacity: 30 },
        { _id: '3', grade: '11', section: 'C', name: 'Chemistry', academicYear: '2024-25', capacity: 25 },
      ]
    });
  }

  // Student endpoints
  if (url.includes('/students') && url.includes('/grades')) {
    return respond(200, {
      success: true,
      summary: { percentage: '88%' },
      data: [
        { subject: { name: 'Math' }, marksObtained: 85, maxMarks: 100 },
        { subject: { name: 'Science' }, marksObtained: 92, maxMarks: 100 },
        { subject: { name: 'English' }, marksObtained: 78, maxMarks: 100 },
        { subject: { name: 'History' }, marksObtained: 88, maxMarks: 100 },
      ]
    });
  }

  if (url.includes('/students') && url.includes('/fees')) {
    return respond(200, {
      success: true,
      summary: { totalDue: 15000, totalPaid: 45000 },
      data: [
        { _id: '1', feeType: 'Tuition Fee - Q1', amount: 15000, dueDate: '2024-04-15', status: 'paid' },
        { _id: '2', feeType: 'Tuition Fee - Q2', amount: 15000, dueDate: '2024-07-15', status: 'paid' },
        { _id: '3', feeType: 'Tuition Fee - Q3', amount: 15000, dueDate: '2024-10-15', status: 'paid' },
        { _id: '4', feeType: 'Tuition Fee - Q4', amount: 15000, dueDate: '2025-01-15', status: 'pending' },
      ]
    });
  }

  // New Admin endpoints mocks
  if (url.includes('/admin/search')) {
    return respond(200, {
      success: true,
      data: [
        { _id: 's1', userId: { name: 'Alice Smith' }, rollNumber: 'R101', classId: { name: '10-A' } },
        { _id: 's2', userId: { name: 'Bob Wilson' }, rollNumber: 'R102', classId: { name: '10-A' } }
      ]
    });
  }

  if (url.includes('/admin/admissions')) return respond(201, { success: true, message: 'Student registered' });
  if (url.includes('/admin/assign-teacher')) return respond(200, { success: true, message: 'Teacher assigned' });
  if (url.includes('/admin/notices')) return respond(201, { success: true, message: 'Notice created' });
  if (url.includes('/admin/engagements')) return respond(201, { success: true, message: 'Engagement assigned' });

  // New Teacher endpoints mocks
  if (url.includes('/teachers/attendance')) return respond(201, { success: true, message: 'Attendance submitted' });
  if (url.includes('/teachers/class-students')) {
    return respond(200, {
      success: true,
      data: [
        { _id: 's1', userId: { name: 'Alice Smith', email: 'alice@eps.school' }, rollNumber: 'R101', classId: { name: '10-A' } },
        { _id: 's2', userId: { name: 'Bob Wilson', email: 'bob@eps.school' }, rollNumber: 'R102', classId: { name: '10-A' } }
      ]
    });
  }
  if (url.includes('/timetable')) {
    return respond(200, {
      success: true,
      data: [
        { dayOfWeek: 'Monday', periodNumber: 1, subjectId: { name: 'Math' }, classId: { name: '10-A' }, startTime: '08:00', endTime: '09:00' },
        { dayOfWeek: 'Monday', periodNumber: 2, subjectId: { name: 'Physics' }, classId: { name: '10-B' }, startTime: '09:00', endTime: '10:00' },
      ]
    });
  }

  // Fallback for any other endpoints to prevent crash
  return respond(200, { success: true, data: [] });
};
// -----------------------------

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  adapter: mockAdapter // Inject the mock adapter here!
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
  admissions: (data: any) => api.post('/admin/admissions', data),
  assignTeacher: (data: any) => api.patch('/admin/assign-teacher', data),
  search: (query: string) => api.get('/admin/search', { params: { query } }),
  createNotice: (data: any) => api.post('/admin/notices', data),
  assignEngagement: (data: any) => api.post('/admin/engagements', data),
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
  submitAttendance: (data: any) => api.post('/teachers/attendance', data),
  getTimetable: (id: string) => api.get(`/teachers/${id}/timetable`),
  getClassStudents: (query?: string) => api.get('/teachers/class-students', { params: { query } }),
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
