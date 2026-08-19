import { apiClient } from './client'

/* ==========================================================================
   AUTH SERVICES
   ========================================================================== */
export const authApi = {
  login: (email, password) =>
    apiClient('/admin/login', { body: { email, password } }),

  getProfile: () => apiClient('/admin/me'),

  logout: () => apiClient('/admin/logout', { method: 'POST' }),
}

/* ==========================================================================
   ADMISSIONS SERVICES
   ========================================================================== */
export const admissionsApi = {
  submitApplication: (applicationData) =>
    apiClient('/admissions/apply', { body: applicationData }),

  getApplications: () => apiClient('/admissions/list'),
}

/* ==========================================================================
   NEWS & ANNOUNCEMENTS SERVICES
   ========================================================================== */
export const newsApi = {
  getAllNews: () => apiClient('/news'),
  getNewsBySlug: (slug) => apiClient(`/news/${slug}`),
}

/* ==========================================================================
   EVENTS SERVICES
   ========================================================================== */
export const eventsApi = {
  getAllEvents: () => apiClient('/events'),
  getEventBySlug: (slug) => apiClient(`/events/${slug}`),
}

/* ==========================================================================
   FACULTY SERVICES
   ========================================================================== */
export const facultyApi = {
  getAllFaculty: () => apiClient('/faculty'),
  getFacultyById: (id) => apiClient(`/faculty/${id}`),
}

/* ==========================================================================
   CONTACT & ENQUIRIES SERVICES
   ========================================================================== */
export const contactApi = {
  sendMessage: (contactData) =>
    apiClient('/contact/send', { body: contactData }),
}
