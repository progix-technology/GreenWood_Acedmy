import { apiClient } from './client'

/* ==========================================================================
   AUTH SERVICES
   ========================================================================== */
export const authApi = {
  login: async (email, password) => {
    try {
      return await apiClient('/admin/login', { body: { email, password } })
    } catch (err) {
      // Fallback for static live hosting (e.g. Vercel/GitHub Pages without Node backend deployed)
      const validEmail = 'admin@greenwood.edu.in'
      const validPass = 'Admin@Greenwood2026'

      if (email.toLowerCase().trim() === validEmail && password === validPass) {
        return {
          token: 'static_demo_admin_token_2026',
          user: {
            name: 'Admin',
            email: validEmail,
            role: 'superadmin',
            isLocked: true
          }
        }
      }
      throw err
    }
  },

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
