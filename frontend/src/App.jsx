import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import PageSpinner from './components/common/PageSpinner'
import ErrorBoundary from './components/common/ErrorBoundary'
import { AuthProvider } from './context/AuthContext'

// Lazy-loaded routes for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const AcademicLevel = lazy(() => import('./pages/AcademicLevel'))
const Admissions = lazy(() => import('./pages/Admissions'))
const Apply = lazy(() => import('./pages/admissions/Apply'))
const News = lazy(() => import('./pages/News'))
const NewsPost = lazy(() => import('./pages/NewsPost'))
const MagazinePage = lazy(() => import('./pages/MagazinePage'))
const Events = lazy(() => import('./pages/Events'))
const EventPage = lazy(() => import('./pages/EventPage'))
const Faculty = lazy(() => import('./pages/Faculty'))
const FacultyProfile = lazy(() => import('./pages/FacultyProfile'))
const Gallery = lazy(() => import('./pages/Gallery'))
const CampusLife = lazy(() => import('./pages/CampusLife'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const ToppersPage = lazy(() => import('./pages/ToppersPage'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Login = lazy(() => import('./pages/Login'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="about/:tab" element={<About />} />
              <Route path="academics" element={<AcademicLevel />} />
              <Route path="academics/:level" element={<AcademicLevel />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="admissions/apply" element={<Apply />} />
              <Route path="admissions/:tab" element={<Admissions />} />
              <Route path="campus-life" element={<CampusLife />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="faculty/:id" element={<FacultyProfile />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsPost />} />
              <Route path="magazine" element={<MagazinePage />} />
              <Route path="news/magazine" element={<MagazinePage />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:slug" element={<EventPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="board-toppers" element={<ToppersPage />} />
              <Route path="academics/toppers" element={<ToppersPage />} />
              <Route path="legal/:tab" element={<Legal />} />
              <Route path="privacy" element={<Legal />} />
              <Route path="terms" element={<Legal />} />
              <Route path="sitemap" element={<Legal />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="login" element={<Login />} />
              <Route path="admin/login" element={<Login />} />
              <Route
                path="admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
